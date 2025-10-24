import { Donation, Fundraiser } from "../model/donation.model.js";
import { createHmac } from "node:crypto";
import Razorpay from "razorpay";
import Web3 from "web3";
import moment from "moment-timezone";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay works in paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });
    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

class BlockchainService {
  constructor() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545")
    );
  }

  // ✅ Added missing getAccounts() method
  async getAccounts() {
    try {
      const accounts = await this.web3.eth.getAccounts();
      return accounts;
    } catch (error) {
      throw new Error("Error fetching accounts: " + error.message);
    }
  }

  async signTransaction(fromAddress, toAddress, data) {
    try {
      const gasPrice = await this.web3.eth.getGasPrice();
      const gasLimit = await this.web3.eth.estimateGas({
        from: fromAddress,
        to: toAddress,
        value: "0x0",
        data: data,
      });

      const nonce = await this.web3.eth.getTransactionCount(fromAddress);

      const txObject = {
        nonce: this.web3.utils.toHex(nonce),
        to: toAddress,
        value: "0x0",
        gasLimit: this.web3.utils.toHex(gasLimit),
        gasPrice: this.web3.utils.toHex(gasPrice),
        data: data,
      };

      const dataHash = await this.web3.utils.sha3(JSON.stringify(data));

      const privateKey = process.env.BLOCKCHAIN_PRIVATE_KEY;
      const signedTx = await this.web3.eth.accounts.signTransaction(
        txObject,
        privateKey
      );
      const receipt = await this.web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log(receipt);

      return {
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockHash,
        dataHash: dataHash,
      };
    } catch (error) {
      throw new Error("Error signing transaction: " + error.message);
    }
  }
  
}



const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    amount,
    fundraiserId,
  } = req.body;

  try {
    const generate_signature = createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET
    )
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

      console.log(generate_signature)

    if (generate_signature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }

    const blockchainService = new BlockchainService();
    const accounts = await blockchainService.getAccounts(); 
    const fromAddress = accounts[0];

    const donationCount = await Donation.countDocuments();
    const serialNumber = donationCount + 1;
    const donationData = blockchainService.web3.utils.asciiToHex(
      JSON.stringify({
        serialNumber,
        paymentId: razorpay_payment_id,
        userId,
        amount,
      })
    );

    const blockchainReceipt = await blockchainService.signTransaction(
      fromAddress,
      process.env.BLOCKCHAIN_ACCOUNT,
      donationData
    );

    const newDonation = await Donation.create({
      serialNumber,
      paymentId: razorpay_payment_id,
      userId,
      amount,
      blockchain: {
        transactionHash: blockchainReceipt.transactionHash,
        blockNumber: blockchainReceipt.blockNumber,
        dataHash: blockchainReceipt.dataHash,
      },
    });

    if (fundraiserId) {
      const fundraiser = await Fundraiser.findById(fundraiserId);
      const updatedAmount = fundraiser.amountCollected + amount;
      const newResponse = await Fundraiser.findByIdAndUpdate(
        fundraiserId,
        { amountCollected: updatedAmount },
        { new: true }
      );
      if (!fundraiser || !newResponse) {
        return res
          .status(404)
          .json({ success: false, message: "Fundraiser not found" });
      }
      fundraiser.donations.push(newDonation._id);
      await fundraiser.save();
    }

    await newDonation.save();
    console.log(newDonation);

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      newDonation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getDonations = async (req, res) => {
  const { fundraiserId } = req.query;
  try {
    const query = fundraiserId ? { _id: fundraiserId } : {};
    const donations = await Fundraiser.find(query)
      .populate("donations")
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, donations });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const createFundraiser = async (req, res) => {
  try {
    const { name, description, logo, hasGoal = false, goal } = req.body;

    // Check mandatory fields
    if (!name || !description || !logo) {
      return res.status(400).json({
        success: false,
        message: "Name, description, and logo are required",
      });
    }

    // If hasGoal is true, goal must be provided and valid
    if (hasGoal && (goal === undefined || goal === null)) {
      return res.status(400).json({
        success: false,
        message: "Goal amount is required when hasGoal is true",
      });
    }

    // Create fundraiser with conditional goal handling
    const fundraiser = await Fundraiser.create({
      name,
      description,
      logo,
      image: image || "",
      hasGoal,
      goal: hasGoal ? goal : Number.MAX_SAFE_INTEGER,
    });

    return res.status(201).json({
      success: true,
      message: "Fundraiser created successfully",
      fundraiser,
    });
  } catch (error) {
    console.error("Error creating fundraiser:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteFundraiser = async (req, res) => {
  const { fundraiserId } = req.params;
  try {
    const fundraiser = await Fundraiser.findById(fundraiserId);
    if (!fundraiser) {
      return res
        .status(404)
        .json({ success: false, message: "Fundraiser not found" });
    }
    await Donation.deleteMany({ _id: { $in: fundraiser.donations } });
    await Fundraiser.findByIdAndDelete(fundraiserId);
    return res.status(200).json({
      success: true,
      message: "Fundraiser and associated donations deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getFundraisers = async (req, res) => {
  try {
    const fundraisers = await Fundraiser.find();
    res.status(200).json({ success: true, fundraisers });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getFundraisersAnalytics = async(req,res) =>{

}

export {
  createFundraiser,
  deleteFundraiser,
  getFundraisers,
  createOrder,
  verifyPayment,
  getDonations,
  getFundraisersAnalytics
};

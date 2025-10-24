import mongoose from "mongoose";

const donationSchema  = new mongoose.Schema({
    serialNumber: Number,
    paymentId: String,
    userId: String,
    amount: Number,
    paymentDate: { type: Date, default: Date.now },
    blockchain: {
        transactionHash: String,
        blockNumber: Number,
        dataHash: String,
    },
},{
    timestamps:true,
})

export const Donation = mongoose.model('Donation',donationSchema);

const fundraiserSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    description: { type: String, required: true },
    logo: { type: String, required: true }, 
    hasGoal: { type: Boolean, default: false },
    goal: { type: Number, default: Number.MAX_SAFE_INTEGER },
    amountRaised: { type: Number, default: 0 },
    donations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donation' }] 
},{
    timestamps:true,
})

export const Fundraiser = mongoose.model('Fundraiser',fundraiserSchema);
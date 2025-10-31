import { useEffect, useState } from "react";
import "./DonateToFundraiser.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Modal, Button } from "react-bootstrap"; // ✅ Import from react-bootstrap

const DonateToFundraiser = () => {
  const { fundraiserId } = useParams();
  const [fundraiserInfo, setFundraiserInfo] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchDonations = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.get(
        `http://localhost:8000/api/donation/get-donations/${fundraiserId}`,
        config
      );
      setFundraiserInfo(response.data.donations[0]);
    } catch (error) {
      toast.error("Error fetching fundraiser details. Try again later.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.mobile ||
      !formData.email ||
      !formData.amount
    ) {
      toast.warn("Please fill out all fields.");
      return;
    }
    setShowModal(true); // ✅ Open modal for confirmation
  };

  // const confirmDonation = async () => {
  //   setShowModal(false);
  //   setLoading(true);
  //   try {
  //     const config = { headers: { "Content-Type": "application/json" } };

  //     const response = await axios.post(
  //       `http://localhost:8000/api/donation/make-donation/${fundraiserId}`,
  //       formData,
  //       config
  //     );

  //     if (response.data.success) {
  //       toast.success("Donation successful! Thank you for your contribution.");
  //       setFormData({ name: "", mobile: "", email: "", amount: "" });
  //       fetchDonations();
  //     } else {
  //       toast.error("Donation failed. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong. Please try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    console.log(formData.amount);

    const result = await axios.post(
      "http://localhost:8000/api/donation/create-order",
      {
        amount: formData.amount,
      }
    );

    if (!result) {
      toast.error("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data.order;
    console.log(result.data);

    const options = {
      key: "rzp_test_IB0DFCqRT7jxeD", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "Jeevan Samvardhan Foundation",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          // orderCreationId: order_id,
          // razorpayPaymentId: response.razorpay_payment_id,
          // razorpayOrderId: response.razorpay_order_id,
          // razorpaySignature: response.razorpay_signature,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          name: formData.name,
          email: formData.email,
          mobileNo: formData.mobile,
          amount: formData.amount,
          fundraiserId,
        };

        console.log(data);

        const result = await axios.post(
          "http://localhost:8000/api/donation/verify-payment",
          data
        );

        fetchDonations();
        setShowModal(false);
        setFormData({
          name: "",
          mobile: "",
          email: "",
          amount: "",
        });
        toast.success(`Payment of ₹${options.amount / 100} successful`);
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.mobile,
      },
      notes: {
        address: `Paying for ${fundraiserInfo.name}`,
      },
      theme: {
        color: "var(--accent-01)",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="donate-to-fundraiser-wrapper">
      <div className="fundraiser-info-container">
        <div className="fundraiser-info">
          <div className="fundraiser-name">{fundraiserInfo.name}</div>
          <div className="fundraiser-description">
            <span>Description:</span> {fundraiserInfo.description}
          </div>
          <div className="fundraiser-date">
            <span>Creation Date:</span>{" "}
            {fundraiserInfo.createdAt && fundraiserInfo.createdAt.split("T")[0]}
          </div>
          {fundraiserInfo?.hasGoal && (
            <div className="fundraiser-goal">
              <span>Progress:</span> ₹{fundraiserInfo?.amountRaised || 0} / ₹
              {fundraiserInfo.goal}
            </div>
          )}
        </div>
        <div className="fundraiser-image">
          <img src={fundraiserInfo.logo} alt="Fundraiser logo" />
        </div>
      </div>

      <div className="donation-info-container">
        <h3>
          You're donating to <span>{fundraiserInfo.name}</span>
        </h3>
        <form className="donation-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Mobile:</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Quick Amounts:</label>
            <div className="quick-amounts">
              {[100, 500, 1000, 5000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  className={`amount-badge ${
                    formData.amount === amt.toString() ? "selected" : ""
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, amount: amt.toString() }))
                  }
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Donation Amount (₹):</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter donation amount"
            />
          </div>

          <button type="submit" className="donate-button" disabled={loading}>
            {loading ? "Processing..." : "Make Donation"}
          </button>
        </form>
      </div>

      {/* ✅ Bootstrap Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are about to donate <strong>₹{formData.amount}</strong> to{" "}
          <strong>{fundraiserInfo.name}</strong>.
          <br />
          Are you sure you want to proceed?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={displayRazorpay}
            disabled={loading}
          >
            {loading ? "Processing..." : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DonateToFundraiser;

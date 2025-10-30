import { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BiSolidBookOpen } from "react-icons/bi";
import "./Fundraiser.css";

function Fundraiser() {
  const [fundraisers, setFundraisers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newFundraiser, setNewFundraiser] = useState({
    name: "",
    // fullForm: "",
    description: "",
    // goal: "",
    logo: "",
  });

  const navigate = useNavigate();

  // Fetch all fundraisers
  const fetchFundraisers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/donation/get-fundraisers"
      );
      if (response.status === 200) {
        setFundraisers(response.data.fundraisers);
        console.log(response.data.fundraisers);
      }
    } catch (error) {
      toast.error("Error fetching fundraisers. Try again later.");
      console.error(error);
    }
  };

  // Create new fundraiser
  const createFundraiser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/donation/create-fundraiser",
        newFundraiser,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 201) {
        toast.success("Fundraiser created successfully!");
        setShowModal(false);
        fetchFundraisers();
      }
    } catch (error) {
      toast.error("Error creating fundraiser. Try again later.");
      console.error(error);
    }
  };

  // Delete fundraiser
  const deleteFundraiser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/donation/delete-fundraiser/${id}`
      );
      if (response.status === 200) {
        toast.success("Fundraiser deleted successfully!");
        fetchFundraisers();
      }
    } catch (error) {
      toast.error("Error deleting fundraiser. Try again later.");
      console.error(error);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setNewFundraiser((prevState) => ({
        ...prevState,
        logo: base64,
      }));
    }
  };

  useEffect(() => {
    fetchFundraisers();
  }, []);

  return (
    <>
      <div className="fundraiser-container">
        <div className="fundraiser-title-button-wrapper">
          <div className="fundraiser-title">{"Manage Donations"}</div>
          <Button
            variant="primary"
            className="create-new-fund"
            onClick={() => setShowModal(true)}
          >
            <span>{"Create New Fundraiser"}</span> <FaPlus />
          </Button>
        </div>

        <div className="fundraiser-cards">
          {fundraisers.map((fundraiser) => (
            <Card
              key={fundraiser._id}
              style={{ width: "18rem", margin: "10px" }}
            >
              <Card.Img
                variant="top"
                src={fundraiser.logo || "https://via.placeholder.com/150"}
                alt="Fundraiser Logo"
              />
              <Card.Body>
                <Card.Title>
                  {/* {fundraiser.name.substring(0, 5)}
                  {""}
                  {fundraiser.name.length >= 5 && "..."} */}
                  {fundraiser.name}
                </Card.Title>
                <Card.Text>{fundraiser.description}</Card.Text>
                <div className="card-body-bottom">
                  <div className="card-body-bottom-buttons">
                    <Button
                      className="fundraiser-view"
                      variant="success"
                      onClick={() => navigate(`/donations/${fundraiser._id}`)}
                    >
                      <BiSolidBookOpen />
                    </Button>{" "}
                    <Button
                      className="fundraiser-delete"
                      variant="danger"
                      onClick={() => deleteFundraiser(fundraiser._id)}
                    >
                      <MdDelete />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal for Creating Fundraiser */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{"Create New Fundraiser"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{"Name"}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter fundraiser name"
                value={newFundraiser.name}
                onChange={(e) =>
                  setNewFundraiser({ ...newFundraiser, name: e.target.value })
                }
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>{"Full Form"}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full form"
                value={newFundraiser.fullForm}
                onChange={(e) =>
                  setNewFundraiser({
                    ...newFundraiser,
                    fullForm: e.target.value,
                  })
                }
              />
            </Form.Group> */}
            <Form.Group className="mb-3">
              <Form.Label>{"Description"}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={newFundraiser.description}
                onChange={(e) =>
                  setNewFundraiser({
                    ...newFundraiser,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Does this campaign have a Goal?</Form.Label>

              <div>
                <Form.Check
                  inline
                  label="Yes"
                  type="radio"
                  name="hasGoal"
                  value="true"
                  checked={newFundraiser.hasGoal === true}
                  onChange={(e) =>
                    setNewFundraiser({
                      ...newFundraiser,
                      hasGoal: e.target.value === "true",
                    })
                  }
                />

                <Form.Check
                  inline
                  label="No"
                  type="radio"
                  name="hasGoal"
                  value="false"
                  checked={newFundraiser.hasGoal === false}
                  onChange={(e) =>
                    setNewFundraiser({
                      ...newFundraiser,
                      hasGoal: e.target.value === "true",
                    })
                  }
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{"Goal Amount"}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter fundraiser Goal in Rs."
                value={newFundraiser.goal}
                onChange={(e) =>
                  setNewFundraiser({
                    ...newFundraiser,
                    goal: e.target.value,
                  })
                }
                disabled={newFundraiser.hasGoal !== true}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{"Fundraiser Thumbnail"}</Form.Label>
              <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {"Close"}
          </Button>
          <Button variant="primary" onClick={createFundraiser}>
            {"Create Fundraiser"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Fundraiser;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Children.css";

const CHILD_API = "http://localhost:8000/api";

const CENTRE_API = "http://localhost:8000/api/centre";

function ChildrenForm() {
  const navigate = useNavigate();

  const [centres, setCentres] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    height: "",
    weight: "",
    centre: "",
    parentName: "",
    parentContact: "",
    medicalHistory: "",
    dateofjoining: "",
    standardofEducation: "",
    detailsOfChild: "",
    achievementsOfChild: "",
    sscMarks: "",
    hscMarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      dob: "",
      gender: "",
      height: "",
      weight: "",
      centre: "",
      parentName: "",
      parentContact: "",
      medicalHistory: "",
      dateofjoining: "",
      standardofEducation: "",
      detailsOfChild: "",
      achievementsOfChild: "",
      sscMarks: "",
      hscMarks: "",
    });
    setSelectedId(null);
  };

  const fetchCentres = async () => {
    try {
      const res = await axios.get(`${CENTRE_API}/allcentre`);
      setCentres(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch centres", err);
    }
  };

  const addChild = async (e) => {
    e.preventDefault();
    await axios.post(`${CHILD_API}/addchild`, formData);
    resetForm();
    navigate("/dashboard/childrenfilter");
  };

  const updateChild = async (e) => {
    e.preventDefault();
    await axios.put(`${CHILD_API}/updatechild/${selectedId}`, formData);
    resetForm();
    navigate("/dashboard/childrenfilter");
  };

  useEffect(() => {
    fetchCentres();
  }, []);

  return (
    <div className="children-wrapper">
      <div className="children-card">
        {/* Header */}
        <div className="form-header-row">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/dashboard/childrenfilter")}
          >
            ← Back
          </button>
          <h2>{selectedId ? "Update Child Details" : "Register New Child"}</h2>
        </div>

        <form onSubmit={selectedId ? updateChild : addChild}>
          {/* Child Information */}
          <h3>Child Information</h3>
          <div className="form-grid">
            <div>
              <label>Child Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* Physical Details */}
          <h3>Physical Details</h3>
          <div className="form-grid">
            <div>
              <label>Height (cm) *</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Weight (kg) *</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Centre & Education */}
          <h3>Centre & Education</h3>
          <div className="form-grid">
            <div>
              <label>Centre *</label>
              <select
                name="centre"
                value={formData.centre}
                onChange={handleChange}
                required
              >
                <option value="">Select Centre</option>
                {centres.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.centreName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Date of Joining *</label>
              <input
                type="date"
                name="dateofjoining"
                value={formData.dateofjoining}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Standard of Education</label>
              <input
                name="standardofEducation"
                value={formData.standardofEducation}
                onChange={handleChange}
                placeholder="e.g. SSC, HSC, Not Enrolled"
              />
            </div>

            {formData.standardofEducation?.toLowerCase() === "ssc" && (
              <div>
                <label>SSC Marks (%)</label>
                <input
                  type="number"
                  name="sscMarks"
                  min="0"
                  max="100"
                  value={formData.sscMarks}
                  onChange={handleChange}
                />
              </div>
            )}

            {formData.standardofEducation?.toLowerCase() === "hsc" && (
              <div>
                <label>HSC Marks (%)</label>
                <input
                  type="number"
                  name="hscMarks"
                  min="0"
                  max="100"
                  value={formData.hscMarks}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          {/* Parent Details */}
          <h3>Parent / Guardian Details</h3>
          <div className="form-grid">
            <div>
              <label>Parent Name</label>
              <input
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Parent Contact</label>
              <input
                name="parentContact"
                value={formData.parentContact}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Additional Info */}
          <h3>Additional Information</h3>
          <div className="form-grid">
            <div>
              <label>Medical History</label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Child Details</label>
              <textarea
                name="detailsOfChild"
                value={formData.detailsOfChild}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Achievements</label>
              <textarea
                name="achievementsOfChild"
                value={formData.achievementsOfChild}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button type="submit">
              {selectedId ? "Update Child" : "Register Child"}
            </button>

            {selectedId && (
              <button type="button" className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChildrenForm;

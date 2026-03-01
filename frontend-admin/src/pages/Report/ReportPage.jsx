import React, { useState, useEffect } from "react";
import axios from "axios";
import { TbReportAnalytics } from "react-icons/tb"; // Matches your theme

const ReportPage = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      // Replace with your actual API base URL
      const response = await axios.get(`/api/reports/yearly/${year}`);
      setReport(response.data.report);
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="report-container" style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h2>Yearly Analytics Report</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <button 
            onClick={fetchReport}
            style={{ 
              padding: "8px 16px", 
              backgroundColor: "var(--primary-color)", 
              color: "white", 
              border: "none", 
              borderRadius: "4px",
              cursor: "pointer" 
            }}
          >
            {loading ? "Loading..." : "Generate"}
          </button>
        </div>
      </div>

      {report ? (
        <div className="report-content">
           {/* Replace this with your actual data visualization or table */}
           <pre style={{ background: "#f4f4f4", padding: "1rem" }}>
             {JSON.stringify(report, null, 2)}
           </pre>
        </div>
      ) : (
        <p>No data available for the selected year.</p>
      )}
    </div>
  );
};

export default ReportPage;
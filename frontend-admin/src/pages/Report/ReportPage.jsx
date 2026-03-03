import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  Legend
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";


const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444"];

const ReportPage = () => {
  const [year, setYear] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [rawData, setRawData] = useState(null);
  const [loading, setLoading] = useState(false);
  const reportRef = useRef();

  const fetchReport = async () => {
    if (!year) return;

    setLoading(true);
    setMarkdown("");
    setRawData(null);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/report/yearly/${year}`
      );

      if (response.data?.report) {
        setMarkdown(response.data.report.markdown || "");
        setRawData(response.data.report.rawData || null);
      } else {
        setMarkdown("No report found for this year.");
      }
    } catch (error) {
      console.error(error);
      setMarkdown("Failed to generate report.");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async () => {
  if (!reportRef.current) return;

  const canvas = await html2canvas(reportRef.current, {
    scale: 2
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const imgWidth = 210;
  const pageHeight = 297;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`Annual-Report-${year}.pdf`);
};

  return (
    <div style={{ padding: "2rem", background: "#f9fafb", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem"
        }}
      >
        <h2 style={{ fontWeight: 600 }}>Yearly Analytics Report</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="number"
            placeholder="Enter year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #d1d5db"
            }}
          />

          <button
            onClick={fetchReport}
            style={{
              padding: "8px 18px",
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          {markdown && (
            <button
              onClick={downloadReport}
              style={{
                padding: "8px 18px",
                borderRadius: "6px",
                backgroundColor: "#111827",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Download
            </button>
          )}
        </div>
      </div>

      {!markdown && !loading && (
        <div
          style={{
            padding: "40px",
            background: "white",
            borderRadius: "12px",
            textAlign: "center"
          }}
        >
          Enter a year to generate report.
        </div>
      )}

      {loading && <p>Generating report...</p>}

      {/* Markdown Card */}
      <div ref={reportRef}>
      {markdown && !loading && (
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            marginBottom: "40px"
          }}
        >
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      )}

      {/* Charts Section */}
      {rawData && !loading && (
        <div style={{ display: "grid", gap: "40px" }}>
          {/* Financial Chart */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px"
            }}
          >
            <h3>Financial Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  {
                    name: "Total Donations",
                    value: rawData.financials.totalDonations
                  },
                  {
                    name: "Net Received",
                    value: rawData.financials.netAmountReceived
                  },
                  {
                    name: "Gateway Deduction",
                    value: rawData.financials.totalGatewayDeduction
                  }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {[
                    rawData.financials.totalDonations,
                    rawData.financials.netAmountReceived,
                    rawData.financials.totalGatewayDeduction
                  ].map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Children Pie */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px"
            }}
          >
            <h3>Children Statistics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "Active",
                      value: rawData.childrenStats.activeChildren
                    },
                    {
                      name: "Joined",
                      value: rawData.childrenStats.childrenJoined
                    },
                    {
                      name: "Left",
                      value: rawData.childrenStats.childrenLeft
                    }
                  ]}
                  dataKey="value"
                  outerRadius={110}
                >
                  {COLORS.map((color, index) => (
                    <Cell key={index} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Centre Performance */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px"
            }}
          >
            <h3>Centre Capacity vs Occupancy</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={[
                  {
                    name: "Capacity",
                    value: rawData.centreStats.totalCapacity
                  },
                  {
                    name: "Occupancy",
                    value: rawData.centreStats.totalOccupancy
                  }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4f46e5"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ReportPage;
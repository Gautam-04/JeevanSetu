/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from "react";
import { useReactToPrint } from "react-to-print";
import Footer from "../../components/footer/Footer";
import Header from "../../components/Header/Header";
import "./Donation.css";
import axios from "axios";
import { MaterialReactTable } from "material-react-table";
import { useParams } from "react-router-dom";
import LineChart from "../../components/lineChart/LineChart";
import DoughnutChart from "../../components/doughnutChart/DoughnutChart";
import { useRef } from "react";

const DUMMY_DONATIONS_FLAG = false;

function Donation() {
  const [donations, setDonations] = useState([]);
const [fundraiserInfo, setFundraiserInfo] = useState({
  name: "",
  description: "",
  createdAt: "",
  logo: "",
  hasGoal: false,
  goal: 0,
  amountRaised: 0,
  isFixedAmount: false,
  fixedAmount: 0,
});
  const [fundraiserStat, setFundraiserStat] = useState({
    data: [],
    fundraiser: { amountCollected: 0, goal: 0 },
  });
  const [pieChartData, setPieChartData] = useState({
    amountCollected: 0,
    amountRemaining: 0,
  });
  const [isPrinting, setIsPrinting] = useState(false);

  const { fundraiserId } = useParams();

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    onBeforePrint: () => {
      return new Promise((resolve) => {
        setIsPrinting(true);
        setTimeout(resolve, 300); // wait for re-render
      });
    },
    onAfterPrint: () => {
      setIsPrinting(false);
    },
    documentTitle: `Fundraiser_Report_${fundraiserId}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
        .print-hide {
          display: none !important;
        }
      }
    `,
  });

  const [pieChartSchema, setPieChartSchema] = useState({
    labels: Object.keys(pieChartData).map((data) => data),
    datasets: [
      {
        label: "Amount(₹)",
        data: Object.values(pieChartData).map((data) => data),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "lightslategray",
        borderWidth: 1,
      },
    ],
  });

  const [lineChartSchema, setLineChartSchema] = useState({
    labels: fundraiserStat.data.map((data) =>
      new Date(data["paymentDate"]).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    ),
    datasets: [
      {
        label: "Amount(₹)",
        data: fundraiserStat.data.map((data) => data["amount"]),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  // Fetch Donations
  const fetchDonations = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/donation/get-donations/${fundraiserId}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 200 && response.data.success) {
      const fundraiser = response.data.fundraiser;
      const donationList = response.data.donations || [];

      // Add serial number safely
      const formattedDonations = donationList.map((donation, index) => ({
        ...donation,
        serialNumber: index + 1,
      }));

      setFundraiserInfo(fundraiser);
      setDonations(formattedDonations);

      setFundraiserStat({
        data: formattedDonations,
        fundraiser: {
          amountCollected: fundraiser.amountRaised || 0,
          goal: fundraiser.goal || 0,
        },
      });

      if (fundraiser.hasGoal) {
        setPieChartData({
          amountCollected: fundraiser.amountRaised || 0,
          amountRemaining:
            (fundraiser.goal || 0) - (fundraiser.amountRaised || 0),
        });
      } else {
        setPieChartData({
          amountCollected: fundraiser.amountRaised || 0,
          amountRemaining: 0,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    fetchDonations();
    // fetchFundraiserInfo();
    // fetchFundraiserStat();
  }, []);

  useEffect(() => {
    setLineChartSchema({
      labels: fundraiserStat.data.map((data) =>
        new Date(data["paymentDate"]).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      ),
      datasets: [
        {
          label: "Amount(₹)",
          data: fundraiserStat.data.map((data) => data["amount"]),
          backgroundColor: [
            "#2b3674",
            // "#2a71d0",
          ],
          // fill: false,
          borderColor: "#2b3674",
          borderWidth: 1,
          tension: 0.3,
        },
      ],
    });
  }, [fundraiserStat]);

  useEffect(() => {
  setPieChartSchema({
    labels: Object.keys(pieChartData),
    datasets: [
      {
        label: "Amount(₹)",
        data: Object.values(pieChartData),
        backgroundColor: ["#2b3674", "whitesmoke"],
        borderColor: "#2b3674",
        borderWidth: 1,
      },
    ],
  });
}, [pieChartData]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "serialNumber",
        header: "Sr No",
        size: 50,
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "paymentId",
        header: "Payment ID",
        size: 100,
        muiTableBodyCellProps: {
          align: "center",
          className: "print-hide",
        },
        muiTableHeadCellProps: { className: "print-hide" },
      },
      {
        accessorKey: "name",
        header: "Donor Name",
        // size: 100,
        muiTableBodyCellProps: {
          align: "left",
        },
      },
      {
  accessorKey: "address",
  header: "Address",
  size: 100,
  muiTableBodyCellProps: {
    align: "center",
  },
},
{
  accessorKey: "panNumber",
  header: "PAN Number",
  size: 100,
  muiTableBodyCellProps: {
    align: "center",
  },
},
      {
        accessorKey: "amount",
        header: "Amount (INR)",
        Cell: ({ cell }) => `Rs. ${cell.getValue()?.toFixed(2)}`,
        size: 100,
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      // {
      //     accessorKey: 'paymentTime',
      //     header: 'Transaction Time',
      //     Cell: ({ cell }) => new Date(cell.getValue()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      //     size: 100,
      //     muiTableBodyCellProps: {
      //     align: "center",
      //     },
      // },
      {
        accessorKey: "paymentDate",
        header: "Payment Date",
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
        size: 100,
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "blockchain.transactionHash",
        header: "Transaction Hash",
        size: 100,
        muiTableBodyCellProps: {
          align: "center",
          className: "print-hide",
        },
        muiTableHeadCellProps: { className: "print-hide" },
      },
      {
        accessorKey: "blockchain.blockNumber",
        header: "Block Number",
        size: 100,
        muiTableBodyCellProps: {
          align: "center",
          className: "print-hide",
        },
        muiTableHeadCellProps: { className: "print-hide" },
      },
      {
        accessorKey: "blockchain.dataHash",
        header: "Data Hash",
        size: 100,
        muiTableBodyCellProps: {
          align: "center",
          className: "print-hide",
        },
        muiTableHeadCellProps: { className: "print-hide" },
      },
    ],
    []
  );

  return (
    <>
      <Header />
      <div ref={componentRef}>
        <div className="fundraiser-wrapper">
          <div className="fundraiser-info-container">
  <div className="fundraiser-info">

    {/* Name */}
    <div className="fundraiser-name">
      {fundraiserInfo.name}
    </div>

    {/* Description */}
    <div className="fundraiser-description">
      <strong>Description:</strong> {fundraiserInfo.description}
    </div>

    {/* Creation Date */}
    <div className="fundraiser-date">
      <strong>Creation Date:</strong>{" "}
      {fundraiserInfo.createdAt
        ? new Date(fundraiserInfo.createdAt).toLocaleDateString()
        : "-"}
    </div>

    {/* Goal Details */}
    {fundraiserInfo.hasGoal && (
      <div className="fundraiser-goal">
        <strong>Goal:</strong> ₹{fundraiserInfo.goal}
        <br />
        <strong>Amount Raised:</strong> ₹{fundraiserInfo.amountRaised}
        <br />
        <strong>Remaining:</strong> ₹
        {Math.max(
          fundraiserInfo.goal - fundraiserInfo.amountRaised,
          0
        )}
        <br />
        <strong>Status:</strong>{" "}
        {fundraiserInfo.amountRaised >= fundraiserInfo.goal
          ? "🎉 Goal Achieved"
          : "Active"}
      </div>
    )}

    {/* Fixed Amount Details */}
    {fundraiserInfo.isFixedAmount && (
      <div className="fundraiser-description">
        <strong>Fixed Donation Amount:</strong> ₹
        {fundraiserInfo.fixedAmount}
      </div>
    )}

  </div>

  <div className="fundraiser-image">
    {fundraiserInfo.logo && (
      <img
        src={fundraiserInfo.logo}
        alt="Fundraiser"
        style={{ maxWidth: "220px", borderRadius: "10px" }}
      />
    )}
  </div>
</div>

          <div className="donation-charts">
            <div className="charts-donation-timeline">
              <LineChart
                chartData={lineChartSchema}
                title={"Donation Timeline"}
              />
            </div>
            <div className="charts-donation-progress">
              <DoughnutChart
                chartData={pieChartSchema}
                title={"Goal Achieved"}
              />
            </div>
          </div>

          <div className="donation-container">
            <MaterialReactTable
              columns={columns}
              data={donations}
              enablePagination={!isPrinting}
              enableSorting={true}
              enableGlobalFilter={true}
              initialState={{
                sorting: [
                  {
                    id: "serialNumber",
                    desc: true,
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
      <div className="report-print">
        <button onClick={handlePrint} className="report-print-button">
          🖨️ Print Report
        </button>
      </div>
    </>
  );
}

export default Donation;

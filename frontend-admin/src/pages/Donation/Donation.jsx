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
    fundraiser: { name: "", description: "", createdAt: "", logo: "" },
  });
  const [fundraiserStat, setFundraiserStat] = useState({
    data: [],
    fundraiser: { amountCollected: 0, goal: 0 },
  });

  const { fundraiserId } = useParams();

  // 🖨️ Create ref for printable area
  const componentRef = useRef();

  // 🖨️ Hook for printing
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
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
      }
    `,
  });

  const [pieChartSchema, setPieChartSchema] = useState({
    labels: Object.keys(fundraiserStat.fundraiser).map((data) => data),
    datasets: [
      {
        label: "Amount(₹)",
        data: Object.values(fundraiserStat.fundraiser).map((data) => data),
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
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        `http://localhost:8000/api/donation/get-donations/${fundraiserId}`,
        config
      );
      console.log(response.data);
      if (response.status === 200) {
        const { donations, ...fundraiserInfoTemp } =
          response.data?.donations[0];
        console.log(fundraiserInfoTemp);
        setFundraiserInfo(fundraiserInfoTemp);
        if (DUMMY_DONATIONS_FLAG) {
          injectDummyDonations();
        } else {
          setDonations(response.data?.donations[0]?.donations);
          if (fundraiserInfoTemp.hasGoal) {
            setFundraiserStat({
              data: response.data?.donations[0]?.donations,
              fundraiser: {
                amountCollected: fundraiserInfoTemp.amountRaised,
                goal: fundraiserInfoTemp.goal,
              },
            });
          }
        }
        // console.log(response.data.donations[0].donations);
      }
    } catch (error) {
      // toast.error("Error fetching donations. Try again later.");
      console.error(error);
    }
  };

  // const fetchFundraiserInfo = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     const response = await axios.get(
  //       `http://localhost:8000/api/donation/get-donations/${fundraiserId}`,
  //       config
  //     );
  //     if (response.status === 200) {
  //       // console.log(response.data);
  //       setFundraiserInfo(response.data);
  //     }
  //   } catch (error) {
  //     // toast.error("Error fetching donation info. Try again later.");
  //     console.error(error);
  //   }
  // };

  // const fetchFundraiserStat = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     const response = await axios.get(
  //       `http://localhost:8000/api/donation/get-donations/${fundraiserId}`,
  //       config
  //     );
  //     console.log(response.data);
  //     if (response.status === 200) {
  //       // response.data.fundraiser.remaining =
  //       //   (response.data.fundraiser?.goal || 120000) -
  //       //     response.data.fundraiser?.amountCollected || 0;

  //       // response.data.goal = response.data.fundraiser.goal || 120000;
  //       // delete response.data.fundraiser.goal;
  //       setFundraiserStat(response.data);
  //       // console.log(response.data);
  //     }
  //   } catch (error) {
  //     // toast.error("Error fetching donation statistics. Try again later.");
  //     console.error(error);
  //   }
  // };

  const injectDummyDonations = () => {
    setFundraiserStat({
      fundraiser: {
        amountCollected: 12000,
        goal: 120000,
      },
      data: donationsDummy,
    });
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
      labels: Object.keys(fundraiserStat.fundraiser).map((data) => data),
      datasets: [
        {
          label: "Amount(₹)",
          data: Object.values(fundraiserStat.fundraiser).map((data) => data),
          backgroundColor: [
            "#2b3674",
            "whitesmoke",
            // "#2a71d0",
          ],
          fill: false,
          borderColor: "#2b3674",
          borderWidth: 1,
          // tension: 0.3,
        },
      ],
    });
  }, [fundraiserStat]);

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
        },
      },
      {
        accessorKey: "userId",
        header: "User ID",
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
        },
      },
      {
        accessorKey: "blockchain.blockNumber",
        header: "Block Number",
        size: 100,
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "blockchain.dataHash",
        header: "Data Hash",
        size: 100,
        muiTableBodyCellProps: {
          align: "center",
        },
      },
    ],
    []
  );

  const donationsDummy = [
    {
      serialNumber: 1,
      paymentId: "PAY123456",
      userId: "USR001",
      amount: 500.0,
      paymentDate: "2025-10-15T10:30:00Z",
      blockchain: {
        transactionHash: "0xa4b1e89f7d34f5c98adabf91c1a7f3b0a25f42d9",
        blockNumber: 189234,
        dataHash: "0x3c8f9e77ad4b8f27c0b3a5e2a9f63a9a1b12fcd8",
      },
    },
    {
      serialNumber: 2,
      paymentId: "PAY123457",
      userId: "USR002",
      amount: 1200.75,
      paymentDate: "2025-10-16T12:45:00Z",
      blockchain: {
        transactionHash: "0xb5d4e31fae9d7a2f9c6a9d3c0f2b1a5a8f1e2c7d",
        blockNumber: 189235,
        dataHash: "0x9d3f2b7ac4a6b8e1f2d9a5e0c4b7d3a8f9e6b2d4",
      },
    },
    {
      serialNumber: 3,
      paymentId: "PAY123458",
      userId: "USR003",
      amount: 250.5,
      paymentDate: "2025-10-16T14:10:00Z",
      blockchain: {
        transactionHash: "0xc2e3f7b8a1d4c9e2f0b3a7c8d1f6a2e9b4c5d7e8",
        blockNumber: 189236,
        dataHash: "0xa8b7c9d2e1f4a3b6c5d8e9f0b7a3c2d1e9f6b5a4",
      },
    },
    {
      serialNumber: 4,
      paymentId: "PAY123459",
      userId: "USR004",
      amount: 750.0,
      paymentDate: "2025-10-17T09:00:00Z",
      blockchain: {
        transactionHash: "0xd9a2b4c6e8f0a1b3c5d7e9f2a4b6c8d1e3f5a7b9",
        blockNumber: 189237,
        dataHash: "0xf3a1b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
      },
    },
    {
      serialNumber: 5,
      paymentId: "PAY123460",
      userId: "USR005",
      amount: 999.99,
      paymentDate: "2025-10-17T11:20:00Z",
      blockchain: {
        transactionHash: "0xe4c7f2b9a3d1b8e0c5f6a2d9b3c4e7f1a8b9c0d2",
        blockNumber: 189238,
        dataHash: "0xb7d3e9a5c2f8b1d4a6c0e3f2b5a8c9d0e7f6a1b4",
      },
    },
    {
      serialNumber: 6,
      paymentId: "PAY123461",
      userId: "USR006",
      amount: 1500.0,
      paymentDate: "2025-10-17T13:10:00Z",
      blockchain: {
        transactionHash: "0xf1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a1",
        blockNumber: 189239,
        dataHash: "0xc5d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5",
      },
    },
    {
      serialNumber: 7,
      paymentId: "PAY123462",
      userId: "USR007",
      amount: 300.0,
      paymentDate: "2025-10-17T14:40:00Z",
      blockchain: {
        transactionHash: "0xa3d4b5c6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
        blockNumber: 189240,
        dataHash: "0xf7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8",
      },
    },
    {
      serialNumber: 8,
      paymentId: "PAY123463",
      userId: "USR008",
      amount: 1850.25,
      paymentDate: "2025-10-17T15:25:00Z",
      blockchain: {
        transactionHash: "0xb8e7c6d5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9",
        blockNumber: 189241,
        dataHash: "0xe1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0",
      },
    },
    {
      serialNumber: 9,
      paymentId: "PAY123464",
      userId: "USR009",
      amount: 600.0,
      paymentDate: "2025-10-17T16:00:00Z",
      blockchain: {
        transactionHash: "0xc0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9",
        blockNumber: 189242,
        dataHash: "0xa9b8c7d6e5f4a3b2c1d0f9e8d7c6b5a4f3e2d1c0",
      },
    },
    {
      serialNumber: 10,
      paymentId: "PAY123465",
      userId: "USR010",
      amount: 450.75,
      paymentDate: "2025-10-17T17:10:00Z",
      blockchain: {
        transactionHash: "0xd1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0",
        blockNumber: 189243,
        dataHash: "0xf0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9",
      },
    },
  ];

  return (
    <>
      <Header />
      <div style={{ textAlign: "right", margin: "20px" }}>
        <button onClick={handlePrint} className="print-btn">
          🖨️ Print Report
        </button>
      </div>
      <div ref={componentRef}>
        <div className="fundraiser-wrapper">
          <div className="fundraiser-info-container">
            <div className="fundraiser-info">
              <div className="fundraiser-name">
                {/* {fundraiserInfo.fundraiser.fullForm} ( */}
                {fundraiserInfo.name}
                {/* ) */}
              </div>
              <div className="fundraiser-description">
                <span>Description:</span> {fundraiserInfo.description}{" "}
              </div>
              <div className="fundraiser-date">
                <span>Creation Date:</span>{" "}
                {fundraiserInfo.createdAt &&
                  fundraiserInfo.createdAt.split("T")[0]}{" "}
              </div>
              {fundraiserInfo?.hasGoal && (
                <div className="fundraiser-goal">
                  <span>Progress:</span> ₹{fundraiserInfo?.amountRaised || 0} /
                  ₹{fundraiserInfo.goal}{" "}
                </div>
              )}
            </div>
            <div className="fundraiser-image">
              <img src={fundraiserInfo.logo} />
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
              data={fundraiserStat.data}
              enablePagination={true}
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
    </>
  );
}

export default Donation;

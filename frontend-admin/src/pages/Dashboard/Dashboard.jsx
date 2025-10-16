import { useState } from "react";
import "./Dashboard.css";
import Header from "../../components/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
// import Footer from "../../components/footer/Footer";
// import Analytics from "../../components/analytics/Analytics";
// import Searchbar from "../../components/searchbar/searchbar";
// import CornerMenu from "../../components/cornerMenu/CornerMenu";
// import Search from "../../components/Search/Search";
// import { MdCrisisAlert, MdOutlineAnalytics } from "react-icons/md";
import { RiRefund2Fill } from "react-icons/ri";
import { LuHouse } from "react-icons/lu";
// import { IoSearch } from "react-icons/io5";
// import { TiWeatherPartlySunny } from "react-icons/ti";
import { MdKeyboardArrowRight } from "react-icons/md";
import Fundraiser from "../../components/Fundraiser/Fundraiser";
import { MdOutlineInventory2 } from "react-icons/md";
// import Fundraiser from "../../components/Fundraiser/Fundraiser";
// import { useTranslation } from "react-i18next";
// import SOSDisplay from "../../components/sosDisplay/SOSDisplay";
// import Forecasting from "../../components/forecasting/Forecasting";
// import { TbReportAnalytics } from "react-icons/tb";
// import ReportGen from "../../components/report-gen/ReportGen";

const Dashboard = () => {
  //   const { t } = useTranslation();
  const { tab } = useParams();
  const [dashboardPage, setDashboardPage] = useState(tab);
  let navigateContent = useNavigate();

  const changeSidebarContent = (path) => {
    navigateContent(`/dashboard/${path}`);
    setDashboardPage(path);
  };

  const sidebarContentTop = [
    // {
    //   name: "Donations",
    //   icon: <MdOutlineAnalytics className="sidebar-icon" />,
    //   to: "donations",
    //   color: "white",
    // },
    // {
    //   name: t("dashboard_search"),
    //   icon: <IoSearch className="sidebar-icon" />,
    //   to: "search",
    //   color: "white",
    // },
    {
      name: "Donations",
      icon: <RiRefund2Fill className="sidebar-icon" />,
      to: "donations",
      color: "white",
    },
    {
      name: "Housing",
      icon: <LuHouse className="sidebar-icon" />,
      to: "housing",
      color: "white",
    },
    {
      name: "Inventory",
      icon: <MdOutlineInventory2 className="sidebar-icon" />,
      to: "inventory",
      color: "white",
    },
  ];

  //   const sidebarContentBottom = [
  //     // {
  //     //   name: "Report Generation",
  //     //   icon: <TbReportAnalytics className="sidebar-icon" />,
  //     //   to: "report-gen",
  //     //   color: "white",
  //     // },
  //   ];

  return (
    <>
      <Header />
      <div className="dashboard-wrapper">
        <div className="dashboard-sidebar">
          {sidebarContentTop.map((sidebarItem, idx) => {
            return (
              <div
                className="sidebar-item"
                onClick={() => changeSidebarContent(sidebarItem.to)}
                key={idx}
                style={{
                  backgroundColor: `${
                    sidebarItem.to === dashboardPage
                      ? "var(--primary-color)"
                      : "white"
                  }`,
                  color: `${
                    sidebarItem.to === dashboardPage
                      ? "white"
                      : "var(--primary-color)"
                  }`,
                  fontWeight: `${sidebarItem.to === dashboardPage ? 600 : 400}`,
                }}
              >
                <div className="sidebar-content-wrapper">
                  <div className="sidebar-item-icon">{sidebarItem.icon}</div>
                  <div className="sidebar-item-text">{sidebarItem.name}</div>
                </div>
                <MdKeyboardArrowRight
                  size="2rem"
                  color={
                    sidebarItem.to === dashboardPage
                      ? "white"
                      : "var(--primary-color)"
                  }
                />
              </div>
            );
          })}
          {/* <div className="sos-toggle">
            <div
              className="sidebar-item"
              onClick={() => setSOSToggle((prev) => !prev)}
              style={{
                backgroundColor: `${
                  SOSToggle ? "var(--primary-color)" : "white"
                }`,
                color: `${SOSToggle ? "white" : "var(--primary-color)"}`,
                fontWeight: `${setSOSToggle ? 600 : 400}`,
              }}
            >
              <div className="sidebar-content-wrapper">
                <div className="sidebar-item-icon">
                  <MdCrisisAlert className="sidebar-icon" />
                </div>
                <div className="sidebar-item-text">
                  {SOSToggle ? "Hide SOS" : "Show SOS"}
                </div>
              </div>
            </div>
          </div> */}
          {/* {sidebarContentBottom.map((sidebarItem, idx) => {
            return (
              <div
                className="sidebar-item"
                onClick={() => changeSidebarContent(sidebarItem.to)}
                key={idx}
                style={{
                  backgroundColor: `${
                    sidebarItem.to === dashboardPage
                      ? "var(--primary-color)"
                      : "white"
                  }`,
                  color: `${
                    sidebarItem.to === dashboardPage
                      ? "white"
                      : "var(--primary-color)"
                  }`,
                  fontWeight: `${sidebarItem.to === dashboardPage ? 600 : 400}`,
                }}
              >
                <div className="sidebar-content-wrapper">
                  <div className="sidebar-item-icon">{sidebarItem.icon}</div>
                  <div className="sidebar-item-text">{sidebarItem.name}</div>
                </div>
                <MdKeyboardArrowRight
                  size="2rem"
                  color={
                    sidebarItem.to === dashboardPage
                      ? "white"
                      : "var(--primary-color)"
                  }
                />
              </div>
            );
          })} */}
        </div>
        <div className="dashboard-content">
          {/* {dashboardPage === "analytics" && <Analytics />}
          {dashboardPage === "search" && <Search />} */}
          {dashboardPage === "donations" && <Fundraiser />}
          {/* {dashboardPage === "forecasting" && <Forecasting />}
          {dashboardPage === "report-gen" && <ReportGen />} */}
          {dashboardPage === "housing" && (
            <div
              style={{
                height: "85vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1 style={{ overflow: "hidden" }}>🚧Under Construction🚧</h1>
            </div>
          )}
          {dashboardPage === "inventory" && (
            <div
              style={{
                height: "85vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1 style={{ overflow: "hidden" }}>🚧Under Construction🚧</h1>
            </div>
          )}
        </div>
        {/* {SOSToggle && (
          <div className="dashboard-sos">
            <SOSDisplay />
          </div>
        )} */}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Dashboard;

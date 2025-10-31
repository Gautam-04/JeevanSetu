import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Donation from "./pages/Donation/Donation";
import Landing from "./pages/Landing/Landing";
import { Slide, ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DonateToFundraiser from "./pages/DonateToFundraiser/DonateToFundraiser";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/legacy" element={<Home />} />
        <Route
          path="/donate-to-fundraiser/:fundraiserId"
          element={<DonateToFundraiser />}
        />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/donations" element={<Donation />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </>
  );
}

export default App;

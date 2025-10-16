import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Donation from "./pages/Donation/Donation";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/donation" element={<Donation />} />
      </Routes>
    </>
  );
}

export default App;

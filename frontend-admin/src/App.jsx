import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Slide, ToastContainer } from "react-toastify";
import Donation from "./pages/Donation/Donation";

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard/:tab" element={<Dashboard />} />
        <Route path="/donations/:fundraiserId" element={<Donation />} />
      </Routes>
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

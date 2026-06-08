import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/admin/Login";
import SendOtp from "./pages/admin/SendOtp";
import ResetPassword from "./pages/admin/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/send-otp" element={<SendOtp />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
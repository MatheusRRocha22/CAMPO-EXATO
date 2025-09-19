import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/index";
import { Login } from "../containers/Login/index";
import { Register } from "../containers/Register/index";
import { AddCep } from "../containers/AddCep/index";
import { LoginAdmin } from "../containers/LoginAdmin";
import { Admin } from "../containers/Admin";
import { Blocked } from "../containers/Blocked";
import { User } from "../pages/User";
import News from "../pages/News";
import Agri from "../pages/Agri";
import Cotations from "../pages/Cotations";
import Pec from "../pages/Pec";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/user" element={<User />} />
        <Route path="/blocked" element={<Blocked />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login_admin" element={<LoginAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cep" element={<AddCep />} />
        <Route path="/agricultura" element={<Agri />} />
        <Route path="/pecuaria" element={<Pec />} />
        <Route path="/cotations" element={<Cotations />} />
      </Routes>
    </BrowserRouter>
  );
}

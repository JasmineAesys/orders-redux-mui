import "./App.css";
import ShowListMenu from "./components/ShowListMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowListMenu />} />
        <Route path="login" element={<Login />} />
        <Route path="orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

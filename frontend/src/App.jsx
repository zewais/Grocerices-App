import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GroceriesApp from "./GroceriesApp";
import HomePage from "./pages/HomePage";
import CreateUser from "./pages/CreateUser";
import PageNotFound from "./pages/PageNotFound";
import InventoryForm from "./InventoryForm";
import PrivateRoutes from "./utilities/PrivateRoute";
import NotAuthorized from "./pages/NotAuthorized";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/main" element={<GroceriesApp />} />
            <Route path="/edit-product" element={<InventoryForm />} />
            <Route path="/add-product" element={<InventoryForm />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

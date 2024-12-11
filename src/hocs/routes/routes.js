import { Route, Routes } from "react-router-dom";
import Home from "../../containers/pages/Home";
import Error404 from "../../containers/errors/Error404";
import Marcas from "../../containers/pages/dashboard/Marcas/Marcas";
import MarcaDetalle from "../../containers/pages/dashboard/Marcas/MarcaDetalle";
import Productos from "../../containers/pages/dashboard/Productos/Productos";
import ProductoDetalle from "../../containers/pages/dashboard/Productos/ProductoDetalle";
import Categorias from "../../containers/pages/dashboard/Categorias/Categorias";
import CategoriasDetalle from "../../containers/pages/dashboard/Categorias/CategoriasDetalle";
import Subcategorias from "../../containers/pages/dashboard/Subcategorias/Subcategorias";
import SubcategoriasDetalle from "../../containers/pages/dashboard/Subcategorias/SubcategoriasDetalle";
import Register from "../../containers/pages/dashboard/Users/Register";
import Login from "../../containers/pages/dashboard/Users/Login";
import RecoverPassword from "../../containers/pages/dashboard/Users/RecoverPassword";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Error404 />} />
      <Route path="/" element={<Home />} />
      <Route path="/marcas" element={<Marcas />} />
      <Route path="/marcas/:id" element={<MarcaDetalle />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/productos/:id" element={<ProductoDetalle />} />
      <Route path="/categorias" element={<Categorias />} />
      <Route path="/categoria/:id" element={<CategoriasDetalle />} />
      <Route path="/subcategorias" element={<Subcategorias />} />
      <Route path="/subcategoria/:id" element={<SubcategoriasDetalle />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recoverpassword" element={<RecoverPassword />} />
    </Routes>
  );
};

export default AppRoutes;

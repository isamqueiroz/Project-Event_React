import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import TipoEvento from "../pages/tipoDeEvento/TipoEvento";
import TipoUsuario from "../pages/tipoDeUsuario/TipoUsuario";
import Evento from "../pages/cadastroEventos/CadastroEventos";
import ListagemDeEventos from "../pages/listagemDeEventos/ListagemDeEventos";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* http://localhost:3000/ => Login */}
        <Route path="/" element={<Login />} exact />

        <Route path="/TipoEvento" element={<TipoEvento />} exact />

        <Route path="/Usuarios" element={<TipoUsuario />} exact />

        <Route path="/Eventos" element={<Evento />} exact />

        <Route path="/ListagemEvento" element={<ListagemDeEventos />} exact />
      </Routes>
    </BrowserRouter>
  );
};
export default Rotas;

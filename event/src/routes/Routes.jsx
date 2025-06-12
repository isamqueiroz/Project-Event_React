import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import TipoEvento from "../pages/tipoDeEvento/TipoEvento";
import TipoUsuario from "../pages/tipoDeUsuario/TipoUsuario";
import ListagemDeEventos from "../pages/listagemDeEventos/ListagemDeEventos";
import CadastroEvento from "../pages/cadastroEventos/CadastroEventos";
import TelaHome from "../pages/telaHome/telaHome"
import { useAuth } from "../contexts/AuthContext";

const Privado = (props) => {
  const { usuario } = useAuth();
    //toke, idUsuario, tipoUsuario

    // Se não estiver autenticado, manda para login
    if (!usuario) {
        return <Navigate to="/NotFound" />;
    }
    // Se o tipo do usuário não for o permitido, bloqueia
    if (usuario.tipoUsuario !== props.tipoPermitido) {
        //ir para a tela de nao encontrado!
        return <Navigate to="/NotFound" />;
    }

    // Senão, renderiza o componente passado
    return <props.Item />;
};

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* http://localhost:3000/ => Login */}
        <Route path = "/" element = {<Login />} />

        <Route
          path="/tipoevento"
          element={<Privado tipoPermitido = "Administrador" Item = {TipoEvento} />}
        />
          <Route element = {<Privado tipoPermitido = "Administrador" Item = {CadastroEvento} />}  path="/CadastroEvento" />
        <Route
          path="/tipousuario"
          element={<Privado tipoPermitido = "Administrador" Item = {TipoUsuario} />}
        />
        <Route
          path="/listagemEventos"
          element={<Privado tipoPermitido = "aluno" Item = {ListagemDeEventos} />}
        />

        <Route
          path="/eventos"
          element={<Privado tipoPermitido="Administrador" Item = {CadastroEvento} />}
        />
     
      <Route element = {<TelaHome/>} path = "/telahome"  />

       {/* http://localhost:3000/ => Login */}
        {/* <Route path="/" element={<Login />} exact />

        <Route path="/TipoEvento" element={<TipoEvento />} exact />

        <Route path="/Usuarios" element={<TipoUsuario />} exact />

        <Route path="/Eventos" element={<CadastroEvento />} exact />

        <Route path="/ListagemEvento" element={<ListagemDeEventos />} exact />

        <Route path="/Home" element={<TelaHome />} exact /> */}

      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;



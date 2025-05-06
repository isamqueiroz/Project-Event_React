import "./Header.css";
import Logo1 from "../../assets/img/logo1.svg"

import { Link } from "react-router-dom";
const Header = () => {
    return (
        <header>
            <div className="layout_grid cabecalho">
                {/*Estou a redeirecionar ao clickar na logo */}
            <Link to="/">
            <img className="imagem" src={Logo1} alt="Logo do Filmoteca" />
            </Link>
            <nav className="nav_header">
              <Link to="/Home" className="link_header" href="">Home</Link>
              <Link to="/Eventos" className="link_header" href="">Eventos</Link>
              <Link to="/Usuarios" className="link_header" href="">Usuários</Link>
              <Link to="/Contatos" className="link_header" href="">Contatos</Link>
            </nav>
            
            <nav className="nav_header admin">
              <Link to="/Administrador" className="link_header" href="">Administrador</Link>
                
            </nav>

            </div>
        </header>
    )
}
export default Header;
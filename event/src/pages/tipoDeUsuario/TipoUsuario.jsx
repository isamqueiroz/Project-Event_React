import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header"
import TiposUsuarios from "../../assets/img/TipoUsuario.svg"
import Lista from "../../components/lista/Lista"


const TipoUsuario = () => {
    return (
     <>
     <Header/>
     <main>
 
     <Cadastro tituloCadastro="Cadastro tipo de Usuário"
                    campoPlaceholder="tipo de usuário"
                    visibilidade="none"
                    nomeDoBotao="Cadastrar"
                    nomeplacehoderr=" Digite o evento"
                    img_banner={TiposUsuarios}
                />

<Lista 
 tituloLista="Lista de Usuários"
 tipos="Tipo Usuário"
/>

     </main>
     <Footer/>
     </>

    )
}
export default TipoUsuario;
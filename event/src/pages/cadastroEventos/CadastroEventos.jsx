import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header"
import CadastroEvento from "../../assets/img/CadastroEvento.svg"
import Lista from "../../components/lista/Lista"


const Evento = () => {
    return (
     <>
     <Header headerzinho="Administrador" />
     <main>
 
     <Cadastro tituloCadastro="Cadastro de evento"
                    campoPlaceholder="evento"
                    visibilidade="none"
                    nomeplacehoderr="nome"
                    nomeplacehoder="tipo de evento"
                    nomeDoBotao="Cadastrar"
                    img_banner={CadastroEvento}
                    

                />

<Lista 
 tituloLista="Lista de Eventos"
/>

     </main>
     <Footer/>
     </>

    )
}
export default Evento;
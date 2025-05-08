import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header"
import TiposEvento from "../../assets/img/TipoEvento.svg"
import Lista from "../../components/lista/Lista"


const TipoEvento = () => {
    return (
     <>
     <Header headerzinho="Administrador" />
     <main>
 
     <Cadastro tituloCadastro="Cadastro tipo de evento"
                    campoPlaceholder="nome"
                    visibilidade="none"
                    nomeDoBotao="Cadastrar"
                    nomeplacehoderr=" Digite o evento"
                    img_banner={TiposEvento}
                   
                                    />

<Lista 
 tituloLista="Lista Tipo de Evento"
 tipos="Tipo Evento"
/>
     </main>
     <Footer/>
     </>

    )
}
export default TipoEvento;
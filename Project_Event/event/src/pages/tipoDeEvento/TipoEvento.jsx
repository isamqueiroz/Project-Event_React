import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header"


const TipoEvento = () => {
    return (
     <>
     <Header/>
     <main>
 
     <Cadastro tituloCadastro="Cadastro tipo de evento"
                    campoPlaceholder="tipo de evento"
                    visibilidade="none"
                    nomeDoBotao="Cadastrar"
                />


     </main>
     <Footer/>
     </>

    )
}
export default TipoEvento;
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header"
import TiposEvento from "../../assets/img/TipoEvento.svg"
import Lista from "../../components/lista/Lista"
import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from "sweetalert2";

const TipoEvento = () => {

      const [tipoEvento, setTipoEvento] = useState("");
      const [listaTipoEvento, setListaEvento] = useState([]);
    

 function alertar(icone, mensagem) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: icone,
      title: mensagem,
    });
  }

  async function cadastrarTipoEvento(e){
  e.preventDefault();
    if (tipoEvento.trim() !== "") {
      try {
        await api.post("TiposEventos", { tituloTipoEvento : tipoEvento  });
        alertar("success", "Sucesso! Cadastro realizado com sucesso!");
        setTipoEvento("");
      } catch (error) {
        console.log(error);
      }
    } else {
      alertar("error", "Erro! Preencha os campos");
    }
  }

async function listarTipoEvento() {
    try {
      const resposta = await api.get("TiposEventos");
      setListaEvento(resposta.data);
    } catch (error) {
      console.log(error);
    }
  }


useEffect(() => {
    cadastrarTipoEvento();
},[])

useEffect(() => {
    listarTipoEvento();
},[listaTipoEvento])

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
                     funcCadastro={cadastrarTipoEvento}
                     valorInput={tipoEvento}
                     setValorInput={setTipoEvento}
                     onSubmit= {cadastrarTipoEvento}
                   
                                    />

<Lista 
 tituloLista="Lista Tipo de Evento"
 tipos="Tipo Evento"
 tipoLista = "TiposEventos"
 lista={listaTipoEvento}
/>
     </main>
     <Footer/>
     </>

    )
}
export default TipoEvento;
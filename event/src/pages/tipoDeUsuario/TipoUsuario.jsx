import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header"
import TiposUsuarios from "../../assets/img/TipoUsuario.svg"
import Lista from "../../components/lista/Lista"
import api from "../../Services/services";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const TipoUsuario = () => {
     const [tipoUsuario, setTipoUsuario] = useState("")
      const [listaTipoUsuario, setListaTipoUsuario] = useState([])

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

  async function cadastrarTipoUsuario(e){
    // e.preventDefault();
    if (tipoUsuario.trim() !== "") {
      try {
        await api.post("TiposUsuarios", { tituloTipoUsuario : tipoUsuario  });
        alertar("success", "Sucesso! Cadastro realizado com sucesso!");
        setTipoUsuario("");
      } catch (error) {
        console.log(error);
      }
    } else {
      alertar("error", "Erro! Preencha os campos");
    }
  }



async function listarTipoUsuario() {
    try {
      const resposta = await api.get("usuario");
      setListaTipoUsuario(resposta.data);
    } catch (error) {
      console.log(error);
    }
  }


useEffect(() => {
    cadastrarTipoUsuario();
},[])

useEffect(() => {
    listarTipoUsuario();
},[])
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
 tipoLista = "tipoUsuario"
 lista={listaTipoUsuario}
/>

     </main>
     <Footer/>
     </>

    )
}
export default TipoUsuario;
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
  e.preventDefault();
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

            const resposta = await api.get("tiposUsuarios");
            //console.log(resposta.data);
            setListaTipoUsuario(resposta.data);
            //console.log(resposta.data);

        } catch (error) {
            console.log(error);
        }
    }


 async function excluirTipoUsuario(id) {
        Swal.fire({
            title: 'Tem Certeza?',
            text: "Essa ação não poderá ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#640016',
            cancelButtonColor: '#000000',
            confirmButtonText: 'Sim, apagar!',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.delete(`tiposUsuarios/${id.idTipoUsuario}`);
                alertar("success", "TipoUsuario Excluido!");
            }
        }).catch(error => {
            console.log(error);
            alertar("error", "Erro ao Excluir!");
        })
    }

    async function editarTipoUsuario(tipoUsuario) {
        const { value: novoTipoUsuario } = await Swal.fire({
            title: "Modifique seu Tipo Usuario",
            input: "text",
            confirmButtonColor: '#640016',
            cancelButtonColor: '#000000',
            inputLabel: "Novo Tipo Usuario",
            inputValue: tipoUsuario.tituloTipoUsuario,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });
        if (novoTipoUsuario) {
            try {
                await api.put(`tiposUsuarios/${tipoUsuario.idTipoUsuario}`,
                    { tituloTipoUsuario: novoTipoUsuario });
                alertar("success", "Tipo Usuario Modificado!")
            } catch (error) {

            }
            Swal.fire(`Seu novo Tipo de Usuario: ${novoTipoUsuario}`);
        }
    }










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
                     funcCadastro={cadastrarTipoUsuario}
                     valorInput={tipoUsuario}
                     setValorInput={setTipoUsuario}
                     onSubmit= {cadastrarTipoUsuario}
                     visibilidadeData="none"
                     visibilidadeTipoEvento="none"
                     visibilidadeInst="none"
                     visibilidadeDesc="none"

                />

<Lista 
  titulo_lista="Tipo Usuario"
                titulo="Titulo"
                visibilidade="none"

                tipoLista="TiposUsuarios"
                lista={listaTipoUsuario}
                funcExcluir={excluirTipoUsuario}
                funcEditar={editarTipoUsuario}
 
/>

     </main>
     <Footer/>
     </>

    )
}
export default TipoUsuario;
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import TiposEvento from "../../assets/img/TipoEvento.svg";
import Lista from "../../components/lista/Lista";
import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from "sweetalert2";

const TipoEvento = () => {
  const [tipoEvento, setTipoEvento] = useState("");
  const [listaTipoEvento, setListaTipoEvento] = useState([]);

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

  async function cadastrarTipoEvento(e) {
    e.preventDefault();
    if (tipoEvento.trim() !== "") {
      try {
        await api.post("TiposEventos", { tituloTipoEvento: tipoEvento });
        alertar("success", "Sucesso! Cadastro realizado com sucesso!");
        setTipoEvento("");
      } catch (error) {
        console.log(error);
      }
    } else {
      alertar("error", "Erro! Preencha os campos");
    }
  }

  // async function listarTipoEvento() {
  //     try {
  //       const resposta = await api.get("TiposEventos");
  //       setListaEvento(resposta.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  async function listarTipoEvento() {
    try {
      const resposta = await api.get("tiposEventos");
      //console.log(resposta.data);
      setListaTipoEvento(resposta.data);
      //console.log(resposta.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function editarTipoEvento(tipoEvento) {
    const { value: novoTipoEvento } = await Swal.fire({
      title: "Modifique seu Tipo Evento",
      input: "text",
      confirmButtonColor: "#B51D44",
      cancelButtonColor: "#000000",
      inputLabel: "Novo Tipo Evento",
      inputValue: TipoEvento.tituloTipoEvento,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "O campo não pode estar vazio!";
        }
      },
    });
    if (novoTipoEvento) {
      try {
        await api.put(`tiposEventos/${tipoEvento.idTipoEvento}`, {
          tituloTipoEvento: novoTipoEvento,
        });
        alertar("success", "Tipo Evento Modificado!");
      } catch (error) {}
      Swal.fire(`Seu novo Tipo Evento: ${novoTipoEvento}`);
    }
  }

  async function excluirTipoEvento(id) {
    Swal.fire({
      title: "Tem Certeza?",
      text: "Essa ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B51D44",
      cancelButtonColor: "#000000",
      confirmButtonText: "Sim, apagar!",
      cancelButtonText: "Cancelar",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          await api.delete(`tiposEventos/${id.idTipoEvento}`);
          alertar("success", "Tipo Evento Excluido!");
        }
      })
      .catch((error) => {
        console.log(error);
        alertar("error", "Erro ao Excluir!");
      });
  }

  useEffect(() => {
    listarTipoEvento();
  }, [listaTipoEvento]);

  return (
    <>
      <Header headerzinho="Administrador" />
      <main>
        <Cadastro
          tituloCadastro="Cadastro tipo de evento"
          campoPlaceholder="nome"
          visibilidade="none"
          nomeDoBotao="Cadastrar"
          nomeplacehoderr=" Digite o evento"
          img_banner={TiposEvento}
          funcCadastro={cadastrarTipoEvento}
          valorInput={tipoEvento}
          setValorInput={setTipoEvento}
          onSubmit={cadastrarTipoEvento}
          visibilidadeData="none"
          visibilidadeTipoEvento="none"
          visibilidadeInst="none"
          visibilidadeDesc="none"
        />

        <Lista
          tituloLista="Lista Tipo de Evento"
          tipos="Tipo Evento"
          tipoLista="tipoEvento"
          lista={listaTipoEvento}
          funcExcluir={excluirTipoEvento}
          funcEditar={editarTipoEvento}
        />
      </main>
      <Footer />
    </>
  );
};
export default TipoEvento;

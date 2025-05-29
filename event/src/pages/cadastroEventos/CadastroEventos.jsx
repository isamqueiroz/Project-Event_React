import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../Services/services";

import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import CadastroEvento from "../../assets/img/CadastroEvento.svg";
import Lista from "../../components/lista/Lista";

const Evento = () => {
  const [evento, setEvento] = useState("");
  const [dataevento, setDataEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoevento, setTipoEvento] = useState("");
  const [instituicao, setInstituicao] = useState( "F058AC3A-CE9C-4C7B-ADA9-2EC4291F91BC");
  const [listaTipoEvento, setListaTipoEvento] = useState([]);
  const [listaEvento, setListaEvento] = useState([]);

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

 async function cadastrarEvento(evt) {
        evt.preventDefault();
        if (evento.trim() != "") {
            try {
              console.log(evento);
              console.log(tipoevento);
              console.log(dataevento);
              console.log(descricao);
              console.log(instituicao);
                await api.post("eventos", {
                    nomeEvento: evento,
                    idTipoEvento: tipoevento,
                    dataEvento: dataevento,
                    descricao: descricao,
                    idInstituicao: instituicao
                });
                alertar("success", "Cadastro realizado com sucesso!");
                setEvento("");
                setDataEvento();
                setDescricao("");
                setTipoEvento("");

            } catch (error) {
                alertar("error", "Entre em contato com o suporte")
                console.log(error);
                
            }
        } else {
            alertar("error", "Preencha o campo vazio")

        }
    }


  async function listarEvento() {
    try {
      const resposta = await api.get("Eventos");
      setListaEvento(resposta.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function mostrarDescricao(descricao) {
    const result = await Swal.fire({
      title: "Descrição do evento", // "Deseja continuar?"
      text: `Descrição: ${descricao}`, // Mostra a descrição atual
      icon: "question",
      iconHtml: "؟",
      confirmButtonText: "نعم", // "Sim"
      cancelButtonText: "لا", // "Não"
      showCancelButton: true,
      showCloseButton: true,
    });

    return result.isConfirmed;
  }
  async function listarTipoEvento() {
    try {
      const resposta = await api.get("tiposEventos");
      setListaTipoEvento(resposta.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarTipoEvento();
    listarEvento();
  }, []);

  return (
    <>
      <Header headerzinho="Administrador" />
      <main>
        <Cadastro
          tituloCadastro="Cadastro de evento"
          nomeplaceholder1="Nome do evento"
          nomeplaceholder2="Tipo de evento"
          visibilidade="none"
          nomeDoBotao="Cadastrar"
          funcCadastro={cadastrarEvento}
          img_banner={CadastroEvento}

          valorInput={evento}
          setValorInput={setEvento}

          setValorInputData={setDataEvento}
          campoPlaceholder="Nome"
          valorText={descricao}
          setValorText={setDescricao}

          lista={listaTipoEvento}

          valorSelectTpEvento={tipoevento}
          setValorSelectTpEvento={setTipoEvento}

          valorSelectInstituicao={instituicao}
          setValorSelectInstituicao={setInstituicao}
          campoDescricao="Descrição"
        />

        <Lista
          tituloLista="Lista de Eventos"
          tipos="Evento"
          tipoLista="Evento"
          lista={listaEvento}
          mostrarDescricao={mostrarDescricao}
        />
      </main>
      <Footer />
    </>
  );
};

export default Evento;

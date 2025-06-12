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
    const[filtrodata,setFiltroData] = useState(["todos"])

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

   async function excluirEvento(id) {
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

   function filtrarEventos() {
    
    const hoje = new Date();
    
    return listaEvento.filter(evento => {  
      const dataEvento = new Date (evento.dataEvento);
      
      
      if(filtrodata.includes("todos")) return true;
      if(filtrodata.includes("futuros") && dataEvento > hoje) return true;
      if(filtrodata.includes("passados") && dataEvento < hoje) return true;
      
      return false;
      
    });
    
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
           funcExcluir={excluirEvento}
        />
      </main>
      <Footer />
    </>
  );
};

export default Evento;

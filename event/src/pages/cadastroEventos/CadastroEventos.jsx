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
  const [dataEvento, setDataEvento] = useState("");
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
              console.log(dataEvento);
              console.log(descricao);
              console.log(instituicao);
                await api.post("eventos", {
                    nomeEvento: evento,
                    idTipoEvento: tipoevento,
                    dataEvento: dataEvento,
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

    async function deletarEvento(id) {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Essa ação não poderá ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#B51d44",
            cancelButtonColor: "#000000",
            confirmButtonText: 'Sim, apagar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.delete(`Eventos/${id.idEvento}`);
                alertar("success", "Tipo de evento excluído!");
            }
        }).catch(error => {
            console.log(error);
            alertar("error", "Erro ao excluir")
        })
    }


    async function editarEvento(evento) {
        try {
            const tiposOptions = listaTipoEvento
                .map(tipo => `<option value="${tipo.idTipoEvento}" ${tipo.idTipoEvento === evento.idTipoEvento ? 'selected' : ''}>${tipo.tituloTipoEvento}</option>`)
                .join('');

            const { value } = await Swal.fire({
                title: "Editar Tipo de Evento",
                html: `
        <input id="campo1" class="swal2-input" placeholder="Título" value="${evento.nomeEvento || ''}">
        <input id="campo2" class="swal2-input" type="date" value="${evento.dataEvento?.substring(0, 10) || ''}">
        <select id="campo3" class="swal2-select">${tiposOptions}</select>
        <input id="campo4" class="swal2-input" placeholder="Categoria" value="${evento.descricao || ''}">
      `,
                showCancelButton: true,
                confirmButtonText: "Salvar",
                cancelButtonText: "Cancelar",
                focusConfirm: false,
                preConfirm: () => {
                    const campo1 = document.getElementById("campo1").value;
                    const campo2 = document.getElementById("campo2").value;
                    const campo3 = document.getElementById("campo3").value;
                    const campo4 = document.getElementById("campo4").value;

                    if (!campo1 || !campo2 || !campo3 || !campo4) {
                        Swal.showValidationMessage("Preencha todos os campos.");
                        return false;
                    }

                    return { campo1, campo2, campo3, campo4 };
                }
            });

            if (!value) {
                console.log("Edição cancelada pelo usuário.");
                return;
            }

            console.log("Dados para atualizar:", value);

            await api.put(`eventos/${evento.idEvento}`, {
                nomeEvento: value.campo1,
                dataEvento: value.campo2,
                idTipoEvento: value.campo3,
                descricao: value.campo4,
            });

            console.log("Evento atualizado com sucesso!");
            Swal.fire("Atualizado!", "Dados salvos com sucesso.", "success");
            listarEvento();

        } catch (error) {
            console.log("Erro ao atualizar evento:", error);
            Swal.fire("Erro!", "Não foi possível atualizar.", "error");
        }
    }



     async function descricaoEvento(item) {
        Swal.fire({
            title: "Descrição do evento",
            text: item.descricao || "Nenhuma descricao disponivel",
            icon: 'info',
            confirmButtonText: 'Fechar'
        })
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
      <Header headerzinho="Administrador"
      nomeDoBotao = 'none'
      />
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
          headerzinho = "none"
        />

        <Lista
          titulo_lista="Eventos"
                titulo="Nome"
                tipoLista="Eventos"
                lista={listaEvento}
                dataEvento={dataEvento}
                funcExcluir={deletarEvento}
                funcEditar={editarEvento}
                funcDescricao={descricaoEvento}
        />
      </main>
      <Footer />
    </>
  );
};

export default Evento;






// o Event+, uma plataforma que criamos para resolver problemas na organização e divulgação de eventos internos da nossa instituição.

//A ideia surgiu porque as informações estavam muito espalhadas, e não havia controle real de participação.

//Com o Event+, tudo ficou centralizado em um só lugar. A interface é intuitiva, dá pra filtrar, editar eventos e confirmar presença com facilidade.

//No desenvolvimento, usamos tecnologias modernas como JavaScript, React, JSX e CSS. O React, por exemplo, foi essencial para criar uma experiência dinâmica e responsiva, já que ele permite atualizar a interface sem recarregar a página.

//Com isso, conseguimos tornar a gestão de eventos mais eficiente, organizada e profissional."
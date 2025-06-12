import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./ListagemDeEventos.css";
import Comentario from "../../assets/img/mensagem.png";
import Lapis from "../../assets/img/Lapis.png";
import Excluir from "../../assets/img/Lixeira.png";
import { useEffect, useState } from "react";
import Toggle from "../../components/toggle/Toggle";
import api from "../../Services/services";
import { format } from "date-fns";
import Modal from "../../components/modal/Modal";
import descricao from "../../assets/img/descricao.png";
import Swal from "sweetalert2";
import { useFormAction } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ListagemDeEventos = (props) => {
  const [tipoModal, setTipoModal] = useState("");
  const [dadosModal, setDadosModal] = useState({});
  const [modalAberto, setModalAberto] = useState(false);

  const[filtrodata,setFiltroData] = useState(["todos"])


const { usuario } = useAuth();
  // const [usuarioId, setUsuarioId] = useState(
  //   "438E489B-478F-4A11-9B5B-CCBF1C68BE30"
  // ); //comente depois isa linda

  const [listaEvento, setListaEvento] = useState([]);
  async function listarEventos() {
    try {
      const eventoListado = await api.get("Eventos");
      const todosOsEventos = eventoListado.data;

      const respostaPresenca = await api.get(
        "PresencasEventos/ListarMinhas/" + usuario.idUsuario
      );
      const minhasPresencas = respostaPresenca.data;

      const eventosComPresencas = todosOsEventos.map((atualEvento) => {
        const presenca = minhasPresencas.find(
          (p) => p.idEvento === atualEvento.idEvento
        );

        return {
          ...atualEvento, //mantem os dados originais do evento atual.
          possuiPresenca: presenca?.situacao === true,
          idPresenca: presenca?.idPresencaEvento || null,
        };
      });

      setListaEvento(eventosComPresencas);
    } catch (error) {
      console.log(error);
    }
  }
  
  function abrirModal(tipo, dados) {
    //tipo de modal
    //dados do modal
    setModalAberto(true);
    setTipoModal(tipo);
    setDadosModal(dados);
  }
  
  function fecharModal(tipo, dados) {
    //tipo de modal
    //dados do modal
    setModalAberto(false);
    setTipoModal(tipo);
    setDadosModal(dados);
  }
  
  async function manipularPresenca(idEvento, presenca, idPresenca) {
    console.log("ssssssssss");
    
    try {
      if (presenca && idPresenca != "") {
        //atualizacao: da situacao para FALSE
        await api.put(`PresencasEventos/${idPresenca}`, { situacao: false });
        Swal.fire("Removido!", "Sua presenca foi removida", "success");
      } else if (idPresenca != "") {
        //atualizacao: da situacao para TRUE
        await api.put(`PresencasEventos/${idPresenca}`, { situacao: true });
        Swal.fire("Confimada!", "Sua presenca foi confirmada", "success");
      } else {
        //cadastrar uma nova presenca
        await api.post(`PresencasEventos/${idPresenca}`, {
          situacao: true,
          idUsuario: usuario.idUsuario,
          idEvento: idEvento,
        });
        Swal.fire("Confimada!", "Sua presenca foi confirmada", "success");
      }
    } catch (error) {}
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
    listarEventos();
  }, []);
  
  return (
    <>
      <Header nomeusu="Aluno" />
      <section className="listagem_evento">
        <h1>Eventos</h1>
        <hr />
        <div className="tabela_evento">
          <select name="Todos os Eventos" id="" className="select_evento" onChange={(e) => setFiltroData([e.target.value])}>
            <option value="" disabled selected>
              Todos os Eventos
            </option>
            <option value="todos" selected>Todos os eventos</option>
            <option value="futuros">Somente futuros</option>
            <option value="passados">Somente passados</option>
          </select>
          <table>
            <thead>
              <tr className="table_evento">
                <th>Titulo</th>
                <th>Data Evento</th>
                <th>Tipo Evento</th>
                <th>Descrição</th>
                <th>Comentarios</th>
                <th>Participar</th>
              </tr>
            </thead>
            <tbody>
              {listaEvento.length > 0 ? (
                filtrarEventos() && filtrarEventos().map((item) => (
                  <tr className="campo_evento">
                    <td data-cell="Nome">{item.nomeEvento}</td>
                    <td>{format(item.dataEvento, "dd/MM/yy")}</td>
                    <td data-cell="Evento">
                      {item.tiposEvento.tituloTipoEvento}
                    </td>
                    <td className="descricao">
                      <button
                        className="icon"
                        onClick={() =>
                          abrirModal("descricaoEvento", {
                            descricao: item.descricao,
                          })
                        }
                      >
                        <img src={descricao} alt="" />
                      </button>
                    </td>

                    <td>
                      <button
                        className="icon"
                        onClick={() =>
                          abrirModal("Comentarios", { idEvento: item.idEvento })
                        }
                      >
                        <img src={Comentario} alt="Imagem de comentar" />
                      </button>
                    </td>
                    <td data-cell="Botao">
                      <Toggle
                        presenca={item.possuiPresenca}
                        manipular={() =>
                          manipularPresenca(
                            item.idEvento,
                            item.possuiPresenca,
                            item.idPresenca
                          )
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <p>nenhum evento encontrado</p>
              )}
            </tbody>
          </table>
        </div>
      </section>
      {/* <Footer /> */}

      {modalAberto && (
        <Modal
          titulo={
            tipoModal == "descricaoEvento"
              ? "Descrição do Evento"
              : "Comentário"
          }
          tipoModel={tipoModal}
          idEvento={dadosModal.idEvento}
          descricao={dadosModal.descricao}
          fecharModal={fecharModal}
        />
      )}
    </>
  );
};

export default ListagemDeEventos;

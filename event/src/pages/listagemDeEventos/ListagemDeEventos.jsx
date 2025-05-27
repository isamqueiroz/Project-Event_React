import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./ListagemDeEventos.css";
import Mensagem from "../../assets/img/mensagem.png";
import Lapis from "../../assets/img/Lapis.png";
import Excluir from "../../assets/img/Lixeira.png";
import Toggle from '../../components/toggle/Toggle';


const ListagemDeEventos = () => {
  return (
    <>
      <Header 
        user="Aluno"
        botao_logar="none"
      />

      <main>
        <section className="layout_grid eventos_section">
          <div className="titulo">
            <h1>Eventos</h1>
            <hr />
          </div>

          <div className="filtro_eventos">
            <select name="eventos" id="">
              <option value="" disabled selected>Todos os Eventos</option>
              <option value="">Evento 1</option>
              <option value="">Evento 2</option>
              <option value="">Evento 3</option>
            </select>
          </div>

          <div className="tabela_eventos">
            <table>
              <tr className="cabecalho_tabela">
                <th>Título</th>
                <th>Tipo</th>
                <th>Comentários</th>
                <th>Presença</th>
              </tr>

              <tr className="linha_evento">
                <td data-cell="Título">Campeonato nacional de digitação</td>
                <td data-cell="Tipo">Competição</td>
                <td data-cell="Comentário"><img src={Mensagem} alt="Comentário" /></td>
                <td data-cell="Presença"><Toggle /></td>
              </tr>

              <tr className="linha_evento">
                <td data-cell="Título">Workshop de produtividade</td>
                <td data-cell="Tipo">Treinamento</td>
                <td data-cell="Comentário"><img src={Mensagem} alt="Comentário" /></td>
                <td data-cell="Presença"><Toggle /></td>
              </tr>
            </table>
          </div>
        </section>
      </main>

      <Footer visibilidade="none" />
    </>
  );
};

export default ListagemDeEventos;

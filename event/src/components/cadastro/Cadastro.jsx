import "./Cadastro.css";
import Botao from "../botao/Botao";
const Cadastro = (props) => {
  return (
    <section className="layout_grid section_cadastro">
      <div className="cadastro_titulo">
        <h1>{props.tituloCadastro}</h1>
        <hr />
      </div>

      <form onSubmit={props.funcCadastro} className="form_cadastro">
        <div className="img_cadastro">
          <img className="img_Cadastro" src={props.img_banner} alt="Imagem do Cadastro" />
        </div>

        <div className="campos_cadastro">
          {/* Nome do evento */}
          <div className="campo_cad_nome">
            <input
              type="text"
              placeholder={props.campoPlaceholder}
              name="nome"
              value={props.valorInput}
              onChange={(e) => props.setValorInput(e.target.value)}
            />
          </div>

          {/* Data do evento */}
          <div className="campo_cad_nome">
            <input
              style={{ display: props.visibilidade_data }}
              type="date"
              value={props.valorInputData}
              onChange={(e) => props.setValorInputData(e.target.value)}
            />
          </div>

          {/* Tipo do evento */}
          <div className="campo_cad_genero" style={{ display: props.visibilidade_tp_evento }}>
            <select
              name="tipo_evento"
              value={props.valorSelectTpEvento}
              onChange={(e) => props.setValorSelectTpEvento(e.target.value)}
            >
              <option disabled selected>Tipo Evento</option>
              {props.lista &&
                props.lista.map((itemTpEvento, index) => (
                  <option key={index} value={itemTpEvento.tituloTipoEvento}>
                    {itemTpEvento.tituloTipoEvento}
                  </option>
                ))}
            </select>
          </div>

          {/* Instituição */}
          <div className="campo_cad_genero" style={{ display: props.visibilidade_instituicao }}>
            <select
              name="instituicao"
              value={props.valorSelectInstituicao}
              onChange={(e) => props.setValorSelectInstituicao(e.target.value)}
            >
              <option disabled selected>Instituições</option>
              {props.listaInstituicoes &&
                props.listaInstituicoes.map((instituicao, index) => (
                  <option key={index} value={instituicao.nome}>
                    {instituicao.nome}
                  </option>
                ))}
            </select>
          </div>

          {/* Descrição */}
          <div className="campo_cad_nome">
            <input
              type="text"
              placeholder={props.campo_descricao}
              value={props.valorInputDescricao}
              style={{ display: props.visibilidade_descricao }}
              onChange={(e) => props.setValorInputDescricao(e.target.value)}
            />
          </div>

          {/* Botão */}
          <Botao nomeDoBotao={props.nomeDoBotao || props.botao} />
        </div>
      </form>
    </section>
  );
};
export default Cadastro;

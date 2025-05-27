import "./Lista.css";
import Editar from "../../assets/img/Lapis.png";
import Excluir from "../../assets/img/Lixeira.png";

const Lista = (props) => {
  return (
    <section className="listagem">
      <h1>{props.tituloLista}</h1>
      <hr />

      <div className="tabela">
        <thead>
          <tr className="table_cabecalho">
            <th>Titulo</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {props.lista && props.lista.length > 0 ? (
            props.lista.map((item) => (
              <tr
                className="item_lista"
                key={
                  props.tipoLista == "tipoEvento"
                    ? item.idTipoEvento
                    : item.idTipoUsuario
                }>
                <td data-cell="Nome">
                  {props.tipoLista == "tipoEvento"
                    ? item.tituloTipoEvento
                    : item.tituloTipoUsuario}
                </td>
                <td data-cell="Editar">
                  <button
                    className="botao"
                    onClick={() => props.funcEditar(item)}
                  >
                    <img src={Excluir} alt="Caneta" />
                  </button>
                </td>
                <td data-cell="Excluir">
                  <button
                    className="icone"
                    onClick={() => props.funcExcluir(item)}
                  >
                    <img src={Editar} alt="Lixeira" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <p>nenhum tipo de evento encontrado</p>
          )}
        </tbody>
      </div>
    </section>
  );
};

export default Lista;

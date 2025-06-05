import { useEffect, useState } from "react";
import imgDeletar from "../../assets/img/Lixo.png";
import api from "../../Services/services";

import "./Modal.css";

const Modal = (props) => {
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("")

  async function listarComentario() {
    try {
      const resposta = await api.get(
        `ComentariosEventos/ListarSomenteExibe?id=${props.idEvento}`);

        setComentarios(resposta.data);
    } catch (error) {

    }
  }

  useEffect(() => {
    listarComentario();
  },[])


   async function cadastrarComentario(comentario) {
      try {
        await api.post("ComentariosEventos", {idUsuario: usuarioId, idEvento: props.idEvento, Descricao: comentario})
      } catch (error) {
        console.log(error);
        
      }
    }

    async function deletarComentario() {
      try {
        await api.delete(`ComentariosEventos/${idComentario}`);
      } catch (error) {
        console.log(error);
        
      }
    

}




  return (
    <>
      <div className="model-overlay" onClick={props.fecharModal}></div>
      <div className="model">
        <h1>{props.titulo}</h1>
        <div className="model_conteudo">
          {props.tipoModel === "descricaoEvento" ? (
            <p>{props.descricao}</p>
          ) : (
            <>
              {comentarios.map((item) => 
                <div key={item.idComentarioEvento}>
                  <strong>{item.usuario.nomeUsuario}</strong>
                  <img src={imgDeletar} alt="excluir"  onClick={() => deletarComentario(item.idComentarioEvento)}/>
                  <p>{item.descricao}</p>
                  <hr />
                </div>
              )}
              <div>
                <input type="text" placeholder="Escreva seu comentario..." 
                value={novoComentario}
                onChange={(e) => setNovoComentario(e.target.value)}/>
                <button onClick={() => cadastrarComentario(novoComentario)}>Cadastrar</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;

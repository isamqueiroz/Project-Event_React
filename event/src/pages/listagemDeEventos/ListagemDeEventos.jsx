import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./ListagemDeEventos.css"
import Mensagem from "../../assets/img/mensagem.png"




const ListagemEventos = () => {
    return (
        <>
            <Header headerzinho="Aluno" />
            <section className="listagem_evento">
                <h1>Eventos</h1>
                <hr />
                <div className="tabela_evento">
                    <select name="Todos os Eventos" id="" className="select_evento">
                        <option value="" disabled selected>Todos os Eventos</option>
                        <option value="">opção 1</option>
                        <option value="">opção 2</option>
                        <option value=""> opção 3</option>
                    </select>
                    <thead>
                        <tr className="table_evento">
                            <th>Titulo</th>
                            <th>Tipo de Evento</th>
                            <th>mensagens</th>
                            <th>Participar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="item_evento">
                            <td data-cell="Nome" >Nome Evento</td>
                            <td data-cell="Evento">Tipo Evento</td>
                            <td data-cell="Comentar"><img src={Mensagem} alt="Imagem do comentario" /></td>
                            <td data-cell="Botao"><Toggle /></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr className="item_evento">
                            <td data-cell="Nome" >nome do evento</td>
                            <td data-cell="Evento">Tipo do Evento</td>
                            <td data-cell="mensagem"><img src={Mensagem} alt="Imagem de um comentario" /></td>
                            <td data-cell="Botao"><Toggle /></td>
                        </tr>
                    </tbody>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default ListagemEventos;
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./ListagemDeEventos.css"
import Mensagem from "../../assets/img/mensagem.png"
import Lapis from "../../assets/img/Lapis.png"
import Excluir from "../../assets/img/Lixeira.png"




const ListagemEventos = () => {
    return (
          <>
        
        <Header/>
        <section className="layout_grid listagem_evento">
                <h1>Eventos</h1>
                <hr />
                <div className="tabela_evento">
                    <select name="Todos os Eventos" id="" className="select_evento">
                        <option value="" disabled selected>Todos os Eventos</option>
                        <option value="">op 1</option>
                        <option value="">op 2</option>
                        <option value=""> op 3</option>
                    </select>
                    <thead>
                        <tr className="table_evento">
                            <th>Titulo</th>
                            <th>Tipo Evento</th>
                            <th>Comentários</th>
                            <th>Participar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="item_evento">
                            <td data-cell="Nome" >Nome Evento</td>
                            <td data-cell="Evento">Tipo Evento</td>
                            <td data-cell="Editar"><img src={Lapis} alt="Imagem de uma caneta" /></td>
                            <td data-cell="Excluir"><Excluir/></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr className="item_evento">
                            <td data-cell="Nome" >Nome Evento</td>
                            <td data-cell="Evento">Tipo Evento</td>
                            <td data-cell="Editar"><img src={Lapis} alt="Imagem de uma caneta" /></td>
                            <td data-cell="Excluir"><Excluir/></td>
                        </tr>
                    </tbody>
                </div>
            </section>
        <Footer/>

        </>
    )
}

export default ListagemEventos;
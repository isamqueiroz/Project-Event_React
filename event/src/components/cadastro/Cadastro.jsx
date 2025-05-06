import "./Cadastro.css";
import Botao from "../botao/Botao"
import img1 from "../../assets/img/TipoEvento.svg"
const Cadastro = (props) => {


    return (
        <section className="section_cadastro">
              <div className="Titulo_cadastro">

               <h1>
                    {props.tituloCadastro}
                </h1>
                <hr />

              </div>

            <form action="" className="layout_grid form_cadastro">
                
                <img className="img_Cadastro" src={img1} alt="" />
                <div className="campos_cadastro">
                    <div className="campo_cad_nome">
              
                        <input type="text" placeholder= "Titulo" />

                    </div>

                    <Botao nomeDoBotao={props.nomeDoBotao} />
                </div>
            </form>
        </section>

    )
}
export default Cadastro;
import Logo from "../../assets/img/logo1.svg";
import Botao from "../../components/botao/Botao";
import Primeira from "../../assets/img/primeiraimg.svg";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../Services/services";
import "./Login.css";
import { Await } from "react-router-dom";
import { userDecodeToken } from "../../auth/Auth";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";

const Login = () => {
      const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    
    const navigate = useNavigate();

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
                }
            });
            Toast.fire({
                icon: icone,
                title: mensagem
            });
        }

    async function realizarAutenticacao(e) {
        e.preventDefault();

        const usuario = {
            email: email,
            senha: senha
        }
        if(senha.trim() != "" || email.trim() != ""){

            try {
                const resposta = await api.post("Login", usuario);

                const token = resposta.data.token;
                
                if(token){
                    //token sera decodificado:
                    const tokenDecodificado = userDecodeToken(token);
                    
                    // Armazenando:
                    secureLocalStorage.setItem("nome", JSON.stringify(tokenDecodificado));

                    if(tokenDecodificado.tipoUsuario === "aluno"){
                        //redirecionar a tela de aluno (branca)
                        navigate("/ListagemEvento")
                    }else{
                        //ele vai me encaminhar pra tela cadastro (vermelha)
                        navigate("/Eventos")
                    }
                }
            } catch (error) {
                console.log(error);
                alertar("error", "Email ou Senha invalidos. !!")
            }
        }else{
            alertar("error", "preencha os campos vazios!")
        }
    }
  return (
    <main className="main-login">
      <div className="login-direito">
        <div className="login-esquerdo">
          <div className="foto">
            <img src={Primeira} alt="Event+" />
          </div>
        </div>
      </div>
      <div className="login-right">
        <img src={Logo} alt="Logo do Event" className="logo-event" />
        <form className="form_login" onSubmit={realizarAutenticacao}>
          <div className="campos_login">
            <input
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="username"
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              name="Senha"
            />
          </div>
          <a href="/" className="Senha-esquecida">
            Esqueceu a senha?
          </a>
          <Botao nomeDoBotao="Login" />
        </form>
      </div>
    </main>
  );
};

export default Login;

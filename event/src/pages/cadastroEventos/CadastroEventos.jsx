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
  const [listaEvento, setListaEvento] = useState([]);

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

  async function cadastrarEvento(e) {
    e.preventDefault();
    if (evento.trim() !== "") {
      try {
        await api.post("Eventos", { nomeEvento: evento });
        alertar("success", "Sucesso! Cadastro realizado com sucesso!");
        setEvento("");
        listarEvento(); // Atualiza lista após cadastro
      } catch (error) {
        console.error(error);
        alertar("error", "Erro ao cadastrar evento.");
      }
    } else {
      alertar("error", "Erro! Preencha os campos");
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

  useEffect(() => {
    listarEvento();
  }, []);

  return (
    <>
      <Header headerzinho="Administrador" />
      <main>
        <Cadastro
          tituloCadastro="Cadastro de evento"
          nomeplaceholder1="Nome do evento"
          nomeplaceholder2="Tipo de evento"
          visibilidade="none"
          nomeDoBotao="Cadastrar"
          img_banner={CadastroEvento}
          onSubmit={cadastrarEvento}
          valorInput={evento}
          setValorInput={setEvento}
        />

        <Lista
          tituloLista="Lista de Eventos"
          tipos="Evento"
          tipoLista="Evento"
          lista={listaEvento}
        />
      </main>
      <Footer />
    </>
  );
};

export default Evento;

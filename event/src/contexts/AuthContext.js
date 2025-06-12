//importa funções do React necessárias para criar e usar o contexto
import { createContext, useState, useContext, Children } from "react";

// Cria o contexto de autenticação, que vai permitir compartilhar dados entre componentes
const AuthContext = createContext();

//Esse componente vai envolver a aplicação (ou parte dela)  e fornecer os dados de autenticação para os filhos
//Provider = prover/dar
export const AuthProvider = ({children}) => {
    const [usuario, setUsuario] = useState (null)

return(
    //o AuthContext.Provider permite que qualquer componente dentro dele acesse o 'usuario' e 'setUsuario'
    //faz com que qualquer componente que esteja dentro de <AuthProvider> consiga acessar o valor {usuario, setUsuario} usando o hook useAuth().
    <AuthContext.Provider value = {{usuario, setUsuario}}>
        {children}
    </AuthContext.Provider>


  );
};

//esse hook personalizado facilita o acesso ao contexto dentro de qualquer componente
//USAR!!!
export const useAuth = () => useContext(AuthContext);




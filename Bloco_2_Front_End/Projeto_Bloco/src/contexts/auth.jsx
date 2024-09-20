import { auth } from "../../firebase";
import { createContext, useState, useEffect } from "react";
import {
  cadastrarDadosComID,
  cadastrarDados,
} from "../servicos/firebase/cadastrarDados";
import { getDados } from "../servicos/firebase/lerDados";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, senha, nome) => {
    try {
      // Criar o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth,email,senha);
      const user = userCredential.user;

      // Criar o documento na coleção "usuarios" usando o mesmo ID do usuário
      const dados = {
        email: user.email,
        criadoEm: new Date(),
        admin: false,
        nome: nome,
      };

      // Salvar no Firestore usando o UID do usuário como ID do documento
      await cadastrarDadosComID(dados, "usuarios", user.uid);
      console.log(`Usuário cadastrado na base de usuarios - ${user.uid}`);

      return null;
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error.message);

      //Salvar erros na collection "eventError"
      const dadosErro = {
        passo: "Criação de usuário.",
        data: new Date(),
        dadosUsuario: {
          nome: nome,
          email: email,
        },
        erro: error.message,
      };
      cadastrarDados(dadosErro, "eventError");

      return "Erro ao criar conta. Tente novamente.";
    }
  };

  const signin = async (email, senha) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const userDoc = await getDados(userCredential.user.uid, "usuarios");

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          nome: userData.nome,
          admin: userData.admin,
        });
  
        // Armazena as informações necessárias no localStorage
        localStorage.setItem(
          "user_token",
          JSON.stringify({
            email: userCredential.user.email,
            nome: userData.nome,
            admin: userData.admin,
            id: userCredential.user.uid,
          })
        );
        return null;
      } else {
        console.error("Usuário não encontrado na coleção 'usuarios'");
        return "Registro de usuário não encontrado na base.";
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error.message);
      return "Erro ao realizar login. Verifique suas credenciais e tente novamente.";
    }
  };

  const signout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user_token");
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signup, signin, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

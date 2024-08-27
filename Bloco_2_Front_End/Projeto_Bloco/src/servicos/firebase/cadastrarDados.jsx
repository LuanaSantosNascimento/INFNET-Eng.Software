import { db } from "../../../firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

export const cadastrarDados = async (dados, document) => {
  const mensagemErro = "Erro ao tentar cadastrar dados da base -";

  try {
    const docRef = await addDoc(collection(db, document), dados);
    return docRef.id;
  } catch (error) {
    console.error(`${mensagemErro} ${document}: ${error}`);
    throw new Error(`${mensagemErro} ${document}: ${error}`);
  }
};

export const cadastrarDadosComID = async (dados, collection, uid) => {

  await setDoc(doc(db, collection, uid), dados);
};
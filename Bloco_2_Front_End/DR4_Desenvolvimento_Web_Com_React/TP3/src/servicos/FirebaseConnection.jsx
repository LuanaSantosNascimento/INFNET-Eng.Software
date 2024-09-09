import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

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

export const lerDados = async (document) => {
  const mensagemErro = "Erro ao tentar consultar dados da base -";

  try {
    const querySnapshot = await getDocs(collection(db, document));
    const dados = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return dados;
  } catch (error) {
    console.error(`${mensagemErro} ${document}: ${error}`);
    throw new Error(`${mensagemErro} ${document}: ${error}`);
  }
};

export const getDadoPorID = async (uid, collection) => {
  const docRef = doc(db, collection, uid);
  return await getDoc(docRef);
};

export const excluirRegistroPorID = async (uid, collection) => {
  const docRef = doc(db, collection, uid);
  await deleteDoc(docRef);
};

export const alterarRegistroPorID = async (uid, collection, dadoAlterado) => {
  const docRef = doc(db, collection, uid);
  await updateDoc(docRef, dadoAlterado);
};

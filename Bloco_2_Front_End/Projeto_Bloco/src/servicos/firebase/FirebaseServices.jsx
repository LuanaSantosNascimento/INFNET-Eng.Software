import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
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
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) return docSnapshot.data();

  return null;
};

export const excluirRegistroPorID = async (uid, collection) => {
  const docRef = doc(db, collection, uid);
  await deleteDoc(docRef);
};

export const alterarRegistroPorID = async (uid, collection, dadoAlterado) => {
  const docRef = doc(db, collection, uid);
  await updateDoc(docRef, dadoAlterado);
};

export const getCotacoesPorIDRequisicao = async (idRequisicao) => {
  try {
    const docRef = collection(db, "cotacoes");
    const q = query(docRef, where("requisicao.id", "==", idRequisicao));

    const querySnapshot = await getDocs(q);

    const dados = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return dados;
  } catch (error) {
    console.error("Erro ao buscar cotações: ", error);
  }
};


export const deleteCotacoesPorIDRequisicao = async (idRequisicao) => {
  try {
    const docRef = collection(db, "cotacoes");
    const q = query(docRef, where("requisicao.id", "==", idRequisicao));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });

  } catch (error) {
    console.error("Erro ao deletar cotações: ", error);
  }
};

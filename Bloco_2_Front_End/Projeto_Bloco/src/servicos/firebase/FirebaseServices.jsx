import { db, auth } from "../../../firebase";
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
  orderBy,
  setDoc,
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

export const lerDados = async (document, propriedadeOdenacao) => {
  const mensagemErro = "Erro ao tentar consultar dados da base -";
  let dados;
  let querySnapshot;

  try {
    if (propriedadeOdenacao !== undefined && propriedadeOdenacao !== null) {
      const q = query(
        collection(db, document),
        orderBy(propriedadeOdenacao, "asc")
      );
      querySnapshot = await getDocs(q);
    } else {
      querySnapshot = await getDocs(collection(db, document));
    }

    dados = querySnapshot.docs.map((doc) => ({
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
  console.log(dadoAlterado)
  await updateDoc(docRef, dadoAlterado);
};

export const alterarRegistroPorIDComMerge = async (
  uid,
  collection,
  dadoAlterado
) => {
  const docRef = doc(db, collection, uid);
  await setDoc(docRef, dadoAlterado, { merge: true });
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
    console.error("Erro ao buscar cotações por idRequisicao: ", error);
  }
};

export const getDadosPorIdCustomizaddo = async (
  id,
  collectionName,
  propriedade,
  propriedadeOrdenacao
) => {
  try {
    const docRef = collection(db, collectionName);
    const q = query(
      docRef,
      where(propriedade, "==", id),
      orderBy(propriedadeOrdenacao, "asc")
    );

    const querySnapshot = await getDocs(q);

    const dados = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(dados);
    console.log("--------------------------------");
    return dados;
  } catch (error) {
    console.error(
      `Erro ao buscar ${collectionName} por ${propriedade}: ${error}`
    );
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

export const getDadosLogin = () => {
  const user = auth.currentUser;

  if (user) {
    returnuser.metadata;
  } else {
    console.log("Nenhum usuário logado.");
    return null;
  }
};

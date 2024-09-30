import { db } from "../../../firebase";
import { collection, getDocs, doc, getDoc} from "firebase/firestore";

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

export const getDados = async (uid, collection) => {
  const docRef = doc(db, collection, uid);
  return await getDoc(docRef);
};

//admin@Luna      -> lunaLovegood@admin.com
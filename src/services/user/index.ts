import { collection, query, where, getDocs } from "firebase/firestore";;
import db from "../firebase";


const getUsuario = async (dni: string, empresaId: string)=>{
    console.log('getUsuario ', dni, empresaId)
    const q = query(collection(db, "pacientes"), where("numDoc", "==", dni), where("empresaId", "==", empresaId));

    const querySnapshot = await getDocs(q);
    let usuario : any
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
        usuario = doc.data()
    console.log(doc.id, " => ", doc.data());
    });
    return usuario 
}

export default getUsuario ;
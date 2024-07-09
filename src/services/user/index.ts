import { collection, query, where, getDocs, setDoc, addDoc, doc } from "firebase/firestore";;
import db from "../firebase";


class Usuario {


getUsuario = async (dni: string, empresaId: string)=>{
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


 getUsuarioByPhone = async (telefono: string, empresaId: string)=>{
    const q = query(collection(db, "pacientes"), where("telefono", "==", telefono), where("empresaId", "==", empresaId));

    const querySnapshot = await getDocs(q);
    console.log('getUsuarioByPhone ', telefono, empresaId)
    let usuario : any
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
        usuario = doc.data()
    console.log(doc.id, " => ", doc.data());
    });
    return usuario 
}

addUsuario = async (usuario: any)=> {

    const docRef = doc(collection(db, "pacientes"));
    usuario.id = docRef.id
    console.log('addUsuario ', usuario)
    await setDoc(docRef, usuario)
}
}


export default Usuario ;
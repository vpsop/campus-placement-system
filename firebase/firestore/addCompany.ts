import firebaseApp from "@/firebase/config";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const db = getFirestore(firebaseApp);


export default async function addCompany(name: string, description: string) {
    let result = null;
    let error = null;

    try {
        const ref = collection(db, "comapnies");
        result = await addDoc(ref, {
            name,
            description
        });
    } catch (err) {
        error = err;
    }

    return { result, error };
}
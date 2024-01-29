import firebaseApp from "@/firebase/config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, addDoc, collection} from "firebase/firestore";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp)


export default async function signUp(email:string, password:string, name: string, course: string) {
    let result = null;
    let error = null;

    try {
        result = await createUserWithEmailAndPassword(auth, email, password).then((cred) => {
            let ref = collection(db, "users");
            addDoc(ref, {
                userId: cred.user.uid,
                email,
                name,
                course
            });
        });
    } catch (err) {
        error = err;
    }

    return { result, error };
}
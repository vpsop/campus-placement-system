import firebaseApp from "@/firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebaseApp);

export default async function signIn(email:string, password:string) {
    let result = null;
    let error = null;

    try {
        result = await signInWithEmailAndPassword(auth, email, password).then((cred) => {
            console.log("Sign In Successful");
        });
    } catch (err) {
        error = err;
    }

    return { result, error };
}
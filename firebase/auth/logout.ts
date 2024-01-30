import firebaseApp from "@/firebase/config";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

const auth = getAuth(firebaseApp);

export default async function signOut() {
    let result = null;
    let error = null;

    try {
        result = await auth.signOut();
    } catch (err) {
        console.log(err);
        error = err;
    }

    return { result, error };
}
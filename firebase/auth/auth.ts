import { useState, useEffect } from 'react'
import firebaseApp from "@/firebase/config";
import { User, initializeAuth } from 'firebase/auth';

const auth = initializeAuth(firebaseApp);

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const authStateChanged = async (authState: User | null) => {
        if (!authState) {
            setAuthUser(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setAuthUser(authState);
        setLoading(false);
    };

    // listen for Firebase state change
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        loading
    };
}
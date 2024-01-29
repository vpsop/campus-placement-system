"use client"

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
// import firebaseApp from '@/firebase/config';

// const auth = getAuth(firebaseApp);


// interface AuthContextInterface {
//     user: User | null;
// }

// export const AuthContext = createContext({});

// export const useAuthContext = () => useContext(AuthContext);

// interface AuthContextProviderProps {
//     children: React.ReactNode;
// }

// export const AuthContextProvider = ({children} : AuthContextProviderProps) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 setUser(user);
//             } else {
//                 setUser(null);
//             }
//             setLoading(false);
//         });
//         return () => unsubscribe();
//     }, []);

//     return (
//         <AuthContext.Provider value={{user}}>
//             {loading ? <div>Loading...</div> : children}
//         </AuthContext.Provider>
//     );
// };


import { createContext, useContext } from 'react';
import useFirebaseAuth from '@/firebase/auth';
import { User } from 'firebase/auth';

interface IAuthUser {
    authUser: User | null;
    loading: boolean;
}

interface IAuthUserProvider {
    children: React.ReactNode;
}

const authUserContext = createContext<IAuthUser>({
  authUser: null,
  loading: true
});



export function AuthUserProvider({children} : IAuthUserProvider) {
  const auth = useFirebaseAuth();
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuthContext = () => useContext(authUserContext);
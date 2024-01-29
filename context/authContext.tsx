"use client"

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



export function AuthUserProvider({ children }: IAuthUserProvider) {
  const auth = useFirebaseAuth();
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuthContext = () => useContext(authUserContext);
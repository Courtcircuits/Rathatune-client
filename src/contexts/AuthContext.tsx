import { createContext, useState } from "react";

const default_auth: Auth = {
  name: "",
  token: "",
  logout: () => { },
  login: async (email, password) => {
    const {token} = await login(email, password)
    localStorage.setItem("token", token)
  },
  register: async (name, email, password) => {
    const {user_id} = await register(name, email, password);
    const {token} = await login(email, password);
    localStorage.setItem("token", token);
  },
  loading: false,
  setLoading: () => { },
  error: "",
  setError: () => { },
}

async function register(name: string, email: string, password: string): Promise<{
  user_id: string,
  email: string,
  password: string,
  federal_id: string
}> {
  const form_data = new URLSearchParams();
  form_data.append("username", name);
  form_data.append("email", email);
  form_data.append("password", password);
  const data = await fetch(import.meta.env.VITE_API_ENDPOINT+"/register", {
    method: "POST",
    body: form_data,
  });
  return (await data.json()).data;
}

async function login(email: string, password: string): Promise<{type: string, token: string}> {
  const form_data = new URLSearchParams();
  form_data.append("email", email);
  form_data.append("password", password);
  const data = await fetch(import.meta.env.VITE_API_ENDPOINT+"/login", {
    method: "POST",
    body: form_data,
  });
  return (await data.json()).data;
}



export interface Auth {
  name: string,
  token: string,
  logout: () => void,
  login: (email: string, password: string) => Promise<void>,
  register: (name: string, email: string, password: string) => Promise<void>,
  loading: boolean,
  setLoading: (loading: boolean) => void,
  error: string,
  setError: (error: string) => void,
}

export const AuthContext = createContext<{
  auth: Auth;
  setAuth: (authcb: (user:Auth)=> Auth) => void;
}>({ auth: default_auth, setAuth: () => { } });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth>(default_auth);

   return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

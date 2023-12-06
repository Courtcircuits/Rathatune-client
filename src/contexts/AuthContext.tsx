import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const default_auth: Auth = {
  name: "",
  token: "",
}

export async function registerRequest(name: string, email: string, password: string): Promise<{
  user_id: string,
  email: string,
  password: string,
  federal_id: string
}> {
  const form_data = new URLSearchParams();
  form_data.append("username", name);
  form_data.append("email", email);
  form_data.append("password", password);
  const data = await fetch(import.meta.env.VITE_API_ENDPOINT + "/register", {
    method: "POST",
    body: form_data,
  });
  return (await data.json()).data;
}

export async function loginRequest(email: string, password: string): Promise<{ type: string, token: string }> {
  const form_data = new URLSearchParams();
  form_data.append("email", email);
  form_data.append("password", password);
  const data = await fetch(import.meta.env.VITE_API_ENDPOINT + "/login", {
    method: "POST",
    body: form_data,
  });
  return (await data.json()).data;
}

export interface Auth {
  name: string,
  token: string,
}

export const AuthContext = createContext<{
  auth: Auth;
  setAuth: (auth: Auth) => void;
}>({ auth: default_auth, setAuth: () => { } });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth>(default_auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth)
    if (!auth.token) {
      navigate("/login")
      return
    }
    if (auth.token === "") {
      navigate("/login")
      return
    }else{
      navigate("/dashboard/1");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

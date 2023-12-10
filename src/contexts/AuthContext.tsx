import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const default_auth: User = {
  name: "",
  email: "",
  profile_picture: "",
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

export async function getInfosAboutMe(token: string): Promise<{
  id: string,
  name: string,
  profile_picture: string,
  email: string,
}> {
  const data = await fetch(import.meta.env.VITE_API_ENDPOINT + "/users/me", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token,
    }
  });
  return (await data.json()).data;
}

export interface User {
  name: string,
  token: string,
  email: string,
  profile_picture: string,
}

export const AuthContext = createContext<{
  user: User;
  setUser: (auth: User) => void;
}>({ user: default_auth, setUser: () => { } });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(default_auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user)
    if(!user.token && localStorage.getItem("token")){
      getInfosAboutMe(localStorage.getItem("token") || "").then((data) => {
        setUser({
          name: data.name,
          email: data.email,
          profile_picture: data.profile_picture,
          token: localStorage.getItem("token") || "",
        })
      }).catch((e) => {
        console.log(e);
      })
    }
    if (!user.token) {
      navigate("/login")
      return
    }
    if (user.token === "") {
      navigate("/login")
      return
    }else{
      localStorage.setItem("token", user.token);
      navigate("/dashboard/1");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

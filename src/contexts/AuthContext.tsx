import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToasterContext } from "./ToastContext";

export const default_auth: User = {
  id: "",
  name: "",
  email: "",
  profile_picture: "",
  rooms: []
}

export async function logoutRequest(): Promise<void> {
  const data = await fetch(import.meta.env.VITE_API_ENDPOINT + "/logout", {
    method: "POST",
    credentials: "include",
  });
  if (data.status != 200) {
    throw new Error("Error when logging out");
  }
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
    credentials: "include",
    body: form_data,
  });
  if (data.status != 200) {
    throw new Error("Error when registering");
  }
  return (await data.json()).data;
}

export async function loginRequest(email: string, password: string): Promise<{ token: string, room: string }> {
  const form_data = new URLSearchParams();
  form_data.append("email", email);
  form_data.append("password", password);
  try {
    const data = await fetch(import.meta.env.VITE_API_ENDPOINT + "/login", {
      method: "POST",
      credentials: "include",
      body: form_data,
    });
    if (data.status != 200) {
      throw new Error("Invalid credentials");
    }
    return (await data.json());
  } catch (e) {
    console.log(e);
    throw new Error("Invalid credentials");
  }

}

export async function getInfosAboutMe(): Promise<{
  id: string,
  name: string,
  profile_picture: string,
  email: string,
  rooms: {
    id: string,
    name: string,
  }[],
}> {
  const data = await fetch(import.meta.env.VITE_API_ENDPOINT + "/users/me", {
    method: "GET",
    credentials: "include",
  });
  if (data.status === 400 || data.status === 401) {
    throw new Error("User not found");
  }
  return (await data.json()).data;
}

export interface User {
  id: string,
  name: string,
  email: string,
  profile_picture: string,
  rooms: {
    id: string,
    name: string,
  }[],
}

export const AuthContext = createContext<{
  user: User;
  updateUser: () => void;
}>({ user: default_auth, updateUser: () => { } });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(default_auth);
  const navigate = useNavigate();
  const location = useLocation();
  const { trigger_alert } = useContext(ToasterContext);

  const updateUser = () => {
    getInfosAboutMe().then((data) => {
      console.log(data.id);
      setUser(() => {
        return {
          id: data.id,
          name: data.name,
          email: data.email,
          profile_picture: data.profile_picture,
          rooms: data.rooms,
        }
      }
      )
    }).catch(() => {
      if (location.pathname === "/login" || location.pathname === "/register") return;
      trigger_alert("You are not logged in");
      navigate("/login");
    })
  }

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user: user, updateUser: updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  setUser: (auth: User) => void;
}>({ user: default_auth, setUser: () => { } });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(default_auth);
  const navigate = useNavigate();

  useEffect(() => {
    getInfosAboutMe().then((data) => {
      if (data.id === user.id) return;
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
      navigate("/login");
    })
  }, [user]);

  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

import { useState } from "react";
import type { User } from "../types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  function login(email: string, _password: string) {
    setUser({ id: "user-1", email, nickname: email.split("@")[0] });
  }

  function logout() {
    setUser(null);
  }

  return { user, isAuthenticated: user !== null, login, logout };
}

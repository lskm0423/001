import { useState } from "react";
import type { User } from "../types";
import { apiPost } from "../lib/api";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    const loggedInUser = await apiPost<User>("/api/auth/login", { email, password });
    setUser(loggedInUser);
    return loggedInUser;
  }

  function logout() {
    setUser(null);
  }

  return { user, isAuthenticated: user !== null, login, logout };
}

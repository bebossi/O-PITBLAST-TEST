"use client";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<any>(null);

function AuthContextMiddleware(props: any) {
  const router = useRouter();
  const [loggedInToken, setLoggedInToken] = useState<string | null>(null);
  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      router.push("/");
    }
  }, [loggedInToken, router]);

  return (
    <AuthContext.Provider
      value={{ loggedInToken, setLoggedInToken, setUser, user }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextMiddleware };

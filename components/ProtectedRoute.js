import React, { useEffect } from "react";
import { useAuthContext } from "../shared/contexts/AuthContext";
import { useRouter } from "next/router";
function ProtectedRoute({ children }) {
  const { loggedUser } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!loggedUser) {
      router.push("/login");
    }
  }, [loggedUser, router]);

  return <>{loggedUser ? children : null}</>;
}

export default ProtectedRoute;

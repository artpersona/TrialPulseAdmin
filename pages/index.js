import React, { useState } from "react";
import Login from "./login";
import Layout from "../layouts/Layout";
import Home from "./home";
import { useAuthContext } from "../shared/contexts/AuthContext";
export default function App() {
  const { loggedUser } = useAuthContext();
  // if (!loggedUser) {
  //   return <Login />;
  // } else {
  //   return <Home />;
  // }
  return <Home />;
}

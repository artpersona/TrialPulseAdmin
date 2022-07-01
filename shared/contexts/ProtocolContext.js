import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../configs/firebase";
import { ref, set, onValue, push } from "firebase/database";
import { collectIdsAndDocs } from "../utils/misc.utility";

const ProtocolContext = createContext({});
export const useProtocolContext = () => useContext(ProtocolContext);

function ProtocolProvider({ children }) {
  // States
  const [protocols, setProtocols] = useState(null);
  // End States

  //   Functions
  const fetchAllProtocols = () => {
    const protocolsRef = ref(db, "protocols");
    onValue(protocolsRef, (snapshot) => {
      const data = collectIdsAndDocs(snapshot.val());
      setProtocols(data);
    });
  };
  //  End Functions

  // Effects
  useEffect(() => {
    fetchAllProtocols();
  }, []);

  const payload = { protocols };

  return (
    <ProtocolContext.Provider value={payload}>
      {children}
    </ProtocolContext.Provider>
  );
}

export default ProtocolProvider;

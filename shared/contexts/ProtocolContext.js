import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../configs/firebase";
import { ref, set, onValue, push, update, remove } from "firebase/database";
import { collectIdsAndDocs } from "../utils/misc.utility";
import { useAppContext } from "./AppContext";
const ProtocolContext = createContext({});
export const useProtocolContext = () => useContext(ProtocolContext);

function ProtocolProvider({ children }) {
  const { trialSettings, trialStatus } = useAppContext();

  // States
  const [protocols, setProtocols] = useState(null);
  // End States

  //   Functions
  const fetchAllProtocols = () => {
    const protocolsRef = ref(db, "protocols");
    onValue(protocolsRef, (snapshot) => {
      const data = [];
      if (snapshot.val()) {
        data = collectIdsAndDocs(snapshot.val());
      }
      setProtocols(data);
    });
  };

  const addProtocol = (data) => {
    return new Promise((resolve, reject) => {
      const protocolsRef = ref(db, "protocols");
      let key = push(protocolsRef, {}).key;
      let addRef = ref(db, `protocols/${key}`);

      let protocolData = {
        id: key,
        ...data,
        trial_settings: trialSettings,
        trial_status: "active",
      };
      set(addRef, protocolData)
        .then(() => {
          resolve(key);
        })
        .catch((err) => reject(err));
    });
  };

  const updateProtocol = (data) => {
    return new Promise((resolve, reject) => {
      let updateRef = ref(db, `protocols/${data.id}`);

      let protocolData = {
        ...data,
      };

      update(updateRef, protocolData)
        .then(() => {
          resolve(data.id);
        })
        .catch((err) => reject(err));
    });
  };

  const findProtocol = (protocolId) => {
    return protocols.filter((data) => data.id === protocolId)[0];
  };

  const deleteProtocols = async (id) => {
    let toDeleteProtocols = [...protocols];
    toDeleteProtocols = toDeleteProtocols.filter((data) => {
      return data.sponsor.id === id;
    });

    return await Promise.all(
      toDeleteProtocols.forEach(async (data) => {
        await deleteProtocolHelper(data.id);
      })
    );
  };

  const deleteProtocolHelper = async (id) => {
    const protocolRef = ref(db, `protocols/${id}`);
    return await remove(protocolRef);
  }; // End Functions

  //  End Functions

  // Effects
  useEffect(() => {
    fetchAllProtocols();
  }, []);

  const payload = {
    protocols,
    addProtocol,
    findProtocol,
    updateProtocol,
    deleteProtocols,
  };

  return (
    <ProtocolContext.Provider value={payload}>
      {children}
    </ProtocolContext.Provider>
  );
}

export default ProtocolProvider;

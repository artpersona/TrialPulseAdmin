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
        console.log("change detected");
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

  const updateProtocol = (data, path) => {
    return new Promise((resolve, reject) => {
      let updateRef;
      if (path) {
        updateRef = ref(db, `protocols/${data.id}/${path}`);
      } else {
        updateRef = ref(db, `protocols/${data.id}`);
      }

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
  };

  // Trial Sites Functions

  const fetchTrialSite = (protocolId, siteId) => {
    let data = protocols.find((item) => item.id === protocolId);
    if (data && data.trial_sites) {
      return data.trial_sites[siteId];
    }
    return null;
  };

  const addEligibilityCriteria = (protocolId, newData) => {
    return new Promise((resolve, reject) => {
      let updateRef = ref(db, `protocols/${protocolId}/eligibility_criterias`);
      let key = push(updateRef, {}).key;
      let addRef = ref(
        db,
        `protocols/${protocolId}/eligibility_criterias/${key}`
      );

      newData.id = key;
      update(addRef, newData)
        .then(() => {
          resolve(newData);
        })
        .catch((err) => reject(err));
    });
  };

  const updateTrialSite = (protocolId, siteId, newData, location) => {
    return new Promise((resolve, reject) => {
      let protocolsRef = ref(
        db,
        `protocols/${protocolId}/trial_sites/${siteId}/${location}`
      );
      let key = push(protocolsRef, {}).key;
      let addRef = ref(
        db,
        `protocols/${protocolId}/trial_sites/${siteId}/${location}/${key}`
      );

      newData.id = key;
      set(addRef, newData)
        .then(() => {
          resolve(key);
        })
        .catch((err) => reject(err));
    });
  };

  const deleteTrialInfo = (protocolId, location) => {
    return new Promise((resolve, reject) => {
      let protocolsRef = ref(db, `protocols/${protocolId}/${location}`);
      remove(protocolsRef)
        .then(() => {
          resolve();
        })
        .catch((err) => reject(err));
    });
  }; // End Trial Sites Functions

  // End Functions

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
    fetchTrialSite,
    updateTrialSite,
    deleteTrialInfo,
    addEligibilityCriteria,
  };

  return (
    <ProtocolContext.Provider value={payload}>
      {children}
    </ProtocolContext.Provider>
  );
}

export default ProtocolProvider;

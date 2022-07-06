import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../configs/firebase";
import { ref, set, onValue, push, remove } from "firebase/database";
import { collectIdsAndDocs } from "../utils/misc.utility";
import { useProtocolContext } from "./ProtocolContext";
const SponsorContext = createContext({});
export const useSponsorContext = () => useContext(SponsorContext);

function SponsorProvider({ children }) {
  const { protocols, deleteProtocols } = useProtocolContext();
  // States
  const [sponsors, setSponsors] = useState(null);
  // End States

  //   Functions

  const fetchSponsors = () => {
    const sponsorRef = ref(db, "sponsors");
    onValue(sponsorRef, (snapshot) => {
      const data = [];
      if (snapshot.val()) data = collectIdsAndDocs(snapshot.val());
      setSponsors(data);
    });
  };

  const addSponsor = ({ sponsorName }) => {
    return new Promise((resolve, reject) => {
      const sponsorRef = ref(db, "sponsors");
      let key = push(sponsorRef, {}).key;
      let addRef = ref(db, `sponsors/${key}`);
      console.log("key is: ", key);
      set(addRef, {
        id: key,
        name: sponsorName,
      })
        .then(() => {
          resolve(key);
        })
        .catch((err) => reject(err));
    });
  };

  const removeSponsor = async (id) => {
    const sponsorRef = ref(db, `sponsors/${id}`);
    try {
      await remove(sponsorRef);
      return await deleteProtocols(id);
    } catch (error) {
      return error;
    }
  }; // End Functions

  const getSpecificSponsor = (sponsorId) => {
    return sponsors.filter((data) => data.id === sponsorId)[0];
  };

  const getSpecificSponsorProtocols = (sponsorId) => {
    return protocols.filter((data) => data.sponsor.id === sponsorId);
  };

  const addSponsorStaff = (staffName) => {
    return new Promise((resolve, reject) => {
      const sponsorStaffRef = ref(db, "sponsor_staff");
      let key = push(sponsorStaffRef, {}).key;
      let addRef = ref(db, `sponsor_staff/${key}`);
      set(addRef, {
        id: key,
        name: staffName,
      })
        .then(() => {
          resolve(key);
        })
        .catch((err) => reject(err));
    });
  };

  //  End Functions

  // Effects
  useEffect(() => {
    fetchSponsors();
  }, []);

  const payload = {
    sponsors,
    addSponsor,
    getSpecificSponsor,
    getSpecificSponsorProtocols,
    removeSponsor,
  };

  return (
    <SponsorContext.Provider value={payload}>
      {children}
    </SponsorContext.Provider>
  );
}

export default SponsorProvider;

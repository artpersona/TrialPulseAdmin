import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../configs/firebase";
import { ref, set, onValue, push } from "firebase/database";
import { collectIdsAndDocs } from "../utils/misc.utility";
import { useProtocolContext } from "./ProtocolContext";
const SponsorContext = createContext({});
export const useSponsorContext = () => useContext(SponsorContext);

function SponsorProvider({ children }) {
  const { protocols } = useProtocolContext();
  // States
  const [sponsors, setSponsors] = useState(null);
  // End States

  //   Functions

  const fetchSponsors = () => {
    const sponsorRef = ref(db, "sponsors");
    onValue(sponsorRef, (snapshot) => {
      const data = collectIdsAndDocs(snapshot.val());
      console.log("data is: ", data);
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

  const getSpecificSponsor = (sponsorId) => {
    return sponsors.filter((data) => data.id === sponsorId)[0];
  };

  const getSpecificSponsorProtocols = (sponsorId) => {
    return protocols.filter((data) => data.sponsor_id === sponsorId);
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
  };

  return (
    <SponsorContext.Provider value={payload}>
      {children}
    </SponsorContext.Provider>
  );
}

export default SponsorProvider;

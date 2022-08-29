import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../configs/firebase";
import {
  ref,
  set,
  onValue,
  push,
  remove,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { collectIdsAndDocs } from "../utils/misc.utility";
import { useProtocolContext } from "./ProtocolContext";
import { useAuthContext } from "./AuthContext";
const SponsorContext = createContext({});
export const useSponsorContext = () => useContext(SponsorContext);

function SponsorProvider({ children }) {
  const { protocols, deleteProtocols } = useProtocolContext();
  const { registerUser } = useAuthContext();
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
    let data = protocols.filter((data) => data.sponsor.id === sponsorId);
    return data;
  };

  const fetchStaff = (sponsorId, setter) => {
    onValue(
      query(ref(db, "users"), orderByChild("sponsorId"), equalTo(sponsorId)),
      (snapshot) => {
        const data = [];
        if (snapshot.val()) data = collectIdsAndDocs(snapshot.val());
        data = data.filter((data) => data.status === "active");
        setter(data);
      }
    );
  };

  const addSponsorStaff = (staffData, sponsorId) => {
    return new Promise((resolve, reject) => {
      const sponsorStaffRef = ref(db, "users");
      let key = push(sponsorStaffRef, {}).key;
      let addRef = ref(db, `users/${key}`);
      set(addRef, {
        id: key,
        firstName: staffData.firstName,
        lastName: staffData.lastName,
        email: staffData.email,
        role: staffData.role,
        contact_type: "sponsor",
        sponsorId: sponsorId,
        status: "active",
      })
        .then(() => {
          registerUser(staffData.email, "Access")
            .then(() => {
              resolve(key);
            })
            .catch((err) => {
              console.log(err);
              alert("Error registering user");
              reject(err);
            });
        })
        .catch((err) => reject(err));
    });
  };

  const removeSponsorStaff = (id) => {
    return new Promise((resolve, reject) => {
      const sponsorStaffRef = ref(db, `users/${id}`);
      remove(sponsorStaffRef)
        .then(() => resolve())
        .catch((err) => {
          alert("Error removing staff");
          reject(err);
        });
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
    addSponsorStaff,
    fetchStaff,
    removeSponsorStaff,
  };

  return (
    <SponsorContext.Provider value={payload}>
      {children}
    </SponsorContext.Provider>
  );
}

export default SponsorProvider;

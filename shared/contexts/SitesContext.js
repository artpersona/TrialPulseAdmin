import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../configs/firebase";
import { ref, set, onValue, push } from "firebase/database";
import { collectIdsAndDocs } from "../utils/misc.utility";

const SiteContext = createContext({});
export const useSiteContext = () => useContext(SiteContext);

function SiteProvider({ children }) {
  // States

  const [sites, setSites] = useState([]);

  // End States

  //   Functions

  const fetchSites = () => {
    const sitesRef = ref(db, "sites");
    onValue(sitesRef, (snapshot) => {
      const data = [];
      if (snapshot.val()) {
        data = collectIdsAndDocs(snapshot.val());
      }
      setSites(data);
    });
  };

  const fetchSpecificSite = (id) => {
    return sites.find((site) => site.id === id);
  };

  //  End Functions

  // Effects
  useEffect(() => {
    fetchSites();
  }, []);

  const payload = {
    sites,
    fetchSpecificSite,
  };

  return (
    <SiteContext.Provider value={payload}>{children}</SiteContext.Provider>
  );
}

export default SiteProvider;

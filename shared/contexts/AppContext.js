import React, { createContext, useContext, useEffect, useState } from "react";
import { ref, set, onValue, push } from "firebase/database";
import { db } from "../configs/firebase";
import { collectIdsAndDocs } from "../utils/misc.utility";

const AppContext = createContext({});
export const useAppContext = () => useContext(AppContext);

function AppProvider({ children }) {
  // States
  const [trialSettings, setTrialSettings] = useState(null);
  const [trialStatus, setTrialStatus] = useState(null);
  // End States

  //   Functions

  const fetchTrialSettings = () => {
    const trialSettingsRef = ref(db, "settings/trial_setting");
    onValue(trialSettingsRef, (snapshot) => {
      const data = collectIdsAndDocs(snapshot.val());
      setTrialSettings(data);
    });
  };

  const fetchTrialStatus = () => {
    const trialStatusRef = ref(db, "settings/trial_status");
    onValue(trialStatusRef, (snapshot) => {
      const data = collectIdsAndDocs(snapshot.val());
      setTrialStatus(data);
    });
  };

  //  End Functions

  // Effects
  useEffect(() => {
    fetchTrialSettings();
    fetchTrialStatus();
  }, []);

  const payload = { trialSettings, trialStatus };

  return <AppContext.Provider value={payload}>{children}</AppContext.Provider>;
}

export default AppProvider;

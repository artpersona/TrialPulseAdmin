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
const MessageContext = createContext({});
export const useMessageContext = () => useContext(MessageContext);

function MessageProvider({ children }) {
  // States
  const [chatrooms, setChatrooms] = useState(null);
  const [selectedChatroom, setSelectedChatroom] = useState(0);
  const [selectedChatroomUser, setSelectedChatroomUser] = useState(0);
  // End States

  //   Functions
  const fetchMessages = () => {
    const messagesRef = ref(db, "chatrooms");
    onValue(messagesRef, (snapshot) => {
      const data = [];
      if (snapshot.val()) data = collectIdsAndDocs(snapshot.val());
      console.log(data)
      setChatrooms(data);
      // return data.filter((item) => { 
      //   if (item.messages){
      //     setSelectedChatroom(item.messages)
      //     console.log(selectedChatroom)
      //     return
      //   }
      // })
      setSelectedChatroom(data[1].messages)
      setSelectedChatroomUser(data[1].secondUser)
      // console.log(selectedChatroom)
    });
  };

  const getSpecificChatroom = (item) => {
    console.log(item)
    setSelectedChatroom(item.messages)
    setSelectedChatroomUser(item.secondUser)
    // return chatrooms.filter((data) => data.id === chatroomId)[0];
  };

  // End Functions

  const payload = {
    chatrooms,
    selectedChatroom,
    fetchMessages,
    getSpecificChatroom,
    selectedChatroomUser
  };

  return (
    <MessageContext.Provider value={payload}>
      {children}
    </MessageContext.Provider>
  );
}

export default MessageProvider;

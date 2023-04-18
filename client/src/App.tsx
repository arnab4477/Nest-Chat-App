import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router';

import {
  MessageType,
  UserStateType,
  useChatState,
  useUserState,
} from './contexts';
import { Header } from './components';
import { DisplayMessages, Form } from './layouts';

import socket from './socket';
import { getAllMessages } from './utils';

function App() {
  const [chat, setChat] = useChatState();
  const [_, setUser] = useUserState();

  useEffect(() => {
    // Get the messages from DB and populate the chat context
    getAllMessages().then((messages) => {
      setChat!(messages);
    });

    // See if the user information is stored in the localstorage
    const loggedInUser = window.localStorage.getItem('user') as UserStateType;
    if (loggedInUser) {
      const user = JSON.parse(JSON.stringify(loggedInUser));
      setUser!(user);
    } else {
      setUser!(null);
    }
  }, []);

  // Listen for the 'newMessage' event and update the chat context
  socket.on('newMessage', (res: MessageType) => {
    // Clone the chat and add the new message to it
    const chatClone = JSON.parse(JSON.stringify(chat));
    chatClone!.push({ ...res });

    setChat!(chatClone);
  });

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<DisplayMessages />} />
        <Route path="/signup" element={<Form formType="Sign up" />} />
        <Route path="/login" element={<Form formType="Log in" />} />
      </Routes>
    </>
  );
}

export default App;

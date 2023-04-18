import './TextBox.css';
import { useState } from 'react';
import { useUserState } from '../../contexts';
import socket from '../../socket';
import { sendMessage } from '../../utils';

export const TextBox = () => {
  const [text, setText] = useState<string>('');
  const [user] = useUserState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send a 'createmessage' event to the server with the message
    //and the user's id as the payload
    socket.emit(
      'createMessage',
      { messageBody: text, sender: user!.name },
      () => {}
    );

    setText('');
    await sendMessage({ messageBody: text, sender: user!.name });
  };

  return (
    <>
      <form className="textbox-container" onSubmit={handleSubmit}>
        <input
          className="input"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Enter a message"
        />
        <button disabled={!user} className="button" type="submit">
          <p className="button-text">Send</p>
        </button>
      </form>
    </>
  );
};

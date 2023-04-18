import './Chats.css';
import { Message } from '../index';
import { useChatState } from '../../contexts';

export const Chats = () => {
  // Get all the chats
  const [chats] = useChatState();
  if (chats.length === 0) {
    return (
      <div className="no-messages-container">
        <p>{'Currently there are no messages'}</p>
      </div>
    );
  }

  return (
    <div className="chat-container">
      {chats.map((chat) => {
        return (
          <Message
            key={Math.random() * 10101 * Math.random()}
            sender={chat.sender}
            messageBody={chat.messageBody}
          />
        );
      })}
    </div>
  );
};

import './Message.css';

export const Message = (props: { sender: string; messageBody: string }) => {
  return (
    <>
      <div className="message-container">
        <p className="sender">{props.sender}</p>
        <p className="message-body">{props.messageBody}</p>
      </div>
    </>
  );
};

import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Message = ({message}) => {

  const formatted = (d) => {
    const date = d.toDate()
    const today = new Date().getDate();
    if (date.getDate() < today) {
      return date.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).split("/").join("-");
    } else {
      return date.toLocaleTimeString("ja-JP", { 
        hour: "2-digit", 
        minute: "2-digit",
      })
    }
  }

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className="messageInfo">
            <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
            <span>{formatted(message.date)}</span>
        </div>
        <div className="messageContent">
            <p>{message.text}</p>
            {message.img && <img src={message.img} alt="" />}
        </div>
    </div>
  )
}

export default Message
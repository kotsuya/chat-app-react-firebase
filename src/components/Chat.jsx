import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faUserPlus, faVideo } from '@fortawesome/free-solid-svg-icons';
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
  const { data } = useContext(ChatContext)
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{data.user?.displayName}</span>
        <div className='chatIcons'>
        <FontAwesomeIcon className='awesomeIcon' icon={faVideo} />
        <FontAwesomeIcon className='awesomeIcon' icon={faUserPlus} />
        <FontAwesomeIcon className='awesomeIcon' icon={faEllipsis} />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
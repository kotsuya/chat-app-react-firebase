import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { v4 as uuid } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const handelSend = async () => {
    if (text.trim().length === 0) { return }
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on('state_changed',
        (snapshot) => {
          // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              })
            })
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      })
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp()
    })

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp()
    })
  
    setText("");
    setImg(null);
  };

  return (
    <div className='input'>
      <input type="text" placeholder='Type something...' onChange={e => setText(e.target.value)} value={text}/>
      <div className='send'>
        <FontAwesomeIcon className='awesomeIcon' icon={faPaperclip} />
        <input style={{ display: "none" }} type="file" id="file" onChange={e => setImg(e.target.files[0])} />
        <label htmlFor='file'>
          <FontAwesomeIcon className='awesomeIcon' icon={faImage} />
        </label>
        <button onClick={handelSend}>Send</button>
      </div>
    </div>
  )
}

export default Input
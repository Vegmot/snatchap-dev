import React from 'react'
import { Avatar } from '@material-ui/core'
import StopRoundedIcon from '@material-ui/icons/StopRounded'
import ReactTimeago from 'react-timeago'
import { useDispatch } from 'react-redux'
import { selectImage } from './features/appSlice'
import { db } from './firebase'
import { useHistory } from 'react-router-dom'

import './Chat.css'

const Chat = ({ id, userName, createdAt, read, imageUrl, profileUrl }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const openPost = () => {
    if (!read) {
      dispatch(selectImage(imageUrl))
      db.collection('posts').doc(id).set(
        {
          read: true,
        },
        { merge: true }
      )

      history.push('/chats/view')
    }
  }

  return (
    <section className='chat' onClick={openPost}>
      <Avatar className='chat-avatar' src={profileUrl} />

      <div className='chat-info'>
        <h4>{userName}</h4>
        <p>
          {!read && 'Tap to view -'}{' '}
          <ReactTimeago date={new Date(createdAt?.toDate()).toUTCString()} />
        </p>
      </div>

      {!read && <StopRoundedIcon className='chat-read-icon' />}
    </section>
  )
}

export default Chat

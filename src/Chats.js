import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import { auth, db } from './firebase'
import Chat from './Chat'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from './features/appSlice'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'

import './Chats.css'
import { useHistory } from 'react-router-dom'
import { resetCameraImage } from './features/cameraSlice'

const Chats = () => {
  const [posts, setPosts] = useState([])
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const history = useHistory()

  useEffect(() => {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot =>
        setPosts(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      )
  }, [])

  const takeSnap = () => {
    dispatch(resetCameraImage())
    history.push('/')
  }

  return (
    <section className='chats'>
      <div className='chats-header'>
        <Avatar
          src={user?.profileUrl}
          onClick={() => auth.signOut()}
          className='chats-avatar'
        />

        <div className='chats-search'>
          <SearchIcon className='chats-search-icon' />
          <input placeholder='Search friends...' type='text' />
        </div>

        <ChatBubbleIcon className='chats-chat-icon' />
      </div>

      <div className='chats-posts'>
        {posts.map(
          ({
            id,
            data: { profileUrl, userName, createdAt, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              userName={userName}
              createdAt={createdAt}
              imageUrl={imageUrl}
              profileUrl={profileUrl}
              read={read}
            />
          )
        )}
      </div>

      <RadioButtonUncheckedIcon
        className='chats-take-pic-icon'
        onClick={takeSnap}
        fontSize='large'
      />
    </section>
  )
}

export default Chats

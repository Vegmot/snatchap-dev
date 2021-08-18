import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import { db } from './firebase'
import Chat from './Chat'

import './Chats.css'

const Chats = () => {
  const [posts, setPosts] = useState([])

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

  return (
    <section className='chats'>
      <div className='chats-header'>
        <Avatar className='chats-avatar' />

        <div className='chats-search'>
          <SearchIcon />
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
    </section>
  )
}

export default Chats

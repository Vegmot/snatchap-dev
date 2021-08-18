import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectSelectedImage } from './features/appSlice'
import { useHistory } from 'react-router-dom'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import './ChatView.css'

const ChatView = () => {
  const selectedImage = useSelector(selectSelectedImage)
  const history = useHistory()

  useEffect(() => {
    if (!selectedImage) {
      exit()
    }
  }, [selectedImage])

  const exit = () => {
    history.replace('/chats')
  }

  return (
    <section className='chat-view'>
      <img src={selectedImage} alt='Selected post' onClick={exit} />

      <div className='chat-view-timer'>
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ['#004777', 0.33],
            ['#f7b801', 0.33],
            ['#a30000', 0.33],
          ]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit()
            }

            return remainingTime
          }}
        </CountdownCircleTimer>
      </div>
    </section>
  )
}

export default ChatView

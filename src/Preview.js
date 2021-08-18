import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { resetCameraImage, selectCameraImage } from './features/cameraSlice'
import CloseIcon from '@material-ui/icons/Close'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import CreateIcon from '@material-ui/icons/Create'
import NoteIcon from '@material-ui/icons/Note'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CropIcon from '@material-ui/icons/Crop'
import TimerIcon from '@material-ui/icons/Timer'
import SendIcon from '@material-ui/icons/Send'
import { v4 as uuid } from 'uuid'
import { db, storage } from './firebase'
import firebase from 'firebase'
import { selectUser } from './features/appSlice'

import './Preview.css'

const Preview = () => {
  const cameraImage = useSelector(selectCameraImage)
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(() => {
    if (!cameraImage) {
      history.replace('/')
    }
  }, [cameraImage, history])

  const closePreview = () => {
    dispatch(resetCameraImage())
    history.replace('/')
  }

  const sendPost = () => {
    const pid = `po-${uuid()}`
    const uploadTask = storage
      .ref(`posts/${pid}`)
      .putString(cameraImage, 'data_url')

    uploadTask.on(
      'state_changed',
      null,
      error => {
        console.log(error)
      },
      () => {
        storage
          .ref(`posts`)
          .child(pid)
          .getDownloadURL()
          .then(url => {
            db.collection('posts').add({
              imageUrl: url,
              userName: user.userName,
              read: false,
              profileUrl: user.profileUrl,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            history.replace('/chats')
          })
      }
    )
  }

  return (
    <section className='preview'>
      <CloseIcon className='preview-close' onClick={closePreview} />

      <div className='preview-toolbar-right'>
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>

      <img src={cameraImage} alt='Webcam capture preview' />

      <div className='preview-footer' onClick={sendPost}>
        <h2>Send</h2>
        <SendIcon className='preview-send-icon' fontSize='small' />
      </div>
    </section>
  )
}

export default Preview

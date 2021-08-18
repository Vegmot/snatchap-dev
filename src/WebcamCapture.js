import React, { useCallback, useRef } from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { useDispatch } from 'react-redux'
import { setCameraImage } from './features/cameraSlice'
import { useHistory } from 'react-router-dom'
import './WebcamCapture.css'

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: 'user',
}

const WebcamCapture = () => {
  const dispatch = useDispatch()
  const webcamRef = useRef(null)
  const history = useHistory()

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    dispatch(setCameraImage(imageSrc))
    history.push('/preview')
  }, [webcamRef, dispatch, history])

  return (
    <div className='webcam-capture'>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        height={videoConstraints.height}
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />

      <RadioButtonUncheckedIcon
        className='webcam-capture-button'
        onClick={capture}
        fontSize='large'
      />
    </div>
  )
}

export default WebcamCapture

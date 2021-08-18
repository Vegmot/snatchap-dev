import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from './features/appSlice'
import { auth, provider } from './firebase'
import './Login.css'

const Login = () => {
  const dispatch = useDispatch()

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        dispatch(
          login({
            userName: result.user.displayName,
            profileUrl: result.user.photoURL,
            id: result.user.uid,
          })
        )
      })
      .catch(e => alert(e.message))
  }

  return (
    <section className='login'>
      <div className='login-container'>
        <img src='https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg' alt='' />
        <Button variant='outlined' onClick={signIn}>
          Sign In
        </Button>
      </div>
    </section>
  )
}

export default Login

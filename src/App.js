import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import WebcamCapture from './WebcamCapture'
import Preview from './Preview'
import Chats from './Chats'
import ChatView from './ChatView'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from './features/appSlice'
import Login from './Login'
import { useEffect } from 'react'
import { auth } from './firebase'

import './App.css'

const App = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.user.displayName,
            profileUrl: authUser.user.photoURL,
            id: authUser.user.uid,
          })
        )
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])

  return (
    <div className='app'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className='app-logo'
              src='https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchatt.jpg'
              alt=''
            />
            <div className='app-body'>
              <div className='app-body-background'>
                <Switch>
                  <Route path='/chats/view'>
                    <ChatView />
                  </Route>

                  <Route path='/chats'>
                    <Chats />
                  </Route>

                  <Route path='/preview'>
                    <Preview />
                  </Route>

                  <Route exact path='/'>
                    <WebcamCapture />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  )
}

export default App

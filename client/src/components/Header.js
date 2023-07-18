import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {

    const {user,logoutUser} =  useContext(AuthContext)

  return (
    <>
    <div>
      <Link to='/'>Home</Link>
      {
        user ?
        <p onClick={logoutUser}>Logout</p>
        :
        <Link to='/login'>Login</Link>
      }
    </div>
    <h1>Hello {user?.username??''}</h1>
    </>

  )
}

export default Header

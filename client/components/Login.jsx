import React, {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import { sendContext } from './Context.jsx';

const Login = () => {
    //const [userData, setUserData] = useState({username: ''})
    const {setUserContext} = sendContext()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(false))
      }, [])

    const submit = (e) => {
        e.preventDefault()
        if(e.nativeEvent.submitter.name === 'Login'){
            axios.post('/auth/login', {username, password})
            .then((loginResponse) => {
                if(loginResponse.data.message === 'success'){
                    setUserContext(loginResponse.data.user)
                    localStorage.setItem('isAuthenticated', JSON.stringify(true))
                    navigate('/home')
                }else{
                    localStorage.setItem('isAuthenticated', JSON.stringify(false))
                    setError(loginResponse.data.message)
                    navigate({pathname: '/'})
                }
            })
            .catch((err) => {
                console.error('Login failed', err)
            })
        }else{
            axios.post('/auth/register', {username, password})
            .then((loginResponse) => {
                if(loginResponse.data.message === 'success'){
                    setUserContext(loginResponse.data.user)
                    localStorage.setItem('isAuthenticated', JSON.stringify(true))
                    navigate('/home')
                }else{
                    localStorage.setItem('isAuthenticated', JSON.stringify(false))
                    setError(loginResponse.data.message)
                    navigate({pathname: '/'})
                }
            })
            .catch((err) => {
                setError(err.response.data.message)
                console.error('Login failed', err.response.data.message)
            })
        }
    }


 

    return (
        <div className='login'>
            <h2>Login</h2>
            <div className='login-form'>
            <form onSubmit={submit}>
                <div className='group-form'>
                <input 
                type='text'
                name='username'
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
                />
                <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <button name='Login' type='submit'>Login</button>
                <button name='Register' type='submit'>Register</button>
            </form>
            </div>
            

           {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    )
}

export default Login
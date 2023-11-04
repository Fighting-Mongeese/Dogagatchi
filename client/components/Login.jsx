import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [userData, setUserData] = useState({username: '', password: ''})
    const navigate = useNavigate()

    const inputChange = (e) => {
        const {name, value} = e.target

        setUserData({...userData, [name]: value})
    }

    const submit = (e) => {
        e.preventDefault()
        axios.post('auth/login', userData)
        .then((loginResponse) => {
            console.log('loginres', loginResponse)
            if(loginResponse.data.success){
                navigate({pathanme: '/home'})
            }
        })
        .catch((err) => {
            console.error('Login failed', err)
        })
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <input 
                type='text'
                name='usernsame'
                placeholder='Username'
                onChange={inputChange}
                />
                <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={inputChange}
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login
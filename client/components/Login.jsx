import React, {useState} from 'react'
import axios from 'axios'

const Login = ({history}) => {
    const [userData, setUserData] = useState({username: '', password: ''})

    const inputChange = (e) => {
        const {name, value} = e.target

        setUserData({...userData, [name]: value})
    }

    const submit = (e) => {
        e.preventDefault()
        axios.post('auth/login', userdata)
        .then((loginResponse) => {
            if(loginResponse.data.success){
                history.push('/home')
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
                onchange={inputChange}
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}
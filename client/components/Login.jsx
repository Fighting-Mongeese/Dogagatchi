import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { sendContext } from './Context.jsx';
import { Button, Form, Row, Col, Container, Image } from 'react-bootstrap';

const Login = () => {
    //const [userData, setUserData] = useState({username: ''})
    const { setUserContext } = sendContext()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(false))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        if (e.nativeEvent.submitter.name === 'Login') {
            axios.post('/auth/login', { username, password })
                .then((loginResponse) => {
                    if (loginResponse.data.message === 'success') {
                        setUserContext(loginResponse.data.user)
                        localStorage.setItem('isAuthenticated', JSON.stringify(true))
                        navigate('/home')
                    } else {
                        localStorage.setItem('isAuthenticated', JSON.stringify(false))
                        setError(loginResponse.data.message)
                        navigate({ pathname: '/' })
                    }
                })
                .catch((err) => {
                    console.error('Login failed', err)
                })
        } else {
            axios.post('/auth/register', { username, password })
                .then((loginResponse) => {
                    if (loginResponse.data.message === 'success') {
                        setUserContext(loginResponse.data.user)
                        localStorage.setItem('isAuthenticated', JSON.stringify(true))
                        navigate('/home')
                    } else {
                        localStorage.setItem('isAuthenticated', JSON.stringify(false))
                        setError(loginResponse.data.message)
                        navigate({ pathname: '/' })
                    }
                })
                .catch((err) => {
                    setError(err.response.data.message)
                    console.error('Login failed', err.response.data.message)
                })
        }
    }



    return (
            <Row style={{height: '100vh',}} className=''>
                <Col xs={3}></Col>
                <Col xs={6} className='d-flex flex-column justify-content-center'>
                    <Image className='align-self-center m-5' src='https://i.ibb.co/B6bJ359/1699386580-trimmy-sweeticon-removebg-preview-1.png'/>
                    <Form onSubmit={submit} style={{backgroundImage: 'linear-gradient(#182950, #274282)', }} className='d-flex flex-column align-self-center justify-content-center align-items-center p-2 border border-3 border-white rounded'>
                        <Form.Label style={{color:'white', fontSize: '25px', marginTop: '20px'}}>Woof woof woof!</Form.Label>
                        <div className='group-form'>
                            <input
                                className='m-3'
                                type='text'
                                name='username'
                                placeholder='Username'
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                className='m-3'
                                type='password'
                                name='password'
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='d-flex flex-row mb-4'>
                            <Button variant='outline-light' name='Login' type='submit'>Login</Button>
                            <Button variant='outline-light' name='Register' type='submit'>Register</Button>
                        </div>
                    </Form>


                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </Col>
                <Col xs={3}></Col>
            </Row>
    )
}

export default Login
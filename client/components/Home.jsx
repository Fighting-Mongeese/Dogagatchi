import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'



const Home = () => {
    const [user, setUser] = useState('')

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'))
        console.log('user', user)
        setUser(user.username)
    }, [])

    return (
        <div className='home'>
            <h1>{`Welcome, ${user}!`}</h1>
            <img src='https://i.ibb.co/rQGfGH5/sweeticon-removebg-preview.png' />

            <Link to='/quiz'>
            <button>Quiz</button>
            </Link>
        </div>

    )
}

export default Home
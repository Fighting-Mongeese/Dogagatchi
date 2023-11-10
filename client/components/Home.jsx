import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'



const Home = () => {
    const [user, setUser] = useState('')

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'))
        setUser(user.username)
    }, [])

    return (
        <div className='home'>
            <h1>DOGAGATCHI</h1>
            <img src='https://i.ibb.co/B6bJ359/1699386580-trimmy-sweeticon-removebg-preview-1.png' />
            <h1>{`Welcome, ${user}!`}</h1>
      <span>
            <Link to='/user'>
            <Button className='boot-button'>My Kennel 🦴</Button>
            </Link>
            <Link to='/quiz'>
            <Button className='boot-button'>Pooch Picker 🤔</Button>
            </Link>
            <Link to='/restaurant'>
            <Button className='boot-button'>Bone Appetite Cafe 🍽️</Button>
            </Link>
            <Link to='/leaderboard'>
            <Button className='boot-button'>Top Dawgs 🏆</Button>
            </Link>
            <Link to='/about'>
            <Button className='boot-button'>About 📖</Button>
            </Link>
        </span>
        </div>

    )
}

export default Home
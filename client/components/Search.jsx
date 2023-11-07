import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function Search(props){
  const [searchedUser, setSearchedUser] = useState('')
  function searchUser(){
    axios.get(`/searchUser/${searchedUser}`)
    .then(({ data }) => {
      console.log(data)
      //props.setSearchedUserData(data)
    })
    .then(() => setSearchedUser(''))
    .catch((err) => {
      console.error('search user error (client)', err)
      props.setSearchedUserData('not found')
    })
  }
  function handleEnter(event) {
    if (event.key === 'Enter') {
      searchUser();
    }
  }
  return (
    <div>
      <h5>Search for another user</h5>
      <input type='text'
      value={searchedUser}
      onChange={(e) => {setSearchedUser(e.target.value)}}
      onKeyDown={(e) => {handleEnter(e)}}
      />
      <Button onClick={() => searchUser()}>Search</Button>
    </div>
  )
}

export default Search;

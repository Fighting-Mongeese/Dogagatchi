import { useState, useEffect, createContext, useContext} from 'react';

const UserContext = createContext();

export const Context = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        console.log('sesh',sessionStorage.getItem('username'))
    }, [])

    const setUserContext = (userData) => {
        setUser(userData)
        const {username} = userData

        sessionStorage.setItem('username', username)
    }

    return(
        <UserContext.Provider value={{user, setUserContext}}>{children}</UserContext.Provider>
    )
}

export const sendContext = () => {
    return useContext(UserContext)
}
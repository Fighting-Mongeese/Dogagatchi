import { useState, useEffect, createContext, useContext} from 'react';

const UserContext = createContext();

export const Context = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        console.log('sesh',sessionStorage.getItem('user'))
    }, [])

    const setUserContext = (userData) => {
        setUser(userData)
        console.log('userd', userData)
        const user = JSON.stringify(userData)

        sessionStorage.setItem('user', user)
    }

    return(
        <UserContext.Provider value={{user, setUserContext}}>{children}</UserContext.Provider>
    )
}

export const sendContext = () => {
    return useContext(UserContext)
}
import { useState, useEffect, createContext, useContext} from 'react';

const UserContext = createContext();

export const Context = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
    }, [])

    const setUserContext = (userData) => {
        setUser(userData)
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
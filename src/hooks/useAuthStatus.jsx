import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'


// this is a hook that is used to check if the user is logged in or not
function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    useEffect(()=> {
        const auth = getAuth()
        onAuthStateChanged(auth, (user)=> {
          if(user){
            setLoggedIn(true)
          }
          setCheckingStatus(false)
        })
    }, [])
  return {loggedIn, checkingStatus}
}

export default useAuthStatus
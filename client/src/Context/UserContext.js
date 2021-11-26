import React,{createContext,useState} from 'react'
import axios from 'axios'
import Authservice from "../AuthHeader/authheader"


export const UserContext = createContext("")
// const userData = Authservice.getCurrentUser().user

export const UserProvider = (props) => {
    const [user,setUser]=useState({})
    
    
  return (
   <UserContext.Provider value={[user,setUser]}>
       {props.children}
   </UserContext.Provider>
  )
}
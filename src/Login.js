import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";

async function loginUser(credentials) {
    return fetch('https://frontend-take-home-service.fetch.com/auth/login', {
    credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
   }



export const Login = () => {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const navigation = useNavigate();

    // useEffect(()=>{

    //     console.log("first")

    //     return ()=>{
    //         console.log("sec")
    //     }
    // },[])

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(name + " " + email);
        const response = await loginUser({
            name,
            email
        });
        if(response.ok){
            navigation("/dogfinder");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            
            <label htmlFor="name">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your Name" id="name" name="name"/>

            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="YourEmail@example.com" id="email" name="email"/>
            
            <button type="submit">Login</button>
        </form>
    )
}
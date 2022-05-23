import { useNavigate } from "react-router-dom";
import {useAuth} from "../Context/authContext"
import React, { useState } from 'react';

export default function LogIn(){

    const [user, setUser] =useState({
        name: '',
        email:'',
        password: ''
      }); 
       
      const {login,  }= useAuth();

      const [error, setError]= useState();
    
       const handleChange = ({target: {name,value}}) =>{
         setUser({...user,[name]: value})
       };
    
       const handleSubmit =  async e =>{
         e.preventDefault()
         try{
           await login( user.email, user.password)
           navigate('/Menu')
         }catch(error){
           console.log(error.code);
           if(error.code === "auth/wrong-password"){
             setError("La contraseña es incorrecta");
           }else if(error.code === "auth/user-not-found"){
             setError("El correo es incorrecto");
           }else if(error.code === "auth/invalid-email"){
            setError("El correo es incorrecto");
           }}}
  
   const navigate = useNavigate();
   const handleSignIn = () =>{
    navigate('/SignIn')
    }
    return(
        <div className="App">
    
    <section id="errorSec">
          {error && <p className="error">{error}</p>}
          </section>
        <section>
       <form id="inputLogIn" >
       <input type="text" className="input" id="mail" name="email" placeholder='E-mail' onChange={handleChange} ></input>
       <input type="password" className="input" id="passwordLogin" name="password" placeholder='Password' onChange={handleChange}></input>
       </form>
       </section>

        <section id="buttonSect">
        <button id="login" onClick={handleSubmit}>Login</button>
        <button id="SignInB" onClick={handleSignIn}>Sign In</button>
        </section>
 
       
 
     
        
     </div>
    )
}
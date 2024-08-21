import React ,  { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import "./LoginNgo.css";

//utils
import {SERVER_BASE_URL} from "../../Util/Base_Url";

function LoginNgo() {
  const navigate = useNavigate();
  const [data , setData ] = useState({email : "" , password : ""});
  const [loading , setLoading] = useState(false);

  const handleLogin =async (e)=>{
    e.preventDefault();

    //validation
    if(data.email.trim() == ""){
      toast.error("Email is required");
      return;
    }else if(data.password.trim() == ""){
      toast.error("Password is required");
      return;
    }

   try{
    setLoading(true);
    let result = await fetch(`${SERVER_BASE_URL}/api/ngo/loginNgo` , 
      {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(data),
        
      }
    );
    result = await result.json();

    if(result.success && result.data != null){
       sessionStorage.setItem("ngo" , JSON.stringify(result.data));
       toast.success("LogIn successfully");
      navigate("/ngopage");
    }else{
      toast.error(result.msg);
    }
   }catch(error){
    toast.error(error.message);
   }finally{
    setLoading(false);
   }

  }


  return (
    <>
      <div className="fullbody1">
        <div class="login-container">
          <h2>NGO Login</h2>
          <form onSubmit={handleLogin}>
            <input type="text" name="username" placeholder="Username" 
            onChange={(e)=> setData({...data , email : e.target.value})}
             required />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e)=> setData({...data , password : e.target.value})}
              required
            />
            <br />
            {loading ?
            <input type="button" value="Loading ...." />
            
             : 
            <input type="submit" value="Login" />}
          </form>
        </div>
      </div>
    </>
  );
}
export default LoginNgo;

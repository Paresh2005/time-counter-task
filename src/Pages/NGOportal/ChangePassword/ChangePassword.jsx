import React , { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

import {SERVER_BASE_URL} from "../../../Util/Base_Url";

export default function ChangePassword() {
    const navigate = useNavigate();
     const [data , setData ] = useState({ oldPassword : "" , newPassword:""});
    const [loading , setLoading] = useState(false);

    let ngo = JSON.parse(sessionStorage.getItem("ngo"));

    const handleChangePassword =async (e)=>{
        e.preventDefault();
        
        //validation
        if(data.oldPassword.trim() == "" || data.newPassword.trim() == ""){
          toast.error("All fields are required");
            return;
        }

        try{
         setLoading(true);
         let result = await fetch(`${SERVER_BASE_URL}/api/ngo/changePassword/${ngo._id}`,{
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
         });
         result = await result.json();

         if(result.success){
          toast.success("Password changed successfully");
            navigate("/ngopage");
         }else{
          toast.error(result.msg);
        }
        }catch(error){
          toast.error("Some thing Wrong");
        }finally{
            setLoading(false);
        }
    }

  return (
    <div className="fullbody1">
        <div class="login-container">
          <h2 className="mb-3">Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <input type="text" name="oldPassword" placeholder="Enter oldPassword" 
            onChange={(e)=> setData({...data , oldPassword : e.target.value})}
             required />
            <br />
            <input
              type="text"
              name="newPassword"
              placeholder="Enter newPassword"
              onChange={(e)=> setData({...data , newPassword : e.target.value})}
              required
            />
            <br />
            {loading ?
            <input type="button" value="Loading ...." />
             : 
            <input type="submit" value="Change Password" />}
          </form>
        </div>
      </div>
  )
}

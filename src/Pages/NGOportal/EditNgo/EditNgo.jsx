import React from 'react'
import { useNavigate } from 'react-router-dom';
import NGOForm from '../ngoForm';
import axios from "axios";
import toast from 'react-hot-toast';

import {SERVER_BASE_URL} from "../../../Util/Base_Url";

export default function EditNgo() {
    let ngoData = JSON.parse(sessionStorage.getItem('ngo'));
    const navigate = useNavigate();

    const [loading , setLoading] = React.useState(false);




    const handleEditNGO = async(data) => {
            //update data in seesion
            sessionStorage.setItem("ngo" , JSON.stringify(data));

             setLoading(true);
            try{

            let result = await fetch(`${SERVER_BASE_URL}/api/ngo/updateNgo/${data._id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data)
               })

               result =await result.json();

               if(result.success){
                toast.success("update Ngo successfully"); 
                 navigate("/ngopage");
               }else{
                toast.error(result.msg);
               }

            }catch(error){
              console.log(error);
              toast.error("Update Ngo Fail");
            }finally{
              setLoading(false);
            }

            
      };

  return <NGOForm ngoData={ngoData} onSubmit={handleEditNGO} loading={loading}/>;
}

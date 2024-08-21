import { Link } from "react-router-dom";
import React , { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "./RForm.css";
import rbanner from "./image/register_bg.jpeg";

import {SERVER_BASE_URL} from "../../Util/Base_Url"
import NGOForm from "../NGOportal/ngoForm";
import toast from "react-hot-toast";
import { NavigateBeforeRounded } from "@mui/icons-material";

function RForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading , setLoading] = useState(false);

  const handleSubmit = async(data) => {

    try{
      setLoading(true);

      Swal.fire({
        title: 'Submitting...',
        text: 'Please wait while we submit your form',
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });

      let response = await fetch(`${SERVER_BASE_URL}/api/ngo/regesterNgo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      response = await response.json();

      if(response.success){
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Register New Ngo successfully',
        });
        navigate("/");
      }else{
        toast.error(response.message);  
      }

    }catch(error){
      setLoading(false);
      Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
    }
  };

  return (
    <>
      <div className="row mb-2">
        <div className="col">
          <img src={rbanner} alt="banner" className="img-fluid rimage"></img>
        </div>

        <NGOForm onSubmit={handleSubmit} loading={loading}/>
      </div>

    </>
  );
}
export default RForm;

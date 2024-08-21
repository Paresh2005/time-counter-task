import React ,  { useEffect, useState } from "react";
import "./HomeNgo.css";
import profile from "./images/Hatim2.jpg";
import { useNavigate  , Link} from "react-router-dom";
import toast from 'react-hot-toast';

//utils
import {SERVER_BASE_URL} from "../../../Util/Base_Url";

//components
import UserDetails from "../UserDetails";

//mui
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

function HomeNgo() {
  const [currTab, setCurrTab] = useState(0);
  const navigate = useNavigate();
  const [data , setData] = useState([
    // {name : "paresh" , help_Type : "Education" , requestStatus : "Accepted" , _id: "1"},
    // {name : "Anil" , help_Type : "Education" , requestStatus : "Pending" ,_id: "3"},
    // {name : "Rajesh" , help_Type : "Education" , requestStatus : "Rejected" ,_id: "2"},
    // {name : "Anil" , help_Type : "Education" , requestStatus : "Pending" ,_id: "4"},
  ]);
  const [filterdData , setFillterdData] = useState(data);
  const [showUserDetailsPopUp , setShowUserDetailsPopUp] = useState(false);
   const [userInformation , setUserInformation] = useState();
   const [loading , setLoading] = useState(false);

   const ngo = JSON.parse(sessionStorage.getItem("ngo"));


  useEffect(()=>{
   fetchAllRequest();
  },[]);

  const fetchAllRequest = async()=>{
    setLoading(true);
    try{
       let result = await fetch(`${SERVER_BASE_URL}/api/request/getAllRequestByNgoId/${ngo._id}`);
       result = await result.json();

       if(result.success && result.data != null){
           setData(result.data);
           setFillterdData(result.data);
       }else{
        toast.error(result.msg);
       }
       setLoading(false);
    }catch(error){
      toast.error(error.message);
      setLoading(false);
    }
  }

  const handleOpenUserDetailsPopUp = (user)=>{
    setUserInformation(user);
    setShowUserDetailsPopUp(true);
  }

  const handleCloseUserDetailsPopUp = ()=>{
    setShowUserDetailsPopUp(false);
  }


  const tabs = [
    "All" ,"Pending", "Accepted","Rejected",
  ];

  const handleChangeTab = (event, newTabValue) => {
    setCurrTab(newTabValue);

    if(newTabValue == 0){
      setFillterdData(data);
    }else{
      setFillterdData(data.filter(item => item.requestStatus == tabs[newTabValue]));
    } 
  };

  //handle acceptuse request
  const handleAcceptRequest = (_id) => {
        // Update the main data array
    const updatedData = data.map((req) => {
      if (req._id === _id) {
        return {
          ...req, // Spread the original request object
          requestStatus: "Accepted", // Update the requestStatus
        };
      }
      return req;
    });
  
    // Set the updated data state
    setData(updatedData);

    if(currTab == 0){
      setFillterdData(updatedData);
    }else{
      setFillterdData(updatedData.filter(item => item.requestStatus == tabs[currTab]));
    }

    handleChangeRequestStatus(_id , "Accepted");
  }

  //handle reject use request
  const handleRejectRequest = (_id) => {
    // Update the main data array
    const updatedData = data.map((req) => {
      if (req._id === _id) {
        return {
          ...req, // Spread the original request object
          requestStatus: "Rejected", // Update the requestStatus
        };
      }
      return req;
    });
  
    // Set the updated data state
    setData(updatedData);
  
    
    if(currTab == 0){
      setFillterdData(updatedData);
    }else{
      setFillterdData(updatedData.filter(item => item.requestStatus == tabs[currTab]));
    }

    handleChangeRequestStatus(_id , "Rejected");
  };

  //handle chnages reuest status in database
  const handleChangeRequestStatus = (_id , status) => {
     fetch(`${SERVER_BASE_URL}/api/request/updateRequestStatus`,{
      method : "PUT",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        requestId : _id,
        status : status 
      })
    })
    .then(res => res.json())
    .then(res => {
    })
    .catch(error => {
      toast.error(error.message);
    })
  }
  


  return (
    <>
     
      <div className="Container">
        <div className="row">
          <div className="col-md-4 profile-section">
            <div className="profile-card">
              <img src={profile} alt="Profile" className="profile-pic" />
              <h3>{ngo.name}</h3>
              <p className="profile-role">NGO Admin</p>
              <Link to={"/ngopage/editNgo"} className="btn btn-primary" >Edit Profile</Link>
            </div>
            <div className="menu">
              <ul className="menu-list">
                <li>
                  <a href="#">
                    <i className="fas fa-user"></i> My Profile
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fas fa-users"></i> Manage Users
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fas fa-cog"></i> Settings
                  </a>
                </li>
                <li>
                  <Link to={"/ngopage/changePassword"}>
                    <i className="fas fa-lock"></i> Change Password
                  </Link>
                </li>
                <li>
                  <div className="btn" onClick={()=>{
                         sessionStorage.removeItem(("ngo"));
                         toast.success("Logout Successfully");
                         navigate("/");
                  }}>
                    <i className="fas fa-sign-out-alt me-2"></i> Logout
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <h2 className="text-center">Help Request Pending</h2>
            <hr></hr>
            <Box sx={{ width: '100%' }}>
              <Tabs
                onChange={handleChangeTab}
                value={currTab}
                aria-label="Tabs where selection follows focus"
                selectionFollowsFocus
              >
                {tabs.map((tab, index) => (
                  <Tab label={tab} key={index} />
                ))}
              </Tabs>
          </Box>
          <Box sx={{ overflowX: 'auto' }}>
          <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Help Type</th>
                  <th>View Details</th>
                  <th>Accept Status</th>
                </tr>
              </thead>
              <tbody>
               {loading && <p>Loading .....</p>} 
              {!loading && filterdData && filterdData.map((u ,index)=>(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{u.userName}</td>
                  <td>{u.userHelpCategory}</td>
                  <td>
                    <div className="btn btn-primary" onClick={()=> handleOpenUserDetailsPopUp(u)}>
                      View Details
                    </div>
                  </td>
                  <td>
                  {
                    u.requestStatus === 'Accepted' || u.requestStatus === 'Rejected' ?
                    <span className={`badge ${u.requestStatus === 'Accepted' ? 'bg-success' : u.requestStatus === 'Rejected' ? 'bg-danger' : 'bg-warning'}`}>
                    {u.requestStatus}
                  </span>
                   : 
                  <>
                   <ButtonGroup
                      disableElevation
                      variant="contained"
                      aria-label="Disabled button group"
                    >
                      <Button color={'success'} onClick={()=> handleAcceptRequest(u._id)}><DoneIcon/></Button>
                      <Button color={'error'} onClick={()=> handleRejectRequest(u._id)}><ClearIcon/></Button>
                  </ButtonGroup>
                  </>

                  }
                
                  </td>
                </tr>
              ))}
                
              </tbody>
            </table>

          </Box>
         
            {showUserDetailsPopUp && 
            <div><UserDetails userInformation={userInformation} handleCloseUserDetailsPopUp={handleCloseUserDetailsPopUp}/></div>
              }
          </div>
        </div>
      </div>
    </>
  );
}
export default HomeNgo;

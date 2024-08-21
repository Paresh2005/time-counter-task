import React, { useEffect } from 'react'

export default function UserDetails({userInformation  , handleCloseUserDetailsPopUp}) {

    

  return (

//     <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="userDetailsModal" aria-hidden="true">
//   <div className="modal-dialog" role="document">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h5 className="modal-title">User Information</h5>
//         <button type="button" className="close" aria-label="Close" onClick={handleCloseUserDetailsPopUp}>
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div className="modal-body">
//         <ul className="list-group">
//           <li className="list-group-item">User Name: {userInformation.userName}</li>
//           <li className="list-group-item">Mobile: {userInformation.userMobile}</li>
//           <li className="list-group-item">Email: {userInformation.userEmail}</li>
//           <li className="list-group-item">Address: {userInformation.userAddress}</li>
//           <li className="list-group-item">City: {userInformation.userCity}</li>
//           <li className="list-group-item">Help Category: {userInformation.userHelpCategory}</li>
//           <li className="list-group-item">Request Status: {userInformation.requestStatus}</li>
//         </ul>
//       </div>
//       <div className="modal-footer">
//         <button type="button" className="btn btn-primary" onClick={handleCloseUserDetailsPopUp}>Close</button>
//       </div>
//     </div>
//   </div>
// </div>


    <div>
        <div className="popup-overlay">
        <div className="popup-content">
        <ul className="list-group">
          <li className="list-group-item">User Name: {userInformation.userName}</li>
          <li className="list-group-item">Mobile: {userInformation.userMobile}</li>
          <li className="list-group-item">Email: {userInformation.userEmail}</li>
          <li className="list-group-item">Address: {userInformation.userAddress}</li>
          <li className="list-group-item">City: {userInformation.userCity}</li>
          <li className="list-group-item">Help Category: {userInformation.userHelpCategory}</li>
          <li className="list-group-item">Request Status: {userInformation.requestStatus}</li>
        </ul>

           <button className="btn btn-primary mt-3" onClick={handleCloseUserDetailsPopUp}>Close</button>
        </div>
      </div>
 </div>
  )
}

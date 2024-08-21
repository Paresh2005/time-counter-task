
import React, { useState, useEffect } from 'react';
import { Container, Form,Alert } from 'react-bootstrap';
import toast from 'react-hot-toast';


//mui
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Grid from "@mui/material/Grid"


const NGOForm = ({ ngoData, onSubmit,loading }) => {
  
  // const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad','Select campaign settings', 'Create an ad group', 'Create an ad'];
  const steps = ["", "","","","","","" ]

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    "Unique Id of VO/NGO": '',
    "Details of Achievements": '',
    "Registration Details": {
      "Registered With": "",
      "Type of NGO": "",
      "Registration No": "",
      "Copy of Registration Certificate": "",
      "Copy of Pan Card": "",
      "Act name": "",
      "City of Registration": "",
      "State of Registration": "",
      "Date of Registration": ""
    },
    "Key Issues": {
      "Key Issues": "",
    "Operational Area-States": "",
    "Operational Area-District": "",
    },
    "Contact Details": {
      "Address": "",
      "City": "",
      "State": "",
      "Telephone": "",
      "Mobile No": "",
      "Website Url": "",
      "E-mail": "",
    },
    Members: [],
    "FCRA details": [],
    "Source of Funds": [],
  });


  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    if(completed[step]) {
      setCompleted(({
        ...completed,
        [step]: false
      }));
    } 
    setActiveStep(step);
  };

  const handleComplete = () => {
    if(validateForm()){
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setFormData(ngoData)
  };





  useEffect(() => {
    if (ngoData) {
      setFormData(ngoData);
    }
  }, [ngoData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');

    let updatedFormData = { ...formData };

   if(section==="Registration Details" || section == "Key Issues" || section == "Contact Details"){
      updatedFormData = { ...formData, [section]: { ...formData[section], [field]: value } };
   }else if(section == "formData"){
     let index = field[field.split("[")[0].length+1];
     let fieldName = name.split(".")[1].split("[")[0];
     let insideFieldName =  name.split(".")[2];
     if(name[name.length-1]==="."){
        insideFieldName += ".";
     }

     let newArrayData = formData[fieldName]; 
     newArrayData[index] = { ...newArrayData[index], [insideFieldName]: value };
     

    updatedFormData = { ...formData, [fieldName]: newArrayData };
   }else{
    updatedFormData = { ...formData  , [name]: value };
   }
    
     
    setFormData(updatedFormData);
  };


// validations all field
  const validateForm = () => {

    const currErrors = {};

    if(activeStep === 0){
      if (!formData.name) {
        currErrors.name = 'Name is required';
      }
      if (!formData["Unique Id of VO/NGO"]) {
        currErrors["Unique Id of VO/NGO"] = 'Unique Id of VO/NGO is required';
      }
      if (!formData["Details of Achievements"]) {
        currErrors["Details of Achievements"] = 'Details of Achievements is required';
      }
     
    }else if(activeStep === 1){
       Object.values(formData["Registration Details"]).forEach((value) => {
        if (!value) {
          currErrors["Registration Details"] = 'Registration Details All Fields are required';
        }  
      });
    }else if(activeStep === 2){
        Object.values(formData["Key Issues"]).forEach((value) => {
        if (!value) {
          currErrors["Key Issues"] = 'Key Issues All Fields are required';
        }
      });
    }else if(activeStep === 3){
      Object.values(formData["Contact Details"]).forEach((value) => {
        if (!value) {
          currErrors["Contact Details"] = 'Contact Details All Fields are required';
        }
      });
    }else if(activeStep === 4){
      formData["Members"].forEach((member) => {
        Object.values(member).forEach((value) => {
          if (!value) {
            currErrors["Members"] = 'Members All Fields are required';
          }
        })
      })
    }else if(activeStep === 5){
      formData["FCRA details"].forEach((FCRA) => {
        Object.values(FCRA).forEach((value) => {
          if (!value) {
            currErrors["FCRA"] = 'FCRA All Fields are required';
          }
        })
      })
    }else if(activeStep === 6){
       formData["Source of Funds"].forEach((source) => {
        Object.values(source).forEach((value) => {
          if (!value) {
            currErrors["Source of Funds"] = 'Source of Funds All Fields are required';
          }
        })
      })
    }



    setErrors(currErrors);
    return Object.keys(currErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    // if(validateForm()) return;
    if(validateForm()){
    onSubmit(formData);
    }else{
      toast.error("plz fill all required fields");
    }
  };


  const handleDeleteDetalis = (name , index) => {
    const updated = [...formData[name]];
    updated.splice(index, 1);
    setFormData({ ...formData, [name]: updated });
  };

  const handleAddNewDetails = ( name,fields) => {
    setFormData({
      ...formData,
      [name]: [...formData[name], fields],
    });
  };

  return (
    <div className="container shadow rounded mt-4 pt-2 mb-4 pb-3">
      <h4 className='text-center my-4'>{ngoData ? 'Edit NGO Details' : 'Register New NGO'}</h4>
      <Box >
      {/* <Grid container spacing={2} style={{ flexWrap: 'wrap' }}>
      <Stepper nonLinear activeStep={activeStep} style={{ width: '100%' }}>
        {steps.map((label, index) => (
         <Step completed={completed[index]}>
         <StepButton color="inherit" onClick={handleStep(index)}>
           {label}
         </StepButton>
       </Step>
        ))}
      </Stepper>
      </Grid> */}

{/* <Grid container spacing={2} style={{ flexWrap: 'wrap' }}>
      <Stepper nonLinear activeStep={activeStep} >
        {steps.map((label, index) => (
          <Grid item xs={12} sm={6} md={4} key={label}>
            <Step completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          </Grid>
        ))}
      </Stepper>
    </Grid> */}
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
              {loading ? <Button>Loading ...</Button> : <Button onClick={handleSubmit}>{ngoData ? 'Edit' : 'Register New'}</Button> }
              
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {/* Step {activeStep + 1} */}
              <Form onSubmit={handleSubmit}>
              {Object.keys(errors).length > 0 && (
              <Alert variant="danger">
                {Object.values(errors).map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </Alert>
           )}
            {activeStep === 0 && (
                 
                 <div>
                  <h3 className='text-center'>Basic Information </h3>
                  <Form.Group controlId="name">
                   <Form.Label>Name</Form.Label>
                   <Form.Control
                     type="text"
                     placeholder="Enter NGO name"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     required
                   />
                 </Form.Group>
       
                 <Form.Group controlId="UniqueId">
                   <Form.Label>Unique ID of VO/NGO</Form.Label>
                   <Form.Control
                     type="text"
                     placeholder="Enter Unique ID"
                     name="Unique Id of VO/NGO"
                     value={formData["Unique Id of VO/NGO"]}
                     onChange={handleChange}
                     required
                   />
                 </Form.Group>
       
               <Form.Group controlId="DetailsOfAchievements">
                 <Form.Label>Details of Achievements</Form.Label>
                  <Form.Control
                   as="textarea"
                   rows={3}
                   placeholder="Enter details of achievements"
                   name="Details of Achievements"
                   value={formData["Details of Achievements"]}
                   onChange={handleChange}
                   required
                 />
               </Form.Group>
                 </div>
       
                  )
            }

            {/* Registration Details */}
            {activeStep === 1 &&(
              <div>
                  <h4 className="my-3 text-center" >Registration Details</h4>
                {['Registered With', 'Type of NGO', 'Registration No', 'Copy of Registration Certificate', 'Copy of Pan Card', 'Act name', 'City of Registration', 'State of Registration', 'Date of Registration'].map(field => {
                  if(formData["Registration Details"][field] != null){
                return <Form.Group controlId={field} key={field}>
                    <Form.Label>{field}</Form.Label>
                    <Form.Control
                      type={field == "Date of Registration" ? "date" : "text" }
                      placeholder={`Enter ${field}`}
                      name={`Registration Details.${field}`}
                      value={formData["Registration Details"][field] || ''}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  }else{
                    return "";
                  }
            })}
              </div>
            )}
    
         {/* Key Issues */}
         {activeStep === 2 && (
          <div>
            <h4 className="my-3 text-center">Key Issues</h4>
            {['Key Issues', 'Operational Area-States', 'Operational Area-District'].map(field => {
              if(formData["Key Issues"][field] != null) {
              return <Form.Group controlId={field} key={field}>
                <Form.Label>{field}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter ${field}`}
                  name={`Key Issues.${field}`}
                  value={formData["Key Issues"][field] || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              }else{
                return "";
              }
        })}
          </div>
         )}

         {/* Contact Details */}
         {activeStep === 3 && (
          <div>
              <h4 className="my-3 text-center">Contact Details</h4>
            {['Address', 'City', 'State', 'Telephone', 'Mobile No', 'Website Url', 'E-mail'].map(field => {

            if(formData["Contact Details"][field] != null) {
            return <Form.Group controlId={field} key={field}>
                <Form.Label>{field}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter ${field}`}
                  name={`Contact Details.${field}`}
                  value={formData["Contact Details"][field] || ''}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            }else{
                return "";
            }
            })}
          </div>
         )}
         

       {/* Members */}
       {activeStep == 4 && (
         <div>
            <h4 className="my-3 text-center">Members</h4>
            <div className='d-flex justify-content-end mb-3'>
              <div className='btn btn-primary rounded rounded-3 me-2' onClick={()=>handleAddNewDetails("Members", { Name: '', Designation: '', Pan: '', Aadhaar: '' })}><AddIcon/></div>
            </div>
            {formData.Members.map((member, index) => (
              <div key={index}>
                  <div className='d-flex justify-content-between'>
                    <h5>Member {index+1} information </h5>
                      <div className='btn btn-danger rounded rounded-3 me-2' onClick={() => handleDeleteDetalis("Members",index)}>
                        <DeleteIcon/>
                        </div>
                  </div>
                  {['Name', 'Designation', 'Pan', 'Aadhaar'].map(field => {
                      if(formData.Members[index][field] != null) {
                      return <Form.Group controlId={field} key={field}>

                          <Form.Label>{field}</Form.Label>
                          <Form.Control
                          type="text"
                          placeholder={`Enter ${field}`}
                          name={`formData.Members[${index}].${field}`}
                          value={formData.Members[index][field] || ''}
                          onChange={handleChange}
                          required
                          />
                      </Form.Group>
                      }else{
                          return "";
                      }
                      })}
              </div>
            ))}
         </div>
       )}
       

      {/* FCRA details */}
      {activeStep == 5 && (
        <div>
           <h4 className="my-3 text-center">FCRA details</h4>
           <div className='d-flex justify-content-end mb-3'>
            <div className='btn btn-primary rounded rounded-3 me-2' onClick={()=>handleAddNewDetails("FCRA details",{'FCRA Available' : "", 'FCRA Registration no.':""})}><AddIcon/></div>
            </div>
            {formData["FCRA details"].map((member, index) => (
              <div key={index}>
                  <div className='d-flex justify-content-between'>
                    <h5>FCRA detail {index+1}  information </h5>
                      <div className='btn btn-danger rounded rounded-3 me-2' onClick={() => handleDeleteDetalis("FCRA details",index)}>
                        <DeleteIcon/>
                        </div>
                  </div>
                  {['FCRA Available', 'FCRA Registration no.'].map(field => {
                      if(formData["FCRA details"][index][field] != null) {
                      return <Form.Group controlId={field} key={field}>

                          <Form.Label>{field}</Form.Label>
                          <Form.Control
                          type="text"
                          placeholder={`Enter ${field}`}
                          name={`formData.FCRA details[${index}].${field}`}
                          value={formData["FCRA details"][index][field] || ''}
                          onChange={handleChange}
                          required
                          />
                      </Form.Group>
                      }else{
                          return "";
                      }
                      })}
              </div>
            ))}
        </div>
      )}
      
       {/* Source of Funds */}
       {activeStep == 6 && (
        <div>
           <h4 className="my-3 text-center">Source of Funds</h4>
           <div className='d-flex justify-content-end mb-3'>
              <div className='btn btn-primary rounded rounded-3 me-2' onClick={()=>handleAddNewDetails("Source of Funds", { 'Department Name' : "", 'Source': "" , "Finacial Year": "","Amount Sanctioned": "","Purpose": "" })}><AddIcon/></div>
            </div>
          {formData["Source of Funds"].map((member, index) => (
            <div key={index}>
                <div className='d-flex justify-content-between'>
                    <h5>Source of Funds {index+1} information </h5>
                      <div className='btn btn-danger rounded rounded-3 me-2' onClick={() => handleDeleteDetalis("Source of Funds",index)}>
                        <DeleteIcon/>
                        </div>
                  </div>
                {['Department Name', 'Source' , "Finacial Year","Amount Sanctioned","Purpose"].map(field => {
                    if(formData["Source of Funds"][index][field] != null) {
                    return <Form.Group controlId={field} key={field}>

                        <Form.Label>{field}</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder={`Enter ${field}`}
                        name={`formData.Source of Funds[${index}].${field}`}
                        value={formData["Source of Funds"][index][field] || ''}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    }else{
                        return "";
                    }
                    })}
            </div>
          ))}
        </div>

       )}
       

        {/* Submit Button */}
        {/* {!loading ?  <Button variant="primary" type="submit" className="mb-3">
          {ngoData ? 'Update NGO' : 'Add NGO'}
        </Button> : 
        <Button variant="primary" type="button" className="mb-3">
         loading...
      </Button>
        } */}
      </Form>
 
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {/* <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button> */}
              {activeStep !== steps.length &&
                // (completed[activeStep] ? (
                //   <Typography variant="caption" sx={{ display: 'inline-block' }}>
                //     Step {activeStep + 1} already completed
                //   </Typography>
                // ) :
                 (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Next'}
                  </Button>
                // )
                )}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
    </div>

//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter NGO name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="UniqueId">
//           <Form.Label>Unique ID of VO/NGO</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter Unique ID"
//             name="Unique Id of VO/NGO"
//             value={formData["Unique Id of VO/NGO"]}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="DetailsOfAchievements">
//           <Form.Label>Details of Achievements</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             placeholder="Enter details of achievements"
//             name="Details of Achievements"
//             value={formData["Details of Achievements"]}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         {/* Registration Details */}
//         <h4 className="my-3">Registration Details</h4>
//         {['Registered With', 'Type of NGO', 'Registration No', 'Copy of Registration Certificate', 'Copy of Pan Card', 'Act name', 'City of Registration', 'State of Registration', 'Date of Registration'].map(field => {
//            if(formData["Registration Details"][field] != null){
//          return <Form.Group controlId={field} key={field}>
//             <Form.Label>{field}</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder={`Enter ${field}`}
//               name={`Registration Details.${field}`}
//               value={formData["Registration Details"][field] || ''}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           }else{
//             return "";
//           }
// })}

//         {/* Key Issues */}
//         <h4 className="my-3">Key Issues</h4>
//         {['Key Issues', 'Operational Area-States', 'Operational Area-District'].map(field => {
//           if(formData["Key Issues"][field] != null) {
//           return <Form.Group controlId={field} key={field}>
//             <Form.Label>{field}</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder={`Enter ${field}`}
//               name={`Key Issues.${field}`}
//               value={formData["Key Issues"][field] || ''}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           }else{
//             return "";
//           }
//     })}

//         {/* Contact Details */}
//         <h4 className="my-3">Contact Details</h4>
//         {['Address', 'City', 'State', 'Telephone', 'Mobile No', 'Website Url', 'E-mail'].map(field => {

//         if(formData["Contact Details"][field] != null) {
//          return <Form.Group controlId={field} key={field}>
//             <Form.Label>{field}</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder={`Enter ${field}`}
//               name={`Contact Details.${field}`}
//               value={formData["Contact Details"][field] || ''}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//         }else{
//             return "";
//         }
//      })}

//       {/* Members */}
//       <h4 className="my-3">Members</h4>
//       {formData.Members.map((member, index) => (
//         <div key={index}>
//             <h5>Member {index+1} information </h5>
//             {['Name', 'Designation', 'Pan', 'Aadhaar'].map(field => {
//                 if(formData.Members[index][field] != null) {
//                 return <Form.Group controlId={field} key={field}>

//                     <Form.Label>{field}</Form.Label>
//                     <Form.Control
//                     type="text"
//                     placeholder={`Enter ${field}`}
//                     name={`formData.Members[${index}].${field}`}
//                     value={formData.Members[index][field] || ''}
//                     onChange={handleChange}
//                     required
//                     />
//                 </Form.Group>
//                 }else{
//                     return "";
//                 }
//                 })}
//         </div>
//       ))}

//       {/* FCRA details */}
//       <h4 className="my-3">FCRA details</h4>
//       {formData["FCRA details"].map((member, index) => (
//         <div key={index}>
//             <h5>FCRA detail {index+1}  </h5>
//             {['FCRA Available', 'FCRA Registration no.'].map(field => {
//                 if(formData["FCRA details"][index][field] != null) {
//                 return <Form.Group controlId={field} key={field}>

//                     <Form.Label>{field}</Form.Label>
//                     <Form.Control
//                     type="text"
//                     placeholder={`Enter ${field}`}
//                     name={`formData.FCRA details[${index}].${field}`}
//                     value={formData["FCRA details"][index][field] || ''}
//                     onChange={handleChange}
//                     required
//                     />
//                 </Form.Group>
//                 }else{
//                     return "";
//                 }
//                 })}
//         </div>
//       ))}


//        {/* Source of Funds */}
//        <h4 className="my-3">Source of Funds</h4>
//       {formData["Source of Funds"].map((member, index) => (
//         <div key={index}>
//             <h5>Source of Funds {index+1}  </h5>
//             {['Department Name', 'Source' , "Finacial Year","Amount Sanctioned","Purpose"].map(field => {
//                 if(formData["Source of Funds"][index][field] != null) {
//                 return <Form.Group controlId={field} key={field}>

//                     <Form.Label>{field}</Form.Label>
//                     <Form.Control
//                     type="text"
//                     placeholder={`Enter ${field}`}
//                     name={`formData.Source of Funds[${index}].${field}`}
//                     value={formData["Source of Funds"][index][field] || ''}
//                     onChange={handleChange}
//                     required
//                     />
//                 </Form.Group>
//                 }else{
//                     return "";
//                 }
//                 })}
//         </div>
//       ))}

//         {/* Submit Button */}
//         {!loading ?  <Button variant="primary" type="submit" className="mb-3">
//           {ngoData ? 'Update NGO' : 'Add NGO'}
//         </Button> : 
//         <Button variant="primary" type="button" className="mb-3">
//          loading...
//       </Button>
//         }
//       </Form>
 
);
};

export default NGOForm;

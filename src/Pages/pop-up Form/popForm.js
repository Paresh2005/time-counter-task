import React, { useState } from "react";
import "./popForm.css";
import Swal from "sweetalert2";

import {SERVER_BASE_URL} from "../../Util/Base_Url"

function PopupButton({ ngoId  , onClose, email }) {
  const [selectedOption, setSelectedOption] = useState("help");
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState();
  const [loginToken, setLoginToken] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const validate = () => {
    const newErrors = {};
    const namePattern = /^[A-Za-z\s]+$/;

    if (!data.userName) newErrors.userName = "Name is required";
    else if (!namePattern.test(data.userName)) {
      newErrors.userName = "Name cannot contain numbers or special characters";
    }

    if (!data.userEmail) newErrors.userEmail = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.userEmail)) {
      newErrors.userEmail = "Email address is invalid";
    }
    if (!data.userMobile) {
      newErrors.userMobile = "Mobile No is required";
    } else if (!/^\d{10}$/.test(data.userMobile)) {
      newErrors.userMobile = "Mobile No must be 10 digits";
    }
    if (!data.userAddress) newErrors.userAddress = "Address is required";
    if (!data.userCity) newErrors.userCity = "City is required";
    if (!data.userPin) newErrors.userPin = "Pin code is required";

    if (selectedOption === "help") {
      if (!data.userType) newErrors.userType = "Type of help is required";
      if (!data.userHelpCategory || data.userHelpCategory === "Type of Help")
        newErrors.userHelpCategory = "Category of help is required";
    } else if (selectedOption === "volunteer") {
      if (!data.userAbout)
        newErrors.userAbout = "Brief about yourself is required";
      if (
        !data.userQualification ||
        data.userQualification === "Select Highest Degree"
      )
        newErrors.userQualification = "Qualification is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGetOtp = () => {
    const namePattern = /^[A-Za-z\s]+$/;
    if (!data.userEmail || !/\S+@\S+\.\S+/.test(data.userEmail)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userEmail: "Valid email is required to get OTP",
      }));
      return;
    }
    if (!data.userName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userName: "Name is required",
      }));
      return;
    } else if (!namePattern.test(data.userName)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userName: "Name cannot contain numbers or special characters",
      }));
      return;
    }else if (data.userName.length < 3 || data.userName.length > 25) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userName: "Name must be between 3 and 25 characters",
      }));
      return;
    }
    const forOTP = {
      name: data.userName,
      email: data.userEmail,
    };

    setIsLoading(true); // Set loading to true
    Swal.fire({
      title: "Sending OTP...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    fetch("https://hatimmerchant.pythonanywhere.com/auth/getOTP", {
      method: "POST",
      body: JSON.stringify(forOTP),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        setToken(res);
        Swal.fire({
          title: "OTP Sent!",
          text: "An OTP has been sent to your email.",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        setIsLoading(false); // Set loading to false
        Swal.fire({
          title: "Error!",
          text: "Failed to send OTP. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all the required fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const forLogin = {
      otp: data.userOTP,
    };

    setIsLoading(true); // Set loading to true
    Swal.fire({
      title: "Submitting...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const loginResponse = await fetch("https://hatimmerchant.pythonanywhere.com/auth/login", {
        method: "POST",
        body: JSON.stringify(forLogin),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token.token,
        },
      });
      const loginResult = await loginResponse.json();
      setLoginToken(loginResult);

      if (loginResult.token) {
        data.toEmail = email;
        data.selectedOPTION = selectedOption;
        data.ngoId = ngoId;

        const response = await fetch(`${SERVER_BASE_URL}/api/user/userContact`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          Swal.fire({
            title: "Success!",
            text: "Your data has been sent successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
          onClose(); // Close the popup after submission
        } else {
          Swal.fire({
            title: "Error!",
            text: "There was an issue submitting your form. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "Invalid OTP. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an issue submitting your form. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <>
      <div className="popup-overlay">
        <div className="popup-content">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-6 form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  checked={selectedOption === "help"}
                  value="help"
                  onChange={handleOptionChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  <b className="radioSelect">For Help</b>
                </label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  value="volunteer"
                  checked={selectedOption === "volunteer"}
                  onChange={handleOptionChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  <b className="radioSelect">For Volunteer</b>
                </label>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <label htmlFor="name" className="form-label">
                  Full Name<span className="requiredPopup">*</span>
                </label>
                <input
                  type="text"
                  className="form-control inputsizePop"
                  id="name"
                  placeholder="First + Middle + Surname"
                  onChange={(e) => {
                    setData({ ...data, userName: e.target.value });
                  }}
                />
                {errors.userName && (
                  <div className="error">{errors.userName}</div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mobilepop">
                <label htmlFor="number" className="form-label">
                  Mobile No<span className="requiredPopup">*</span>
                </label>
                <input
                  type="number"
                  className="form-control inputmobilepop "
                  id="number"
                  onChange={(e) => {
                    setData({ ...data, userMobile: e.target.value });
                  }}
                />
                {errors.userMobile && (
                  <div className="error">{errors.userMobile}</div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-5">
                <label htmlFor="email" className="form-label">
                  Email<span className="requiredPopup">*</span>
                </label>
                <input
                  type="email"
                  className="form-control inputsizePop"
                  id="email"
                  onChange={(e) => {
                    setData({ ...data, userEmail: e.target.value });
                  }}
                />
                {errors.userEmail && (
                  <div className="error">{errors.userEmail}</div>
                )}
              </div>
              <div className="col-md-2 mobileviewpb">
                <label className="form-label blockformobile">&nbsp;</label>
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={handleGetOtp}
                >
                  Get OTP
                </button>
              </div>
              <div className="col-md-5 optboxpop">
                <label htmlFor="otp" className="form-label">
                  OTP<span className="requiredPopup">*</span>
                </label>
                <input
                  type="name"
                  className="form-control optpop"
                  id="otp"
                  onChange={(e) => {
                    setData({ ...data, userOTP: e.target.value });
                  }}
                />
                {errors.userOTP && (
                  <div className="error">{errors.userOTP}</div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">
                  Address<span className="requiredPopup">*</span>
                </label>
                <input
                  type="text"
                  className="form-control inputsizePop"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  onChange={(e) => {
                    setData({ ...data, userAddress: e.target.value });
                  }}
                />
                {errors.userAddress && (
                  <div className="error">{errors.userAddress}</div>
                )}
              </div>
            </div>
            {selectedOption === "help" && (
              <>
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="inputAddress2" className="form-label">
                      Type of Help Needed for Details
                      <span className="requiredPopup">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control inputsizePop"
                      id="inputAddress2"
                      placeholder="Education, Health, Legal Help.."
                      onChange={(e) => {
                        setData({ ...data, userType: e.target.value });
                      }}
                    />
                    {errors.userType && (
                      <div className="error">{errors.userType}</div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="inputCity" className="form-label">
                      City<span className="requiredPopup">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control inputsizePop"
                      id="inputCity"
                      onChange={(e) => {
                        setData({ ...data, userCity: e.target.value });
                      }}
                    />
                    {errors.userCity && (
                      <div className="error">{errors.userCity}</div>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">
                      Category of Help<span className="requiredPopup">*</span>
                    </label>
                    <select
                      id="inputState"
                      className="form-select"
                      onChange={(e) => {
                        setData({ ...data, userHelpCategory: e.target.value });
                      }}
                    >
                      <option selected>Type of Help</option>
                      <option value="Education">Education</option>
                      <option value="Occupation">Occupation</option>
                      <option value="Health">Health</option>
                    </select>
                    {errors.userHelpCategory && (
                      <div className="error">{errors.userHelpCategory}</div>
                    )}
                  </div>
                  <div className="col-md-2 ps-2 form-group">
                    <label htmlFor="inputZip" className="form-label">
                      Pin<span className="requiredPopup">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control inputsizePop"
                      id="inputZin"
                      onChange={(e) => {
                        setData({ ...data, userPin: e.target.value });
                      }}
                    />
                    {errors.userPin && (
                      <div className="error">{errors.userPin}</div>
                    )}
                  </div>
                </div>
              </>
            )}

            {selectedOption === "volunteer" && (
              <>
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="inputAddress2" className="form-label">
                      About Yourself in Brief
                      <span className="requiredPopup">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress2"
                      placeholder="I am a member of NSS.."
                      onChange={(e) => {
                        setData({ ...data, userAbout: e.target.value });
                      }}
                    />
                    {errors.userAbout && (
                      <div className="error">{errors.userAbout}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputCity" className="form-label">
                      City<span className="requiredPopup">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCity"
                      onChange={(e) => {
                        setData({ ...data, userCity: e.target.value });
                      }}
                    />
                    {errors.userCity && (
                      <div className="error">{errors.userCity}</div>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">
                      Qualification<span className="requiredPopup">*</span>
                    </label>
                    <select
                      id="inputState"
                      className="form-select"
                      onChange={(e) => {
                        setData({ ...data, userQualification: e.target.value });
                      }}
                    >
                      <option selected>Select Highest Degree</option>
                      <option value="12th Pass">12th Pass</option>
                      <option value="10th Pass">10th Pass</option>
                      <option value="Graduate/Pursuing">
                        Graduate/Pursuing
                      </option>
                    </select>
                    {errors.userQualification && (
                      <div className="error">{errors.userQualification}</div>
                    )}
                  </div>
                  <div className="col-md-2 ps-2 form-group">
                    <label htmlFor="inputZip" className="form-label">
                      Pin<span className="requiredPopup">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputZin"
                      onChange={(e) => {
                        setData({ ...data, userPin: e.target.value });
                      }}
                    />
                    {errors.userPin && (
                      <div className="error">{errors.userPin}</div>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="row">
              <div className="col-6 pb-2 pe-2 submitPop">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <div className="col-6 pb-2 ps-2 closePop">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PopupButton;

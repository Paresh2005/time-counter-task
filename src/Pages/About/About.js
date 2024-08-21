// About.js
import ngoImage from "./images/aboutImage6.jpg";
import React from "react";
import "./About.css"; // Import your CSS file with styles for the About component

function About() {
  return (
    <div className="about-container">
      <section className="about-section ">
        <h2 className="text-center bborderLine">About Us</h2>
        <p>
        <p>Unite Up Foundation is dedicated to focusing on areas that are less privileged, serving as a conduit for connecting disadvantaged individuals with government schemes and NGOs working towards their betterment. <br/><br/>
        Our organization is comprised of dedicated university and college students who are passionate about creating positive environments and communities.</p>
        </p>
      </section>
      <section className="image-section img-fluid aboutImage5">
        <img src={ngoImage} alt="About Us" />
      </section>
      <section className="aim-section ">
        <h2 className="text-center mt-4 bborderLine">Aim of the Project</h2>
        <p>
          Our website aims to bridge the{" "}
          <b className="keywords">
            gap between NGOs, charities, and those in need
          </b>{" "}
          by providing a platform where individuals can easily find assistance
          based on their{" "}
          <b className="keywords">specific needs and location.</b> Whether it's
          access to food, shelter, education, or healthcare, users can search
          for help in their district or city and connect with organizations
          offering support in that area. By facilitating these connections, we
          strive to empower communities and foster a spirit of giving that makes
          a meaningful difference in the lives of the less privileged.
        </p>
      </section>
      <section className="mission-section ">
        <h2 className="text-center bborderLine">Mission of the Project</h2>
        <ul>
          <li>
            <b>Facilitating Connections:</b> Our mission is to create a seamless
            platform where NGOs and charities can easily connect with less
            privileged individuals based on their specific needs, categories,
            and geographical locations.
          </li>
          <li>
            <b>Empowering NGOs:</b> We aim to empower NGOs by providing them
            with a user-friendly portal to search for and identify individuals
            in need from various areas. This feature streamlines the process of
            finding and reaching out to those who require assistance, thereby
            maximizing the impact of their philanthropic efforts.
          </li>
          <li>
            <b>Tailored Matching:</b> Our website facilitates precise matching
            between NGOs and less privileged individuals by allowing
            organizations to filter search results based on help needed
            categories and districts/cities. This ensures that assistance is
            targeted and tailored to the unique requirements of each individual.
          </li>
          <li>
            <b>Enhancing Outreach:</b> By leveraging technology, we strive to
            enhance the outreach of NGOs and charities, enabling them to extend
            their support to a wider demographic and make a tangible difference
            in the lives of those facing adversity.
          </li>
          <li>
            <b>Fostering Community Engagement:</b> Through our platform, we seek
            to foster a sense of community engagement and solidarity, wherein
            individuals and organizations can come together to address social
            issues and create positive change in society.
          </li>
        </ul>
      </section>
      <section className="how-to-use-section ">
        <h2 className="text-center bborderLine">How to Use Website</h2>
        <section class="how-to-use">
          
          <ol>
            <li>
              <strong>Sign Up:</strong> Register an account as an NGO or charity
              organization.
            </li>
            <li>
              <strong>Set Preferences:</strong> Define the categories of help
              your organization specializes in and the geographical areas you
              serve.
            </li>
            <li>
              <strong>Browse Profiles:</strong> Explore profiles of less
              privileged individuals based on their help needed category and
              location.
            </li>
            <li>
              <strong>Connect:</strong> Reach out to individuals whose needs
              align with your organization's mission and resources.
            </li>
            <li>
              <strong>Track Progress:</strong> Monitor your interactions and the
              impact of your assistance through our platform.
            </li>
          </ol>
        </section>
      </section>
    </div>
  );
}

export default About;

// import React, { useEffect, useState } from "react";
// import "../Education/Education.css";
// import { Link } from "react-router-dom";
// import DataTable from "react-data-table-component";
// import "./About.css";

// function About({ category }) {

//   const [ngoList, setNgoList] = useState([]);
//   const [flag, setFlag] = useState(false);
//   const [filterNgoList, setfilterNgoList] = useState([]);

//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetch(`/edu?category=${category}`)
//       .then((res) => res.json())
//       .then((res) => setNgoList(res));
//   }, [category]);

//   const handleCitySelect = (city) => {

//     if(city=="Select District" || city=="N/A"){
//       setFlag(false);
//     }
//     else{
//       setFlag(true);
//       filterNgo(city);
//     }
//   };
//   const filterNgo = (city) => {
//     var data = ngoList;
//     const filteredNgo = data.filter((ngo) => {
//       return ngo.contacts?.City == city;
//     });
//     setfilterNgoList([...filteredNgo]);
//   };

//   const formattedCity=ngoList.map((district) =>{
//     return (
//       <>
//         <option value={district.contacts?.City}>{district.contacts?.City || "N/A"}</option>
//       </>
//     );
//   })
//   const filteredData = flag ? filterNgoList : ngoList;

//   const columns = [
//     {
//       name: "No",
//       selector: (_, index) => index + 1,
//       sortable: true,
//       width: "8%",
//       style: {
//         fontSize: "16px",
//         maxWidth: "10px",
//       },
//     },
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       wrap: true,
//       width: "30%",
//       style: {
//         fontSize: "16px",
//         // maxWidth: "40%",
//       },
//     },
//     {
//       name: "Address",
//       selector: (row) => row.contacts?.Address || "N/A",
//       wrap: true,
//       width: "35%",
//       style: {
//         fontSize: "16px",
//         maxWidth: "50%",
//       },
//     },
//     {
//       name: "View Details",
//       cell: (row) => (
//         <Link
//           className="btn btn-primary buttonVD"
//           to={`/education/detailPage/${row._id}`}
//         >
//           View Detail
//         </Link>
//       ),
//       style: {
//         maxWidth: "15%",
//       },
//     },
//     {
//       name: "Donate",
//       width: "150px",
//       cell: () => (
//         <a className="btn btn-success" href="detailPage.html">
//           Donate
//         </a>
//       ),
//     },
//   ];

//   const customStyles = {
//     headRow: {
//       style: {
//         backgroundColor: "#182848",
//         color: "white",
//         border: "none",
//         fontSize: "20px",
//       },
//     },
//     headCells: {
//       style: {
//         paddingLeft: "14px",
//         paddingRight: "8px",
//         justifyContent: "start",
//       },
//     },

//     rows: {
//       style: {
//         minHeight: "56px",
//       },
//     },

//     rowsPerPage: {
//       style: {
//         marginTop: "20px",
//       },
//     },
//     pagination: {
//       style: {
//         display: "flex",
//         justifyContent: "center",
//         marginTop: "20px",
//       },

//       pageButton: {
//         borderRadius: "50%",
//         padding: "6px 12px",
//         margin: "0 5px",
//         background: "#fff",
//         border: "1px solid #dee2e6",
//         color: "#007bff",
//         cursor: "pointer",
//       },
//     },

//     pageButtonActive: {
//       background: "#007bff",
//       color: "#fff",
//       border: "1px solid #007bff",
//     },
//   };

//   return (
//     <>
//       <form>
//         <div className="row">
//           <div className="col-md-9">
//             <input
//               className="form-control searchBar"
//               id="exampleDataList"
//               placeholder="Type to search..."
//               onChange={(e) => {
//                 setSearch(e.target.value);
//               }}
//             />
//           </div>
//           <div className="col-md-3">
//             <select
//               className="form-select selectDis"
//               aria-label="Default select example"
//               onChange={(e) => {
//                 return handleCitySelect(e.target.value);
//               }}
//             >
//               <option selected>
//                 <b value="all" >Select District</b>
//               </option>
//               {formattedCity}
//               {/* <option value="Mehsana">Mehsana</option> */}
//               {/* <option value="Ahmedabad">Ahemdabad</option>
//               <option value="Surat">Surat</option>
//               <option value="Varodara">Varodara</option> */}
//             </select>
//           </div>
//         </div>
//       </form>
//       <div className="row">
//         <div className="col colCSS2">
//           <DataTable
//             columns={columns}
//             data={
//               filteredData &&
//               filteredData.filter((ngo) =>
//               ngo.name.toLowerCase().includes(search.toLowerCase())
//             )
//             }
//             pagination
//             highlightOnHover
//             striped
//             responsive
//             wrap
//             customStyles={customStyles}
//           />
//         </div>
//       </div>
//     </>
//   );
// }
// export default About;

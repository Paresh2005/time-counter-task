import React, { useEffect, useState } from "react";
import "./NgosList.css";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import toast from 'react-hot-toast';

import {SERVER_BASE_URL} from "../../Util/Base_Url"




const gujaratDistricts = [
  "Ahmedabad",
  "Amreli",
  "Anand",
  "Aravalli",
  "Banaskantha",
  "Bharuch",
  "Bhavnagar",
  "Botad",
  "Chhota Udaipur",
  "Dahod",
  "Dang",
  "Devbhoomi Dwarka",
  "Gandhinagar",
  "Gir Somnath",
  "Jamnagar",
  "Junagadh",
  "Kheda",
  "Kutch",
  "Mahisagar",
  "Mehsana",
  "Morbi",
  "Narmada",
  "Navsari",
  "Panchmahal",
  "Patan",
  "Porbandar",
  "Rajkot",
  "Sabarkantha",
  "Surat",
  "Surendranagar",
  "Tapi",
  "Vadodara",
  "Valsad"
];


function Education() {
  const navigate = useNavigate();

  const { category} = useParams();
  const [ngoList, setNgoList] = useState([]);
  const [flag, setFlag] = useState(false);
  const [filterNgoList, setfilterNgoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [city , setCity] = useState("");
  const [ngoLength , setNgoLength] = useState(0);
  const [currPageNumber , setCurrPageNumber] = useState(0);

  useEffect(() => {
    setCurrPageNumber(0);
    fetchOnePageData(0);
  }, [category, city,search]);

  // useEffect(() => {
  //   fetch(`${SERVER_BASE_URL}/api/ngo/getAllNgo?pageNumber=${currPageNumber}&category=${category}`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setcitySelected(res.data);
  //     });

  // }, [category]);

  const fetchOnePageData = (PageNumber) => {
    setLoading(true);
    try{
      fetch(`${SERVER_BASE_URL}/api/ngo/getAllNgo?pageNumber=${PageNumber}&category=${category}&city=${city}&searchName=${search}`)
      .then((res) => res.json())
      .then((res) => {    
        setfilterNgoList(res.data.ngos);
        setNgoList(res.data.ngos);
        setNgoLength(res.data.totalNgoLength);
        setLoading(false);
      });
    }catch(error){
      console.log(error);
      toast.error("Some error occured while fetching data");
      setLoading(false);
      // Navigate(-1);
    }finally{
      // setLoading(false);
    }
  }


  const handlePageClick = (data) => {
    let pageNumber = data.selected; // No need to add 1 if you're using zero-based indexing.
    setCurrPageNumber(pageNumber);
    fetchOnePageData(pageNumber); // Trigger data fetch immediately after setting the page number.
  };
  

  const handleCitySelect = (city) => {
    if (city == "Select District") {
      navigate("/" + category); 
      setFlag(false);
    }
    else{
      navigate("/" + category + "/city/" + city);
    }
  };
  const formattedCityOptions = gujaratDistricts.map((district) => (
    <option value={district} key={district}>
      {district.toUpperCase()}
    </option>
  ));

  const filteredData = flag ? filterNgoList : ngoList;


  const columns = [
    {
      name: "No",
      selector: (_, index) => (index + 1) + (currPageNumber * 10),
      sortable: true,
      width: "8%",
      style: {
        fontSize: "16px",
        maxWidth: "10px",
      },
    },
    {
      name: "Name",
      selector: (row) => row.name,
      wrap: true,
      width: "30%",
      style: {
        fontSize: "16px",
      },
    },
    {
      name: "Address",
      selector: (row) => row["Contact Details"]?.Address || "N/A",
      wrap: true,
      width: "35%",
      style: {
        fontSize: "16px",
        maxWidth: "50%",
      },
    },
    {
      name: "View Details",
      cell: (row) => (
        <Link
          className="btn btn-primary buttonVD"
          to={`/${category}${city ? `/city/${city}` : ""}/detailPage/${row._id}`}
        >
          View Detail
        </Link>
      ),
      style: {
        maxWidth: "15%",
      },
    },
    {
      name: "Donate",
      width: "150px",
      cell: () => (
        <a className="btn btn-success" href="detailPage.html">
          Donate
        </a>
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#182848",
        color: "white",
        border: "none",
        fontSize: "20px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "14px",
        paddingRight: "8px",
        justifyContent: "start",
      },
    },

    rows: {
      style: {
        minHeight: "56px",
      },
    },

    rowsPerPage: {
      style: {
        marginTop: "20px",
      },
    },
    pagination: {
      style: {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      },

      pageButton: {
        borderRadius: "50%",
        padding: "6px 12px",
        margin: "0 5px",
        background: "#fff",
        border: "1px solid #dee2e6",
        color: "#007bff",
        cursor: "pointer",
      },
    },

    pageButtonActive: {
      background: "#007bff",
      color: "#fff",
      border: "1px solid #007bff",
    },
  };

  return (
    <>
      <form>
        <div className="row">
          <div className="col-md-9 ">
            <input
              className="form-control searchBar"
              id="exampleDataList"
              placeholder="Type to search..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-select selectDis"
              aria-label="Default select example"
              onChange={(e) => {
                return setCity(e.target.value == "Select District"? "":e.target.value);
              }}
            >
              <option selected>
                <b value="all">Select District</b>
              </option>
              {formattedCityOptions}
            </select>
          </div>
        </div>
      </form>

      <div className="row pe-2 ps-2">
        <div className="col colCSS2">
          <DataTable
            columns={columns}
            data={
              filteredData
              // filteredData.filter((ngo) =>
              //   ngo.name.toLowerCase().includes(search.toLowerCase())
              // )
            }
            highlightOnHover
            striped
            responsive
            wrap
            customStyles={customStyles}
            progressPending={loading}
            progressComponent={
              <div class="text-center mt-2 mb-4">
                <div class="spinner-border" role="status">
                  <span class="sr-only ">Loading...</span>
                </div>
              </div>
            }
          />
              <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={ngoLength/10}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
        </div>
      </div>
    </>
  );
}
export default Education;

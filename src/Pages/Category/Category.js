import React, { useEffect, useState } from "react";
import "./Category.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { TailSpin } from 'react-loader-spinner';

const gujaratDistricts = [
  "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch",
  "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka",
  "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch",
  "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal",
  "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar",
  "Tapi", "Vadodara", "Valsad"
];

function Category() {
  const { category, city } = useParams();
  const [ngoList, setNgoList] = useState([]);
  const [filteredNgoList, setFilteredNgoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    try {
      // fetch(`http://localhost:3030/edu?category=${category}&city=${city}&page=${currentPage + 1}&limit=${itemsPerPage}`)
      fetch(`http://localhost:3030/api/ngo/getAllNgo?&category=${category}&city=${city}`)
        .then((res) => res.json())
        .then((res) => {
          setNgoList(res.data.ngos);
          setTotalPages(res.data.totalNgoLength);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [category, city, currentPage]);
  

  useEffect(() => {
    const filteredList = ngoList.filter(ngo =>
      ngo.name.toLowerCase().includes(search.toLowerCase()) ||
      (ngo["Contact Details"]?.Address || "").toLowerCase().includes(search.toLowerCase())
    );
    setFilteredNgoList(filteredList);
  }, [search, ngoList]);

  const handleCitySelect = (city) => {
    if (city === "Select District") {
      navigate("/" + category);
    } else {
      navigate("/" + category + "/city/" + city);
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const formattedCityOptions = gujaratDistricts.map((district) => (
    <option value={district} key={district}>
      {district.toUpperCase()}
    </option>
  ));

  const formattedNgo = filteredNgoList.map((ngo, index) => (
    <tr key={ngo._id}>
      <td>{currentPage * itemsPerPage + index + 1}</td>
      <td>{ngo.name}</td>
      <td>{ngo["Contact Details"]?.Address || "N/A"}</td>
      <td>
        <Link
          className="btn btn-primary buttonVD"
          to={`/${category}${city ? `/city/${city}` : ""}/detailPage/${ngo._id}`}
        >
          View Detail
        </Link>
      </td>
      <td>
        <a className="btn btn-success donate-button" href="detailPage.html">
          Donate
        </a>
      </td>
    </tr>
  ));

  return (
    <>
      <form>
        <div className="row">
          <div className="col-md-9 ">
            <input
              className="form-control searchBar"
              id="exampleDataList"
              placeholder="Type to search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select selectDis"
              aria-label="Default select example"
              onChange={(e) => handleCitySelect(e.target.value)}
            >
              <option selected>Select District</option>
              {formattedCityOptions}
            </select>
          </div>
        </div>
      </form>

      <div className="row pe-2 ps-2">
        <div className="col colCSS2">
          {loading ? (
            <div className="loader-container">
              <TailSpin
                height="50"
                width="50"
                color="#003366" // Dark blue color
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={true}
              />
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="tableHeadBackground">
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>View Details</th>
                      <th>Donate</th>
                    </tr>
                  </thead>
                  <tbody>{formattedNgo}</tbody>
                </table>
              </div>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
                
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Category;

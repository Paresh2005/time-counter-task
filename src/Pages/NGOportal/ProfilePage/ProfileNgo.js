const express = require("express");
const YourModel = require("./YourModel.js");

const app = express();

// Pagination route handler
app.get("/yourModel", async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const pageNumber = parseInt(page);
  const limit = parseInt(pageSize);

  try {
    const totalCount = await YourModel.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    const data = await YourModel.find()
      .skip((pageNumber - 1) * limit)
      .limit(limit);

    res.json({
      data,
      pagination: {
        total: totalCount,
        totalPages,
        currentPage: pageNumber,
      },
    });
  } catch (error) {
    console.error("Error fetching paginated data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3030, () => {
  console.log("Server started at port 3030");
});
// react YourModel component
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

function YourComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await fetch(`${SERVER_BASE_URL}/yourModel?page=${page}&pageSize=${pageSize}`);
      const jsonData = await response.json();
      setData(jsonData.data);
      setPagination(jsonData.pagination);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handlePageChange = (newPage) => {
    fetchData(newPage);
  };

  const handlePerPageChange = (newPageSize) => {
    fetchData(1, newPageSize);
  };

  const columns = [
    // Define your DataTable columns here
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationServer
        paginationTotalRows={pagination.total}
        onChangeRowsPerPage={handlePerPageChange}
        paginationPerPage={pagination.pageSize}
        paginationRowsPerPageOptions={[10, 20, 30]}
        paginationDefaultPage={pagination.currentPage}
        paginationComponentOptions={{
          rowsPerPageText: "Rows per page:",
          rangeSeparatorText: "of",
          noRowsPerPage: false,
          selectAllRowsItem: false,
          selectAllRowsItemText: "All",
        }}
        paginationServerOptions={{
          persistSelectedOnPageChange: false,
          onPageChange: handlePageChange,
        }}
        progressPending={loading}
      />
    </div>
  );
}

export default YourComponent;

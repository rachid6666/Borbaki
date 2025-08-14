import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    // console.log('User state updated:', user);
  }, [user]);

  useEffect(() => {
    setList(data)
  }, [list]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
      window.location.reload();
    } catch (err) { }
  };
  // const handleView = async (id) => {
  //   console.log("view")
  //   // console.log(id)
  //   try {
  //     const response = await axios.get(`/${path}/${id}`);
  //     setUser(response.data);

  //     console.log("list", user)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // };
  const fetchData = async (id) => {
    try {
      const response = await axios.get(`/${path}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const handleView = async (id) => {
    // console.log("view");
    try {
      const userData = await fetchData(id);
      setUser(userData);
      navigateToOtherPage(userData);
    } catch (err) {
      console.error(err);
    }
  };

  const navigateToOtherPage = (userData) => {
    navigate("/users/test", { state: { user: userData } });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to={{ pathname: "/users/test", state: user }} style={{ textDecoration: "none" }}> */}
            <div className="viewButton" onClick={() => handleView(params.row._id)}> View</div>
            {/* </Link> */}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div >
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row => row._id}
      />
    </div>
  );
};

export default Datatable;

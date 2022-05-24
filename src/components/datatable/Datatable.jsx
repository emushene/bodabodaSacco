import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../firebase.mjs"
import { collection, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";


const Datatable = () => {
  const [data, setData] = useState([]);
  useEffect (()=>{

const unsub = onSnapshot(collection(db, "saccoMembers"), (snapShot) => {
  let list = [];

  snapShot.docs.forEach(doc=>{
    list.push({id:doc.id, ...doc.data()});
  });
  setData(list);

},
(error) => {
  console.log(error)
}
);
return () => {
  unsub();
}
  },[])

  const handleDelete = async (id) => {
try {
  await deleteDoc(doc(db, "saccoMembers", IDBCursorWithValue));
  setData(data.filter((item) => item.id !== id));

}
catch (err) {
  console.log(err)
}

    
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Member
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;

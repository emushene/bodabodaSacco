import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect} from "react";
import { db } from "../../firebase.mjs"
import { collection, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";






const List = () => {
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



  return (
  

    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Photo</TableCell>
            <TableCell className="tableCell">Full Name</TableCell>
            <TableCell className="tableCell">Phone No</TableCell>
            <TableCell className="tableCell">Location</TableCell>
            <TableCell className="tableCell">Bike Reg</TableCell>
            <TableCell className="tableCell">Bike Owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((unsub) => (
            <TableRow key={unsub.idno}>
              <TableCell className="tableCell">{unsub.idno}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={unsub.img} alt="" className="image" />
                  {unsub.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{unsub.ridername}</TableCell>
              <TableCell className="tableCell">{unsub.ridercell}</TableCell>
              <TableCell className="tableCell">{unsub.riderlocation}</TableCell>
              <TableCell className="tableCell">{unsub.bikeregnumber}</TableCell>
              <TableCell className="tableCell">{unsub.bikeowner}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;

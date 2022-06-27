import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import QRCode from 'react-qr-code';
import { useState, useEffect } from "react";
import { db } from "../../firebase.mjs"
import { collection, onSnapshot } from "firebase/firestore";
//import { list } from "firebase/storage";

// Test another github push
const Single = () => {

  const [qrcodeData, setQrcodeData] = useState([]);
  const [back, setBack] = useState('#FFFFFF');
  const [fore, setFore] = useState('#000000');
  const [size, setSize] = useState(256);
  
  useEffect (()=>{

    const unsub = onSnapshot(collection(db, "saccoMembers"), (snapShot) => {
      let list = [];
    
      snapShot.docs.forEach(doc=>{
        list.push({id:doc.id, ...doc.data()});
      });
      setQrcodeData(list);
    
    },
    (error) => {
      console.log(error)
    }
    );
    return () => {
      unsub();
    }
      },[])

  console.log(qrcodeData)








  

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" >Edit</div>
            <div style={{marginLeft: '50PX', fontSize: "16px"}}><h1 className="title-TITLE">MATHARE SUB-COUNTY</h1></div>
            <div style={{ marginLeft: "160px"}}><h2 className="sub-title"> HURUMA BODABODA </h2></div>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  
                </div>
                <div className="detailItem">
                  <span className="itemKey">***</span>
                  
                </div>
                <div className="detailItem">
                  <span className="itemKey">*:</span>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
        <List/>
        </div>
      </div>
    </div>

    


  );



  
};

export default Single;

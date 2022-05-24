import "./new.scss";
//import { userInputs, userInputs} from "../../formSource";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import {doc, setDoc, collection, addDoc} from "firebase/firestore";
import { db, storage, auth } from "../../firebase.mjs";
import { ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";




const New = ({ inputs, title }) => {
const [file, setFile] = useState("");
const [data, setData] = useState({});
const [uploadingwait, setUploadingwait] = useState(null);



let governmentId= data.idno

//upLoad QR

//Upload Pictures

useEffect(() => {
const uploadFile = () => {

  


  const storageRef = ref(storage, governmentId);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on('state_changed', 
    (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      setUploadingwait(progress)
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
          default:
          break;

      }
    }, 
    (error) => {
      
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setData((previousData)=> ({...previousData, img:downloadURL}))
      });
      
    }

  );
    
}
file && uploadFile()
},[file])

const handleInput = (e) => {
  const id = e.target.id;
  const value = e.target.value;

  setData({...data, [id]:value})
}

const handleAdd = async (e) => {
  e.preventDefault()
  let governmentId = data.idno;
  
try {


await setDoc(doc(db, "saccoMembers", governmentId), {
...data
});


}
catch (err){
console.log(err)
}
}

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Upload Picture/Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id}
                  type={input.type} placeholder={input.placeholder} onChange={handleInput} />
                </div>
              ))}
              <button disabled={uploadingwait !== null && uploadingwait < 100}
               type="submit">Register Member</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

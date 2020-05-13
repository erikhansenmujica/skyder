import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import * as firebase from "firebase";
axios.defaults.withCredentials = true;
var firebaseConfig = {
  apiKey: "AIzaSyCpkxT09AL7mL7futcGLY2Q4BXbXSSSKcs",
  authDomain: "skyder-247e8.firebaseapp.com",
  databaseURL: "https://skyder-247e8.firebaseio.com",
  projectId: "skyder-247e8",
  storageBucket: "skyder-247e8.appspot.com",
  messagingSenderId: "317645928459",
  appId: "1:317645928459:web:26986c71768abfc4d06f0e",
  measurementId: "G-P8YE0JHD29",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function App() {
  const [showAll, setShowAll] = useState(false);
  const [loader, setLoader] = useState(false);
  const [mail, setMail] = useState("");
  const [mailStatus, setMailStatus] = useState(
    "IF YOU WANT TWO FREE BEATS AND SEE THE PAGE CONTENT PLEASE SEND US YOUR EMAIL BELOW"
  );
  const [mailSent, setMailSent] = useState(false);
  const sendEmail = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        `https://skyder-api.herokuapp.com/send/${mail}`
      );
      if (response.data === "Email Sent") {
        try {
          await firebase
            .firestore()
            .collection("mails")
            .doc(mail.split("@")[0])
            .set({
              mail: mail,
            });
          console.log("Document successfully written!");
        } catch (err) {
          console.error("Error writing document: ", err);
        }
        setLoader(false);
        setMailSent(true);
      } else {
        setLoader(false);
        setMailStatus("PLEASE WRITE A REAL EMAIL");
      }
    } catch (err) {
      setLoader(false);
      console.log(err)
      return setMailStatus("SOMETHING WENT WRONG");
    }
  };
  const mailChange = (e) => {
    setMail(e.target.value);
  };
  return (
    <div className="App" style={{ overflowY: "hidden" }}>
      {!showAll && <div className="modal"></div>}
      {!showAll && (
        <div className="modalTitle">
          {!mailSent && <h2>{mailStatus}</h2>}
          {!mailSent && (
            <h5 style={{ margin: 0 }}>
              (free beat will be sent to your email)
            </h5>
          )}
          {!loader && !mailSent && <input onChange={mailChange}></input>}
          {!loader && !mailSent && (
            <div onClick={sendEmail} className="button">
              SUBMIT
            </div>
          )}
          {!loader && mailSent && <h1 style={{marginTop:"70px"}}>MAIL SENT! check your inbox</h1>}
          {!loader && mailSent && (
            <div onClick={()=>setShowAll(true)} className="button">
              CONTINUE TO HOME SCREEN
            </div>
          )}
          {loader && (
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </div>
      )}
      <iframe
        src="https://player.beatstars.com/?storeId=109358"
        width="100%"
        height="800"
        style={{
          width: "99vw",
          overflowY: "hidden",
          height: "98.9vh",
          margin: "0",
          filter: showAll ? "blur(0px)" : "blur(4px)",
        }}
      ></iframe>
    </div>
  );
}

export default App;

import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import "./handle.js";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
// gọi điện cho server port 4000
const ENDPOINT = "https://socketiosv.herokuapp.com/";
// const ENDPOINT = "http://localhost:4000/";
const socket = io(ENDPOINT, {
  transports: ["websocket"],
});

const formlogin = document.getElementsByClassName("login");
const formhome = document.getElementsByClassName("home");
const ndchat = document.getElementsByClassName("khungchat");
socket.on("connect", () => {
  console.log(socket.id + " đã kết nối!");
});
const App = (props) => {
  const [contents, setContents] = useState("");
  const [username, setUsername] = useState("");
  const [passwold, setPasswold] = useState("");
  const [listuser, setListuser] = useState([]);
  const [lschat, setLschat] = useState([]);

  //auto scroll xuống dưới khi có tin nhắn 
  function scrollToBottom () {
    // ndchat[0].scrollTop = ndchat[0].scrollHeight;
    ndchat[0].scrollTop= 500;
    console.log(ndchat[0].scrollHeight);
 }

 

  const handleLogin = () => {
    socket.emit("login", username,passwold);
  };
  const handleSignUp = () => {
    socket.emit("signup", username,passwold);
  };
  const handleClick = () => {
    socket.emit("sendmsg", contents, socket.Username);
    
    scrollToBottom();
    setContents("");
  };
  const handleLogout = ()=>{
    socket.emit("logout");
    formlogin[0].classList.remove("hiden");
    formlogin[0].classList.add("show");
    formlogin[1].classList.remove("hiden");
    formlogin[1].classList.add("show");
    formhome[0].classList.remove("show");
    formhome[0].classList.add("hiden");
  }
  socket.on("dktenthatbai", () => {
    alert("trùng tên, vui lòng đặt tên khác!");
  });
  socket.on("dktenthanhcong", (data) => {
    formlogin[0].classList.remove("show");
    formlogin[0].classList.add("hiden");
    formlogin[1].classList.remove("show");
    formlogin[1].classList.add("hiden");
    formhome[0].classList.remove("hiden");
    formhome[0].classList.add("show");
  });
  socket.on("dsuser", (dsuser) => {
    setListuser(dsuser);
  });
  socket.on("server-send-data",(arrchat)=>{
    setLschat(arrchat);
  });
  return (
    <>
      <div className="container py-5">
        <div className="login show">
          <div className="row justify-content-center">
            <div className="col-7">
              <h3>Login</h3>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="passwold"
                onChange={(e) => {
                  setPasswold(e.target.value);
                }}
              />
              <button
                type="button"
                className="btn btn-success "
                onClick={handleLogin}
              >
                login
              </button>
            </div>
          </div>
        </div>
        <div className="login show">
          <div className="row justify-content-center">
            <div className="col-7">
              <h3>SignUp</h3>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="passwold"
                onChange={(e) => {
                  setPasswold(e.target.value);
                }}
              />
              <button
                type="button"
                className="btn btn-success "
                onClick={handleSignUp}
              >
                SignUp
              </button>
            </div>
          </div>
        </div>
        <div className="home hiden">
          <div className="row justify-content-end">
            <div className="col-3 text-right">
              <button type="button" className="btn btn-primary" onClick={handleLogout}>logout</button>
            </div>
          </div>
          <div className="row">
            <div className="col-4 p-3 bg-info">
              <div className="listuser">
                <ul className="list-group">
                  {listuser.map((val) => {
                    if (val==username) {
                      return (
                        <li className="list-group-item" style={{background:"#9eea77"}}>{val}</li>
                      );
                    }
                    return (
                      <li className="list-group-item">{val}</li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="col-8">
              <div className="row">
                <div className="col-12">
                  <div className="khungchat">
                    {lschat.map((val)=>{
                      if (val.name == username) {
                        return(
                          <div className="contentchat text-right">
                            <div className="name">{val.name}</div>
                            <div className="content">{val.content}</div>
                          </div>
                        );
                      }
                      return (
                        <div className="contentchat">
                          <div className="name">{val.name}</div>
                          <div className="content">{val.content}</div>
                        </div>
                      );
                      })}
                    
                  </div>
                </div>
                <div className="col-12 editor">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="nội dung"
                    value={contents}
                    onChange={(e) => {
                      setContents(e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleClick}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

App.propTypes = {};

export default App;

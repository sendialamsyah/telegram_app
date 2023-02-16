import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import styles from "./chat.module.css";
import imageProfile from "../../assets/default profile.jpg";
import searchIcon from "../../assets/search-icon-transparent-images-vector-16.png";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import imgProfile from "../../assets/download-icon-profile+profile+page+user+icon-1320186864367220794_512.png";
// import Modal from "../../components/module/Modal"

const Chat = ({ socket }) => {
  const Navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState({});
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_API_RAILWAY}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const user = res.data.data;
        setProfile(user);
      });
  }, []);

  console.log(profile);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_API_RAILWAY}/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const users = res.data.data;
        setFriends(users);
      });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.off("newMessage");
      socket.on("newMessage", (message) => {
        setMessages((current) => [...current, message]);
        // console.log(messages);
      });
    }
  }, [socket]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_API_RAILWAY}/messages/${friend.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const messages = res.data.data;
        setMessages(messages);
      });
  }, [friend]);

  const handleSendMessage = () => {
    if (socket && message) {
      socket.emit(
        "sendMessage",
        {
          idReceiver: friend.id,
          messageBody: message,
        },
        (message) => {
          setMessages((current) => [...current, message]);
        }
      );
    }
    setMessage("");
  };
  const chooseFriend = (friend) => {
    setFriend(friend);
  };

  const deleteMessage = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_API_RAILWAY}/messages/${id}`)
      .then(() => {
        swal("Good job!", "Delete Message Success!", "success");
      });
  };

  return (
    <div>
      <div className={`row ${styles.row}`}>
        <div className={`col-3 ${styles.col1}`}>
          <div className={styles.app}>
            <h2>Telegram</h2>
            {/* <Modal/> */}
            {/* <button className={styles.dropdown} onClick={()=>Navigate(`/profile/${profile.id}`)}> {imgProfile} </button> */}
            <p
              className={styles.imgProfile}
              onClick={() => Navigate(`/profile/${profile.id}`)}
            >
              <img src={imgProfile} alt="img" width="50px" height="50px" />
            </p>
          </div>
          <div className={styles.search}>
            <input type="text" placeholder="Type your message..." />
            <h1> + </h1>
            <img src={searchIcon} alt="img" />
          </div>
          <div className={styles.menu}>
            <button>All</button>
            <button>Important</button>
            <button>Unread</button>
          </div>
          {friends.map((item) => (
            <div className={styles.profile} onClick={() => chooseFriend(item)}>
              <div className={styles.imageProfile}>
                <img src={item.image ? item.image : imageProfile} alt="img" />
              </div>
              <div className={styles.profileName}>
                <h5>{item.name}</h5>
                {/* <p></p> */}
              </div>
            </div>
          ))}
        </div>
        <div className={`col-9 ${styles.col2}`}>
          <div className={styles.profileNav}>
            <div className={styles.imageProfile}>
              <img src={friend.image ? friend.image : imageProfile} alt="img" />
            </div>
            <div className={styles.profileName}>
              <h5>{friend.name}</h5>
            </div>
          </div>
          <div className={styles.message}>
            <ScrollToBottom className={styles.scroll}>
              {messages.map((item) => (
                <div className={styles.bubbleWarpper}>
                  <li
                    className={` ${styles.bubbleChat} ${
                      item.receiver_id === friend.id
                        ? `${styles.bubbleFriend}`
                        : ""
                    }`}
                  >
                    <p>{item.message}</p>
                    <p className={styles.date}>
                      {item.date}{" "}
                      <button
                        onClick={() => deleteMessage(item.id)}
                        className={styles.delete}
                      >
                        delete
                      </button>
                    </p>
                  </li>
                </div>
              ))}
            </ScrollToBottom>
          </div>
          <div className={styles.inputMessage}>
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className={styles.buttonInput}
              onClick={handleSendMessage}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

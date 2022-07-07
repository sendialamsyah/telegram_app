import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import styles from "./chat.module.css";
import imageProfile from "./image/default profile.jpg";
import searchIcon from "./image/search-icon-transparent-images-vector-16.png";
import axios from "axios";

const Chat = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_API_BACKEND}/user`, {
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
      socket.off("NewMessage");
      socket.on("newMessage", (message) => {
        setMessages((current) => [...current, message]);
      });
    }
  }, [socket]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_API_BACKEND}/message/${friend.iduser}`, {
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
          idReceiver: friend.iduser,
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
  return (
    <div>
      <div className={`row ${styles.row}`}>
        <div className={`col-3 ${styles.col1}`}>
          <div className={styles.app}>
            <h2>Telegram</h2>
            <button className={styles.dropdown}> - </button>
            {/* <div className={styles.dropdownChild}>
                    <Link to='#'>Profile</Link>
                    <Link to='#'>Profile</Link>
                </div> */}
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
                <p>aplah</p>
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
                <div>
                  <div className={styles.imageProfile}>
                    <img
                      src={friend.image ? friend.image : imageProfile}
                      alt="img"
                    />
                  </div>
                  <li
                    className={` ${styles.bubbleChat} ${
                      item.receiverId !== friend.iduser
                        ? `${styles.bubbleFriend}`
                        : ""
                    }`}
                  >
                    <p>
                      {item.message} - {item.createdAt}
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

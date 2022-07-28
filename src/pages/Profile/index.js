import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./profile.module.css";
import imageProfile from "../../assets/default profile.jpg";
import axios from "axios";
import Button from "../../components/base/Button";
import swal from 'sweetalert'
// import { useDispatch, useSelector } from "react-redux";
// import {detailUser} from '../../configs/redux/actions/detailUserAction'

const Profile = () => {
    // const dispatch = useDispatch()
  const { iduser } = useParams();
  const [profile, setProfile] = useState([]);
  const Navigate = useNavigate()

  // const {detail} = useSelector((state) => state.profile);
  // console.log(detail);

  // useEffect(() => {
  //   dispatch(detailUser());
  // }, []);
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HEROKU}/users/${iduser}`)
      .then((res) => {
        const users = res.data.data;
        setProfile(users);
      });
  }, [iduser]);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const handleChangeImage = (e) => {
    setImage({
      file: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.file);
    formData.append("name", name);
    await axios
      .put(`${process.env.REACT_APP_API_HEROKU}/users/${iduser}`, formData)
      .then(() => {
        swal("Good job!", "Update Success!", "success");
        Navigate('/chat')
      })
      .catch((error) => {
        swal("Update Failed", "", "error");
        console.log(error);
      });
  };
  return (
    <div>
      <div className={`row ${styles.row}`}>
        <div className={`col-3 ${styles.col1}`}>
          <div className={styles.app}>
            <Link to="/chat">
              <h2>Telegram</h2>
            </Link>
            {/* <button className={styles.dropdown}> - </button> */}
            {/* <div className={styles.dropdownChild}>
                    <Link to='#'>Profile</Link>
                    <Link to='#'>Profile</Link>
                </div> */}
          </div>
          <div className={styles.profile}>
            <div className={styles.imageProfile}>
              <img
                src={profile.image ? profile.image : imageProfile}
                alt="img"
                className={styles.image}
              />
            </div>
            <div className={styles.profileName}>
              <h5>{profile.name}</h5>
            </div>
          </div>
        </div>
        <div className={`col-9 ${styles.col2}`}>
          <div className={styles.container}>
          <form onSubmit={handleEdit}>
            <div className={styles.formUpdate}>
              <div className={styles.insertImage}>
                <img
                  src={image.preview ? image.preview : imageProfile}
                  alt="img"
                />
              </div>
              <div className={styles.uploadImg}>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/png, image/jpeg"
                  onChange={handleChangeImage}
                />
              </div>
              <div className={styles.inputName}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={profile.name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <Button
                bgColor="#7E98DF"
                textColor="#FFFFFF"
                border="none"
                title="Update"
                type="submit"
              />
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

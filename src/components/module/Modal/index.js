// import React, {useState, useEffect} from 'react'
// import styles from './modal.module.css'
// import axios from 'axios'
// import { useParams } from 'react-router-dom';
// import imageProfile from "../../../assets/default profile.jpg";
// import Button from '../../base/Button'

// const Modal = () => {
//     const [modal, setModal] = useState(false);
//     const [profile, setProfile] = useState([])
//     const [formUpdate, setFormUpdate] = useState({
//         name: '',
//         image: null
//     })
    
//     useEffect(() => {
//         const token = localStorage.getItem('token')
//         axios.get("http://localhost:7000/v1/users/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }).then((res) => {
//           const user = res.data.data;
//           setProfile(user);
//         });
//       }, []);
      
//       // const {id} = useParams()
//       const handleGetDetail = async()=>{
//         const token = localStorage.getItem('token')
//         const result = await axios.get(`http://localhost:7000/v1/users/${profile.id}`, {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           })
//         console.log(result)
//         setFormUpdate({
//             ...formUpdate,
//             name: result.name,
//             image: result.image,
//             file_image: null
//         })
//       }
//       useEffect(()=>{
//         handleGetDetail()
//       }, [])
//       const handleChangeFile = (e) => {
//         const fileImage = e.target.files[0]
//         const preview = URL.createObjectURL(fileImage)
//         setFormUpdate({
//           ...formUpdate,
//             file_image: fileImage,
//             photo: preview
//         })
//       };
//       const handleChange = (e) => {
//         setFormUpdate((current) => {
//             return {
//                 ...current,
//           [e.target.name]: e.target.value,
//             }
//         });
//       };
//       const handleUpdate = async (e) => {
//         e.preventDefault()
//         const formData = new FormData()
//         formData.append('name', formUpdate.name)
//         formData.append('photo', formUpdate.file_image)
//         const token = localStorage.getItem('token')
//         const result = await axios.put(`http://localhost:7000/v1/users/${profile.id}`, {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           })
//         console.log(result)
//         .then(()=>{
//             alert('success')
//         })
//         .catch(()=> alert('error'))
//       };
//   const toggleModal = () => {
//     setModal(!modal);
//   };

//   if(modal) {
//     document.body.classList.add('activeMoodal')
//   } else {
//     document.body.classList.remove('activeModal')
//   }
//   return (
//     <>
//       <button onClick={toggleModal} className={styles.btnModal}>
//         Open
//       </button>

//       {modal && (
//         <div className={styles.modal}>
//           <div onClick={toggleModal} className={styles.overlay}></div>
//           <div className={styles.modalContent}>
//             <h2>{profile.name}</h2>
//             <form onSubmit={handleUpdate}>
//             <div className={styles.formUpdate}>
//               <div className={styles.insertImage}>
//                 <img
//                   src={profile.preview ? profile.preview : imageProfile}
//                   alt="img"
//                 />
//               </div>
//               <div className={styles.uploadImg}>
//                 <input
//                   type="file"
//                   name="image"
//                   id="image"
//                   accept="image/png, image/jpeg"
//                   onChange={handleChangeFile}
//                 />
//               </div>
//               <div className={styles.inputName}>
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   value={formUpdate.name}
//                   placeholder="Name"
//                   onChange={handleChange}
//                 />
//               </div>
//               <Button
//                 bgColor="#7E98DF"
//                 textColor="#FFFFFF"
//                 border="none"
//                 title="Update"
//                 type="submit"
//               />
//             </div>
//           </form>
//             <button className={styles.closeModal} onClick={toggleModal}>
//               CLOSE
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default Modal
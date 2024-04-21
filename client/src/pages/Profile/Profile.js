import { Avatar, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useState, useEffect } from 'react';
import CommonHeader from "../../components/Common/CommonHeader";
import Styles from "./Profile.module.css";
import ToggleProfileInfo from "./ToggleProfileInfo/ToggleProfileInfo";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Navbar1 from "../LandingPage/Navbar";
import { Button } from "@material-ui/core";
import { Modal, Form } from "react-bootstrap";
import Toast_Comp from "../../components/Toast/Toast_Comp";

const Profile = () => {
  const  user  = useSelector((state) => state.auth);

  const [userData, setUserData] = useState(null);
  useEffect(() => {
      const userDataFromStorage = localStorage.getItem('user');

      console.log(userDataFromStorage)

      if (userDataFromStorage) {
          setUserData(JSON.parse(userDataFromStorage));
      }
  }, []);

  const [show, setShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [courseThumbnail, setCourseThumbnail] = useState("");
  const [courseDescription, setCourseDescription] = useState("");



  const [imgLabel, setImgLabel] = useState("Choose photo");

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true)
 };



  const courseFormHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("img", courseThumbnail);

  
console.log(formData)
    fetch("/post-course", {
      body: formData,
      method: "post",
      enctype : "multipart/form-data",
      headers: {
        // 'Content-Type': 'multipart/form-data',
        authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
     
        setToast(true);
        setLoading(false);

        setCourseThumbnail('')

      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (

    <div>
          <Navbar1 />
  <br />   <br />   <br />   <br />   <br />  <br />
  <div>
  {userData ? (
      <Paper className="p-4 m-3 d-flex flex-column shadow">
        <div className="row">
          <div className="col-6">
          <CommonHeader title= {userData.userName } />
          </div>
          <div className="col-6">
          <div className={Styles.avatar}>
            <Avatar className={Styles.avatar__profile__pic} />
       
          </div>
          <br/>
          <Button  color="primary" variant="contained" onClick={handleShow}>Change Avatar</Button>
          </div>
        </div>
        
      <Toast_Comp
        setToast={setToast}
        renderToast={toast}
        msg="Course Uploaded Successfully"
      />
        <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Typography color="textSecondary" variant="h4">
            Change Avatar
            </Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
     
        <Form onSubmit={courseFormHandler} encType="multipart/form-data">
        <Form.Group className="input__file">
              <label>Avatar Thumbnail</label>
              <br />
              <Form.File
                required
                type="file"
                multiple 
                filename ="thumbnail"
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setCourseThumbnail(e.target.files[0])
                }}
                id="custom-file"
                custom
                label={imgLabel ? `${imgLabel}` : "Choose photo"}
              />
            </Form.Group>
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
            </Form>
            </Modal.Body>
            </Modal>

          </Paper>
  ) : (
    <h1>jnj</h1>
  )}
      </div>
      <Container fluid className="mb-5">
        <Row>
          <Col md={8}>
            <Paper className="p-5 m-3 shadow">
              <Typography
                className="text-center text-primary pb-4"
                variant="h5"
              >
                Your Profile Information
              </Typography>
              <ToggleProfileInfo
                exp={true}
                link="edit-profile"
                title="User details"
                value1="Edit profile"
                value2="Email address"
              />

              <ToggleProfileInfo
                link="privacy-policies"
                title="Privacy and policies"
                value1="Data retention summary"
              />

              <ToggleProfileInfo
                link="course-details"
                title="Course details"
                value1="Course details"
              />

              <ToggleProfileInfo
                link="learning-plans"
                title="Miscellaneous"
                value1="Blog entries"
                value2="Learning plans"
              />
              <ToggleProfileInfo
                link="grades"
                title="Reports"
                value1="Browser sessions"
                value2="Grades overview"
              />
              <ToggleProfileInfo
                title="Mobile app"
                value1="This site has mobile app access enabled.
            Download the mobile app."
              />
            </Paper>
          </Col>
          {userData ? (
           
          <Col md={4} className="">
            <Paper className="p-4 m-3 d-flex flex-column shadow">
              <Typography className="my-3 text-primary" variant="h5">
                Profile
              </Typography>
              <Typography
                className="my-2"
                style={{ color: "gray" }}
                variant="body2"
              >
                Username
              </Typography>
              <Typography variant="body1">
                {userData.userName}
              </Typography>
              <br />
              <Typography
                className="my-2"
                style={{ color: "gray" }}
                variant="body2"
              >
                Preferred language
              </Typography>
              <Typography variant="body1">English</Typography>
              <br />
      
      
              <Typography
                className="my-2"
                style={{ color: "gray" }}
                variant="body2"
              >
                Email address
              </Typography>
              <Typography variant="body1">
                {userData.email}
              </Typography>
            </Paper>
       

            {
                user && user.role==="Student" && 
                 <Paper className="shadow p-4 d-flex flex-column m-3">
                <Typography className="my-3 text-primary" variant="h5">
                  Recent activity
                </Typography>
  
                <Typography
                  className="my-2"
                  style={{ color: "gray" }}
                  variant="body2"
                >
                  Courses I'm taking
                </Typography>
                <Typography variant="body1">9</Typography>
              </Paper>
                
              }

           
          </Col>
              
              ) :(
                <h1>jhj</h1>
              )
              }
        </Row>
      </Container>
    </div>
  );
};

export default Profile;




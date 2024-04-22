import { Button, Typography, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MainSidebar from "../AdminDashboard/MainSidebar/MainSidebar";
import AddCourse from "./AddCourse/AddCourse";
import Styles from "./AdminCourseInfo.module.css";
import axios from "axios";
import CourseInfoTable from "./AddCourse/CourseInfoTable/CourseInfoTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseInfo } from "../../../redux/course/courseAction";

const AdminCourseInfo = () => {
  const [courseName, setData] = useState([]);
  const [courseDescription, setDescription] = useState(false);
  const [courseThumbnail, setThumbnail] = useState(false);
  const [createdAt, setcreatedAt] = useState(false);
  const dispatch = useDispatch();
  const courseData = useSelector((state) => state.course.courseInfo);

  useEffect(() => {
    dispatch(fetchCourseInfo());
  }, []);
  console.log(courseData)

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={2} sm={12} className={`d-none d-md-block`}>
            <MainSidebar />
          </Col>
          <Col md={7}>
            <Container>
              <Paper >
                <Typography
                  className="text-center text-primary py-5"
                  variant="h4"
                >
                  Course-Info
                </Typography>
              </Paper>
              <div className={Styles.add__course}>
                <AddCourse course={courseName} setCourse={setData} />
              </div>
            </Container>
            {courseName ? (
              <Container>
                <Row>
                  <CourseInfoTable course={courseDescription} setCourse={setDescription} />
                </Row>
              </Container>
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminCourseInfo;

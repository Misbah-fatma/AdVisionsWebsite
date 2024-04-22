import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourseItem, fetchCourseInfo } from "../../../../../redux/course/courseAction";




const CourseInfoTable = ({ course }) => {

  const dispatch = useDispatch();
  
  // Initialize state variables
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch course info from Redux store
  const courseData = useSelector((state) => state.course.courseInfo);
  // console.log(courseData)
  const { updateCourseList } = useSelector((state) => state.course);

  // Fetch course info when component mounts or updateCourseList changes
  useEffect(() => {
    dispatch(fetchCourseInfo());
  }, [course, updateCourseList, dispatch]);

  const deleteCourseHandler = (courseId) => {
    dispatch(deleteCourseItem(courseId));
  };

  return (
    <Container >
      <TableContainer component={Paper} style={{ overflowX: "hidden" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="bg-dark ">
              <TableCell align="center" className="text-light">Id</TableCell>
              <TableCell align="center" className="text-light">CourseName</TableCell>
              <TableCell align="center" className="text-light">Course Thumbnail</TableCell>
              <TableCell align="center" className="text-light">Description</TableCell>
              <TableCell align="center" className="text-light">Courselink</TableCell>
              <TableCell align="center" className="text-light">CoursePrice</TableCell>
              <TableCell align="center" className="text-light">CoursePdf</TableCell>

              <TableCell align="center" className="text-light">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(courseData) && courseData.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row" align="center">{row._id}</TableCell>
                <TableCell align="center">{row.courseName}</TableCell>
                <TableCell align="center">
                  <img
                    style={{
                      height: "40px",
                      width: "60px",
                      objectFit: "contain",
                    }}
                    src={row.courseThumbnail}
                    alt=""
                  />
                </TableCell>
                <TableCell align="center">{row.courseDescription}</TableCell>
                <TableCell align="center">{row.courseLink}</TableCell>
                <TableCell align="center">{row.coursePrice}</TableCell>
                <TableCell align="center">
  <a href={row.coursePdf} target="_blank" rel="noopener noreferrer">
    Download PDF
  </a>
</TableCell>
                <TableCell className="" align="center">
                  <IconButton>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => deleteCourseHandler(row._id)}>
                    <DeleteIcon style={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CourseInfoTable;

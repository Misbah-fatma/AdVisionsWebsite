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
import axios from "axios"


const CourseInfoTable = ({ course }) => {

  const [items, setItems] = useState([]);
  const axiosInstance = axios.create({baseURL : process.env.REACT_APP_API_URL})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/');
        setItems(response.data);
      } catch (error) {
        console.error('Failed to fetch items: ' + error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Container >
      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow className="bg-dark ">
              <TableCell align="center" className="text-light">
                Id
              </TableCell>
              <TableCell align="center" className="text-light">
               Name
              </TableCell>
              <TableCell align="center" className="text-light">
              Description
              </TableCell>
              <TableCell align="center" className="text-light">
               Image
              </TableCell>
              <TableCell align="center" className="text-light">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((items) => (
              <TableRow key={items._id}>
                <TableCell component="th" scope="row" align="center">
                  {items._id}
                </TableCell>

                <TableCell align="center">{items.name}</TableCell>
                <TableCell align="center">{items.description}</TableCell>
                <TableCell align="center">
                  <img
                    style={{
                      height: "40px",
                      width: "60px",
                      objectFit: "contain",
                    }}
                    src={items.pic}
                    alt=""
                  />
                </TableCell>
                <TableCell className="" align="center">
                  <IconButton>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton >
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

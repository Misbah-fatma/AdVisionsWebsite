import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Card,
  Container,
  IconButton,
  TableFooter,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";



const CourseInfoTable = ({ course }) => {


  const [items, setItems] = useState([]);
  const axiosInstance = axios.create({baseURL : process.env.REACT_APP_API_URL})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/items');
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
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="bg-dark ">
              <TableCell align="center" className="text-light">
                Id
              </TableCell>
              <TableCell align="center" className="text-light">
               Name
              </TableCell>
              <TableCell align="center" className="text-light">
                Course Thumbnail
              </TableCell>
              <TableCell align="center" className="text-light">
               Status
              </TableCell>
              <TableCell align="center" className="text-light">
               SubCategories
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
                <TableCell align="center">{items.status}</TableCell>
                <TableCell align="center">{items.subcategories.join(', ')}</TableCell>
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
          <TableFooter>
   
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CourseInfoTable;

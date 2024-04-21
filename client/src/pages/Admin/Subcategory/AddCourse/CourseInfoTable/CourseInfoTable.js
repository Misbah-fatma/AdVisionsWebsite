import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  Box,
  Card,
  Container,
  IconButton,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    height: "100%",
    paddingTop: "30px",
  },
});

const CourseInfoTable = ({ course }) => {
  const classes = useStyles();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Failed to fetch items: ' + error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
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

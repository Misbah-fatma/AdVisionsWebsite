
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Typography } from "@material-ui/core";
import { Modal, Form } from "react-bootstrap";
import Toast_Comp from "../../../../../components/Toast/Toast_Comp";
import Spinner_comp from "../../../../../components/Spinner/Spinner_comp";

const AddItemForm = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [subcategories, setSubcategories] = useState(['', '', '', '']);
  const [show, setShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true)
 };
 const axiosInstance = axios.create({baseURL : process.env.REACT_APP_API_URL})

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { name, status, subcategories };
    try {
      await axiosInstance.post('/api/items', newItem);
      alert('Item Added!');
    } catch (error) {
      alert('Failed to add item: ' + error.message);
    }
  };

  return (
    <>
    
       <div>
       <Button color="primary" variant="contained" onClick={handleShow}>
         Add Course
       </Button>
 
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
               Add Course
             </Typography>
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           {loading && <Spinner_comp />}
 
           <Form onSubmit={handleSubmit} encType="multipart/form-data">
             <Form.Group>
               <Form.Label>Course Name</Form.Label>
               <Form.Control
                 required
                 value={name} onChange={e => setName(e.target.value)} 
                 type="text"
                 placeholder="Enter course name"
               />
             </Form.Group>
             <Form.Group>
               <Form.Label>Course Description</Form.Label>
 
               <Form.Control
                 required
                 value={status} onChange={e => setStatus(e.target.value)}
                 as="textarea"
                 rows={3}
                 placeholder="Enter course Description"
               />
             </Form.Group>
          
             {subcategories.map((sc, index) => (
        <Form.Control
          key={index}
          type="text"
          value={sc}
          onChange={e => {
            const newSubcategories = [...subcategories];
            newSubcategories[index] = e.target.value;
            setSubcategories(newSubcategories);
          }}
          placeholder={`Subcategory ${index + 1}`}
        />
      ))}
           
             <Button type="submit" color="primary" variant="contained">
               Submit
             </Button>
           </Form>
         </Modal.Body>
         <Modal.Footer>
           <Button color="secondary" variant="contained" onClick={handleClose}>
             Close
           </Button>
         </Modal.Footer>
       </Modal>
     </div>
     </>
  );
};

export default AddItemForm;

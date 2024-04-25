
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Typography } from "@mui/material";
import { Modal, Form } from "react-bootstrap";
import Toast_Comp from "../../../../../components/Toast/Toast_Comp";
import Spinner_comp from "../../../../../components/Spinner/Spinner_comp";


function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true)
 };
 const axiosInstance = axios.create({baseURL : process.env.REACT_APP_API_URL})

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('img', file);

    axiosInstance.post('/post-front', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Add Item</h2>
      {/* <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">Submit</button>
      </form> */}
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
                 value={description} 
                 onChange={e => setDescription(e.target.value)} 
                 as="textarea"
                 rows={3}
                 placeholder="Enter course Description"
               />
             </Form.Group>
          
             <Form.Group className="input__file">
              <label>Course Thumbnail</label>
              <br />
              <Form.File
                required
                type="file"
                multiple 
                filename ="img"
                onChange={e => setFile(e.target.files[0])}
                id="custom-file"
                custom
        
              />
            </Form.Group>
           
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
    </div>
  );
}

export default App;

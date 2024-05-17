import { useState, useRef, useEffect } from 'react';
import Sidebar from './SideBar.js'; 
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import { Awareness } from 'y-protocols/awareness.js';
import axios from 'axios';
import Navbar from '../LandingPage/Navbar';
import { ChakraProvider } from '@chakra-ui/react';
import { Box } from "@chakra-ui/react";

function Yjs() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const editorRef = useRef(null);
  const ydocRef = useRef(null);
  const providerRef = useRef(null);
  const awarenessRef = useRef(null);

  // Fetch users list
  const userList = async () => {
    const axiosInstance = axios.create({baseURL : process.env.REACT_APP_API_URL})

    try {
      const user = await axiosInstance.get("/users/student", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("auth_token")
        }
      });
      setUsers(user.data.studentInfo);
    } catch (error) {
      console.error("Error fetching user list: ", error);
    }
  };

  // Handle user select
  const handleUserSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Handle code select
  const handleCodeSelect = (code, language) => {
    // Ensure editorRef is not null and editorRef.current.editor is not null
    if (editorRef.current && editorRef.current.editor) {
      // Code to set code and language in Yjs editor
      editorRef.current.editor.setValue(code);
      editorRef.current.editor.getModel().updateOptions({ language });
    }
  };

  // Editor did mount handler
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = { editor, monaco };
    if (!ydocRef.current) {
      // Initialize YJS
      const doc = new Y.Doc();
      ydocRef.current = doc;

      // Connect to peers (or start connection) with WebRTC
      if (!providerRef.current) {
        const provider = new WebrtcProvider("test-room", doc);
        providerRef.current = provider;
      }

      const type = doc.getText("monaco");

      // Initialize awareness if not already initialized
      if (!awarenessRef.current) {
        const awareness = new Awareness(doc);
        awarenessRef.current = awareness;
      }

      // Bind YJS to Monaco 
      const binding = new MonacoBinding(type, editorRef.current.editor.getModel(), new Set([editorRef.current.editor]), awarenessRef.current);

      // Update selected users awareness
      awarenessRef.current.setLocalStateField("user", { id: localStorage.getItem("userId"), name: localStorage.getItem("userName"), selected: selectedUsers });
    }
  }

  // Effect to fetch user list and clean up on unmount
  useEffect(() => {
    userList();
    return () => {
      // Clean up the Yjs document and provider when the component unmounts
      if (providerRef.current) {
        providerRef.current.disconnect();
        ydocRef.current = null;
        providerRef.current = null;
        awarenessRef.current = null;
      }
    };
  }, []);

  // Effect to update awareness when selectedUsers change
  useEffect(() => {
    if (awarenessRef.current) {
      awarenessRef.current.setLocalStateField("user", { id: localStorage.getItem("userId"), name: localStorage.getItem("userName"), selected: selectedUsers });
    }
  }, [selectedUsers]);

  return (
    <>
      <Navbar/>
      <ChakraProvider>
        <Box bg="#0f0a19" color="gray.500">
          <div style={{ display: 'flex', width: '100%' }}>
            <div className='mt-4 p-4'>
              <h3 className='text-white' style={{ marginLeft: '20px' }}>Students</h3>
              <ul style={{ listStyleType: 'none', padding: '10px' }}>
                {users.map(user => (
                  <li key={user._id} style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '5px', borderRadius: '5px' }}>
                      <input
                        type="checkbox"
                        value={user._id}
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => handleUserSelect(user._id)}
                        style={{ marginRight: '5px' }}
                      />
                      {user.userName}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <Editor
              height="90vh"
              width="90%"
              theme="vs-dark"
              onMount={handleEditorDidMount}
            />
            <Sidebar onCodeSelect={handleCodeSelect} />
          </div>
        </Box>
      </ChakraProvider>
    </>
  );
}

export default Yjs;

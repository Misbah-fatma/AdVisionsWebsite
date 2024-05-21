import React, { useEffect, useRef, useState } from 'react';
import { inject, Events, Xml } from 'blockly';
import 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import Output from './Output.js';
import axios from 'axios';
import { CODE_SNIPPETS } from '../CodeEditor/constants.js';
import Sidebar from './Sidebar.js';
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  useToast,
  ChakraProvider,
} from '@chakra-ui/react';
import Navbar from '../LandingPage/Navbar.js';

const BlocklyComponent = () => {
  const blocklyDiv = useRef(null);
  const toolbox = useRef(null);
  const [workspace, setWorkspace] = useState(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [generatedXml, setGeneratedXml] = useState('');
  const [userData, setUserData] = useState(null);
  const [code, setCode] = useState(CODE_SNIPPETS['javascript']);
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [userFiles, setUserFiles] = useState([]);
  const editorRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem('user');
    if (userDataFromStorage) {
      const parsedUserData = JSON.parse(userDataFromStorage);
      setUserData(parsedUserData);
      fetchSavedCode(parsedUserData._id);
      fetchUserFiles(parsedUserData._id); // Fetch user files on load
    }
  }, []);

  const userId = userData ? userData._id : null;
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const fetchSavedCode = async (userId) => {
    try {
      const response = await axiosInstance.get(`/code/${userId}`);
      if (response.data && response.data.xml) {
        const xml = Xml.textToDom(response.data.xml);
        Xml.clearWorkspaceAndLoadFromXml(xml, workspace);
        setGeneratedCode(response.data.code);
        setOutput(response.data.output);
      }
    } catch (error) {
      console.error('Error fetching saved code:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch saved code',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const fetchUserFiles = async (userId) => {
    try {
      const response = await axiosInstance.get(`/api/getUserFiles/${userId}`);
      setUserFiles(response.data);
    } catch (error) {
      console.error('Error fetching user files:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch user files',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const generateCodeFromBlockly = () => {
    if (workspace) {
      const code = javascriptGenerator.workspaceToCode(workspace); // Use BlocklyJavaScript to generate code
      const xml = Xml.workspaceToDom(workspace);
      const xmlText = Xml.domToText(xml);
      return { code, xml: xmlText };
    } else {
      console.error('Workspace is not initialized');
      return { code: '', xml: '' };
    }
  };

  useEffect(() => {
    if (blocklyDiv.current && toolbox.current) {
      const workspaceInstance = inject(blocklyDiv.current, {
        toolbox: toolbox.current,
      });
      setWorkspace(workspaceInstance);
      workspaceInstance.addChangeListener(handleWorkspaceChange);

      return () => {
        workspaceInstance.removeChangeListener(handleWorkspaceChange);
      };
    }
  }, []);

  const handleWorkspaceChange = (event) => {
    if (
      event.type === Events.BLOCK_MOVE ||
      event.type === Events.BLOCK_CREATE ||
      event.type === Events.BLOCK_DELETE ||
      event.type === Events.BLOCK_CHANGE
    ) {
      generateCode();
    }
  };

  const generateCode = () => {
    const { code, xml } = generateCodeFromBlockly();
    setGeneratedCode(code);
    setGeneratedXml(xml);
  };

  const updateOutput = (newOutput) => {
    setOutput(newOutput);
  };

  const saveCodeAndOutput = async () => {
    if (!userId) {
      toast({
        title: 'User not logged in',
        description: 'Please log in to save your work',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await axiosInstance.post('/api/saveCode', {
        userId,
        generatedCode,
        output,
        xml: generatedXml,
      });
      toast({
        title: 'Success',
        description: 'Code and output saved successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchUserFiles(userId); // Refresh the file list after saving
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error saving code and output',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleFileClick = async (fileId) => {
    try {
      const response = await axiosInstance.get(`/file/${fileId}`);
      if (response.data && response.data.xml) {
        const xml = Xml.textToDom(response.data.xml);
        Xml.clearWorkspaceAndLoadFromXml(xml, workspace);
        setGeneratedCode(response.data.code);
        setOutput(response.data.output);
      }
    } catch (error) {
      console.error('Error loading file:', error);
      toast({
        title: 'Error',
        description: 'Failed to load file',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      <ChakraProvider>
        <Box
          display="flex"
          height="100vh"
          padding="10px"
          backgroundColor="gray.100"
        >
          <Box
            ref={blocklyDiv}
            flex="1"
            height="100%"
            minWidth="800px"
            width="100%"
            backgroundColor="white"
            borderRight="1px solid"
            borderColor="gray.300"
          ></Box>
          <xml style={{ display: 'none' }} ref={toolbox}>
            <block type="controls_if"></block>
            <block type="logic_compare"></block>
            <block type="controls_repeat_ext"></block>
            <block type="math_number"></block>
            <block type="math_arithmetic"></block>
            <block type="text"></block>
            <block type="text_print"></block>
            <block type="variables_get"></block>
            <block type="variables_set"></block>
            <block type="controls_whileUntil"></block>
            <block type="controls_for"></block>
            <block type="logic_boolean"></block>
            <block type="logic_negate"></block>
            <block type="logic_operation"></block>
            <block type="controls_forEach"></block>
          </xml>
          <VStack flex="1" padding="10px" spacing="10px">
            <HStack spacing="10px">
              <Button colorScheme="blue" onClick={generateCode}>
                Generate Code
              </Button>
              <Button colorScheme="green" onClick={saveCodeAndOutput}>
                Save
              </Button>
            </HStack>
            <Box
              width="100%"
              padding="10px"
              backgroundColor="gray.200"
              borderRadius="md"
              overflowY="auto"
              height="300px"
            >
              <Text fontFamily="monospace">{generatedCode}</Text>
              <Text fontFamily="monospace" marginTop="10px">{generatedXml}</Text>
            </Box>
            <Box width="100%" marginTop="20px">
              <Text fontSize="lg" fontWeight="bold">
                Output:
              </Text>
              <Box
                width="100%"
                padding="10px"
                backgroundColor="gray.200"
                borderRadius="md"
                overflowY="auto"
                maxHeight="300px"
              >
                <Output
                  language="javascript"
                  code={generatedCode}
                  output={output}
                  setOutput={updateOutput}
                  editorRef={editorRef}
                />
              </Box>
            </Box>
          </VStack>
          <Sidebar onFileClick={handleFileClick} userFiles={userFiles} />
        </Box>
      </ChakraProvider>
    </>
  );
};

export default BlocklyComponent;

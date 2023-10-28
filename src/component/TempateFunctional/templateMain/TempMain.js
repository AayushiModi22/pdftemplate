import React, { useState, useEffect ,useRef} from 'react';
import {
    useDisclosure,
  } from "@chakra-ui/react";
import {
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Input,
    Flex,
    IconButton,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons"; 
import Toolbar from "../../SignpdfFunctional/toolbar/Toolbar";
import Sidebar from "../../SignpdfFunctional/sidebar/Sidebar";
import { AiFillSetting } from "react-icons/ai";
import { ProgressBar } from  'react-loader-spinner';
import { generateThumbnails,handleScroll ,handleThumbnailClick} from "../../SignpdfFunctional/main/pdfUtils";
import TempSidebar from '../templateSidebar/TempSidebar';


function TempMain() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipients, setRecipients] = useState([{ name: "", email: "" }]); // Initial recipient
  const [isCreating, setIsCreating] = useState(false); // Track if the user is in the process of creating
  const location = useLocation();
  const tempFile = location.state?.tempFile;
  const [numPages, setNumPages] = useState(0);
const [currentPage, setCurrentPage] = useState(1);
const [thumbnails, setThumbnails] = useState([]);
const [mainContentUrls, setMainContentUrls] = useState([]);
const pdfImageSize = { width: 0, height: 0 };
const [isLoading, setIsLoading] = useState(true);
const mainContainerRef = useRef(null);
  const thumbnailContainerRef = useRef(null);
  const [recipientInitials, setRecipientInitials] = useState([]); // Store initials and colors

  
  const [positions, setpositions] = useState(
    Array.from({ length: numPages }, () => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    // Open the modal when the component is mounted
    setIsModalOpen(true);
    if (tempFile) {
        generateThumbnails(tempFile).then(({ thumbnailUrls, contentUrls }) => {
          setNumPages(thumbnailUrls.length);
          setThumbnails(thumbnailUrls);
          setMainContentUrls(contentUrls);
          setIsLoading(false);
        }).catch((error) => {
          console.error("Error generating thumbnails:", error);
        });
      }
  }, [tempFile]);
  const handleContainerScroll = (event) => {
    handleScroll(event, numPages, positions, pdfImageSize, thumbnailContainerRef, setCurrentPage, setpositions);
  };

  const addRecipient = () => {
    setRecipients([...recipients, { name: "", email: "" }]);
  };

  const deleteRecipient = (index) => {
    const updatedRecipients = [...recipients];
    updatedRecipients.splice(index, 1);
    setRecipients(updatedRecipients);
  };

  const handleRecipientChange = (index, field, value) => {
    const updatedRecipients = [...recipients];
    updatedRecipients[index][field] = value;
    setRecipients(updatedRecipients);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isCreateButtonDisabled = () => {
    return !recipients.some((recipient) => recipient.name && recipient.email);
  };

  const handleCreate = () => {
    if (isCreateButtonDisabled()) {
      return; // Don't proceed if no recipient has all fields filled
    }

    const initials = recipients.map((recipient, index) => ({
      initial: recipient.name.charAt(0),
      color: generatePastelColor(index),
    }));
    setRecipientInitials(initials);

    // Perform your create action here
    // For example, save the recipients' data
    // Once done, close the modal
    setIsCreating(true);
    // Simulate an API call or other asynchronous operation
    setTimeout(() => {
      setIsCreating(false);
      setIsModalOpen(false);
    }, 800); // Replace with your actual create action
  };

  function generatePastelColor(index) {
    const hue = (index * 137.5) % 360; // Vary the hue to get different colors
    const saturation = 75; // Adjust as needed
    const lightness = 80; // Adjust as needed
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
  

  return (
    <>
        {tempFile  && (
        <div className="main-container">
          <div className="inner-container-main">
            <div className="inner-container-main-toolbar">
            <Toolbar numPages={numPages} currentPage={currentPage} setCurrentPage={setCurrentPage} mainContainerRef={mainContainerRef}/>
            </div>
            <div className="inner_container_main_body">
              <div className="inner-container-main-body-sider">
                <Sidebar
                  thumbnails={thumbnails}
                  currentPage={currentPage}
                  handleThumbnailClick={(pageNumber) => handleThumbnailClick(pageNumber, mainContainerRef, setCurrentPage,numPages)}
                      />
              </div>
             
              <div className="inner-container-main-body-content">
              
                <div className="pdf-viewer">
                  <div className="mypdfCenter">
                 
                    <div
                      className="scrollable-container "
                      ref={mainContainerRef}
                      onScroll={handleContainerScroll}
                    >
                       {isLoading && (
                  <div className="loading-container">
                    <ProgressBar
                      height={60}
                      width={80}
                      ariaLabel="progress-bar-loading"
                      wrapperStyle={{}}
                      wrapperClass="progress-bar-wrapper"
                      borderColor="#053b50"
                      barColor="#026179"
                    />
                  </div>
                )}
                      {!isLoading && Array.from({ length: numPages }, (_, index) => (
                        <div className="page " key={index}>
                          <div className="pdf-page-container ">
                            <img
                              src={mainContentUrls[index]}
                              alt={`Page ${index + 1}`}
                              className="tmpid"
                              draggable="false"    />    
                            {/* {drawingData[index + 1] && (
                                  <DrawingOverlay
                                  index={index}
                                  positions={positions}
                                  setpositions={setpositions}
                                  setSignatureSize={setSignatureSize}
                                  signatureSize={signatureSize}
                                  drawingData={drawingData}
                                  handleDrawingPadResize={handleDrawingPadResize}
                                  handleDrawingPadDragStop={handleDrawingPadDragStop}
                                  setDrawingData={setDrawingData}
                                  numPages={numPages}
                                  currentPage={currentPage}
                                />   
                                 )} */}
                          </div>
                        </div>   ))}
                    </div>
                  </div>
                </div>
                <div className="setting">
                  <AiFillSetting color="#053b50" className="setting-icon" onClick={onOpen} />
                </div>
              </div>
            </div>
          </div>
          {/*----------------------Functional SideBar------------------*/}
            <TempSidebar 
             isOpen={isOpen}
             onClose={onClose}
             btnRef={btnRef}
             recipientInitials={recipientInitials} 
            />
        </div>
      )}

    {/* modal */}
    <div>
      <Modal size="xl" isOpen={isModalOpen}  isCentered={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Template</ModalHeader>
          <ModalBody>
            {tempFile && (
              <div>
                <Text><b>Selected PDF File:</b> {tempFile.name}</Text>
              </div>
            )}

            {recipients.map((recipient, index) => (
              <Flex key={index} alignItems="center">
                 <div
                style={{
                    width: "110px",
                    height: "35px",
                    borderRadius: "50%",
                    backgroundColor: generatePastelColor(index),
                    border:"1px solid grey"
                }}
                ></div>
                <Input
                  type="text"
                  placeholder="Recipient's Name"
                  value={recipient.name}
                  onChange={(e) =>
                    handleRecipientChange(index, "name", e.target.value)
                  }
                />
                <Input
                  type="email"
                  placeholder="Recipient's Email"
                  value={recipient.email}
                  onChange={(e) =>
                    handleRecipientChange(index, "email", e.target.value)
                  }
                />
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  aria-label="Delete"
                  size="sm"
                  onClick={() => deleteRecipient(index)}
                />
              </Flex>
            ))}
            <Button colorScheme="teal" variant="solid" onClick={addRecipient}>
              Add Recipient
            </Button>
          </ModalBody>
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={handleCreate}
            isDisabled={isCreateButtonDisabled()}
          >
            Create
          </Button>
        </ModalContent>
      </Modal>
    </div>
    </>
  );
}

export default TempMain;

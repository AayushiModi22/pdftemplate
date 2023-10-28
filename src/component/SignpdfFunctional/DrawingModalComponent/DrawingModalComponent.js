// // main proper working

// import React, { useState } from "react";
// import SignatureCanvas from "react-signature-canvas";
// import "./drawingModalComponent.css";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   Button,
//   Input,
//   Box,
//   Text,
//   Center,
// } from "@chakra-ui/react";
// import { FaPencilAlt, FaTextHeight, FaImage } from "react-icons/fa";
// import { PDFDocument, rgb } from "pdf-lib";
// import { saveAs } from "file-saver";

// const DrawingModalComponent = ({
//   isDrawingModalOpen,
//   setIsDrawingModalOpen,
//   drawingBoardRef,
//   handleDrawingDone,
//   pdfFile,
// }) => {
//   const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [text, setText] = useState(""); // State for user input text
//   const [userText, setUserText] = useState("");
//   const selectedPage = 1;

//   const handleTextChange = (e) => {
//     setUserText(e.target.value);
//   };

//   const handleDrawingPadClick = () => {
//     setShowDrawingCanvas(true);
//   };

//   const handleClearDrawing = () => {
//     if (drawingBoardRef.current) {
//       drawingBoardRef.current.clear();
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   async function addTextToPDF(pdfDoc, pageIndex, text, fontSize, x, y) {
//     const pages = pdfDoc.getPages();
//     const page = pages[pageIndex];

//     const { width, height } = page.getSize();

//     const newText = page.drawText(text, {
//       x,
//       y: height - y, // Invert y-coordinate
//       size: fontSize,
//       color: rgb(0, 0, 0), // Text color
//     });

//     return pdfDoc;
//   }

//   const handleApplyText = async () => {
//     if (!pdfFile) {
//       console.error("PDF file is missing");
//       return;
//     }

//     try {
//       console.log("pdfFile",pdfFile);
//       const pdfBytes = await pdfFile.arrayBuffer();
//       const pdfDoc = await PDFDocument.load(pdfBytes);

//       // Define the page index, font size, and position
//       const pageIndex = selectedPage - 1; // Convert to 0-based index
//       const fontSize = 20;
//       const x = 100; // X-coordinate
//       const y = 100; // Y-coordinate

//       const updatedPdfDoc = await addTextToPDF(
//         pdfDoc,
//         pageIndex,
//         userText, // Use the user-input text
//         fontSize,
//         x,
//         y
//       );
//       console.log("updatedPdfDoc",updatedPdfDoc);

//       // Save the updated PDF
//       const editedPdfBytes = await updatedPdfDoc.save();
//       const blob = new Blob([editedPdfBytes], { type: "application/pdf" });
//       saveAs(blob, "edited_pdf.pdf");
//     } catch (error) {
//       console.error("Error adding text:", error);
//     }
//   };

//   return (
//     <Modal
//       key="xl"
//       isCentered
//       isOpen={isDrawingModalOpen}
//       onClose={() => {
//         setShowDrawingCanvas(false);
//         setIsDrawingModalOpen(false);
//       }}
//     >
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Drawing Pad</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <Tabs isFitted variant="enclosed">
//             <TabList>
//               <Tab>
//                 <FaTextHeight />
//               </Tab>
//               <Tab onClick={handleDrawingPadClick}>
//                 <FaPencilAlt />
//               </Tab>
//               <Tab>
//                 <FaImage />
//             </Tab>
//             </TabList>
//             <TabPanels>

//               {/* Text */}
//             <TabPanel>
//               <div>
//               <textarea
//                 value={userText}
//                 onChange={handleTextChange}
//                 placeholder="Enter your text here"
//               />
//             </div>

//             <div>
//             <Button
//             size="lg"
//             width="100%"
//             border="2px"
//             variant="outline"
//             onClick={handleApplyText}
//           >
//             Add text
//           </Button>
//             </div>
//             </TabPanel>
//               {/* SIgn  */}
//               <TabPanel>
//                 {showDrawingCanvas && (
//                   <div>
//                     <div className="canvas-container">
//                       <SignatureCanvas
//                         ref={drawingBoardRef}
//                         penColor="black"
//                         canvasProps={{ className: "signature-canvas" }}
//                       />
//                     </div>
//                     <Button colorScheme="red" onClick={handleClearDrawing}>
//                       Clear
//                     </Button>
//                   </div>
//                 )}
//               </TabPanel>

//               {/* Image */}
//               <TabPanel>
//                 {/* Implement Upload Image content here */}
//                 <div>
//                   <label htmlFor="image-upload" className="custom-file-upload">
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       id="image-upload"
//                       style={{ display: "none" }}
//                       onChange={handleImageUpload}
//                     />
//                     <Box
//                       border="1px dashed #ccc"
//                       padding="1rem"
//                       textAlign="center"
//                       cursor="pointer"
//                     >
//                       <Text>Click to choose an image</Text>
//                     </Box>
//                   </label>
//                   {selectedImage && (
//                     <Center marginTop="1rem">
//                       <img
//                         src={URL.createObjectURL(selectedImage)}
//                         alt="Uploaded"
//                         width="150"
//                       />
//                     </Center>
//                   )}
//                 </div>
//               </TabPanel>
//             </TabPanels>

//           </Tabs>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="green" onClick={handleDrawingDone}>
//             Done
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default DrawingModalComponent;

// // main proper code with applying system's default text
// import React, { useState } from "react";
// import SignatureCanvas from "react-signature-canvas";
// import "./drawingModalComponent.css";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   Button,
//   Input,
//   Box,
//   Text,
//   Center,
// } from "@chakra-ui/react";
// import { FaPencilAlt, FaTextHeight, FaImage } from "react-icons/fa";
// import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
// import { saveAs } from "file-saver";

// const DrawingModalComponent = ({
//   isDrawingModalOpen,
//   setIsDrawingModalOpen,
//   drawingBoardRef,
//   handleDrawingDone,
//   pdfFile,
// }) => {
//   const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [text, setText] = useState(""); // State for user input text
//   const [userText, setUserText] = useState("");
//   const [selectedFontStyle, setSelectedFontStyle] = useState("Arial");
//   const selectedPage = 1;

//   const handleTextChange = (e) => {
//     setUserText(e.target.value);
//   };

//   const handleDrawingPadClick = () => {
//     setShowDrawingCanvas(true);
//   };

//   const handleClearDrawing = () => {
//     if (drawingBoardRef.current) {
//       drawingBoardRef.current.clear();
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleFontStyleChange = (e) => {
//     setSelectedFontStyle(e.target.value);
//   };

//   async function addTextToPDF(pdfDoc, pageIndex, text, fontSize, x, y) {
//     const pages = pdfDoc.getPages();
//     const page = pages[pageIndex];
//     const { width, height } = page.getSize();

//     // Define a variable to store the font
//     let selectedFont;

//     // Use conditional statements to select the font based on user's choice
//     if (selectedFontStyle === "Arial") {
//       selectedFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
//     } else if (selectedFontStyle === "Times New Roman") {
//       selectedFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
//     } else if (selectedFontStyle === "Courier") {
//       selectedFont = await pdfDoc.embedFont(StandardFonts.Courier);
//     } else {
//       // Handle the default case (e.g., use Arial if the selected font is not recognized)
//       selectedFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
//     }

//     const newText = page.drawText(text, {
//       x,
//       y: height - y, // Invert y-coordinate
//       size: fontSize,
//       font: selectedFont, // Use the selected font
//       color: rgb(0, 0, 0), // Text color
//     });

//     return pdfDoc;
//   }

//   const handleApplyText = async () => {
//     if (!pdfFile) {
//       console.error("PDF file is missing");
//       return;
//     }

//     try {
//       const pdfBytes = await pdfFile.arrayBuffer();
//       const pdfDoc = await PDFDocument.load(pdfBytes);

//       // Define the page index, font size, and position
//       const pageIndex = selectedPage - 1; // Convert to 0-based index
//       const fontSize = 20;
//       const x = 100; // X-coordinate
//       const y = 100; // Y-coordinate

//       const updatedPdfDoc = await addTextToPDF(
//         pdfDoc,
//         pageIndex,
//         userText, // Use the user-input text
//         fontSize,
//         x,
//         y,
//       );

//       // Save the updated PDF
//       const editedPdfBytes = await updatedPdfDoc.save();
//       const blob = new Blob([editedPdfBytes], { type: "application/pdf" });
//       saveAs(blob, "edited_pdf.pdf");
//     } catch (error) {
//       console.error("Error adding text:", error);
//     }
//   };

//   return (
//     <Modal
//       key="xl"
//       isCentered
//       isOpen={isDrawingModalOpen}
//       onClose={() => {
//         setShowDrawingCanvas(false);
//         setIsDrawingModalOpen(false);
//       }}
//     >
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Drawing Pad</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <Tabs isFitted variant="enclosed">
//             <TabList>
//               <Tab>
//                 <FaTextHeight />
//               </Tab>
//               <Tab onClick={handleDrawingPadClick}>
//                 <FaPencilAlt />
//               </Tab>
//               <Tab>
//                 <FaImage />
//               </Tab>
//             </TabList>
//             <TabPanels>
//               {/* Text */}
//               <TabPanel>
//                 <div>
//                   <textarea
//                     value={userText}
//                     onChange={handleTextChange}
//                     placeholder="Enter your text here"
//                   />
//                 </div>

//                 <div>
//                   {/* Font style selection dropdown */}
//                   <label htmlFor="font-style-select">Select Font Style:</label>
//                   <select
//                     id="font-style-select"
//                     value={selectedFontStyle}
//                     onChange={handleFontStyleChange}
//                   >
//                     <option value="Arial">Arial</option>
//                     <option value="Times New Roman">Times New Roman</option>
//                     <option value="Courier">Courier</option>
//                     <option value="Helvetica">Helvetica</option>
//                     {/* Add more font style options here */}
//                   </select>
//                 </div>

//                 <div>
//                   <Button
//                     size="lg"
//                     width="100%"
//                     border="2px"
//                     variant="outline"
//                     onClick={handleApplyText}
//                   >
//                     Add text
//                   </Button>
//                 </div>
//               </TabPanel>
//               {/* SIgn  */}
//               <TabPanel>
//                 {showDrawingCanvas && (
//                   <div>
//                     <div className="canvas-container">
//                       <SignatureCanvas
//                         ref={drawingBoardRef}
//                         penColor="black"
//                         canvasProps={{ className: "signature-canvas" }}
//                       />
//                     </div>
//                     <Button colorScheme="red" onClick={handleClearDrawing}>
//                       Clear
//                     </Button>
//                   </div>
//                 )}
//               </TabPanel>

//               {/* Image */}
//               <TabPanel>
//                 {/* Implement Upload Image content here */}
//                 <div>
//                   <label htmlFor="image-upload" className="custom-file-upload">
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       id="image-upload"
//                       style={{ display: "none" }}
//                       onChange={handleImageUpload}
//                     />
//                     <Box
//                       border="1px dashed #ccc"
//                       padding="1rem"
//                       textAlign="center"
//                       cursor="pointer"
//                     >
//                       <Text>Click to choose an image</Text>
//                     </Box>
//                   </label>
//                   {selectedImage && (
//                     <Center marginTop="1rem">
//                       <img
//                         src={URL.createObjectURL(selectedImage)}
//                         alt="Uploaded"
//                         width="150"
//                       />
//                     </Center>
//                   )}
//                 </div>
//               </TabPanel>
//             </TabPanels>
//           </Tabs>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="green" onClick={handleDrawingDone}>
//             Done
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default DrawingModalComponent;

// // applying font color with text style
import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./drawingModalComponent.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  Input,
  Box,
  Text,
  Center,
  SketchPicker, // Import the color picker component
} from "@chakra-ui/react";
import { FaPencilAlt, FaTextHeight, FaImage } from "react-icons/fa";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import { ChromePicker } from "react-color";

const DrawingModalComponent = ({
  isDrawingModalOpen,
  setIsDrawingModalOpen,
  drawingBoardRef,
  handleDrawingDone,
  pdfFile,
}) => {
  const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [text, setText] = useState(""); // State for user input text
  const [userText, setUserText] = useState("");
  const [selectedFontStyle, setSelectedFontStyle] = useState("Arial");
  const [selectedTextColor, setSelectedTextColor] = useState("#000"); // State for text color
  const [selectedFontSize, setSelectedFontSize] = useState(20); // Set an initial font size

  const selectedPage = 1;

  const handleTextChange = (e) => {
    setUserText(e.target.value);
  };
  const handleFontSizeChange = (e) => {
    setSelectedFontSize(parseInt(e.target.value, 10)); // Convert the value to an integer
  };

  const handleDrawingPadClick = () => {
    setShowDrawingCanvas(true);
  };

  const handleClearDrawing = () => {
    if (drawingBoardRef.current) {
      drawingBoardRef.current.clear();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleFontStyleChange = (e) => {
    setSelectedFontStyle(e.target.value);
  };

  const handleTextColorChange = (color) => {
    setSelectedTextColor(color.hex); // Update the text color based on the selected color
  };

  function hexToRgb(hex) {
    // Remove the hash character if it's present
    hex = hex.replace(/^#/, "");

    // Parse the string to get the individual color values
    const r = parseInt(hex.slice(0, 2), 16) / 255; // Convert to the 0-1 range
    const g = parseInt(hex.slice(2, 4), 16) / 255; // Convert to the 0-1 range
    const b = parseInt(hex.slice(4, 6), 16) / 255; // Convert to the 0-1 range

    return [r, g, b];
  }

  async function addTextToPDF(
    pdfDoc,
    pageIndex,
    text,
    fontSize,
    x,
    y,
    selectedTextColor,
    selectedFontStyle
  ) {
    const pages = pdfDoc.getPages();
    const page = pages[pageIndex];
    const { width, height } = page.getSize();

    let selectedFont;

    if (selectedFontStyle === "Arial") {
      selectedFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    } else if (selectedFontStyle === "Times New Roman") {
      selectedFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    } else if (selectedFontStyle === "Courier") {
      selectedFont = await pdfDoc.embedFont(StandardFonts.Courier);
    } else {
      selectedFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    }

    const newText = page.drawText(text, {
      x,
      y: height - y,
      size: fontSize,
      font: selectedFont,
      color: rgb(...hexToRgb(selectedTextColor)), // Use the selected text color
    });

    return pdfDoc;
  };
  const handleApplyText = async () => {
    if (!pdfFile) {
      console.error("PDF file is missing");
      return;
    }
  
    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
  
      const pageIndex = selectedPage - 1;
      const fontSize = selectedFontSize; // Use the selected font size
      const x = 100;
      const y = 100;
  
      const updatedPdfDoc = await addTextToPDF(
        pdfDoc,
        pageIndex,
        userText,
        fontSize,
        x,
        y,
        selectedTextColor,
        selectedFontStyle
      );
  
      const editedPdfBytes = await updatedPdfDoc.save();
      const blob = new Blob([editedPdfBytes], { type: "application/pdf" });
      saveAs(blob, "edited_pdf.pdf");
    } catch (error) {
      console.error("Error adding text:", error);
    }
  };
  

  return (
    <Modal
      key="xl"
      isCentered
      isOpen={isDrawingModalOpen}
      onClose={() => {
        setShowDrawingCanvas(false);
        setIsDrawingModalOpen(false);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Drawing Pad</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs isFitted variant="enclosed">
            <TabList>
              <Tab>
                <FaTextHeight />
              </Tab>
              <Tab onClick={handleDrawingPadClick}>
                <FaPencilAlt />
              </Tab>
              <Tab>
                <FaImage />
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div>
                  <textarea
                    value={userText}
                    onChange={handleTextChange}
                    placeholder="Enter your text here"
                  />
                </div>

                <div>
                  <label htmlFor="font-size-select"
                  style={{ fontWeight: "bold" }}>Select Font Size:</label>
                  <input
                    type="number"
                    id="font-size-select"
                    value={selectedFontSize}
                    onChange={handleFontSizeChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="font-style-select"
                    style={{ fontWeight: "bold" }} // Set the font-weight to bold
                  >
                    Select Font Style:
                  </label>
                  <select
                    id="font-style-select"
                    value={selectedFontStyle}
                    onChange={handleFontStyleChange}
                  >
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier">Courier</option>
                    <option value="Helvetica">Helvetica</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="text-color-picker">Select Text Color:</label>
                  <ChromePicker
                    color={selectedTextColor}
                    onChange={(color) => setSelectedTextColor(color.hex)}
                  />
                </div>
                <div>
                  <Button
                    size="lg"
                    width="100%"
                    border="2px"
                    variant="outline"
                    onClick={handleApplyText}
                  >
                    Add text
                  </Button>
                </div>
              </TabPanel>
              <TabPanel>
                {showDrawingCanvas && (
                  <div>
                    <div className="canvas-container">
                      <SignatureCanvas
                        ref={drawingBoardRef}
                        penColor="black"
                        canvasProps={{ className: "signature-canvas" }}
                      />
                    </div>
                    <Button colorScheme="red" onClick={handleClearDrawing}>
                      Clear
                    </Button>
                  </div>
                )}
              </TabPanel>

              <TabPanel>
                <div>
                  <label htmlFor="image-upload" className="custom-file-upload">
                    <Input
                      type="file"
                      accept="image/*"
                      id="image-upload"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                    <Box
                      border="1px dashed #ccc"
                      padding="1rem"
                      textAlign="center"
                      cursor="pointer"
                    >
                      <Text>Click to choose an image</Text>
                    </Box>
                  </label>
                  {selectedImage && (
                    <Center marginTop="1rem">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Uploaded"
                        width="150"
                      />
                    </Center>
                  )}
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" onClick={handleDrawingDone}>
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DrawingModalComponent;

// // code is for different system's font style now in testing....

// import React, { useState } from "react";
// import SignatureCanvas from "react-signature-canvas";
// import "./drawingModalComponent.css";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   Button,
//   Input,
//   Box,
//   Text,
//   Center,
// } from "@chakra-ui/react";
// import { FaPencilAlt, FaTextHeight, FaImage } from "react-icons/fa";
// import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
// import { saveAs } from "file-saver";

// const DrawingModalComponent = ({
//   isDrawingModalOpen,
//   setIsDrawingModalOpen,
//   drawingBoardRef,
//   handleDrawingDone,
//   pdfFile,
// }) => {
//   const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [text, setText] = useState(""); // State for user input text
//   const [userText, setUserText] = useState("");
//   const [selectedFontStyle, setSelectedFontStyle] = useState("Arial");
//   const [selectedFontSize, setSelectedFontSize] = useState(20); // Set an initial font size
  

//   const selectedPage = 1;

//   const handleFontSizeChange = (e) => {
//     setSelectedFontSize(parseInt(e.target.value, 10)); // Convert the value to an integer
//   };

//   const handleTextChange = (e) => {
//     setUserText(e.target.value);
//   };

//   const handleDrawingPadClick = () => {
//     setShowDrawingCanvas(true);
//   };

//   const handleClearDrawing = () => {
//     if (drawingBoardRef.current) {
//       drawingBoardRef.current.clear();
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleFontStyleChange = (e) => {
//     setSelectedFontStyle(e.target.value);
//   };

//   async function addTextToPDF(pdfDoc, pageIndex, text, fontSize, x, y) {
//     const pages = pdfDoc.getPages();
//     const page = pages[pageIndex];
//     const { width, height } = page.getSize();

//     // Define a variable to store the font
//     let selectedFont;

//     // Use conditional statements to select the font based on user's choice
//     if (selectedFontStyle === "Arial") {
//       selectedFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
//     } else if (selectedFontStyle === "Times New Roman") {
//       selectedFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
//     } else if (selectedFontStyle === "Courier") {
//       selectedFont = await pdfDoc.embedFont(StandardFonts.Courier);
//     } else {
//       // Handle the default case (e.g., use Arial if the selected font is not recognized)
//       selectedFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
//     }

//     const newText = page.drawText(text, {
//       x,
//       y: height - y, // Invert y-coordinate
//       size: fontSize,
//       font: selectedFont, // Use the selected font
//       color: rgb(0, 0, 0), // Text color
//     });

//     return pdfDoc;
//   }

//   const handleApplyText = async () => {
//     if (!pdfFile) {
//       console.error("PDF file is missing");
//       return;
//     }
  
//     try {
//       const pdfBytes = await pdfFile.arrayBuffer();
//       const pdfDoc = await PDFDocument.load(pdfBytes);
  
//       // Define the page index, font size, and position
//       const pageIndex = selectedPage - 1; // Convert to 0-based index
//       const fontSize = selectedFontSize; // Use the selected font size
//       const x = 100; // X-coordinate
//       const y = 100; // Y-coordinate
  
//       const updatedPdfDoc = await addTextToPDF(
//         pdfDoc,
//         pageIndex,
//         userText, // Use the user-input text
//         fontSize,
//         x,
//         y,
//       );
  
//       // Save the updated PDF
//       const editedPdfBytes = await updatedPdfDoc.save();
//       const blob = new Blob([editedPdfBytes], { type: "application/pdf" });
//       saveAs(blob, "edited_pdf.pdf");
//     } catch (error) {
//       console.error("Error adding text:", error);
//     }
//   };
  

//   return (
//     <Modal
//       key="xl"
//       isCentered
//       isOpen={isDrawingModalOpen}
//       onClose={() => {
//         setShowDrawingCanvas(false);
//         setIsDrawingModalOpen(false);
//       }}
//     >
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Drawing Pad</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <Tabs isFitted variant="enclosed">
//             <TabList>
//               <Tab>
//                 <FaTextHeight />
//               </Tab>
//               <Tab onClick={handleDrawingPadClick}>
//                 <FaPencilAlt />
//               </Tab>
//               <Tab>
//                 <FaImage />
//               </Tab>
//             </TabList>
//             <TabPanels>
//               {/* Text */}
//               <TabPanel>
//                 <div>
//                   <textarea
//                     value={userText}
//                     onChange={handleTextChange}
//                     placeholder="Enter your text here"
//                   />
//                 </div>

//                 <div>
//                   {/* Font style selection dropdown */}
//                   <label htmlFor="font-style-select">Select Font Style:</label>
//                   <select
//                     id="font-style-select"
//                     value={selectedFontStyle}
//                     onChange={handleFontStyleChange}
//                   >
//                     <option value="Arial">Arial</option>
//                     <option value="Times New Roman">Times New Roman</option>
//                     <option value="Courier">Courier</option>
//                     <option value="Helvetica">Helvetica</option>
//                     {/* Add more font style options here */}
//                   </select>
//                 </div>

//                 <div>
//                   <label htmlFor="font-size-select">Select Font Size:</label>
//                   <input
//                     type="number"
//                     id="font-size-select"
//                     value={selectedFontSize}
//                     onChange={handleFontSizeChange}
//                   />
//                 </div>

//                 <div>
//                   <Button
//                     size="lg"
//                     width="100%"
//                     border="2px"
//                     variant="outline"
//                     onClick={handleApplyText}
//                   >
//                     Add text
//                   </Button>
//                 </div>
//               </TabPanel>
//               {/* SIgn  */}
//               <TabPanel>
//                 {showDrawingCanvas && (
//                   <div>
//                     <div className="canvas-container">
//                       <SignatureCanvas
//                         ref={drawingBoardRef}
//                         penColor="black"
//                         canvasProps={{ className: "signature-canvas" }}
//                       />
//                     </div>
//                     <Button colorScheme="red" onClick={handleClearDrawing}>
//                       Clear
//                     </Button>
//                   </div>
//                 )}
//               </TabPanel>

//               {/* Image */}
//               <TabPanel>
//                 {/* Implement Upload Image content here */}
//                 <div>
//                   <label htmlFor="image-upload" className="custom-file-upload">
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       id="image-upload"
//                       style={{ display: "none" }}
//                       onChange={handleImageUpload}
//                     />
//                     <Box
//                       border="1px dashed #ccc"
//                       padding="1rem"
//                       textAlign="center"
//                       cursor="pointer"
//                     >
//                       <Text>Click to choose an image</Text>
//                     </Box>
//                   </label>
//                   {selectedImage && (
//                     <Center marginTop="1rem">
//                       <img
//                         src={URL.createObjectURL(selectedImage)}
//                         alt="Uploaded"
//                         width="150"
//                       />
//                     </Center>
//                   )}
//                 </div>
//               </TabPanel>
//             </TabPanels>
//           </Tabs>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="green" onClick={handleDrawingDone}>
//             Done
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default DrawingModalComponent;

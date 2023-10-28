// // main proper working

// import React, { useState, useRef, useEffect } from "react";
// import { PDFDocument, rgb } from "pdf-lib";
// import { saveAs } from "file-saver";

// import {
//   Button,
//   Drawer,
//   DrawerBody,
//   DrawerCloseButton,
//   DrawerContent,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerOverlay,
//   Heading,
// } from "@chakra-ui/react";
// import DrawingModalComponent from "../DrawingModalComponent/DrawingModalComponent";

// function FunctionalSidebar({
//   isOpen,
//   onClose,
//   isDrawingModalOpen,
//   btnRef,
//   setIsDrawingModalOpen,
//   handleGenerateSignedPdf,
//   drawingBoardRef,
//   numPages,
//   handleDrawingDone,
//   pdfFile,
//   // handleApplyText,
// }) {
//   const [userText, setUserText] = useState("");
//   const [isTextModalOpen, setTextModalOpen] = useState(false);

//   const handleOpenTextModal = () => {
//     setTextModalOpen(true);
//   };

//   const handleCloseTextModal = () => {
//     setTextModalOpen(false);
//   };

//   return (
//     <>
//       <div className="inner-functional-container">
//         <div className="inner-functional-container-header">
//           <Heading>SIGNING OPTION</Heading>
//         </div>
//         <div className="inner-functional-body">
//           <Button
//             size="lg"
//             width="100%"
//             border="2px"
//             variant="outline"
//             onClick={() => setIsDrawingModalOpen(true)}
//           >
//             Add Signature
//           </Button>
//           <DrawingModalComponent
//             // isDrawingModalOpen={isOpen} // Use isOpen to control the modal
//             isDrawingModalOpen={isDrawingModalOpen}
//             setIsDrawingModalOpen={setIsDrawingModalOpen}
//             drawingBoardRef={drawingBoardRef} // Pass the drawingBoardRef
//             numPages={numPages} // Pass the numPages
//             handleDrawingDone={handleDrawingDone}
//             pdfFile={pdfFile} // Pass the handleDrawingDone function
//             // handleApplyText={handleApplyText}
//           />
//           <Button
//             size="lg"
//             width="100%"
//             border="2px"
//             variant="outline"
//             onClick={handleGenerateSignedPdf}
//           >
//             Download Pdf
//           </Button>

//         </div>
//         <Drawer
//           size="xs"
//           isOpen={isOpen}
//           placement="right"
//           onClose={onClose}
//           finalFocusRef={btnRef}
//         >
//           <DrawerOverlay />
//           <DrawerContent>
//             <DrawerCloseButton />
//             <DrawerHeader>SIGN PDF</DrawerHeader>
//             <DrawerBody>
//               <Button
//                 w="100%"
//                 mb={3}
//                 onClick={() => setIsDrawingModalOpen(true)}
//               >
//                 Add Signature
//               </Button>
//               <Button w="100%" onClick={handleGenerateSignedPdf}>
//                 Sign Pdf
//               </Button>
//             </DrawerBody>
//             <DrawerFooter></DrawerFooter>
//           </DrawerContent>
//         </Drawer>

//         {isTextModalOpen && (
//           <div className="text-modal">
//             <textarea
//               value={userText}
//               onChange={(e) => setUserText(e.target.value)}
//               placeholder="Enter your text here"
//             />
//             <Button
//               size="lg"
//               width="100%"
//               border="2px"
//               variant="outline"
//               onClick={handleCloseTextModal}
//             >
//               Cancel
//             </Button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default FunctionalSidebar;

// //not proper working
// import React, { useState, useRef, useEffect } from "react";
// import { PDFDocument, rgb } from "pdf-lib";
// import { saveAs } from "file-saver";

// import {
//   Button,
//   Drawer,
//   DrawerBody,
//   DrawerCloseButton,
//   DrawerContent,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerOverlay,
//   Heading,
// } from "@chakra-ui/react";
// import DrawingModalComponent from "../DrawingModalComponent/DrawingModalComponent";

// function FunctionalSidebar({
//   isOpen,
//   onClose,
//   isDrawingModalOpen,
//   btnRef,
//   setIsDrawingModalOpen,
//   handleGenerateSignedPdf,
//   drawingBoardRef,
//   numPages,
//   handleDrawingDone,
//   pdfFile,
//   // handleApplyText,
// }) {
//   const [userText, setUserText] = useState("");
//   const [isTextModalOpen, setTextModalOpen] = useState(false);

//   const handleOpenTextModal = () => {
//     setTextModalOpen(true);
//   };

//   const handleCloseTextModal = () => {
//     setTextModalOpen(false);
//   };

//   return (
//     <>
//       <div className="inner-functional-container">
//         <div className="inner-functional-container-header">
//           <Heading>SIGNING OPTION</Heading>
//         </div>
//         <div className="inner-functional-body">
//           <Button
//             size="lg"
//             width="100%"
//             border="2px"
//             variant="outline"
//             onClick={() => setIsDrawingModalOpen(true)}
//           >
//             Add Signature
//           </Button>
//           <DrawingModalComponent
//             // isDrawingModalOpen={isOpen} // Use isOpen to control the modal
//             isDrawingModalOpen={isDrawingModalOpen}
//             setIsDrawingModalOpen={setIsDrawingModalOpen}
//             drawingBoardRef={drawingBoardRef} // Pass the drawingBoardRef
//             numPages={numPages} // Pass the numPages
//             handleDrawingDone={handleDrawingDone}
//             pdfFile={pdfFile} // Pass the handleDrawingDone function
//             // handleApplyText={handleApplyText}
//           />
//           <Button
//             size="lg"
//             width="100%"
//             border="2px"
//             variant="outline"
//             onClick={handleGenerateSignedPdf}
//           >
//             Download Pdf
//           </Button>

//         </div>
//         <Drawer
//           size="xs"
//           isOpen={isOpen}
//           placement="right"
//           onClose={onClose}
//           finalFocusRef={btnRef}
//         >
//           <DrawerOverlay />
//           <DrawerContent>
//             <DrawerCloseButton />
//             <DrawerHeader>SIGN PDF</DrawerHeader>
//             <DrawerBody>
//               <Button
//                 w="100%"
//                 mb={3}
//                 onClick={() => setIsDrawingModalOpen(true)}
//               >
//                 Add Signature
//               </Button>
//               <Button w="100%" onClick={handleGenerateSignedPdf}>
//                 Sign Pdf
//               </Button>
//             </DrawerBody>
//             <DrawerFooter></DrawerFooter>
//           </DrawerContent>
//         </Drawer>

//         {isTextModalOpen && (
//           <div className="text-modal">
//             <textarea
//               value={userText}
//               onChange={(e) => setUserText(e.target.value)}
//               placeholder="Enter your text here"
//             />
//             <Button
//               size="lg"
//               width="100%"
//               border="2px"
//               variant="outline"
//               onClick={handleCloseTextModal}
//             >
//               Cancel
//             </Button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default FunctionalSidebar;

import React, { useState, useRef, useEffect } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
} from "@chakra-ui/react";
import DrawingModalComponent from "../DrawingModalComponent/DrawingModalComponent";

function FunctionalSidebar({
  isOpen,
  onClose,
  isDrawingModalOpen,
  btnRef,
  setIsDrawingModalOpen,
  handleGenerateSignedPdf,
  drawingBoardRef,
  numPages,
  handleDrawingDone,
  pdfFile,
  // handleApplyText,
}) {
  const [userText, setUserText] = useState("");
  const [isTextModalOpen, setTextModalOpen] = useState(false);

  const handleOpenTextModal = () => {
    setTextModalOpen(true);
  };

  const handleCloseTextModal = () => {
    setTextModalOpen(false);
  };

  return (
    <>
      <div className="inner-functional-container">
        <div className="inner-functional-container-header">
          <Heading>SIGNING OPTION</Heading>
        </div>
        <div className="inner-functional-body">
          <Button
            size="lg"
            width="100%"
            border="2px"
            variant="outline"
            onClick={() => setIsDrawingModalOpen(true)}
          >
            Add Signature
          </Button>
          <DrawingModalComponent
            // isDrawingModalOpen={isOpen} // Use isOpen to control the modal
            isDrawingModalOpen={isDrawingModalOpen}
            setIsDrawingModalOpen={setIsDrawingModalOpen}
            drawingBoardRef={drawingBoardRef} // Pass the drawingBoardRef
            numPages={numPages} // Pass the numPages
            handleDrawingDone={handleDrawingDone}
            pdfFile={pdfFile} // Pass the handleDrawingDone function
            // handleApplyText={handleApplyText}
          />
          <Button
            size="lg"
            width="100%"
            border="2px"
            variant="outline"
            onClick={handleGenerateSignedPdf}
          >
            Download Pdf
          </Button>

        </div>
        <Drawer
          size="xs"
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>SIGN PDF</DrawerHeader>
            <DrawerBody>
              <Button
                w="100%"
                mb={3}
                onClick={() => setIsDrawingModalOpen(true)}
              >
                Add Signature
              </Button>
              <Button w="100%" onClick={handleGenerateSignedPdf}>
                Sign Pdf
              </Button>
            </DrawerBody>
            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>

        {isTextModalOpen && (
          <div className="text-modal">
            <textarea
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="Enter your text here"
            />
            <Button
              size="lg"
              width="100%"
              border="2px"
              variant="outline"
              onClick={handleCloseTextModal}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default FunctionalSidebar;
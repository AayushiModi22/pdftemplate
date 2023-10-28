import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heading,
} from "@chakra-ui/react";


function SignPdf() {
  const [pdfFile, setPdfFile] = useState(null);
  const [templatePDf, setTemplatePDf] = useState(null);
  
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const pdfFile = event.target.files[0];
    setPdfFile(pdfFile);
    if (pdfFile) {
      navigate(`/test1`, { state: { pdfFile: pdfFile } });
    }
  };

  const handleInputUpload = (event) => {
    const tempFile = event.target.files[0];
    setTemplatePDf(tempFile);
    if (tempFile) {
      navigate(`/template`,{state:{tempFile : tempFile}});
    }
  };

  return (
    <div className="functional-body-wrapper">
      <form className="functional-form">
        <Heading className="text-center">Sign PDF</Heading>
        <br />
        <p className="Functional-text">
          Sign yourself or request electronic signatures from others.
        </p>

        <input
          type="file"
          hidden
          id="uploadfile"
          accept=".pdf"
          onChange={handleInputChange}
        />
        <label className="upload-btn" htmlFor="uploadfile">
          SIGN PDF
        </label>

        <input
          type="file"
          hidden
          id="templatefile"
          accept=".pdf"
          onChange={handleInputUpload}
        />
        <label className="upload-btn" htmlFor="templatefile">
          Create Template
        </label>
      </form>
    </div>
  );
}

export default SignPdf;

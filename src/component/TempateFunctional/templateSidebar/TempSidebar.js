import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Heading,
  } from "@chakra-ui/react";
  function TempSidebar({ isOpen, onClose, btnRef, recipientInitials }) {
    // Limit the number of recipients to 4 in each row
    const recipientsInRows = [];
    for (let i = 0; i < recipientInitials.length; i += 4) {
      recipientsInRows.push(recipientInitials.slice(i, i + 4));
    }
  
    return (
      <>
        <div className="inner-functional-container">
          <div className="inner-functional-container-header">
            <Heading>Template OPTION</Heading>
          </div>
          <div className="inner-functional-body">
            {recipientsInRows.map((row, rowIndex) => (
              <div key={rowIndex} style={{ display: "flex" }}>
                {row.map((recipient, index) => (
                  <div key={index} style={{ marginRight: "8px" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: recipient.color,
                        fontSize: "18px",
                        fontWeight: "bolder",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin:"5px",
                      }}
                    >
                      {recipient.initial.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Drawer
            size="xs"
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            {/* ... Rest of your TempSidebar code ... */}
          </Drawer>
        </div>
      </>
    );
  }
  
  export default TempSidebar;
  
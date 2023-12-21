import React, { useState} from 'react'
// import {
//   Link
//   } from "@carbon/react";
import { Link} from '@carbon/icons-react';
import Feedback from "./PopUp/Feedback";
const BUTTON_FEEDBACK = "BUTTON_FEEDBACK";
const QuickLinks=()=> {
  const [actionProps, setActionProps] = useState("");
  const action={
    key: BUTTON_FEEDBACK,
      label: "Feedback"
  }
  
  const renderActionModals = () => {
    return (
      <React.Fragment>
        {actionProps?.key === BUTTON_FEEDBACK && (
          <Feedback
            
            setActionProps={setActionProps}
            
          />
        )}
        </React.Fragment>)}
  return (
    <>
    {renderActionModals()}
    <div style={{padding:"1rem", border: "1px solid #E4E5E6",minHeight:"22rem",overflow:"hidden"}}>
        <h4>Quick links</h4>
        <div style={{marginTop:"2rem"}}>
        <Link size="20"/> <a href="https://community.ibm.com/community/user/powerdeveloper/home">Join the Power Developer eXchange Community</a><br /><br />
        <Link size="20"/> <a href="/">Read the FAQ</a><br /><br />
        <Link size="20"/> <a style={{color: "rgb(13, 110, 253)", textDecoration: "underline", cursor: "pointer"}} onClick={() => setActionProps(action)}>Provide feedback</a>
        </div>
        </div>
        </>
      
  )
}

export default QuickLinks
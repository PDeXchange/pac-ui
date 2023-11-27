import React from 'react'
// import {
//   Link
//   } from "@carbon/react";
import { Link} from '@carbon/icons-react';
const QuickLinks=()=> {
  return (
    <>
    <div style={{padding:"1rem", border: "1px solid #E4E5E6",minHeight:"22rem",overflow:"hidden"}}>
        <h4>Quick links</h4>
        <div style={{marginTop:"2rem"}}>
        <Link size="20"/> <a href="/">Join Power Access Cloud community</a><br /><br />
        <Link size="20"/> <a href="/">Read the FAQ</a><br /><br />
        <Link size="20"/> <a href="/">Provide feedback</a>
        </div>
        </div>
        </>
      
  )
}

export default QuickLinks
import React from 'react'


import {
    Button,
    Grid
  } from "@carbon/react";
const Feedback=()=> {
  return (
      <>
    <Grid fullWidth>
                <div className="page-banner">
                      <h1 className="landing-page__sub_heading banner-header">
                      Feedback
                      </h1>
                     
                  </div>
                  </Grid>
    <Button  onClick={()=>{alert('button clicked')}}>sendmail</Button>
    </>
  )
}

export default Feedback
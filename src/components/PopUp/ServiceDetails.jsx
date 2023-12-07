// import axios from "axios";
import React, { useState } from "react";
import { Modal } from "@carbon/react";
import { useNavigate } from "react-router-dom";

const ServiceDetails = ({pagename, selectRows, setActionProps }) => {
    let navigate = useNavigate();

   console.log(selectRows);
  return (
    <Modal
      modalHeading="Service Details"
      onRequestClose={() => {
        setActionProps("");
      }}
      onRequestSubmit={() => {
        setActionProps("");
        navigate(pagename);
      }}
      open={true}
      primaryButtonText={"OK"}
      secondaryButtonText={"Cancel"}

    >
      
      <p><strong>ID</strong>: {selectRows[0].id}</p>
        <p><strong>Name</strong>: {selectRows[0].name}</p>
        <p><strong>Display_name</strong>: {selectRows[0].display_name}</p>
      
      <p><strong>Catalog name</strong>: {selectRows[0].catalog_name}</p>
        <p><strong>Expiry</strong>: {selectRows[0].expiry.split("T")[0]}</p>
      
        
        <p><strong>Access Info</strong>: {selectRows[0].status.access_info==="..."?"Under process":"VM can be accessed via ExternalIP: "+selectRows[0].status.access_info+" use any SSH pub key registered to SSH into the VM"}</p>
        {selectRows[0].status.state==="PENDING EXTENSION"&&<p><strong>Requested extend date</strong>: {selectRows[0].status.extentiondate}<br/><br/><strong>Justification for Extension</strong>: {selectRows[0].status.justification}</p>}
        
        <p><strong>Status</strong>: {selectRows[0].status.state}</p>
        <p><strong>Message</strong>: {selectRows[0].status.message}</p>
    </Modal>
  );
};

export default ServiceDetails;

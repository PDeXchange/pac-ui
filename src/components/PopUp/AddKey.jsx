// import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createKeys  } from "../../services/request";
import { Modal } from "@carbon/react";

const AddKey = ({ setActionProps})=> {
  let navigate = useNavigate();

  const [g, setGroup] = useState({
    name: "",
    content: "",
  });

  const onInputChange = (e) => {
    setGroup({ ...g, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (g.name.trim()==="" || g.content.trim() === "")
      return ;
    try {
      await createKeys(g); // wait for the dispatch to complete
    } catch (error) {
      // handle any errors that occurred during the dispatch
      console.log(error);
    } finally {
    }
    setActionProps("");
    navigate("/keys")
  };

  return (
    <Modal
      modalHeading="Add key"
      danger={true}
      onRequestClose={()=>{
        setActionProps("");
      }}
      onRequestSubmit={()=>{
        onSubmit();
      }}
      open={true}
      primaryButtonText={"Submit"}
      secondaryButtonText={"Cancel"}
    >
      <div>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter the ssh key name..."
              name="name"
              value={g?.name}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Justifcation" className="form-label">
              Public key<span className="text-danger">*</span>
            </label>
            <textarea
              type={"text"}
              className="form-control"
              placeholder="Enter the public key..."
              name="content"
              value={g?.justification}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
      </div>
    </Modal>
  );
}

export default AddKey;

// import axios from "axios";
import React, { useState } from "react";
import { deleteGroup } from "../../services/request";
import { Modal } from "@carbon/react";
import { useNavigate } from "react-router-dom";

const ExitGroup = ({ selectRows, pagename, setActionProps, response }) => {
  const [primaryButtonDisabled, setPrimaryButtonDisabled] = useState(false);
  const [primaryButtonText, setPrimaryButtonText] = useState("Submit");
  const id = selectRows[0]?.id;
  let navigate = useNavigate();

  const onSubmit = async () => {
    let title = "";
    let message = "";
    let errored = false;
    try {
      const { type, payload } = await deleteGroup(g); // wait for the dispatch to complete
      if (type === "API_ERROR") {
        title = "The request to exit the group has failed.";
        message = payload.response.data.error;
        errored = true;
      } else {
        title = "Your request to leave the group was successfully submitted.";
      }
    } catch (error) {
      console.log(error);
    }
    response(title, message, errored)
    setActionProps("");
    navigate(pagename);
  };

  const [g, setGroup] = useState({
    id: id,
    justification: "",
  });

  const onInputChange = (e) => {
    setGroup({ ...g, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      modalHeading="Leave Group"
      onRequestClose={() => {
        setActionProps("");
      }}
      onRequestSubmit={() => {
        setPrimaryButtonDisabled(true);
        setPrimaryButtonText("Exiting...")
        onSubmit();
        setActionProps("");
      }}
      open={true}
      primaryButtonText={primaryButtonText}
      primaryButtonDisabled={primaryButtonDisabled}
      secondaryButtonText={"Cancel"}
    >
      <div>
       
        <div className="mb-3">
          <label htmlFor="Justifcation" className="form-label">
          Please share why you are leaving this group
          </label>
          <textarea
            type={"text"}
            className="form-control"
            name="justification"
            value={g?.justification}
            onChange={(e) => onInputChange(e)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ExitGroup;

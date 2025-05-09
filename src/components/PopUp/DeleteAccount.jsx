// import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Theme } from "@carbon/react";
import { deleteUser } from "../../services/request";


const DeleteAccount = ({ setActionProps }) => {
	let navigate = useNavigate();

	const onSubmit = async () => {
	let title = "";
	let message = "";
	let errored = false;

		try {
				const { type, payload } = await deleteUser(); // wait for the dispatch to complete
				if (type === "API_ERROR") {
				title = "Service deletion failed.";
				message = payload.response.data.error;
				errored = true;
				} else {
				title = "Service deleted successfully.";
				navigate("/login");
				}
		} catch (error) {
				console.log("Delete failed : ", error)
		}
		setActionProps("")
	};
 
  return (
    <Theme theme="g10">
    <Modal
			modalLabel="Delete account"
      modalHeading="Are you sure you want to delete your account?"
      onRequestClose={() => {
        setActionProps("");
      }}
      onRequestSubmit={() => {
        onSubmit();
      }}
      open={true}
			danger={true}
      primaryButtonText={"Delete"}
      secondaryButtonText={"Cancel"}
    >
			<div>
        <div className="mb-3">
          <h6>This will delete all your existing services, keys and revoke access from your group.</h6>
        </div>
      </div>
    </Modal>
    </Theme>
  );
}
export default DeleteAccount;
// import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createKeys } from "../../services/request";
import { Modal,InlineNotification } from "@carbon/react";
const AddKey = ({ pagename,setActionProps, response }) => {
  let navigate = useNavigate();
  const [g, setGroup] = useState({
    name: "",
    content: "",
  });
  const [keyContentValidate,setKeyContentValidate]=useState(false);
  const [keyContentemptyCheck,setKeyContentemptyCheck]=useState(false);
  const [keynameCheck,setKeynameCheck]=useState(false);
  const onInputChange = (e) => {
    setGroup({ ...g, [e.target.name]: e.target.value });
  };
  const onSubmit = async () => {
    let title = "";
    let message = "";
    let errored = false;
    // if (g.name === "" || g.content === ""){
    //   setKeyContentemptyCheck(true)
    //   setKeyContentValidate(false)
    //   return;
    // }else{
    //   setKeyContentemptyCheck(false);
    //   if(!keyContentValidate){
    //     setKeyContentValidate(true)
    //   }else{
    //     setKeyContentValidate(false)
    //   }
    // }
    if(g.name===""){
      setKeynameCheck(true);
      return;
    }else{
      setKeynameCheck(false);
    }
    if(g.content===""){
      setKeyContentemptyCheck(true);
      return;
    }else{
      setKeyContentemptyCheck(false);
      if(keyContentValidate){
        setKeyContentValidate(true)
        return
      }else{
        setKeyContentValidate(false)
      }
    }
    try {
      const { type, payload } = await createKeys(g); // wait for the dispatch to complete
      if (type === "API_ERROR") {
        title = "Key addition failed";
        message = payload.response.data.error;
        errored = true;
      } else {
        title = "Key added successfully";
      }
    } catch (error) {
      // handle any errors that occurred during the dispatch
      console.log(error);
    }
    response(title, message, errored)
    setActionProps("");
    navigate(pagename)
  };
  const inlineNotificationComponent = (notificationTitile,notificationSubTitile) => {
    return (
      <React.Fragment>
        <InlineNotification
        aria-label="closes notification"
        kind="error"
        onClose={function noRefCheck(){}}
        onCloseButtonClick={function noRefCheck(){}}
        statusIconDescription="notification"
        subtitle={notificationSubTitile}
        title={notificationTitile}
      />
      </React.Fragment>
    );
  };
  return (
    <Modal
      modalHeading="Add key"
      onRequestClose={() => {
        setActionProps("");
      }}
      onRequestSubmit={() => {
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
            onChange={(e) => {
              if(e.target.value===''){
                setKeynameCheck(true)
              }else{
                setKeynameCheck(false)
              }
              onInputChange(e)
            }}
            onBlur={(e)=>{
              if(e.target.value===''){
                setKeynameCheck(true)
              }else{
                setKeynameCheck(false)
              }
            }}
            required
          />
          {keynameCheck && inlineNotificationComponent('Key name',': field can not be empty')}
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
            onChange={(e) => {
              if(e.target.value===''){
                setKeyContentemptyCheck(true)
              }else{
                setKeyContentemptyCheck(false)
                setKeyContentValidate(false)
                onInputChange(e)
              }
            }}
            onBlur={(e)=>{
              if(e.target.value===''){
                setKeyContentemptyCheck(true)
              }else{
              setKeyContentValidate(false)
              const re=/^ssh-[a-z]+\s+[A-Za-z0-9+/=]+\s*[^\s@]+@[^\s@]+\.[^\s@]+$/;
              console.log(e.target.value);
              const isValid = re.test(e.target.value);
              console.log(!isValid)
              setKeyContentValidate(!isValid);
              }
            }}
            required
          />
          {keyContentValidate&& inlineNotificationComponent('Public Key',':is not valid a valid ssh key')}
          {keyContentemptyCheck&& inlineNotificationComponent('Public Key',': field can not be empty')}
        </div>
      </div>
    </Modal>
  );
}
export default AddKey;
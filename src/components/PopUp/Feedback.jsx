// import axios from "axios";
import React, { useState } from "react";
import { Modal,Tooltip, Button } from "@carbon/react";
import { FaceNeutral, FaceDissatisfied, FaceSatisfied , FaceNeutralFilled, FaceDissatisfiedFilled, FaceSatisfiedFilled } from "@carbon/icons-react";
const Feedback = ({ setActionProps }) => {
  const [feedbackText,setFeedbackText]=useState("");
  const [feedbackRating,setFeedbackRating]=useState("Positive");

  const onSubmit = async () => {
alert(feedbackText + " "+ feedbackRating)
     };
 
  return (
    <Modal
      modalHeading="Please provide your feedback"
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
          <label htmlFor="rating" className="form-label">
            Rate your experience:
          </label>
          <div className="feedback">
<div onClick={() => setFeedbackRating("Negative") } className={`${feedbackRating==="Negative" ? "ratingSelected" : "unselected"}`}>
    <span>Negative</span> <br/>
    {feedbackRating==="Negative"? <FaceDissatisfiedFilled size="50" style={{fill:"#333"}}/>:<FaceDissatisfied size="50"/>}

</div>
<div  onClick={() => setFeedbackRating("Neutral") } className={`${feedbackRating==="Neutral" ? "ratingSelected" : "unselected"}`}>
    <span>Neutral</span> <br/>
    {feedbackRating==="Neutral"? <FaceNeutralFilled size="50" style={{fill:"#333"}}/>:<FaceNeutral size="50"/>}
</div>
<div  onClick={() => setFeedbackRating("Positive") } className={`${feedbackRating==="Positive" ? "ratingSelected" : "unselected"}`}>
<span>Positive</span> <br/>
{feedbackRating==="Positive"? <FaceSatisfiedFilled size="50" style={{fill:"#333"}}/>:<FaceSatisfied size="50"/>}
</div>
          </div>
          </div>
        <div className="mb-3">
          <label htmlFor="comments" className="form-label">
            Comments (optional):
          </label>
          <textarea
            type={"text"}
            className="form-control"
            name="comments"
            rows="4"
            value= {feedbackText}
            onChange={(e) => {
                setFeedbackText(e.target.value)
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
export default Feedback;
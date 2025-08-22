import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { tncStatus, acceptTnC, newRequest} from "../../services/request";

const TnCRoute = ({ Component }) => {
  const navigate = useNavigate();
  const auth = UserService.isLoggedIn();
  const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
    const fetchStatus = async () => {
      let TnCdata = await tncStatus();
      
      if (!TnCdata.acceptance) {  
        const just = sessionStorage.getItem("Justification");
      const tnc_acc = sessionStorage.getItem("TnC_acceptance");
      if(just!=='' && tnc_acc){
        await acceptTnC(); 
        await newRequest({
          name: "bronze",
          id: "ab2d28ba-a8af-4202-b962-c36623e8fb19",
          justification: just
        });
        navigate("/dashboard");
      }else{ 
        alert("You need to register before you can log in");
        navigate("/register");
      }
    }
      setIsLoading(false);
    };
    if (auth=== false){
      setIsLoading(false);
      navigate("/login")
    }else{
      fetchStatus();       
    }
  },[auth, navigate])


  if (isLoading) {
    return null; 
  }else{
    return <Component />;
  }
  
};

export default TnCRoute;

import React,{useEffect,useState} from "react";
import { Grid, Column } from "@carbon/react";
import "../styles/registration.scss";
import GroupsForHome from "./GroupsForHome";
import KeysForHome from "./KeysForHome";
import QuickLinks from "./QuickLinks";
import ServicesForHome from "./ServicesForHome";
import { allGroups } from "../services/request";
// import ServicesForHome from "./ServicesForHome";

const Dashboard = () => {

  const [allGroupdata,setAllGroupsdata]=useState([])
  const fetchData = async () => {
    let data = [];

    data = await allGroups();
    data?.payload.sort((a, b) => {
      let fa = a.quota.cpu,
        fb = b.quota.cpu;
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    
    setAllGroupsdata(data.payload)
  }
  useEffect(()=>{
    fetchData();
    
  },[])
  
  return (
    <Grid className="landing-page" fullWidth>
      <div className="page-banner">
                      <h1 className="landing-page__sub_heading banner-header">
                      Dashboard
                      </h1>
                      <p className="banner-text">Welcome to your Power Access Cloud dashboard. Here, you’ll find information about your group, services, SSH keys, and more. Some of the tasks you can complete from the dashboard include getting information about the resource quota for your approved group, requesting a group upgrade, leaving a group, or tracking group status; reviewing your deployed services, getting service access information, extending a service, deleting a service, or going to the catalog to order additional services;  viewing your SSH Key details, adding a new key, or deleting a key</p>
                  </div>
      <br />
      <Column lg={16} md={8} sm={4} className="landing-page__r2">
        <Grid>
          <Column lg={10} md={4} sm={4}>
            <GroupsForHome />
          </Column>
          <Column lg={6} md={4} sm={4}>
          <QuickLinks />
          </Column>
          
        </Grid><br /><br />
        <Grid>
        <Column lg={10} md={4} sm={4}>
          <ServicesForHome groups={allGroupdata} />
          </Column>
          <Column lg={6} md={4} sm={4}>
          <KeysForHome />
          </Column>
        </Grid>
        <br />
        <br />
        
      </Column>
    </Grid>
  );
};
export default Dashboard;
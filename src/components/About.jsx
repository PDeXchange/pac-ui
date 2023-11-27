import React from "react";
import { Grid, Column } from "@carbon/react";
import "../styles/registration.scss";
import GroupsForHome from "./GroupsForHome";
import KeysForHome from "./KeysForHome";
import QuickLinks from "./QuickLinks";
import ServicesForHome from "./ServicesForHome";
// import ServicesForHome from "./ServicesForHome";
const About = () => {
  return (
    <Grid className="landing-page" fullWidth>
      <Column
        lg={16}
        md={8}
        sm={4}
        className="landing-page__banner banner-full"
      >
        <Grid className="about-page" fullWidth>
          <h1 className="landing-page__sub_heading banner-header">
            Dashboard
          </h1>
        </Grid>
      </Column>
      <br />
      <Column lg={16} md={8} sm={4} className="landing-page__r2">
        <Grid>
          <Column lg={8} md={4} sm={4}>
            <GroupsForHome />
          </Column>
          <Column lg={8} md={4} sm={4}>
          <ServicesForHome />
          </Column>
        </Grid><br /><br />
        <Grid>
          <Column lg={8} md={4} sm={4}>
          <KeysForHome />
          </Column>
          <Column lg={8} md={4} sm={4}>
            <QuickLinks />
          </Column>
        </Grid>
        <br />
        <br />
        {/* <ServicesForHome /> */}
      </Column>
    </Grid>
  );
};
export default About;
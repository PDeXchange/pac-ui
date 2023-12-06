import { Route, Routes } from "react-router-dom";
import NavbarComp from "./Navbar";
import GroupList from "./GroupList";
import RequestList from "./RequestList";
import NewRequest from "./NewRequest";
import Dashboard from "./Dashboard";

const Pac = () => (
  <>
    <NavbarComp />
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/groups" element={<GroupList />} />
      <Route exact path="/requests" element={<RequestList />} />
      <Route exact path="/request/:id" element={<NewRequest />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
    </Routes>
  </>
);

export default Pac;

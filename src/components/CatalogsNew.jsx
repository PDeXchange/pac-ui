import React, { useState, useEffect } from "react";
import { Grid, Column } from "@carbon/react";
import { allGroups } from "../services/request";
import centos from '../assets/images/cent-os-logo.png';
import {
  Button,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableToolbar,
  TableBatchAction,
  TableSelectRow,
  TableToolbarSearch,
  TableSelectAll,
  Tooltip,
  DataTableSkeleton,
  Tile,
  TileGroup
} from "@carbon/react";
import { InlineNotification } from "@carbon/react";
import { MobileAdd, TrashCan, AlarmSubtract } from "@carbon/icons-react";
import { clientSearchFilter } from "../utils/Search";
import FooterPagination from "../utils/Pagination";
import { flattenArrayOfObject } from "./commonUtils";
import { getAllCatalogs } from "../services/request";
import DeployCatalog from "./PopUp/DeployCatalog";
import DeleteCatalog from "./PopUp/DeleteCatalog";
import RetireCatalog from "./PopUp/RetireCatalog";
import UserService from "../services/UserService";
import QuotaWarning from "./PopUp/QuotaWarning";
import Notify from "./utils/Notify";
import "../styles/registration.scss";
const BUTTON_REQUEST = "BUTTON_REQUEST";
const BUTTON_DELETE = "BUTTON_DELETE";
const BUTTON_RETIRE = "BUTTON_RETIRE";

const deploy=  {
    key: BUTTON_REQUEST,
    label: "Deploy",
    kind: "ghost",
    icon: MobileAdd,
    standalone: true
  };

let selectRows = [];
const CatalogsNew = () => {
  const isAdmin = UserService.isAdminUser();
  const [rows, setRows] = useState([]);
  const [id, setId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [title, setTitle] = useState("");
  const [notifyKind, setNotifyKind] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionProps, setActionProps] = useState("");
  
  const [cpu, setCPU] = useState(0);
  const [memory, setMemory] = useState(0);

  const fetchData = async () => {
    let data = await getAllCatalogs();
    setRows(data?.payload);
    let data2 = await allGroups();    
    const result= data2.payload.filter((d)=>d.membership)
    //alert(result[0].quota.cpu+ " "+ result[0].quota.memory);
    setCPU(result[0].quota.cpu);
    setMemory(result[0].quota.memory);
    setLoading(false);
  };

  const handleResponse = (title, message, errored) => {
    setTitle(title);
    setMessage(message);
    errored ? setNotifyKind("error") : setNotifyKind("success");
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderActionModals = () => {
    return (
      <React.Fragment>
        {actionProps?.key === BUTTON_REQUEST && (
          <DeployCatalog
            selectRows={id}
            setActionProps={setActionProps}
            response={handleResponse}
          />
        )}
      </React.Fragment>
    );
  };
  return (
    <>
    <Grid className="landing-page" fullWidth>
    <Column
        lg={16}
        md={8}
        sm={4}
        className="landing-page__banner banner-full"
      >
    
          <h1 className="landing-page__sub_heading banner-header">
            Catalog
          </h1>
          <br/>
          <p style={{marginLeft: "1rem"}}> Explore the catalog of Power Access Cloud services and select the one that best suits your project needs. Note: You must <a href="/">add a SSH key</a> before deploying a service. 
</p>
       
      </Column>
      </Grid>
      <p style={{marginLeft: "1.5rem"}}>Viewing {rows.length} item(s)</p>
      <InlineNotification style={{margin: "0 0 2rem 2rem"}}
      lowContrast="true"
                        kind="info"
                        title="Note"
                        subtitle="Depending on your group access, not all catalog items will be available to you. If you need resources that exceed your group quotas, consider upgrading to a new group."
                        onClose={() => {
                            setTitle("");
                        }}
                    />
                    <Notify style={{marginLeft: "2rem"}} title={title} message={message} nkind={notifyKind} setTitle={setTitle} />
      
          <QuotaWarning />
          <Grid className="landing-page" fullWidth>
          {renderActionModals()}
      {rows.map((row) => (    
               
    <Column
        lg={5}
        md={4}
        sm={2}
      ><Tile style={{paddingBottom:"50px", marginBottom:"50px"}} >
        <img src={centos} alt="centos" /><br/>
        
      <strong><em>{row.name}</em></strong><br/><br/>
      OS: CentOS 8 Stream<br/>
vCPU: {row.capacity.cpu}<br/>
Memory: {row.capacity.memory} GB<br/><br/>

Best for this and that and this and that.
<br /><br />

{/* <Tooltip style={{float:"right"}} align="top" label="You do not have enough resources available to deploy this service. Select a different service or upgrade your group to proceed."> */}
<Button style={{float:"right"}}  size="sm" kind="tertiary" disabled={(row.capacity.cpu>=cpu)||(row.capacity.memory>=memory)} onClick={() => {setId(row); setActionProps(deploy)}}>Deploy</Button>
{/* </Tooltip> */}
   </Tile>
    </Column>
    ))}
    
    
      </Grid>
        </>
     
   
  );
};
export default CatalogsNew;

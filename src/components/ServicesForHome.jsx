import React,{useEffect,useState} from 'react';
import { allGroups,getServices } from "../services/request";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  DataTableSkeleton,
  OverflowMenu,
  OverflowMenuItem,
  Button,
  
} from "@carbon/react";
import { useNavigate } from "react-router-dom";
import { flattenArrayOfObject } from "./commonUtils";
import UserService from "../services/UserService";
import { Add,CheckmarkFilled,Pending,InProgress } from "@carbon/icons-react";
import DeleteService from "./PopUp/DeleteService";
import ServiceExtend from "./PopUp/ServiceExtend";
import ServiceDetails from './PopUp/ServiceDetails';
import Notify from "./utils/Notify";

const BUTTON_REQUEST = "BUTTON_REQUEST";
const BUTTON_EXTEND = "BUTTON_EXTEND";
const BUTTON_DETAILS = "BUTTON_DETAILS";

const extend_action={
  key: BUTTON_EXTEND,
  label: "Change Expiry",
  kind: "ghost",
  standalone: true,
  hasIconOnly: true,
}
const delete_action={
  key: BUTTON_REQUEST,
  label: "Delete",
  kind: "ghost",
  standalone: true,
  hasIconOnly: true,
}

const details_action={
  key: BUTTON_DETAILS,
  label: "Details",
  kind: "ghost",
  standalone: true,
  hasIconOnly: true,
}

const headers = [
  
  {
    key: "display_name",
    header: "Service name",
  },
  {
    key: "expiry",
    header: "Expiration date",
  },
  {
    key: "status.state",
    header: "Status",
  },
  {
    key: "action",
    header: "Action",
  }
];
const ServicesForHome=()=> {

  let navigate = useNavigate();
  const [groupdata, setGroupdata] = useState([]);
  const [servicesrows, setServicesRows] = useState([]);
  const isAdmin = UserService.isAdminUser();
  const [loading, setLoading] = useState(true);
  const [actionProps, setActionProps] = useState("");
  const [title, setTitle] = useState("");
  const [notifyKind, setNotifyKind] = useState("");
  const [message, setMessage] = useState("");

  const [selectRow, setSelectRow] = useState([])

  const filteredHeaders = isAdmin
  ? headers // Display all buttons for admin users
  : headers.filter((header) => !header.adminOnly); // Filter out admin-only buttons for non-admin users


  const fetchData = async () => {
    let data = [];
    data = await allGroups();
    const result=data.payload.filter((d)=>d.membership)
    setGroupdata(result);
    
  };
  const fetchServicesData = async () => {
    let data = await getServices();
    setServicesRows(data?.payload);
    
    // setServicesRows(data?.payload.map((row) => ({ ...row, id: row.name })));
    
    setLoading(false);
  };

  useEffect(()=>{
    
    fetchServicesData();
  },[servicesrows])

  useEffect(()=>{
    fetchData();
    
  },[])

  const displayData = flattenArrayOfObject(
    servicesrows
  );
  
  const renderSkeleton = () => {
    const headerLabels = filteredHeaders?.map((x) => x?.header);
    return (
      <DataTableSkeleton
        columnCount={headerLabels?.length}
        compact={false}
        headers={headerLabels}
        rowCount={3}
        zebra={false}
      />
    );
  };
  

  const handleResponse = (title, message, errored) => {
    setTitle(title);
    setMessage(message);
    errored ? setNotifyKind("error") : setNotifyKind("success");
  };

  const renderNoDataEmptyState=()=>{
    return (<div>There are no services to display. After your group access is approved, you can add a service from the catalog.
      </div>)
  }

  const renderActionModals = () => {
    return (
      <React.Fragment>
        {actionProps?.key === BUTTON_DETAILS && (
          <ServiceDetails
            pagename=''
            selectRows={selectRow}
            setActionProps={setActionProps}
          />
        )}
        {actionProps?.key === BUTTON_REQUEST && (
          <DeleteService
            pagename=''
            selectRows={selectRow}
            setActionProps={setActionProps}
            response={handleResponse}
          />
        )}
        {actionProps?.key === BUTTON_EXTEND && (
          <ServiceExtend
            pagename=''
            selectRows={selectRow}
            setActionProps={setActionProps}
            response={handleResponse}
          />
        )}
      </React.Fragment>
    );
  };


  return (
    <>
    
      <Notify
        title={title}
        message={message}
        nkind={notifyKind}
        setTitle={setTitle}
      />
      {loading ? (
        renderSkeleton()
      ) : (
        <>
          {renderActionModals()}
          <DataTable
            rows={displayData}
            headers={filteredHeaders}
            isSortable
            radio
          >
            {({
              rows,
              headers,
              getTableProps,
              getHeaderProps,
              getTableContainerProps,
              
            }) => {
              
              return (
                
                <>
                <div style={{padding:"1rem", border: "1px solid #E4E5E6",minHeight:"22rem",overflow:"hidden"}}>
                  <h4>My Services</h4>
                <TableContainer
                  
                  {...getTableContainerProps()}
                >
                  {((rows.length>0)&&<Table {...getTableProps()} style={{marginTop:"2rem"}}>
                    
                    <TableHead>
                      <TableRow>
                        {headers.map((header) => (
                          <TableHeader {...getHeaderProps({ header })}>
                            {header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        
                        <TableRow key={row.id}>
                          {row.cells.map((cell,i) => (cell.value &&
                            // <TableCell key={cell.id}>{cell.value}</TableCell>
                            ((i!==2)?<TableCell key={cell.id}>{cell.value}</TableCell>:<TableCell key={cell.id}>{row.cells[i].value} {(row.cells[i].value==="CREATED"&&<CheckmarkFilled />)}{(row.cells[i].value==="NEW"&&<Pending />)}{(row.cells[i].value==="IN_PROGRESS"&&<InProgress />)}</TableCell>)
                          ))}
                          <TableCell className="cds--table-column-menu">
                            <OverflowMenu size="sm" flipped>
                              
                              <OverflowMenuItem
                              key={details_action.key}
                              onClick={() => 
                               {
                                //  console.log(servicesrows)
                                const selectedrow=servicesrows.filter((d)=>
                                d.id===row.id
                                )
                              
                                 setSelectRow(selectedrow)
                                 setActionProps(details_action)
                               } }
                              itemText="View Details" />
                              <OverflowMenuItem 
                              key={extend_action.key}
                               onClick={() => 
                                {
                                  const selectedrow=displayData.filter((d)=>
                                d.id===row.id
                                )
                              
                                 setSelectRow(selectedrow)
                                  setActionProps(extend_action)
                                } }
                                itemText="Request Extension" />
                              <OverflowMenuItem 
                               key={details_action.key}
                               onClick={() => 
                                {
                                  const selectedrow=displayData.filter((d)=>
                                d.id===row.id
                                )
                              
                                 setSelectRow(selectedrow)
                                  setActionProps(delete_action)
                                }
                                } itemText="Delete service" />
                            </OverflowMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                       {
                    
                  }
                    </TableBody>
                   
                  </Table>)}
                  
                </TableContainer>
                {(rows.length===0 &&<div style={{backgroundColor:"#f4f4f4",padding:"1rem",marginTop:"3rem"}}>
        {(renderNoDataEmptyState()) }
        </div>)}
        <Button onClick={()=>navigate('/catalogs')} disabled={groupdata.length===0} style={{float:"right",marginTop:"1rem"}} renderIcon={Add}>
                        Go to catalog
                      </Button>
                </div>
                </>
              );
            }}
          </DataTable>
        </>
      )}
    </>
  );
  
}

export default ServicesForHome
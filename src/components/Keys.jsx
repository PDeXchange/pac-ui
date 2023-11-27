import React, { useState, useEffect } from "react";
import { allKeys } from "../services/request";
import { MobileAdd, TrashCan } from "@carbon/icons-react";
import { clientSearchFilter } from "../utils/Search";
import UserService from "../services/UserService";
import AddKey from "./PopUp/AddKey";

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
  Modal,
  Button,
  Grid,
  Column
} from "@carbon/react";
import "../styles/keysforhome.scss";
import DeleteKey from "./PopUp/DeleteKey";
import Notify from "./utils/Notify";

const BUTTON_REQUEST = "BUTTON_REQUEST";
const BUTTON_DELETE = "BUTTON_DELETE";

const headers = [
  // {
  //   key: "id",
  //   header: "ID",
  //   adminOnly: true,
  // },
  // {
  //   key: "user_id",
  //   header: "User ID",
  //   adminOnly: true,
  // },
  {
    key: "name",
    header: "Name",
  },
  {
    key: "content",
    header: "Content",
  },
  
];

const action={
  key: BUTTON_REQUEST,
    label: "Add Key",
    kind: "ghost",
    icon: MobileAdd,
    standalone: true,
    hasIconOnly: true,
}

const delete_action={
  key: BUTTON_DELETE,
    label: "Delete Key",
    kind: "ghost",
    icon: TrashCan,
    standalone: true,
}
let selectRows = [];

const KeysForHome = () => {
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [notifyKind, setNotifyKind] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionProps, setActionProps] = useState("");
  const isAdmin = UserService.isAdminUser();

  const [open, setOpen] = useState(false);
  const [keyname, setKeyName] = useState("");
  const [keyvalue, setKeyValue] = useState("");
  const [iscoppied, setIscoppied] = useState(true);

  const filteredHeaders = isAdmin
    ? headers // Display all buttons for admin users
    : headers.filter((header) => !header.adminOnly); // Filter out admin-only buttons for non-admin users

  const fetchData = async () => {
    let data = await allKeys();
    setRows(data?.payload);
    setLoading(false);
  };

  const handleResponse = (title, message, errored) => {
    setErrorTitle(title);
    setErrorMsg(message);
    errored ? setNotifyKind("error") : setNotifyKind("success");
  };

  useEffect(() => {
    fetchData();
  }, [isAdmin, headers, actionProps]); // eslint-disable-line react-hooks/exhaustive-deps

  const displayData = clientSearchFilter(searchText, rows);

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
  const renderActionModals = () => {
    return (
      <React.Fragment>
        {actionProps?.key === BUTTON_REQUEST && (
          <AddKey
            pagename=''
            setActionProps={setActionProps}
            response={handleResponse}
          />
        )}
        {actionProps?.key === BUTTON_DELETE && (
          <DeleteKey
            selectRows={selectRows}
            pagename=''
            setActionProps={setActionProps}
            response={handleResponse}
          />
        )}
      </React.Fragment>
    );
  };

const renderNoDataEmptyState=()=>{
  return (<div>There are no keys to display. PAC requires a SSH public key to deploy services. Click Add key to proceed.</div>)
}
  return (
    
    <>
    <Grid fullWidth>
                <div className="page-banner">
                      <h1 className="landing-page__sub_heading banner-header">
                      Keys details
                      </h1>
                     
                  </div>
                  </Grid>
    <Modal
        modalHeading="Key Details"
        secondaryButtonText="Cancel"
        primaryButtonText="Copy"
        open={open}
        onRequestClose={() => {
          setOpen(false);
          setIscoppied(true);
          setKeyName("");
          setKeyValue("");
        }}
        onRequestSubmit={()=>{
          setIscoppied(false);
          navigator.clipboard.writeText(keyvalue);
          
        }}
        
      >
        <p><strong>Key name</strong>: {keyname}</p>
        <p><strong>Key Value</strong>: <span className={`${iscoppied ? "" : "highlight"}`}>{keyvalue}</span></p>
      </Modal>
      <Notify title={errorTitle} message={errorMsg} nkind={notifyKind} setTitle={setErrorTitle} />
      {loading ? (renderSkeleton()) : (
        <>
          {renderActionModals()}
          <Grid fullWidth>
          <Column lg={16} md={8} sm={4}>
          <Button style={{float:"right",marginTop:"1rem"}}
                          key={action.key}
                          renderIcon={action.icon}
                          disabled={
                            !(selectRows.length === 1) &&
                            action.key !== BUTTON_REQUEST
                          }
                          onClick={() => setActionProps(action)}
                        >
                          {action.label}
                        </Button>
          </Column>
          <Column lg={16} md={8} sm={4}>
          
          <DataTable rows={displayData} headers={filteredHeaders} isSortable>
            {({
              rows,
              headers,
              getTableProps,
              getHeaderProps,
              getTableContainerProps,
              
            }) => {
              
              return (
                <>
                <div >
                  
                <TableContainer {...getTableContainerProps()}>
                   
                  {(rows.length>0&&<Table {...getTableProps()} style={{marginTop:"2rem"}}>
                    <TableHead>
                      <TableRow>
                        
                        {headers.map((header) => (
                          <TableHeader
                            key={header.key}
                            {...getHeaderProps({ header })}
                          >
                            {header.header}
                          </TableHeader>
                          
                        ))}
                        <TableHeader>Action</TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.id}>
                          
                          
                        <TableCell key={row.cells[0].id}>{row.cells[0].value}</TableCell>
                        
                        <TableCell style={{width:"10rem"}} key={row.cells[0].id}>{row.cells[1].value}</TableCell>
                          <TableCell className="cds--table-column-menu">
                            <OverflowMenu size="sm" flipped>
                              <OverflowMenuItem
                                onClick={() => {
                                  setOpen(true);

                                  setKeyName(row.cells[0].value);
                                  setKeyValue(row.cells[1].value);
                                }}
                                itemText="View Details"
                              />
                              
                              <OverflowMenuItem
                              key={delete_action.key}
                              renderIcon={delete_action.icon}
                              
                              onClick={() => 
                                {
                                  selectRows=[];
                                  selectRows.push(row);
                                  setActionProps(delete_action)
                                }
                                }
                              itemText="Delete Key" />
                            </OverflowMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>)}
                </TableContainer>
                {(rows.length===0 && <div style={{backgroundColor:"#f4f4f4",padding:"1rem",marginTop:"2rem"}}>
                    {(renderNoDataEmptyState())}
                  
                  </div>
                  ) }
                  
                </div>
                </>
              );
            }}
          </DataTable>
          </Column>
          </Grid>
          <div>
          
            <br />
          
          </div>
          
          
        </>
      )}
    </>
  )
}
export default KeysForHome;

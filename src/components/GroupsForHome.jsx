import React, { useState, useEffect } from "react";
import { allGroups } from "../services/request";
//import { NoDataEmptyState } from "@carbon/ibm-products";

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
  Button
} from "@carbon/react";
import { MobileAdd, TrashCan, Add } from "@carbon/icons-react";
import { clientSearchFilter } from "../utils/Search";
import { flattenArrayOfObject } from "./commonUtils";

import UpgradeGroup from "./PopUp/UpgradeGroup";

import UserService from "../services/UserService";
import Notify from "./utils/Notify";
import ExitGroup from "./PopUp/ExitGroup";

const BUTTON_REQUEST = "BUTTON_REQUEST";
const BUTTON_DELETE = "BUTTON_DELETE";

const delete_action={
  key: BUTTON_DELETE,
  label: "Exit",
  kind: "ghost",
  icon: TrashCan,
  standalone: true,
};

const new_request={
  key: BUTTON_REQUEST,
  label: "Request",
  kind: "ghost",
  standalone: true,
  hasIconOnly: true,
};

const headers = [
  {
    key: "name",
    header: "Groups",
  },
  {
    key: "quota.cpu",
    header: "vCPU quota",
  },
  {
    key: "quota.memory",
    header: "Memory quota",
  },
  {
    key: "membership",
    header: "Status",
  },
  {
    key: "action",
    header: "Action",
  }
];

let selectRows = [];
const GroupsForHome = () => {
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [notifyKind, setNotifyKind] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionProps, setActionProps] = useState("");
  const isAdmin = UserService.isAdminUser();
  const [allGroupdata,setAllGroupsdata]=useState([])


  const filteredHeaders = isAdmin
    ? headers // Display all buttons for admin users
    : headers.filter((header) => !header.adminOnly); // Filter out admin-only buttons for non-admin users

  const fetchData = async () => {
    let data = [];
    data = await allGroups();
    setAllGroupsdata(data)
    const result=data.payload.filter((d)=>d.membership)
    setRows(result);
    setLoading(false);
  };

  const handleResponse = (title, message, errored) => {
    setTitle(title);
    setMessage(message);
    errored ? setNotifyKind("error") : setNotifyKind("success");
  };


  useEffect(() => {
    fetchData();
    // console.log(allGroupdata.payload);
    
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const displayData = flattenArrayOfObject(
    clientSearchFilter(searchText, rows)
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

  const renderActionModals = () => {
    return (
      <React.Fragment>
        {actionProps?.key === BUTTON_REQUEST && (
          <UpgradeGroup
          pagename=''
            currentGroupId={rows[0].id}
            allgroupdata={allGroupdata.payload}
            setActionProps={setActionProps}
            response={handleResponse}
          />
        )}
        {actionProps?.key === BUTTON_DELETE && (
          <ExitGroup
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
    return (<div>Your group access is pending. Check back soon for status.
      </div>)
  }

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
                  <h4>My Group</h4>
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
                          {row.cells.map((cell) => (cell.value &&
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                          <TableCell className="cds--table-column-menu">
                            <OverflowMenu size="sm" flipped>
                              
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
                              itemText="Leave group" />
                            </OverflowMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                       {
                    
                  }
                    </TableBody>
                   
                  </Table>)}
                  
                </TableContainer>
                {(rows.length===0 && <div style={{backgroundColor:"#f4f4f4",padding:"1rem",marginTop:"3rem"}}>
                   {renderNoDataEmptyState()}
                  </div>
                  ) }
                  <Button disabled={rows.length===0} style={{float:"right",marginTop:"1rem"}} renderIcon={Add} onClick={() => setActionProps(new_request)}>
                        Upgrade group
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
};
export default GroupsForHome;

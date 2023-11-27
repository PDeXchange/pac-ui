import React, { useState, useEffect } from "react";
import { allRequests,allGroups } from "../services/request";
import "../styles/common.scss";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  Button,
  DataTableSkeleton,
  Grid,
  Column,
  OverflowMenu,
  OverflowMenuItem

} from "@carbon/react";
import { MobileAdd, TrashCan, Add } from "@carbon/icons-react";
import { clientSearchFilter } from "../utils/Search";

import { flattenArrayOfObject } from "./commonUtils";
import UpgradeGroup from "./PopUp/UpgradeGroup";
import ExitGroup from "./PopUp/ExitGroup";
import UserService from "../services/UserService";
import Notify from "./utils/Notify";

const BUTTON_REQUEST = "BUTTON_REQUEST";
const BUTTON_DELETE = "BUTTON_DELETE";

const new_request={
  key: BUTTON_REQUEST,
  label: "Request",
  kind: "ghost",
  standalone: true,
  hasIconOnly: true,
};
const delete_action={
  key: BUTTON_DELETE,
  label: "Exit",
  kind: "ghost",
  icon: TrashCan,
  standalone: true,
};

const headers = [
  {
    key: "id",
    header: "ID",
    adminOnly: true,
  },
  {
    key: "group.group",
    header: "Group",
  },
  {
    key: "user_id",
    header: "User ID",
    adminOnly: true,
  },
  {
    key: "created_at",
    header: "Created",
  },
  {
    key: "justification",
    header: "Use case",
  },
  {
    key: "state",
    header: "State",
  },
  {
    key: "comment",
    header: "Admin comments",
  },
];

let selectRows = [];
const GroupList = () => {
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [notifyKind, setNotifyKind] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionProps, setActionProps] = useState("");
  const isAdmin = UserService.isAdminUser();
  const [allGroupdata,setAllGroupsdata]=useState([]);
  const [current_group_id,setCurrent_group_id]= useState("");
  const [groupToDelete,setGroupToDelete]=useState([]);

  const filteredHeaders = isAdmin
    ? headers // Display all buttons for admin users
    : headers.filter((header) => !header.adminOnly); // Filter out admin-only buttons for non-admin users

    const fetchAllRequest = async () => {
      let data = await allRequests();
      
      const result=data.payload.filter((d)=>d.type==='GROUP');
      
      setRows(result);
      setLoading(false);
    };

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
      setAllGroupsdata(data)
      const result=data.payload.filter((d)=>d.membership)
      setCurrent_group_id(result.id)
    };

  const handleResponse = (title, message, errored) => {
    setTitle(title);
    setMessage(message);
    errored ? setNotifyKind("error") : setNotifyKind("success");
  };

  useEffect(() => {
    fetchAllRequest();
    
  }, [actionProps]); 

  useEffect(()=>{
    fetchData();
    
  },[])
  const displayData = flattenArrayOfObject(
   
    clientSearchFilter(searchText, rows)
  );

  // displayData.map(d=>({...d,test:'hello'}))
  // console.log(displayData);
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
          pagename='/groups'
            currentGroupId={current_group_id}
            allgroupdata={allGroupdata.payload}
            setActionProps={setActionProps}
            response={handleResponse}
          />
        )}
        {actionProps?.key === BUTTON_DELETE && (
          <ExitGroup
            selectRows={groupToDelete}
            pagename='/groups'
            setActionProps={setActionProps}
            response={handleResponse}
          />
        )}
      </React.Fragment>
    );
  };

  return (
    <>
    <Grid fullWidth>
     <div className="page-banner">
          <h1 className="landing-page__sub_heading banner-header">
          Group details
          </h1>
          <p className="banner-text">Groups control resource allocation by assigning the maximum vCPU and memory available to you. By default, all new users are added to the Bronze group which includes .5 vCPU and 8 GB of memory. If you require more CPU and memory, you can upgrade your group with a valid use case. You can only be a member of one group at a time.</p>
      </div>
      </Grid>      
      <Notify title={title} message={message} nkind={notifyKind} setTitle={setTitle} />
          
      {loading ? (renderSkeleton()) : (
        <>
          {renderActionModals()}
          <Grid fullWidth>
          <Column lg={16} md={8} sm={4}>
          <div>
      <Button disabled={rows.length===0} style={{float:"right",marginTop:"1rem",marginBottom:"1rem"}} renderIcon={Add} 
      onClick={() => {
        setActionProps(new_request)
        
      }}>
                        Upgrade group
      </Button>
      </div>
      </Column>
      <Column lg={16} md={8} sm={4}>
          <DataTable rows={displayData} headers={filteredHeaders} isSortable radio>
            {({
              rows,
              headers,
              getTableProps,
              getHeaderProps,
              getTableContainerProps,
            }) => {
              
              return (
                <TableContainer
                  
                  {...getTableContainerProps()}
                >
                  
                  <Table {...getTableProps()}>
                    <TableHead>
                      <TableRow>
                        
                        {headers.map((header) => (
                          <TableHeader {...getHeaderProps({ header })}>
                            {header.header}
                          </TableHeader>
                        ))}
                        <TableHeader>Action</TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        
                        <TableRow key={row.id}>
                          
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                           <TableCell className="cds--table-column-menu">
                            <OverflowMenu size="sm" flipped>
                              
                              <OverflowMenuItem
                              key={delete_action.key}
                              renderIcon={delete_action.icon}
                              
                              onClick={() => 
                                {
                                  
                                  const selectedrow=allGroupdata.payload.filter((d)=>
                                    d.name===row.cells[0].value
                                  )
                                  setGroupToDelete(selectedrow)
                                  setActionProps(delete_action)
                                }
                                }
                              itemText="Leave group" />
                            </OverflowMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              );
            }}
          </DataTable>
          </Column>
          </Grid>
        </>
      )}
    </>
  );
};
export default GroupList;

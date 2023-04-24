import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allRequests } from "../modules/requests";
import { approveRequest } from "../modules/request";

const RequestList = () => {
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state);

  useEffect(() => {
    dispatch(allRequests());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleApprove = (id) => {
    dispatch(approveRequest(id));
  };

  return (
    <div className="row">
      <div className="col-sm-12">
        <h1>Requests:</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Group ID</th>
              <th>Group</th>
              <th>User ID</th>
              <th>Requester</th>
              <th>Created At</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request) => {
                return (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.group_id}</td>
                    <td>{request.group}</td>
                    <td>{request.user_id}</td>
                    <td>{request.requester}</td>
                    <td>{request.created_at}</td>
                    <td>{request.state}</td>
                    <td>
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => handleApprove(request.id)}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="100%">No requests found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestList;

import React, { useState } from "react";
import "../admin.css";

const TotalTeacher = () => {
  const [teachers] = useState([
    {
      id: 1,
      name: "John Doe",
      profile_pic: "https://via.placeholder.com/40",
      mobile: "123-456-7890",
      address: "123 Main St, Springfield",
    },
    {
      id: 2,
      name: "Jane Smith",
      profile_pic: "https://via.placeholder.com/40",
      mobile: "987-654-3210",
      address: "456 Elm St, Springfield",
    },
  ]);

  return (
    <div className="container">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h6 className="panel-title">Total Teacher</h6>
        </div>
        <table className="table table-hover" id="dev-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Profile Picture</th>
              <th>Mobile</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.name}</td>
                <td>
                  <img
                    src={teacher.profile_pic}
                    alt="Profile Pic"
                    height="40"
                    width="40"
                  />
                </td>
                <td>{teacher.mobile}</td>
                <td>{teacher.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalTeacher;
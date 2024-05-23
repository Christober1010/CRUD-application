import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function List() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get("https://660a4a470f324a9a2884838b.mockapi.io/CrudData")
      .then((resp) => {
        setData(resp.data);
        // setData(...data,resp.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    axios
      .delete(`https://660a4a470f324a9a2884838b.mockapi.io/CrudData/${id}`)
      .then((resp) => {
        // console.log(resp)
        toast.success("Deleted successfully");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isView, setIsView] = useState(false);

  const [viewData, setViewData] = useState([]);

  const handleView = (id) => {
    setIsView(!isView);
    axios
      .get(`https://660a4a470f324a9a2884838b.mockapi.io/CrudData/${id}`)
      .then((resp) => {
        setViewData([resp.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isEdit, setIsEdit] = useState(false);

  const [editData, setEditData] = useState({});

  const handleEdit = (item) => {
    setIsEdit(!isEdit);
    setEditData(item);
  };

  const handleChange = (e, name) => {
    setEditData({ ...editData, [name]: e.target.value });
  };

  const handleSaveData = () => {
    axios
      .put(
        `https://660a4a470f324a9a2884838b.mockapi.io/CrudData/${editData.id}`,
        editData
      )
      .then((resp) => {
        // console.log(resp)
        setIsEdit(!isEdit);
        toast.success("Data Updated");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <div className="container ">
      <div className="d-flex justify-content-between">
        <div>
          <h1>Student List</h1>
        </div>
        <div className="badge bg-success align-items-center px-3 d-flex justify-content-center">
          <h5>
            Students Count{" "}
            <span className="text-warning fw-bold">{data.length}</span>
          </h5>
        </div>
        <div>
          <button className="btn btn-warning" onClick={() => navigate("/")}>
            Add Student <i className="fa fa-plus"></i>
          </button>
        </div>
      </div>

      <div className="table-responsive mt-5">
        <div className="my-4">
          <form>
            <input
              type="text"
              placeholder="Search here"
              className="px-3 rounded"
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            ></input>
          </form>
        </div>
        <table className="table table-hover table-bordered " border={2}>
          <thead>
            <tr className="fw-bold">
              <td>S.No</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Email ID</td>
              <td>Contact</td>
              <td className="text-center">Action</td>
            </tr>
          </thead>
          <tbody>

            {data
              .filter((item) => {
                return search === "" ? item : item.FirstName.toLowerCase().includes(search)
                || item.LastName.toLowerCase().includes(search)
                || item.Contact.includes(search)
                || item.Email.toLowerCase().includes(search);
              })
              .map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.FirstName}</td>
                    <td>{item.LastName}</td>
                    <td>{item.Email}</td>
                    <td>{item.Contact}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-outline-danger mx-1"
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                      <button
                        className="btn btn-outline-primary mx-1"
                        onClick={() => handleView(item.id)}
                      >
                        <i className="fa fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-outline-dark mx-1"
                        onClick={() => handleEdit(item)}
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* view modal */}

      <Modal isOpen={isView} toggle={() => setIsView(!isView)}>
        <ModalHeader toggle={() => setIsView(!isView)}>
          {" "}
          <i className="fa fa-user"></i> Details
        </ModalHeader>
        <ModalBody>
          {viewData.map((item) => {
            return (
              <div class="card">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"> First name :{item.FirstName}</li>
                  <li class="list-group-item">Last name :{item.LastName}</li>
                  <li class="list-group-item">Email ID :{item.Email}</li>
                  <li class="list-group-item">Contact :{item.Contact}</li>
                </ul>
              </div>
            );
          })}
        </ModalBody>
        <ModalFooter>
          {" "}
          <button className="btn btn-danger" onClick={() => setIsView(!isView)}>
            Close
          </button>
        </ModalFooter>
      </Modal>

      {/* Edit modal */}
      <Modal isOpen={isEdit} toggle={() => setIsEdit(!isEdit)}>
        <ModalHeader toggle={() => setIsEdit(!isEdit)}>
          Edit Information
        </ModalHeader>
        <ModalBody>
          <>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                First name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                value={editData.FirstName}
                onChange={(e) => handleChange(e, "FirstName")}
              />
            </div>

            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Last name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                value={editData.LastName}
                onChange={(e) => handleChange(e, "LastName")}
              />
            </div>

            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                value={editData.Email}
                onChange={(e) => handleChange(e, "Email")}
              />
            </div>

            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Contact
              </label>
              <input
                type="tel"
                class="form-control"
                id="exampleInputEmail1"
                value={editData.Contact}
                onChange={(e) => handleChange(e, "Contact")}
              />
            </div>
          </>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={() => handleSaveData()}>
            Save
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setIsEdit(!isEdit)}
          >
            Close
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default List;

import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { FaClosedCaptioning, FaList } from "react-icons/fa";
import { GET_PROJECTS } from "../queries/ProjectQueries";
import { GET_CLIENTS } from "../queries/ClientQueries";
import Spinner from "./Spinner";
import { ADD_PROJECT } from "../Mutations/ProjectMutation";



const AddProjectModal = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("new");
    const [ClientId, setClientId] = useState("");

    const {loading, error, data} = useQuery(GET_CLIENTS);


    const [add_project] = useMutation(ADD_PROJECT, {
        variables: { name, description, status, ClientId },
        update(cache, {data:{addProject}}) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] },
            });
        },
    });
    
    if(loading) return null;
    if(error) return <p>Something Went Wrong</p>;


    const onSubmit = (e) => {
      e.preventDefault();
      if(name === "" || description === "" || status === "", ClientId === ""){
          return alert("Please fill all Details");
      }
  
      add_project(name, description, status, ClientId);
      setName("");
      setDescription("");
      setStatus("new");
      setClientId("");
    };
  
    return (
      <>
      {!loading && !error && (
        <>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addProjectModal"
        >
          <div className="d-flex align-items-center">
            <FaList className="icon" />
            <div>New Project</div>
          </div>
        </button>
  
        <div
          className="modal fade"
          id="addProjectModal"
          aria-labelledby="addProjectModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="addProjectModalLabel">
                  New Project
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label >Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="">Description</label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="">Status</label>
                    <select
                      className="form-select"
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    > 
                    <option value="new">Note Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className='mb-3'>
                      <label className='form-label'>Client</label>
                      <select
                        id='clientId'
                        className='form-select'
                        value={ClientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value=''>Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
  
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
      </>
    );
}

export default AddProjectModal
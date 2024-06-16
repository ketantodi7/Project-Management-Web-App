import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { GET_PROJECTS } from '../queries/ProjectQueries';
import { useMutation, useReadQuery } from '@apollo/client';
import { DELETE_PROJECT } from '../Mutations/ProjectMutation';



const DeleteProjectButton = ({projectId}) => {
    const navigate = useNavigate();
    const id = projectId;
    const [delete_project] = useMutation(DELETE_PROJECT, {
        variables : {id}, 
        onCompleted: () => navigate("/"),
        refetchQueries:[{GET_PROJECTS}]
    })

  return (
    <>
        <div className='d-flex mt-5 ms-auto'>
      <button className='btn btn-danger m-2' onClick={delete_project}>
        <FaTrash className='icon' /> Delete Project
      </button>
    </div>
    </>
  )
}

export default DeleteProjectButton
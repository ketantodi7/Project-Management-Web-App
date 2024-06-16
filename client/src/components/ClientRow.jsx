import { useMutation } from '@apollo/client';
import React from 'react';
import {FaTrash} from "react-icons/fa"
import { DELETE_CLIENT } from '../Mutations/ClientMutation';
import { GET_CLIENTS } from '../queries/ClientQueries';
import { GET_PROJECTS } from '../queries/ProjectQueries';


const ClientRow = ({client}) => {

    const [delete_client] = useMutation(DELETE_CLIENT, {
        variables:{id : client.id},
        refetchQueries:[{query:GET_CLIENTS}, {query : GET_PROJECTS}],
        // update(cache, {data :{deleteClient}}) { 
        //     const {clients} = cache.readQuery({query : GET_CLIENTS});
        //     cache.writeQuery({
        //         query:GET_CLIENTS,
        //         data:{clients : clients.filter((client) => {
        //             return client.id !== deleteClient.id
        //         } )}
        //     })
        // }
    });
  return (
    <>
    <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
            <button className='btn btn-danger btn-sm' onClick={delete_client}>
                <FaTrash />
            </button>
        </td>
    </tr>
    </>
  )
}

export default ClientRow
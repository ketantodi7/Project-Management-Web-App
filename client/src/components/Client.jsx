import {useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../queries/ClientQueries';
import React from 'react';
import Spinner from './Spinner';
import ClientRow from './ClientRow';


const Client = () => {
    const {loading, error, data} = useQuery(GET_CLIENTS);
    console.log(data);

    if (loading) return <Spinner />
    if (error) return <p>Something Went Wrong...</p>
  return (
    <>
    {!loading && !error &&<>
    <table className='table table-hover mt-3'>
      <thead>
        <tr>
          <th>Name </th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.clients.map((client) => {
          return(
            <ClientRow key={client.id} client={client}/>
          )
        })}
      </tbody>
    </table>
    
    </> }
    </>
  )
}

export default Client
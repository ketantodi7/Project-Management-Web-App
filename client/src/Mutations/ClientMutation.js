import { gql } from "@apollo/client";

// query to Add Client 
const ADD_CLIENT = gql`
mutation addClient($name: String!, $email : String!, $phone: String!){
addClient(name: $name, email:$email, phone: $phone){
id
name
email
phone
}
}
`

// Query to Delete Client
const DELETE_CLIENT = gql`
mutation deleteClient($id : ID!){
deleteClient(id : $id){
name 
id 
email 
phone
}
}
`

export {DELETE_CLIENT, ADD_CLIENT}

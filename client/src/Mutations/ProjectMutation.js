import { gql } from "@apollo/client";

//  Query to Add a project
const ADD_PROJECT = gql`
mutation AddProject($name : String!, $description : String!, $status : ProjectStatus!, $ClientId : ID!){
addProject (name : $name, description : $description, status : $status, ClientId: $ClientId){
id 
name 
description
status 
client{
id
name
email
phone
}

}

}
`
//  Query to Delete a project
const DELETE_PROJECT = gql`
mutation DeleteProject($id : ID!){
deleteProject (id : $id){
id 
}
}
`
//  Query to Update a project
const UPDATE_PROJECT = gql`
mutation UpdateProject($id: ID!, $name : String!, $description : String!, $status : ProjectStatusUpdate!){
updateProject (id : $id, name : $name, description : $description, status : $status){
id 
name 
description
status 
client{
id
name
email
phone
}

}

}
`

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT }
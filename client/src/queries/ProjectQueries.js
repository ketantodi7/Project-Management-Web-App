import { gql } from "@apollo/client"

// Query to get all Projects Details 
const GET_PROJECTS = gql`
query getProjects{
projects{
id
name 
description
status
}
}
`

// Query to get a singl Project Detail
const GET_PROJECT = gql`
query getProject($id : ID!){
project(id : $id){
id
name 
description
status
client {
id 
name 
email
phone
}
}
}
`

export {GET_PROJECTS, GET_PROJECT}
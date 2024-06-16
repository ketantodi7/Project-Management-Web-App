import { gql } from "@apollo/client"

// Query to get all Clients Details 
const GET_CLIENTS = gql`
query getClients{
clients{
id
name 
email
phone
}
}
`

export {GET_CLIENTS}
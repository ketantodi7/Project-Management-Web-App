import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, graphqlSync, GraphQLNonNull, GraphQLEnumType } from 'graphql';
// import { projects, clients } from "../sampleData.js";

import Client from "../models/Client.js";
import Projects from "../models/Projects.js";

// Client Type 
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  })
})

// Project Type 
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent) {
        console.log(parent.ClientId)
        return Client.findById(parent.ClientId);
      }
    }
  })
})

const RootType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent) {
        return Projects.find();
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Projects.findById(args.id);
      }
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent) {
        return Client.find()
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Client.findById(args.id);
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Clients Mutation
    addClient: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const addClient = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        try {
          return await addClient.save();
        } catch (error) {
          if (error.code === 11000) {
            throw new Error('Email must be unique');
          }
        }
      }
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, args) {
        try {
          Projects.find({ClientId:args.id}).then((projects)=>{
            projects.forEach(()=>{
              project.remove();
            })
          })
          return await Client.findByIdAndDelete(args.id);
        } catch (error) {
          if (error) {
            console.log("a Error Occurred")
          }
        }
      }
    },

    // Projects Mutation

    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              "new": { value: "Not Started" },
              "progress": { value: "In Progress" },
              "completed": { value: "Completed" },
            },
          }),
          defaultValue: 'Not Started'
        },
        ClientId: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, args) {

        const add_Project = new Projects({
          name: args.name,
          description: args.description,
          status: args.status,
          ClientId: args.ClientId
        });

        return await add_Project.save();
      }
    },

    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, args) {
        try {
          return await Projects.findByIdAndDelete(args.id);
        } catch (error) {
          if (error) {
            console.log("a Error Occurred")
          }
        }
      }
    },

    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              "new": { value: "Not Started" },
              "progress": { value: "In Progress" },
              "completed": { value: "Completed" },
            },
          }),
        },
      },
      async resolve(parent, args) {

        const update_Project = Projects.findByIdAndUpdate(args.id, {
          $set: {

            name: args.name,
            description: args.description,
            status: args.status,
          },
        },
          { new: true }
        );

        return update_Project
      }
    },

  }
})

const schema = new GraphQLSchema({
  query: RootType,
  mutation
})

export { schema }
import './App.css';
import Header from './components/Header';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';


const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming
          },
        }
      }
    }
  }
})


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache,

})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
        <Header></Header>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/projects/:id" element={<Project />}></Route>
          </Routes>
        </div>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { getRepositories, deleteRepositories, createRepo } from "./services/api"

import "./styles.css";

function App() {
  const [repos,setRepos] =  useState([])

  async function handleAddRepository() {
    const newRepo = await createRepo()
    setRepos([...repos, newRepo])
  }

  async function handleRemoveRepository(id) {
    try {
      await deleteRepositories(id)
      setRepos(removeItemById(id))      
    } catch (error) {
      console.error(error)
    }
  }

  
  function removeItemById(id){
    return repos.filter(repo => repo.id !== id)
  }

  useEffect(() => {
    const fetchRepos = async () => {
      const repoList = await getRepositories()
      setRepos(repoList)
    }
    fetchRepos()
  },[])

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repos => {
          return <li key={repos.id}> 
            {repos.title}
            <button onClick={() => handleRemoveRepository(repos.id)}>
              Remover
            </button>
          </li>
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

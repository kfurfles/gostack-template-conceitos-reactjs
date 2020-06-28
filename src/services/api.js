import axios from "axios";
import faker from 'faker'

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export async function getRepositories(){
  const { data } = await api.get(`/repositories`)
  return data
}

export async function deleteRepositories(id){
  const response = await api.delete(`/repositories/${id}`)
  return response
}

export async function createRepo(){
  const result = {
    "title": faker.name.firstName(),
    "url": faker.internet.url(),
    "techs": [
      faker.internet.avatar(),
      faker.internet.avatar(),
      faker.internet.avatar()
    ]
  }

  const { data } = await api.post(`/repositories`,result)
  return data
}

export default api;

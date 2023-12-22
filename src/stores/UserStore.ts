
import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue';

const apiUrl = 'http://localhost:8081/';

export interface BaseResponse {
  message: string
  code: string
  body: any
}

export interface BaseResponePagination {
  result_message: string
  code: string
  body: any
}

export interface User {
value: any;
  id: string;
  username: string;
  created_date: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserFilter {
  username: string
  page: number
  limit: number
}

export const userAPIStore = defineStore('userAPIStore', () => {
  async function postCreate(request: Object, pathUrl: string): Promise<BaseResponse> {
    return await axios.post(apiUrl + pathUrl, request)
  }

  async function postUpdate(request: Object, id: string, pathUrl: string): Promise<BaseResponse> {
    return await axios.post(apiUrl + pathUrl + `/${id}`, request)
  }

  async function postDelete(id: string, pathUrl: string): Promise<BaseResponse> {
    return await axios.post(apiUrl + pathUrl + `/${id}`)
  }

  async function getDetail(id: string, pathUrl: string) : Promise<BaseResponse>{
    return await axios.get(apiUrl + pathUrl + `/${id}`)
  }

  async function getAll(request: Object, pathUrl: string): Promise<BaseResponse>{
    return await axios.get(apiUrl + pathUrl, request)
  }

  return {
    postCreate,
    postUpdate,
    postDelete,
    getDetail,
    getAll
  }
})

export const useUserStore = defineStore('userStore', () => {

  const user = ref<User>({} as User)
  const userList = ref<User[]>([] as User[])

  const { postCreate, postUpdate, postDelete, getDetail, getAll } = userAPIStore()

  async function createUser(user: User) {
    return await postCreate(user, 'users/create')
  }

  async function updateUser(user: User, id: string) {
    return await postUpdate(user, id, 'users/update')
  }

  async function deleteUser(id: string) {
    return await postDelete(id, 'users/delete')
  }

  async function getUserDetail(id: string) {
    return await getDetail(id, 'users/find-one')
  }

  async function getAllUsers(filter: UserFilter) {
    return await getAll(filter, 'users/find-all')
  }

  return { createUser, updateUser, deleteUser, getUserDetail, getAllUsers, user, userList}
})

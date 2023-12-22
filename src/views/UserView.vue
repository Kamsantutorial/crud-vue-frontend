<!-- KAMSAN TUTORIAL -->
<template>
  <template v-if="isShowListing">
    <button @click="showFormAdd()">ADD NEW</button>
    <div class="user-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userList" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.created_date }}</td>
            <td>
              <button @click="showFormDetail(user)">Detail</button>
              <button @click="showFormUpdate(user)">Edit</button>
              <button @click="deleteUserModel(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

  <template v-if="isShowFormAdd">
    <FormCreate @list-user="showFormListing()" />
  </template>

  <template v-if="isShowFormUpdate">
    <FormUpdate @list-user="showFormListing()" />
  </template>

  <template v-if="isShowFormDetail">
    <div class="form-detail">
      <h2>User Details</h2>
      <div>
        <span>ID:</span>
        <span>{{ user.id }}</span>
      </div>
      <div>
        <span>Username:</span>
        <span>{{ user.username }}</span>
      </div>
      <div>
        <span>Email:</span>
        <span>{{ user.email }}</span>
      </div>
      <div>
        <span>Created Date:</span>
        <span>{{ user.created_date }}</span>
      </div>
      <button type="button" @click="showFormListing">Back</button>
    </div>
  </template>
</template>

<!-- KAMSAN TUTORIAL -->
<script setup lang="ts">
import FormCreate from '@/components/FormCreate.vue'
import FormUpdate from '@/components/FormUpdate.vue'
import { useUserStore } from '@/stores/UserStore'
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

const isShowFormAdd = ref(false)
const isShowFormUpdate = ref(false)
const isShowListing = ref(true)
const isShowFormDetail = ref(false)

const { deleteUser, getAllUsers} = useUserStore()
const { user, userList } = storeToRefs(useUserStore())

const showFormAdd = () => {
  isShowFormAdd.value = true
  isShowListing.value = false
  isShowFormUpdate.value = false
  isShowFormDetail.value = false
}

const showFormUpdate = (obj) => {
  isShowFormAdd.value = false
  isShowListing.value = false
  isShowFormUpdate.value = true
  isShowFormDetail.value = false
  user.value = obj
}

const showFormListing = () => {
  isShowFormAdd.value = false
  isShowListing.value = true
  isShowFormUpdate.value = false
  isShowFormDetail.value = false
  getAllUsersModel()
}

const showFormDetail = (obj) => {
  isShowFormAdd.value = false
  isShowListing.value = false
  isShowFormUpdate.value = false
  isShowFormDetail.value = true
  user.value = obj
}

const deleteUserModel = (id: string) => {
  deleteUser(id).then((response) => {
    user.value = response.body
    getAllUsersModel()
  })
}

const getAllUsersModel = () => {
  getAllUsers(null).then((response: any) => {
    userList.value = response.data.body
  })
}

showFormListing()
</script>

<style>
.register-form {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}

.user-table {
  padding-top: 20px;
  max-width: 600px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.form-detail {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>

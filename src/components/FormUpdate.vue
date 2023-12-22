<template>
  <div class="register-form">
    <h2>Update User</h2>
    <form @submit.prevent="updateUserModel()">
      <input v-model="userState.id" type="hidden" />
      <input v-model="userState.username" placeholder="Username" />
      <input v-model="userState.email" placeholder="Email" />
      <input v-model="userState.password" type="password" placeholder="Password" />
      <input v-model="userState.confirmPassword" type="password" placeholder="Confirm Password" />
      <button type="submit">Update</button>
      <button type="button" @click="$emit('list-user')">Back</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { User, useUserStore } from '@/stores/UserStore'
import { storeToRefs } from 'pinia';
import { reactive } from 'vue'
const emit = defineEmits(['list-user'])

const { updateUser} = useUserStore()
const { user } = storeToRefs(useUserStore())

let userState = reactive({
  id: user.value.id,
  username: user.value.username,
  created_date: user.value.created_date,
  email: user.value.email,
  password: user.value.password
} as User)

const updateUserModel = () => {
  updateUser(userState, userState.id).then((response) => {
    if (response.code === '200') {
      emit('list-user')
    }
  })
}
</script>

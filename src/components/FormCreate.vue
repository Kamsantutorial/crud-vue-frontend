<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="createUserModel">
      <input v-model="userState.username" placeholder="Username" />
      <input v-model="userState.email" placeholder="Email" />
      <input v-model="userState.password" type="password" placeholder="Password" />
      <input v-model="userState.confirmPassword" type="password" placeholder="Confirm Password" />
      <button
        type="submit"
        :disabled="
          !userState.password ||
          !userState.confirmPassword ||
          userState.password !== userState.confirmPassword
        ">
        Save
      </button>
      <button type="button" @click="$emit('list-user')">Back</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore'
import { User } from '@/stores/UserStore'
import { reactive } from 'vue'
const { createUser } = useUserStore()
const emit = defineEmits(['list-user'])

let userState = reactive({
  id: '',
  username: '',
  created_date: '',
  email: '',
  password: ''
} as User)

const createUserModel = () => {
  createUser(userState).then((response) => {
    if (response.code === '200') {
      emit('list-user')
    }
  })
}
</script>

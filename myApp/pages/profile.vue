<template>
    <v-container>
      <v-form @submit.prevent="submitForm">
        <v-text-field v-model="name" label="Name" required></v-text-field>
        <v-text-field v-model="email" label="Email" required></v-text-field>
        
        <!-- Avatar Upload -->
        <v-file-input
          label="Upload Avatar"
          accept="image/*"
          prepend-icon="mdi-camera"
          @change="onFileChange"
        ></v-file-input>
  
        <!-- Preview Avatar -->
        <v-img v-if="avatar" :src="avatar" max-width="200" class="mt-3"></v-img>
  
        <v-btn color="primary" type="submit" class="mt-5">Submit</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import { ref } from 'vue'
  import axios from "axios"
  
  export default {
    setup() {
      const name = ref("")
      const email = ref("")
      const avatarFile = ref(null)
      const avatar = ref(null)
  
      const onFileChange = (event) => {
        // ดึงไฟล์จาก event.target.files แทนการดึงจาก parameter โดยตรง
        const file = event.target.files[0]; // Get the first file from the array
        if (file) {
          // Convert file to Base64 for preview
          const reader = new FileReader()
          reader.onload = (e) => {
            avatar.value = e.target.result // Store the base64 encoded image
          }
          reader.readAsDataURL(file) // Read the file as base64
          avatarFile.value = file // Store the file for form submission
          console.log('File selected:', avatarFile.value)
        } else {
          avatar.value = null // Clear the avatar preview if no file is selected
          avatarFile.value = null
          console.log('No file selected')
        }
      }
  
      const submitForm = async () => {
        const formData = new FormData()
        formData.append("name", name.value)
        formData.append("email", email.value)
        formData.append("avatar", avatarFile.value)
  
        // ตรวจสอบค่าที่ถูกส่งไป
        for (let pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1]); 
        }
  
        try {
          const response = await axios.post("http://localhost:7000/upprofile", formData)
          console.log('API Response:', response.data)
        } catch (error) {
          console.error("Error:", error)
        }
      }
  
      return {
        name,
        email,
        avatarFile,
        avatar,
        onFileChange,
        submitForm
      }
    }
  }
  </script>
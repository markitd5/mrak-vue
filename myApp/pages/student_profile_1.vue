<template>
    <v-app>
      <v-app-bar 
        color="teal" 
        height="25vh"
        class="rounded-b-xl"
        elevation="0"
      >
        <v-btn 
          icon="mdi-arrow-left" 
          color="white" 
          class="back-button"
        ></v-btn>
        
        <div class="profile-section">
          <div class="text-center">
            <div class="text-h6 text-white mb-6">Student Profile</div>
            
            <v-avatar 
              size="80" 
              class="mb-4 white"
            >
              <v-img
                :src="selectedImage"
                alt="Profile Picture"
                cover
              ></v-img>
  
              <!-- เพิ่ม input type file แบบซ่อน -->
              <input
                type="file"
                ref="fileInput"
                accept="image/*"
                @change="onFileSelected"
                style="display: none"
              >
  
              <!-- ปุ่มแก้ไขที่จะเรียก input file -->
              <v-btn
                icon="mdi-pencil"
                size="small"
                class="avatar-edit-btn"
                color="white"
                variant="flat"
                @click="$refs.fileInput.click()"
              ></v-btn>
            </v-avatar>
            
            <div class="white--text text-h6 mb-1">Nopparat Inmee</div>
            <div class="white--text text-subtitle-2">Nopparat@reallygreatsite.com</div>
          </div>
        </div>
      </v-app-bar>
  
      <v-main class="bg-grey-lighten-4">
        <v-container>
          <!-- General Settings Section -->
          <div class="text-subtitle-1 mb-2">General Settings</div>
          <v-card flat class="mb-4">
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-theme-light-dark</v-icon>
                </template>
                <v-list-item-title>Mode</v-list-item-title>
                <v-list-item-subtitle>Dark & Light</v-list-item-subtitle>
                <template v-slot:append>
                  <v-switch color="primary"></v-switch>
                </template>
              </v-list-item>
  
              <v-list-item link>
                <template v-slot:prepend>
                  <v-icon>mdi-key</v-icon>
                </template>
                <v-list-item-title>Change Password</v-list-item-title>
                <template v-slot:append>
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
              </v-list-item>
  
              <v-list-item link>
                <template v-slot:prepend>
                  <v-icon>mdi-translate</v-icon>
                </template>
                <v-list-item-title>Language</v-list-item-title>
                <template v-slot:append>
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
  
          <!-- Information Section -->
          <div class="text-subtitle-1 mb-2">Information</div>
          <v-card flat>
            <v-list>
              <v-list-item link>
                <template v-slot:prepend>
                  <v-icon>mdi-information</v-icon>
                </template>
                <v-list-item-title>About App</v-list-item-title>
                <template v-slot:append>
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
              </v-list-item>
  
              <v-list-item link>
                <template v-slot:prepend>
                  <v-icon>mdi-file-document</v-icon>
                </template>
                <v-list-item-title>Terms & Conditions</v-list-item-title>
                <template v-slot:append>
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
              </v-list-item>
  
              <v-list-item link>
                <template v-slot:prepend>
                  <v-icon>mdi-shield-check</v-icon>
                </template>
                <v-list-item-title>Privacy Policy</v-list-item-title>
                <template v-slot:append>
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
              </v-list-item>
  
              <v-list-item link>
                <template v-slot:prepend>
                  <v-icon>mdi-share-variant</v-icon>
                </template>
                <v-list-item-title>Share This App</v-list-item-title>
                <template v-slot:append>
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  // import profileImage from '@/assets/images/profile1.png' // แก้ชื่อไฟล์ตามที่คุณมี
  import { ref } from 'vue'
  import defaultImage from '@/assets/images/1.png'  
  
  // สร้าง ref สำหรับเก็บรูปที่เลือก
  const selectedImage = ref(defaultImage)
  // ref สำหรับ input file
  const fileInput = ref(null)
  
  // ฟังก์ชันเมื่อเลือกไฟล์
  const onFileSelected = (event) => {
    const file = event.target.files[0]
    if (file) {
      // สร้าง URL สำหรับไฟล์ที่เลือก
      const imageUrl = URL.createObjectURL(file)
      selectedImage.value = imageUrl
      
      // ถ้าต้องการส่งไฟล์ไปที่เซิร์ฟเวอร์
      // uploadImage(file)
    }
  }
  
  // ถ้าต้องการอัพโหลดไฟล์ไปที่เซิร์ฟเวอร์
  // const uploadImage = async (file) => {
  //   try {
  //     const formData = new FormData()
  //     formData.append('image', file)
      
  //     // ส่งไฟล์ไปที่เซิร์ฟเวอร์
  //     // const response = await axios.post('/api/upload', formData)
  //     // selectedImage.value = response.data.imageUrl
  //   } catch (error) {
  //     console.error('Error uploading image:', error)
  //   }
  // }
  
  </script>
  
  <style scoped>
  .back-button {
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 1;
  }
  
  .profile-section {
    width: 100%;
    padding-top: 2rem;
  }
  
  .edit-button-wrapper {
    position: relative;
    width: 80px;
    margin: -24px auto 16px;
  }
  
  .avatar-edit-btn {
    position: absolute;
    right: -5px;
    bottom: 0;
    background-color: #0158c8 !important;
    border: 2px solid white !important;
  }
  
  /* เพิ่ม style สำหรับปุ่มอัพโหลด */
  .avatar-edit-btn {
    position: absolute;
    right: -5px;
    bottom: 0;
    background-color: #0158c8 !important;
    border: 2px solid white !important;
    cursor: pointer;
    z-index: 1;
  }
  
  /* เพิ่ม hover effect */
  .avatar-edit-btn:hover {
    opacity: 0.9;
  }
  /* กำหนดให้ v-main แสดงใต้ v-app-bar */
  .v-main {
    padding-top: calc(25vh + 16px) !important;
    background-color: #f5f5f5;
  }
  
  /* กำหนดสีข้อความ */
  .white--text {
    color: white !important;
  }
  
  .text-white {
    color: white !important;
  }
  
  /* กำหนดสีพื้นหลัง avatar */
  .v-avatar.white {
    background-color: #f5f5f5 !important;
  }
  
  /* ปรับ container */
  .v-container {
    max-width: 100%;
    width: 100%;
    padding: 16px;
  }
  </style>
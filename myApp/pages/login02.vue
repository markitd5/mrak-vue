<template>
    <div>
      <!-- <v-img
        class="mx-auto my-12"
        max-width="150"
        src="/img/logoวิทยาลัยเทคนิค.png"
      ></v-img> -->
  
      <v-card
        class="mx-auto pa-12 pb-8 my-6"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
      <v-img
        class="mx-auto my-4"
        max-width="100"
        src="/img/logoวิทยาลัยเทคนิค.png"
      ></v-img>
        <div class="text-center text-h6 pa-2">ระบบเยี่ยมบ้านนักเรียนนักศึกษา ออนไลน์ วิทยาลัยเทคนิคชัยภูมิ</div>

        <div class="text-center text-subtitle-1  pa-4">เข้าใช่งานระบบ</div>
  
        <v-text-field
          density="compact"
          placeholder="ชื่อผู้ใช้งาน"
          
          variant="outlined"
        ></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          
  
          <!-- <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Forgot login password?</a> -->
        </div>
  
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="รหัสผ่าน"
          
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>
  
        <v-card
          class="mb-12"
          color="surface-variant"
          variant="tonal"
        >
          <!-- <v-card-text class="text-medium-emphasis text-caption">
            Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
          </v-card-text> -->
        </v-card>
  
        <v-btn
          class="mb-8"
          color="green-accent-4"
          size="large"
          variant="tonal"
          rounded="xl"
          block
          
        >
          เข้าสู่ระบบ
        </v-btn>
  
        <v-card-text class="text-center">
          <a
            class="text-blue text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            หากลืมรหัสผ่าน <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </div>
  </template>
  <script>
    export default {
      data: () => ({
        visible: false,
      }),
    }
  </script>
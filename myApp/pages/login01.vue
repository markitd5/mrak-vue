<template>
  <v-app>
    <v-app-bar>
      <v-container fluid>
        <v-row align="center">
          <v-col cols="auto">
            <v-avatar>
              <v-img alt="John" src="/img/logoวิทยาลัยเทคนิค.png"></v-img>
            </v-avatar>
          </v-col>
          <v-col>
            <div class="text-h6 text-md-h5">
              ระบบเยี่ยมบ้านนักเรียนนักศึกษา ออนไลน์
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container class="text-center my-12">
        <v-row justify="center">
          <v-col cols="12">
            <v-img src="" width="100" class="mb-5"></v-img>
            <h1 class="display-1 text-md-h3 ">
              ระบบเยี่ยมบ้าน นักเรียนนักศึกษา
            </h1>
            <p class="text-subtitle-1 my-4">แผนกเทคโนโลยีสารสนเทศ</p>
          </v-col>
        </v-row>

        <v-row justify="center" class="my-6">
          <v-col cols="12" sm="6" md="6" lg="3">
            <router-link to="/login02" style="text-decoration: none">
              <v-card color="red lighten-2" dark class="pa-4">
                <v-avatar size="60" class="mb-4">
                  <v-img src="/img/3.png"></v-img>
                </v-avatar>
                <div class="text-h6">นักเรียน/นักศึกษา</div>
              </v-card>
            </router-link>
          </v-col>

          <v-col cols="12" sm="6" md="6" lg="3">
            <router-link to="/login02" style="text-decoration: none">
              <v-card color="cyan lighten-2" dark class="pa-4">
                <v-avatar size="60" class="mb-4">
                  <v-img src="/img/teechck.png"></v-img>
                </v-avatar>
                <div class="text-h6">ครูที่ปรึกษา</div>
              </v-card>
            </router-link>
          </v-col>
        </v-row>

        <v-row justify="center" class="my-6">
          <v-col cols="12" sm="6" md="6" lg="3">
            <router-link to="/login02" style="text-decoration: none">
              <v-card color="yellow lighten-2" dark class="pa-4">
                <v-avatar size="60" class="mb-4">
                  <v-img src="/img/OIP (1).jpg"></v-img>
                </v-avatar>
                <div class="text-h6">ฝ่ายทะเบียน</div>
              </v-card>
            </router-link>
          </v-col>

          <v-col cols="12" sm="6" md="6" lg="3">
            <router-link to="/login02" style="text-decoration: none">
              <v-card color="pink lighten-2" dark class="pa-4">
                <v-avatar size="60" class="mb-4">
                  <v-img src="/img/1.jpg"></v-img>
                </v-avatar>
                <div class="text-h6">ผู้ดูแลระบบ</div>
              </v-card>
            </router-link>
          </v-col>
        </v-row>

        <v-divider class="my-6"></v-divider>
        <p class="text-body-1">แผนกเทคโนโลยีสารสนเทศ วิทยาลัยเทคนิคชัยภูมิ</p>
      </v-container>
    </v-main>
  </v-app>
</template>

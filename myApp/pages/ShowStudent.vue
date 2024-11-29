<template>
    <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'calories', order: 'asc' }]">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>รายละเอียดสมาชิก</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ props }">
                        <v-btn class="mb-2" color="primary" dark v-bind="props">
                            เพิ่มสมาชิก
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>
    
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="4" sm="6">
                                        <v-text-field v-model="editedItem.student_id" label="ลำดับ"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4" sm="6">
                                        <v-text-field v-model="editedItem.username" label="สมาชิก"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4" sm="6">
                                        <v-text-field v-model="editedItem.password" label="รหัส"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4" sm="6">
                                        <v-file-input v-model="editedItem.picture" label="อัปโหลดรูปภาพ" accept="image/*"></v-file-input>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
    
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="close">
                                ยกเลิก
                            </v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="save">
                                ยืนยัน
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">คุณต้องการลบข้อมูลใช่หรือไม่</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
    
        <template v-slot:item.picture="{ item }">
            <!-- แสดงภาพจากโฟลเดอร์ /uploads/ โดยใช้ชื่อไฟล์จาก item.picture -->
            <v-img :src="'http://localhost:7000/uploads/profile/' + item.picture" max-width="100px" max-height="100px"></v-img>
        </template>
    
        <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon size="small" @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
                Reset
            </v-btn>
        </template>
    </v-data-table>
    </template>
    
    <script>
    import axios from "axios";
    export default {
        data: () => ({
            dialog: false,
            dialogDelete: false,
            headers: [{
                    title: "student_id",
                    align: "start",
                    sortable: false,
                    key: "student_id",
                },
                {
                    title: "username",
                    key: "username"
                },
                {
                    title: "password",
                    key: "password"
                },
                {
                    title: "picture",
                    key: "picture"
                },
                {
                    title: "Actions",
                    key: "actions",
                    sortable: false
                },
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: {
                student_id: "",
                username: "",
                password: "",
                picture: "",
            },
            defaultItem: {
                student_id: "",
                username: "",
                password: "",
                picture: "",
            },
        }),
    
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล";
            },
        },
    
        watch: {
            dialog(val) {
                val || this.close();
            },
            dialogDelete(val) {
                val || this.closeDelete();
            },
        },
    
        created() {
            this.initialize();
            this.listData();
        },
    
        methods: {
            initialize() {
                this.desserts = [{
                        student_id: "",
                        username: "",
                        password: "",
                        picture: "",
                    },
                    {
                        student_id: "",
                        username: "",
                        password: "",
                        picture: "",
                    },
                ];
            },
    
            async listData() {
                const respones = await axios.get("http://localhost:7000/listStudent");
                const datas = respones.data;
                console.log(" datas = ", datas);
                this.desserts = datas.datas;
            },
    
            editItem(item) {
                console.log('edit ', this.editedItem);
                this.editedIndex = this.desserts.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true;
            },
    
            async deleteItem(item) {
                let id = item.student_id;
                console.log("item = ", id);
                try {
                    const response = await axios.post(
                        "http://localhost:7000/deleteStudent", {
                            student_id: id
                        }
                    );
                    const status = response.data;
    
                    console.log("status = ", status);
                    if (status.status === 1) {
                        console.log("delete ok");
                    }
                    if (status.status === 0) {
                        console.log("error delete");
                    }
                } catch (e) {
                    console.log(e.message);
                }
    
                this.dialogDelete = true;
            },
    
            deleteItemConfirm() {
                this.closeDelete();
            },
    
            close() {
                this.dialog = false;
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                });
            },
    
            closeDelete() {
                this.dialogDelete = false;
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                });
            },
    
            async save() {
                console.log("save = ", this.editedItem);
                if (this.editedIndex > -1) {
                    try {
                        const response = await axios.post(
                            "http://localhost:7000/updateStudent",
                            this.editedItem
                        );
                        const status = response.data;
    
                        console.log("status = ", status);
                        if (status.status === 1) {
                            console.log("update ok");
                        }
                        if (status.status === 0) {
                            console.log("error update");
                        }
                    } catch (e) {
                        console.log(e.message);
                    }
    
                    //อัปโหลดรูปภาพ
                    try {
                        const response = await axios.post('http://localhost:7000/upload-single', this.editedItem, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                        console.log('Response:', response.data);
                        alert(response.data.message);
                    } catch (error) {
                        console.error('Upload single file error:', error);
                    }
    
                } else {
                    // Add data
                    try {
                        const response = await axios.post(
                            "http://localhost:7000/insertStudent",
                            this.editedItem
                        );
                        const status = response.data;
    
                        console.log("status = ", status);
                        if (status.status === 1) {
                            console.log("insert ok");
                        }
                        if (status.status === 0) {
                            console.log("error insert");
                        }
                    } catch (e) {
                        console.log(e.message);
                    }
    
                    //อัปโหลดรูปภาพ
                    try {
                        const response = await axios.post('http://localhost:7000/upload-single', this.editedItem, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                        console.log('Response:', response.data);
                        alert(response.data.message);
                    } catch (error) {
                        console.error('Upload single file error:', error);
                    }
                }
                this.close();
            },
        },
    };
    </script>
const express = require('express')
var bodyParser = require('body-parser')
const path = require('node:path');
const cors = require("cors");
const multer = require("multer");
const { error } = require('node:console');
const jwt = require('jsonwebtoken');
const SECRET_KEY = '123456';
// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    // console.log('file', file)
    cb(null, Date.now() + "-" + (file.originalname) + path.extname(file.originalname));
    console.log('filename=>', file.originalname)
  },
});
const upload = multer({ storage: storage });

const app = express()
const port = 7000
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "stdactivity_2567",
  },
});

// parse application/json
app.use(bodyParser.json())
app.use(cors());


// http://localhost:7000/login
app.get('/login', (req, res) => {
  //req.query  =>  get
  //req.body   =>  post
  try {
    console.log('username & password=', req.query)
    res.send('login  ok')
  } catch (e) {
    res.send({ ok: 0, error: e.message });
  }
})

// const users = [
//   { id: 1, username: 'testhee', password: '123456' }
// ];

// Route สำหรับการเข้าสู่ระบบ
app.post("/login", async (req, res) => {
  console.log("username & password=", req.body);
  try {
    // ตรวจสอบ username จากฐานข้อมูล
    let row = await knex("student").where({ username: req.body.username });
    console.log('row=', row[0])
    if (row.length === 0) {
      // หากไม่มี username ในฐานข้อมูล
      return res.status(404).json({ status: 0, message: "username ไม่ถูกต้อง" });
    }
    console.log('row[0] = ', row[0]);
    const userFromDB = row[0]; // ดึงข้อมูลผู้ใช้จากฐานข้อมูล

    // ตรวจสอบรหัสผ่าน (เปรียบเทียบ req.body.password กับข้อมูลในฐานข้อมูล)
    if (req.body.password !== userFromDB.password) {
      return res.status(401).json({ status: 0, message: "password ไม่ถูกต้อง" });
    }

    // หาก username และ password ถูกต้อง สร้าง JWT Token
    const token = jwt.sign(
      { id: userFromDB.student_id, username: userFromDB.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // ส่ง token กลับไปยัง client
    return res.json({ status: 1, token });
  } catch (e) {
    // จัดการข้อผิดพลาด
    console.error("Error:", e.message);
    return res.status(500).json({ ok: 0, error: e.message });
  }
});

// Middleware สำหรับตรวจสอบ JWT Token
function authenticateToken(req, res, next) {
  const headerstoken = req.headers["authorization"]
  const token = headerstoken.split(' ')[1];
  //console.log('token = ', token.split(' ')[1])
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ 
        message: 'Invalid token' ,
        status:0
      });
    }
    req.user = decoded;
    next();
  });
}

// Route ที่ต้องมีการยืนยันตัวตน (Protected Route)
app.get('/checktoken', authenticateToken, (req, res) => {
  res.json({
    message: ` Welcome ${req.user.username} to the verify! ` ,
    status:1
  });
  
});

app.post('/upload-single', upload.single('picture'), async (req, res) => {
  console.log('data =', req.file)
  try {
    let insert = await knex('student')
      .where({ student_id: 66309010020 })
      .update({ picture: req.file.filename })

    res.send({
      message: 'อัปโหลดไฟล์สำเร็จ',
      file: req.file
    });
  } catch (e) {
    res.send({ status: 0, error: e.message });
  }
});

// // API อัพรูปลงฐานข้อมูลไฟล์เดียว
// app.post('/upload-single', upload.single('picture'), async (req, res) => {
//   console.log('file=', req.file)
//   console.log('username=', req.body.username)
//   let insert = await knex('student')
//   .where({ username: req.body.username })
//   .update({
//       picture: req.file.filename
//   });
//   res.send({
//     message: 'อัปโหลดไฟล์สำเร็จ',
//     file: req.file
//   });
// });


// API สำหรับอัปโหลดหลายไฟล์
app.post('/upload-multiple', upload.array('pictures',), (req, res) => {
  console.log('date.now=', Date.now());

  console.log('', req.files)
  res.json({
    message: 'อัปโหลดหลายไฟล์สำเร็จ',
    files: req.files
  });
});




app.post('/upprofile', upload.single('avatar'), (req, res) => {
  console.log('upprofile=> ', req.body) // ข้อมูลฟอร์ม
  console.log('File=> ', req.file) // ข้อมูลไฟล์ที่อัปโหลด

  res.send('Profile uploaded successfully')
})






app.post('/insert', async (req, res) => {
  console.log('data= ', req.body.activities);
  const activities = req.body.activities
  //insert
  try {
    // ใช้ for loop เพื่อทำการ insert ทีละรายการ
    for (const activity of activities) {
      await knex('sttendance').insert({
        student_id: activity.student_id,
        status_id: activity.attendance || 1, // ถ้าไม่มี attendance ให้ตั้งค่าเป็น 0

      });
    }

    // ส่งผลลัพธ์กลับไปยัง client เมื่อเสร็จสิ้นการ insert
    res.status(200).json({ message: 'Data inserted successfully' });
    // res.send('ok');
  } catch (e) {
    res.send({ status: 0, error: e.message })
  }
})

// เพิ่มข้อมูลสมาชิก
app.post('/insertStudent', async (req, res) => {
  //req.body   =>  post
  console.log('insert=', req.body)
  console.log('uploaded file:', req.file); // ตรวจสอบไฟล์ที่อัปโหลด
  try {
    let row = await knex('student')
      .insert({
        student_id: req.body.student_id,
        username: req.body.username,
        password: req.body.password,
        picture: req.file ? req.file.filename : null, // บันทึกชื่อไฟล์ภาพ            
      })
    res.send({
      status: 1,
      status: row,
    })
  } catch (e) {
    res.send({ status: 0, error: e.message });
  }
})

// ลบข้อมูล
app.post('/deleteStudent', async (req, res) => { // เปลี่ยนจาก deletStudent เป็น deleteStudent
  console.log('delete = ', req.body);
  try {
    let row = await knex('student')
      .where({
        student_id: req.body.student_id,
      })
      .del()

    res.send({
      status: 1,
      row: row, // เปลี่ยนชื่อ key เป็น row เพื่อบ่งบอกว่าเป็นจำนวนแถวที่ลบได้
    });
  } catch (e) {
    res.send({ status: 0, e: e.message });
  }
});

//update
app.post('/updateStudent', async (req, res) => { // เปลี่ยนจาก deletStudent เป็น deleteStudent
  console.log('update = ', req.body);
  try {
    let row = await knex('student')
      .where({
        student_id: req.body.student_id,
      })
      .update({
        username: req.body.username,
        password: req.body.password,
        picture: req.body.picture,
      })

    res.send({
      status: 1,
      row: row, // เปลี่ยนชื่อ key เป็น row เพื่อบ่งบอกว่าเป็นจำนวนแถวที่ลบได้
    });
  } catch (e) {
    res.send({ status: 0, e: e.message });
  }
});



app.get('/listStudent', async (req, res) => {

  try {
    console.log('user=', req.query)
    let row = await knex('student');
    res.send({
      'status': "ok",
      datas: row
    })
  } catch (e) {
    res.send({ ok: 0, error: e.message });
  }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post("/insert2", async (req, res) => {
  console.log("data=", req.body.activities);
  const activities = req.body.activities;
  //insert
  try {
    // ใช้ bulk insert สำหรับการ insert ข้อมูลทั้งหมดในครั้งเดียว
    await knex('sttendance').insert(activities.map(activity => ({
      student_id: activity.studentId,
      status_id: activity.attendance || 1, // ถ้าไม่มี attendance ให้ตั้งค่าเป็น 1
    })));
    console.log('res=', res)
    // ส่งผลลัพธ์กลับไปยัง client เมื่อเสร็จสิ้นการ insert
    res.status(200).json({ message: "Data inserted successfully insert2" });
    // res.send('ok');
  } catch (e) {
    res.send({ status: 0, error: e.message });
  }
});

const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mysql = require("mysql2")
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: true }));




const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    database:"customer_complain",
    password:"Henilove@1616",

});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Database connected');
    }
});



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Save files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file with a timestamp
    },
});

const upload = multer({ storage: storage });


app.use(cors());
app.set('view-engin', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render('index.ejs');
});





app.post('/submit',upload.single('attachment'), (req, res) => {
    let d = new Date();
    var yyyy = d.getFullYear();
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var currentDate = `${yyyy}-${mm}-${dd}`;
    
    const { firstName, email, department, message } = req.body;
    const attachment = req.file; // Uploaded file information
console.log(req.file);
    // Insert data into the database
    const sql = `INSERT INTO complains (firstName, email,department,attachment, message, dateOfAdded) VALUES (?,?,?,?,?,'${currentDate}');`;
    db.query(sql, [firstName, email, department,attachment ? attachment.filename : null, message], (err, result) => {
        if (err) {
            // console.error('Error inserting data:', err);
            res.send('Error submitting data.');
        } else {
            // console.log('Data inserted:', result);
            res.send('Data submitted successfully.');
        }
    });
});

app.get('/admin', (req, res) => {
    
    const sql = 'SELECT * FROM complains'; // Replace with your table name
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.send('Error fetching data.');
        } else {
            res.render('admin.ejs', { data: results });
        }
    });
});


app.get('/corr', (req, res) => {
    const sql = 'SELECT * FROM complains'; // Replace with your table name
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.send('Error fetching data.');
        } else {
            res.render('corr.ejs', { data: results });
        }
    });
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

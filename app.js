const express = require("express")
const path = require("path")
const app = express();
const hbs = require("hbs");
require("./src/db/conn")
const Register = require("./src/models/register")
const multer = require("multer");
const port = process.env.PORT || 4000

const static_path = path.join(__dirname, "./public")
const template_path = path.join(__dirname, "./templates/views")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });
app.use(express.static(static_path))
app.set("view engine", "hbs")
app.set("views", template_path)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get("/", (req, res) => {
    res.render("index")
})
app.get("/register", (req, res) => {
    res.render("registration")
})
app.post("/register", upload.single("resume"), async (req, res) => {
    try {
        const password = req.body.password;
        const conpassword = req.body.conpassword;
        
        if (password === conpassword) {
            const registerUser = new Register({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                resume: req.file.filename, // Store the filename in the database
            });

            const registered = await registerUser.save();
            res.status(201).json({ message: "You are successfully registered!" });
        } else {
            res.send("Passwords do not match");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
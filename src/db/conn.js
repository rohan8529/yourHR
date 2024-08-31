const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sp744136:XTvLOeHYpbJ1j3Dg@cluster0.kixqa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}).then(() => {
    console.log("DB connected")
}).catch((e) => {
console.log(e)
})
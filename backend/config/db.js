const mongoose = require("mongoose");
//db url
const dburl = "mongodb+srv://janithsuraweera:piyumini1234@cluster0.czbcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connection = async() => {
    try {
        await mongoose.connect(dburl, {
            useNewUrlParser: true,

            useUnifiedTopology: true
        });
        console.log("MongoDB connected Successfuly...");

    } catch (e) {
        console.error(e.message);
        console.log("MongoDB connected Unsccessfuly...");
        process.exit(1);
    }
};

module.exports = connection;
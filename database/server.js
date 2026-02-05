const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Connect to MongoDB using container name
mongoose
	.connect("mongodb://db:27017/appdb")
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error(err));

// Schema
const MessageSchema = new mongoose.Schema({
	message: String,
});

const Message = mongoose.model("Message", MessageSchema);

// SAVE data
app.post("/save", async (req, res) => {
	await Message.create({ message: req.body.message });
	res.json({ status: "Saved successfully" });
});

// READ data
app.get("/data", async (req, res) => {
	const data = await Message.find();
	res.json(data);
});

app.listen(80, () => {
	console.log("Backend running on port 80");
});

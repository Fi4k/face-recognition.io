const express = require("express");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// app.post("/profile", (req, res) => {
// 	const user = {
// 		name: "Taw",
// 		hobby: "dancing"
// 	}

// 	res.send(user);
// });

app.post("/profile", (req, res) => {
	console.log(req.body);
	const user = {
		name: "Taw",
		hobby: "dancing"
	}
	res.send(user);
});

app.get("/", (req, res) => {
	res.send("root");
});

app.get("/profile", (req, res) => {
	res.send("profile");
});


app.listen(3000);
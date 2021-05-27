const express = require("express");

const app = express();

const sayHi = (req, res) => {
	res.send("Hi!");
};

app.post("/", (res, req) => {
	const {a, b } = req.body;
	res.send('The sum is ')
});

app.listen(5000, () => {
	console.log('Server is running on http://localhost:5000');
});


const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config({ path: path.resolve(__dirname + "/.env") });
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Models
const { ItemModel, BidModel, UserModel } = require("./Models");

// Constants
const port = process.env.PORT || 8080;
const ip = process.env.IP || "0.0.0.0";
const salt = 10;

const app = express();
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,HEAD,OPTIONS,POST,PUT,DELETE",
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
	);
	res.setHeader("Cache-Control", "no-cache");
	next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
	console.log("Calling " + req.url);
	next();
});

mongoose
	.connect(`${process.env.DB_CONNECTION}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		app.listen(port, ip, function () {
			console.log("Server is running on Port: " + port);
		});
	})
	.catch(err => console.log(err));

app.get("/api/start", (request, response) => {
	response.status(200).json({
		msg: "Welcome to MERNFORUM BACKEND",
	});
});

app.post("/api/user/register", async (req, res) => {
	const { firstname, lastname, email, password, type } = req.body;
	bcrypt.hash(password, salt, (bcrypterr, encrypted) => {
		if (bcrypterr) {
			return res.status(500).send({
				msg: "Internal Server Error",
				err,
			});
		}
		const today = new Date();
		try {
			const user = new UserModel({
				firstname,
				lastname,
				email,
				password: encrypted,
				type,
				createdOn: today,
				updatedOn: today,
			});

			user.save();
		} catch (error) {}
	});
});

app.post("/api/user/login", async (req, res) => {
	let query = { email: req.body.email };
	try {
		const userDetails = await UserModel.findOne(query);
		console.log({ userDetails });
		res.send("Hi");
	} catch (err) {
		console.log(err);
		res.status(500).send({
			msg: "Couldn't fetch user details",
			err,
		});
	}
});

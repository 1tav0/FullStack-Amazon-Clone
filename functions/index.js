const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// - API routes
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total; // or can use req.params or req.query.total

  console.log("payment request received !!! for >>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // Ok - created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// http://127.0.0.1:5001/clone-a2778/us-central1/api
// - Listen command
exports.api = functions.https.onRequest(app);

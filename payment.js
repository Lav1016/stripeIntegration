// //   const account = await await stripe.accounts.create({
// //     country: "US",
// //     type: "express",
// //     capabilities: {
// //       card_payments: { requested: true },
// //       transfers: { requested: true },
// //     },
// //     business_type: "individual",
// //     business_profile: { url: "https://amazenpay.com" },
// //   });
// //   console.log("account>>>>", account);
// //   const paymentIntent = await stripe.paymentIntents.create(
// //     {
// //       amount: 1000,
// //       currency: "usd",
// //       automatic_payment_methods: { enabled: true },
// //       confirm: true
// //     },
// //     { stripeAccount: "acct_1MezbOREgI0nYuUN" }
// //   );
// //   console.log("paymentIntent>>>", paymentIntent);

// const { append } = require("express/lib/response");
// const async = require("hbs/lib/async");

// //   const paymentIntentId = paymentIntent.id;
// //   const payment_intent = await stripe.paymentIntents.retrieve(paymentIntentId);
// //   console.log("paymentIntentData>>>", payment_intent);

// //   res.json({
// //     paymentIntent: paymentIntent,
// //     payment_intent_retrive: payment_intent,
// //   });

// // app.post("/retrive_payment/:id", async (req, res) => {
// //   const paymentIntentId = req.params.id;
// //   const payment_intent = await stripe.paymentIntents.retrieve(paymentIntentId);
// //   console.log("paymentIntentData>>>", payment_intent);
// //   res.json(payment_intent);
// // });

// //
// const express = require("express");
// const app = express();

// const stripe = require("stripe")(
//   "sk_test_51McZLvJrijNju1NB9X7vpKdOVE13eQYtPPqWkxWwExjjlyfQtM9YSmy61qSs5AvREsXs2E7caMIQTbxDVhKbP7yN00NdWB6hra"
// );




























// app.get("/testpaymentIntent", async (req, res) => {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 2000,
//     currency: "usd",
//     automatic_payment_methods: { enabled: true },
//   });
//   console.log("paymentIntent>>>", paymentIntent);
// });

// app.get("/createAccount", async (req, res) => {
//   const account = await stripe.accounts.create({
//     country: "US",
//     type: "express",
//     capabilities: {
//       card_payments: { requested: true },
//       transfers: { requested: true },
//     },
//     business_type: "individual",
//     business_profile: { url: "https://amazenpay.com" },
//   });
//   console.log("account>>>>>", account);
// });

// });

// app.get("/", async (req, res) => {
//   const customer = await stripe.customers.create({
//     email: "customer@example.com",
//   });

//   console.log("customer>>>>", customer);

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 2000,
//     currency: "usd",
//     automatic_payment_methods: { enabled: true },
//   });
//   console.log("paymentIntent>>>", paymentIntent);
//   res.render("checkout", {
//     client_secret: paymentIntent.client_secret,
//   });
// });

// #stripeAccountID=acct_1McZLvJrijNju1NB

// app.post("/abcd", async (req, res) => {
//   // Create a PaymentIntent:
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 2000,
//     currency: "usd",
//     transfer_group: 1,
//   });
//   console.log("paymentIntent----------", paymentIntent);
//   // Create a Transfer to the connected account (later):
//   const transfer = await stripe.transfers.create({
//     amount: 7000,
//     currency: "usd",
//     destination: "acct_1McZLvJrijNju1NB",
//     transfer_group: "{ORDER10}",
//   });
//   console.log("transfer----------", transfer);

//   // Create a second Transfer to another connected account (later):
//   const secondTransfer = await stripe.transfers.create({
//     amount: 2000,
//     currency: "usd",
//     destination: "acct_1McZLvJrijNju1NB",
//     transfer_group: "{ORDER10}",
//   });
//   console.log("secondTransfer----------", secondTransfer);
// });

// transfer APIS
// app.post("/transfer", async (req, res) => {
//   const customers = await stripe.customers.list({
//     limit: 3,
//   });
//   console.log("customers>>>>", customers);

//   const customer = await stripe.customers.create({
//     description:
//       "My First Test Customer (created for API docs at https://www.stripe.com/docs/api)",
//   });

//   console.log("new_customer>>>", customer);

//   // const paymentMethods = await stripe.paymentMethods.list({
//   //   customer: customers.data[0].id,
//   // });
//   // console.log("paymentMethods", paymentMethods);

//   // This only works for the latest customer attached card.
//   // const latest_pm = await paymentMethods.data;
//   // console.log("paymentMethods>>", paymentMethods);

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 2,
//     currency: "usd",
//     description: "first test transfer",
//     statement_descriptor: "first test transfer",
//     // The destination parameter directs the transfer of funds from platform to pilot
//     customer: customers.data[0].id,
//     automatic_payment_methods: { enabled: true },
//     confirm: true,
//     transfer_data: {
//       // Send the amount for the pilot after collecting a 20% platform fee:
//       // the `amountForPilot` method simply computes `ride.amount * 0.8`
//       amount: 5,
//       // The destination of this Payment Intent is the pilot's Stripe account
//       destination: "cus_NRKemaBBWTyqoo",
//     },
//   });
//   console.log("paymentIntent>>", paymentIntent);
//   res.send(paymentIntent);
// });

// app.get("/create-checkout-session", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: "T-shirt",
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: "http://localhost:3000/success",
//     cancel_url: "http://localhost:3000/cancel",
//   });
//   console.log("create-checkout-session", session);
//   res.redirect(303, session.url);
// });

// newcode*************

// app.post("/transfer12", async (req, res) => {
//   const customer = await stripe.customers.create({
//     description:
//       "My First Test Customer (created for API docs at https://www.stripe.com/docs/api)",
//   });
//   console.log("customer", customer);
//   // const {account, amount} = req.body;
//   const transfer = await stripe.transfers.create({
//     amount: 1400,
//     currency: "usd",
//     destination: customer.id,
//   });
//   return res.send({ transfer });
//   console.log("transfer", transfer);
// });

// async function sendBalanceUsd(res) {
//   stripe.balance.retrieve(function (_, balance) {
//     const balanceUsd = balance.available.find((b) => b.currency == "usd");
//     res.send({ balance: (balanceUsd && balanceUsd.amount) || 0 });
//   });
// }

// create paymnet methods
// app.post("/CreatePaymnetMethod", async (req, res) => {
//   const customers = await stripe.customers.list({
//     limit: 3,
//   });
//   // console.log("customers>>>>", customers);
//   const customer = await stripe.customers.create({
//     description: "First Test Customer ",
//   });
//   console.log("customer>>>", customer);
//   const paymentMethod = await stripe.paymentMethods.create({
//     type: "card",
//     card: {
//       number: "4242424242424242",
//       exp_month: 8,
//       exp_year: 2023,
//       cvc: "314",
//     },
//   });

//   // console.log("paymentMethod", paymentMethod);
//   const paymentMethodAttach = await stripe.paymentMethods.attach(
//     paymentMethod.id,
//     { customer: customer.id }
//   );
//   res.send(paymentMethod);
//   console.log("paymentMethod", paymentMethodAttach);
// });

//#1 carete An account
// app.post("/craeteAccount", async (req, res) => {
//   const account1 = await stripe.accounts.create({ type: "express" });
//   console.log("account1*********", account1);
//   const account = await stripe.accounts.create({
//     type: "express",
//     country: "US",
//     email: "TJ@example.com",
//     capabilities: {
//       card_payments: { requested: true },
//       transfers: { requested: true },
//     },
//   });
//   console.log("Crateaccount>>>>>>>>>>>>", account);
//   //Create a login link
//   const loginLink = await stripe.accounts.createLoginLink(
//     // "acct_1MgUASR5O8hpO6ze"
//     account.id
//   );

//   res.send(account);
//   console.log("loginLink", loginLink);
// });

// // 2 create charge
// app.post("/CreateCharge", async (req, res) => {
//   const customer = await stripe.customers.create({
//     description: "First TestCharge Customer ",
//   });
//   console.log("customer>>>", customer);
//   const charge = await stripe.charges.create({
//     amount: 2000,
//     currency: "USD",
//     source: "tok_amex",
//     // customer: customer.id,
//   });
//   console.log("charge", charge);
//   const transfer = await stripe.transfers.create({
//     amount: 400,
//     currency: "USD",
//     destination: customer.id,
//     transfer_group: "ORDER_95",
//   });
//   console.log("transfer", transfer);

//   // const token = await stripe.tokens.create({
//   //   card: {
//   //     number: "4242424242424242",
//   //     exp_month: 2,
//   //     exp_year: 2024,
//   //     cvc: "314",
//   //   },
//   });
//   console.log("token", token);
//   // const paymentIntent = await stripe.paymentIntents.create({
//   //   amount: 100,
//   //   currency: "usd",
//   //   automatic_payment_methods: { enabled: true },
//   //   confirm: true,
//   //   transfer_data: {
//   //     amount: 877,
//   //     destination: customer.id,
//   //   },
//   // });

//   res.send(charge);
//   console.log("paymentIntent", paymentIntent);
// });







// const customer = await stripe.customers.update(
//     'cus_NRiJj9kBH3Puts',
//     {metadata: {order_id: '6735'}}
//   );
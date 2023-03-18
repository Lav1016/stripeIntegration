const stripe = require("stripe")(
    "sk_test_51McZLvJrijNju1NB9X7vpKdOVE13eQYtPPqWkxWwExjjlyfQtM9YSmy61qSs5AvREsXs2E7caMIQTbxDVhKbP7yN00NdWB6hra"
  );
  

exports.createcharge = async (req, res) => {
  const token = await stripe.tokens.create({
    card: {
      number: req.body.number,
      exp_month: req.body.exp_month,
      exp_year: req.body.exp_year,
      cvc: req.body.cvc,
    },
  });
  const account = await stripe.accounts.update("acct_1MgU6hR583Yrn0oI", {
    tos_acceptance: { date: 1609798905, ip: "8.8.8.8" },
  });

  const card = await stripe.customers.createSource(req.body.customerId, {
    source: token.id,
  });

  await stripe.charges
    .create({
      amount: req.body.amount,
      description: req.body.description,
      currency: req.body.currency,
      customer: "cus_NS5891TlJB9qCl",
      //source: card.id,
    })
    .then((charge) => {
      console.log(charge);
      res.send({ charge });
    })
    .catch((err) => {
      console.log("err>>", err);
      res.send(err); // If some error occurs
    });
}

exports.transferstripe = async(req,res) =>{
    await stripe.transfers
    .create({
      amount: req.body.transfer_amount,
      currency: req.body.currency,
      destination: req.body.destination, //"acct_1Mh9H3QpUM9I2QPJ", dest
    })
    .then(async (transfer) => {
      console.log("transfer", transfer);
      res.send({ transfer });
    })
    .catch((err) => {
      console.log(err);
      res.send(err); // If some error occurs
    });
}

exports.transfertobankAccount = async (req,res) =>{
    await stripe.payouts
    .create(
      {
        amount: req.body.amount, //20
        currency: req.body.currency, // usd
        destination: req.body.destination, //connected stripeAccount holder's bank accountID
      },
      {
        stripeAccount: req.body.stripeAccountId, //conneccted stripeAccountID
      }
    )
    .then((payout) => {
      console.log("payout", payout);
      res.send({ payout });
    })
    .catch((er) => {
      console.log("err", err);
      res.send({ err });
    });
}

exports.addBankDetailsstripe = async(req,res) =>{
    const customerId = req.body.customerID;
    const token = await stripe.tokens.create({
      bank_account: {
        country: req.body.country, //"US",
        currency: req.body.currency, //"usd",
        account_holder_name: req.body.account_holder_name, //"Kathleen ",
        account_holder_type: req.body.account_holder_type, // "individual",
        routing_number: req.body.routing_number, //"110000000",
        account_number: req.body.account_number, //"000123456789",
      },
    });
    await stripe.customers
      .createSource(customerId, { source: token.id })
      .then(async (source) => {
        await stripe.customers
          .verifySource(customerId, source.id, { amounts: [32, 45] })
          .then(async (verified) => {
            await stripe.customers
              .update(customerId, {
                default_source: verified.id,
              })
              .then((udated) => {
                return res.send({
                  udated,
                });
              })
              .catch((err) => {
                res.send({ err });
              });
          });
      })
      .catch((err) => {
        console.log("error", err);
        res.send({
          message:
            " A bank account with that routing number and account number already exists for this customer.",
        });
      });
}


exports.achChargestripe = async (req,res) =>{
    const customerID = req.body.customerID;
    await stripe.charges
      .create({
        amount: req.body.amount,
        description: req.body.description,
        currency: req.body.currency,
        customer: customerID,
        //source: card.id,
      })
      .then((achCharge) => {
        console.log(achCharge);
        res.send({ achCharge });
      })
      .catch((err) => {
        console.log("err>>", err);
        res.send(err); // If some error occurs
      });
}




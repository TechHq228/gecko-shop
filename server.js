require('dotenv').config()

const stripeSecretKey = process.env.STRIPE_SK
const stripePublicKey = process.env.STRIPE_PK

const e = require('express')
const express = require('express')
const app = express()
const fs = require('fs')
const stripe = require('stripe')(stripeSecretKey)

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))

app.get('/store', function(req, res) {
  fs.readFile('items.json', function(error, data) {
    if (error) {
      res.status(500).end()
    } else {
      res.render('store.ejs', {
        stripePublicKey: stripePublicKey,
        items: JSON.parse(data)
      })
    }
  })
})

/* const rawJson = fs.readFileSync('items.json', 'utf8')
const storeItems = JSON.parse(rawJson)
const storeMapItems = new Map(Object.entries(storeItems)) */

const storeItems = new Map([
  [1, { price:1000, name: "Cute Little Lizard" }],
  [2, { price: 799, name: "Cute Funny Lizard" }]
])

app.post("/create-checkout-session", async function(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: 'usd',
            product_data: storeItem.name,
            unit_amount: storeItem.price
          },
          quantity: item.quantity
        }
      }),
      success_url: `${process.env.SERVER_URL}/success.html`,
      cancel_url: `${process.env.SERVER_URL}/cancel.html`,
    })
    res.redirect( 303, session.url)
  } catch {
    res.status(500).json({ error: e.message })
  }
})

app.listen(3000)
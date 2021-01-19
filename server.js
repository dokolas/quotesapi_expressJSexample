const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  if (randomQuote) {
    res.send({ quote: randomQuote });
  } else {
    res.status(404).send();
  }
});

app.get("/api/quotes", (req, res, next) => {
  const quotePerson = req.query.person;
  if (quotePerson) {
    const newQuotes = quotes.filter((arr) => {
      return arr.person === quotePerson;
    });
    const quoteObjects = { quotes: newQuotes };
    res.send(quoteObjects);
  } else {
    const quoteObjects = { quotes: quotes };
    res.send(quoteObjects);
  }
});

app.post("/api/quotes", (req, res, next) => {
  const newQuote = { quote: req.query.quote, person: req.query.person };
  if (req.query.person && req.query.quote) {
    quotes.push(newQuote);
    res.status(201).send({ quote: newQuote });
  } else {
    res.status(404).send();
  }
});

app.listen(PORT);

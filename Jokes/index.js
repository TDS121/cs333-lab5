// Loads the express library
import express from "express";

// Creates the server
const app = express();

// The port it listens on
const port = 3000;

app.use(express.urlencoded());

// Sends back one random joke
app.get("/random", function (req, res) {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  res.json(jokes[randomIndex]);
});

// Sends back the joke with the id in the address, or 404 if there is none
app.get("/jokes/:id", function (req, res) {
  const id = Number(req.params.id);
  const joke = jokes.find((joke) => joke.id === id);

  if (!joke) {
    return res.status(404).json({ error: "Joke not found" });
  }

  res.json(joke);
});

// Sends back every joke of the type in ?type=
app.get("/filter", function (req, res) {
  const type = req.query.type;
  const foundJokes = jokes.filter((joke) => joke.jokeType === type);
  res.json(foundJokes);
});

// Adds a new joke from the form data and sends it back
app.post("/jokes", function (req, res) {
  const newJoke = {
    id: jokes.length + 1,
    jokeText: req.body.text,
    jokeType: req.body.type,
  };
  jokes.push(newJoke);
  res.json(newJoke);
});

// Replaces a whole joke with what was sent
app.put("/jokes/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const replacementJoke = {
    id: id,
    jokeText: req.body.text,
    jokeType: req.body.type,
  };
  const searchIndex = jokes.findIndex((joke) => joke.id === id);
  jokes[searchIndex] = replacementJoke;
  res.json(replacementJoke);
});

// Changes only the parts of a joke that were sent, keeps the rest
app.patch("/jokes/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const existingJoke = jokes.find((joke) => joke.id === id);
  const replacementJoke = {
    id: id,
    jokeText: req.body.text || existingJoke.jokeText,
    jokeType: req.body.type || existingJoke.jokeType,
  };
  const searchIndex = jokes.findIndex((joke) => joke.id === id);
  jokes[searchIndex] = replacementJoke;
  res.json(replacementJoke);
});



// Deletes the joke with that id, or 404 if there is none
app.delete("/jokes/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const searchIndex = jokes.findIndex((joke) => joke.id === id);
  if (searchIndex === -1) {
    return res.status(404).json({ error: "No joke with id " + id });
  }
  jokes.splice(searchIndex, 1);
  res.sendStatus(200);
});



app.listen(port, function () {
  console.log("Listening on http://localhost:" + port);
});

// The data. No database yet, so it lives in this array.
let jokes = [
  { id: 1, jokeText: "Why don't scientists trust atoms? Because they make up everything.", jokeType: "Science" },
  { id: 2, jokeText: "I told a chemistry joke once. There was no reaction.", jokeType: "Science" },
  { id: 3, jokeText: "A photon checks into a hotel. 'Any luggage?' 'No, I'm travelling light.'", jokeType: "Science" },
  { id: 4, jokeText: "Why do programmers prefer dark mode? Because light attracts bugs.", jokeType: "Programming" },
  { id: 5, jokeText: "There are 10 kinds of people: those who understand binary and those who don't.", jokeType: "Programming" },
  { id: 6, jokeText: "A SQL query walks into a bar, goes up to two tables and asks: 'Can I join you?'", jokeType: "Programming" },
  { id: 7, jokeText: "I'm reading a book about anti-gravity. It's impossible to put down.", jokeType: "Puns" },
  { id: 8, jokeText: "I used to be a banker, but I lost interest.", jokeType: "Puns" },
  { id: 9, jokeText: "Why did the scarecrow win an award? He was outstanding in his field.", jokeType: "Puns" },
  { id: 10, jokeText: "What do you call cheese that isn't yours? Nacho cheese.", jokeType: "Food" },
  { id: 11, jokeText: "Why did the tomato blush? It saw the salad dressing.", jokeType: "Food" },
  { id: 12, jokeText: "I'm on a seafood diet. I see food and I eat it.", jokeType: "Food" },
];

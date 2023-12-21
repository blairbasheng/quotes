let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let http = require("http").Server(app);
import { Client } from 'pg';
const client = new Client();

/*
TODO: need to use the following environment variables, which are expected by the pg npm package,
in order to successfully connect to the postgres db (source: https://node-postgres.com/features/connecting):

PGUSER
PGHOST
PGPASSWORD
PGDATABASE
PGPORT

(in replit, these should be secrets. otherwise, these can be environment variables)
*/
await client.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/submit", function(req, res) {
  res.sendFile("/submit.html", { root: "." });
});

app.post("/submit", async function(req, res) {
  const submissionTimeDateObj = new Date(Date.now());
  const submissionTime = submissionTimeDateObj.toTimeString();

  let submission = {
    quote: req.body.quote,
    notes: req.body.note,
    tags: req.body.tags,
    score: 0,
    votes: 0,
    timestamp: submissionTime,
  };

  //TODO: insert submission into DB
  const queryText = 'INSERT INTO quotes(timestamp, score, votes, quote, notes, tags) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [submission.timestamp, submission.score, submission.votes, submission.quote, submission.notes, submission.tags];

  const queryRes = await client.query(queryText, values);
  console.log(queryRes.rows[0]);
});

app.set("port", 5000); //port can be changed if already in use
http.listen(app.get("port"), function() {
  console.log("listening on port", app.get("port"));
});

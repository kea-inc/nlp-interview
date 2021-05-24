const express = require('express');
const bodyParser = require('body-parser');
const { Language, SentimentAnalyzer } = require('node-nlp');
const axios = require('axios');
//----------------------------------------------------------------------------------------
const SUPPORTED_LANGS = ['en', 'fr'];
const LOCAL_FLASK_SERVER = 'http://10.0.0.233:5000/sentiment';
const PORT = process.env.PORT || 8080;
const app = express();

app.listen(PORT, () => console.log('nlp-interview: api interface started on port', PORT));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//----------------------------------------------------------------------------------------
app.get('/', (req, res) => {
	res.send('NLP Interview API interface')
})

app.post('/getsentiment_nlpjs', (req, res) => {
    if (!req.body.text) {
        return res.json({error: 'Please provide some text'});
    }

	const language = new Language();
	const guess = language.guess(req.body.text);

	if (!SUPPORTED_LANGS.includes(guess[0]['alpha2']))
		return res.json({error: `It looks like your text is in ${guess[0]['language']}. We're sorry but this language is currently not supported.`});

	const sentiment = new SentimentAnalyzer({language: 'en'});
	sentiment
    	.getSentiment(req.body.text)
    	.then(result => {
    		return res.json(result);
    	});

    res.end();
})

app.post('/getsentiment', (req, res) => {
    if (!req.body.text) {
        return res.json({error: 'Please provide some text'});
    }

	axios
	  .post(LOCAL_FLASK_SERVER, {text: req.body.text})
	  .then(axios_res => {
	  	if (axios_res.status != 200)
	  		return res.json({error: `${axios_res.statusText} (${axios_res.status})`});

	  	console.log(axios_res)
	  	return res.json({sentiment: axios_res.data});
	  })
	  .catch(err => {
			return res.status(500).json({error: 'Internal error, please contact admin!'});
	  })
});

# NLP Engineering Interview

## File Description
- `app.py`: Simple Flask server and API that exposes a single end-point `/sentiment` [POST] that uses the model to predict the sentiment of text passed to it.
- `rest.js`: Node app and API, please set `LOCAL_FLASK_SERVER` variable before running. For example: `const LOCAL_FLASK_SERVER = 'http://10.0.0.233:5000/sentiment';`. This server exposes multiple end-points:
	- `/`: Just a sanity-check to quickly check server is running
	- `/getsentiment_nlpjs`: Do sentiment analysis using built-in NLP.js module
	- `/getsentiment`: Do sentiment analysis by talking to Flask server
- `sentiment_clf.pkl`: Pickled log-reg trained classifier/model.
- `sentiment_vec.pkl`: Pickled TF-IDF vectorizer used to train above model.
- `Kea.ai.ipynb`: Jupyter notebook with analysis.

## Instructions
- Install all dependencies (`npm` or `pip`) - don't forget the ones in the first cell in the Jupyter notebooks.
- Start Flask server: `flask run --host=0.0.0.0` 
- Start Node server: `node rest.js`
- Use Postman or cURL to HTTP POST to `x.x.x.x:8080/getsentiment` with JSON payload containing one field/key called "text". For example `{"text":"I really hate this place, terrible food and terrible service!"}`
- Get back JSON response with sentiment. Example: `{"sentiment": "neg"}

## Notes
1.  I wanted to show off a bit of NodeJS skills so added some extra functionality to "show off". I know it's not complex but a little more signal for you to consider.
2.  All pickled files use protocol level 4 so should be usable by Python 3.4+
3.  You can download the final dataset I used here: [https://s3-us-west-2.amazonaws.com/ml-data.avital.ca/all_useful_reviews_tokenized_w_sentiment.pkl.gz]()
3.  I have a Google Doc file with my assumptions and reasoning that I used during the presentation. I'd be happy to share it if you'd like.
from flask import Flask, request, jsonify
import numpy as np
import pickle
import spacy
from spacy.lang.en.stop_words import STOP_WORDS as stopwords
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer

app = Flask(__name__)

MODEL_FILE_NAME = 'sentiment_clf.pkl'
VEC_FILE_NAME = 'sentiment_vec.pkl'

nlp = spacy.load('en_core_web_sm')
ignored = ['PUNCT', 'SYM']

def clean(text):
    # Remove punctuation, symbols, and stopwords. Then lowercase...
    tmp = [tok.lower_ for tok in nlp(text, disable = ['ner', 'parser', 'lemmatizer']) \
           if (tok.text not in stopwords and tok.pos_ not in ignored)]
    tmp = [t.replace('\n', ' ') for t in tmp]

    return tmp

def predict_sentiment(review):
    clf = pickle.load(open(MODEL_FILE_NAME, 'rb'))
    vec = pickle.load(open(VEC_FILE_NAME, 'rb'))

    tokenized_review = clean(review)
    review_token_counts = vec.transform(tokenized_review)

    pred = clf.predict(review_token_counts)
    values, counts = np.unique(pred, return_counts = True)

    return values[counts.argmax()]

@app.route("/sentiment", methods = ['POST'])
def sentiment():
  return predict_sentiment(request.json['text'])

if __name__ == "__main__":
  app.run()

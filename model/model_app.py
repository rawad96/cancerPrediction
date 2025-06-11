# -*- coding: utf-8 -*-
"""
Created on Tue Dec 31 15:55:49 2024

@author: USER
"""

from flask import Flask, request, jsonify
import numpy as np
import joblib

app = Flask(__name__)

model = joblib.load('breast_cancer_model.pkl')

def predict_new_data(model, input_data):
   
    input_data = np.array(input_data).reshape(1, -1)
      
    prediction = model.predict(input_data)[0]
    prediction_probability = model.predict_proba(input_data)[0][1]
    
    return prediction, prediction_probability

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json.get('data')
        if not input_data:
            return jsonify({'error': "No input data provided"}), 400
        
        prediction, probability = predict_new_data(model, input_data)
        result = {
            "prediction": "Malignant" if prediction == 1 else "Benign",
            "probability": f"{probability * 100:.2f}%"
        }
        
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug=True)
    
    
    
    
    
    
    
    
    
    
    
    
    
    
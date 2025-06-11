# -*- coding: utf-8 -*-
"""
Created on Sun Dec 29 17:54:43 2024

@author: USER
"""
from data_preprocessing import load_and_preprocess_data
from model_training import train_model
from model_evaluation import evaluate_model
import numpy as np
import joblib


def predict_new_data(model, input_data):
   

    input_data = np.array(input_data).reshape(1, -1)
    
  
    prediction = model.predict(input_data)[0]
    prediction_probability = model.predict_proba(input_data)[0][1]
    
    return prediction, prediction_probability

def main():
    # X,y = load_and_preprocess_data('Cancer_data.csv')
    
    # model, X_test,y_test = train_model(X, y)
    
    # evaluate_model(model, X_test, y_test)

    
    new_data = [19.07, 24.81, 128.3, 1104, 0.09081, 0.219, 0.2107, 0.09961, 0.231, 0.06343, 
    0.9811, 1.666, 8.83, 104.9, 0.006548, 0.1006, 0.09723, 0.02638, 0.05333, 
    0.007646, 24.09, 33.17, 177.4, 1651, 0.1247, 0.7444, 0.7242, 0.2493, 
    0.467, 0.1038]
   
    
    model = joblib.load('breast_cancer_model.pkl')

    prediction, probability = predict_new_data(model, new_data)
    
    print(f"Prediction: {'Malignant' if prediction == 1 else 'Benign'}")
    print(f"Probability of being malignant: {probability * 100:.2f}%")
    
    
main()


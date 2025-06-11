# -*- coding: utf-8 -*-
"""
Created on Mon Dec 30 18:10:18 2024

@author: USER
"""

from sklearn.metrics import accuracy_score, classification_report

def evaluate_model(model, X_test, y_test):
    y_pred = model.predict(X_test)
    
    print("Model accuracy", accuracy_score(y_test, y_pred))
    print("Classification report", classification_report(y_test, y_pred))
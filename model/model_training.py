# -*- coding: utf-8 -*-
"""
Created on Mon Dec 30 01:38:44 2024

@author: USER
"""

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

def train_model(X, y, model_path="breast_cancer_model.pkl"):
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = RandomForestClassifier(n_estimators=200, random_state=42)
    model.fit(X_train, y_train)
    
    joblib.dump(model, model_path)
    
    return model, X_test, y_test
# -*- coding: utf-8 -*-
"""
Created on Mon Dec 30 01:32:04 2024

@author: USER
"""

import pandas as pd


def load_and_preprocess_data(file_path):

    data = pd.read_csv(file_path)
    
    data = data.fillna(0)
    
    data = data.loc[:, ~data.columns.str.contains('^Unnamed')]
    data = data.dropna(axis=1, how='all')
    
    
    data['diagnosis'] = data['diagnosis'].map({'M': 1, 'B': 0})
    
  
    X = data.drop(['id', 'diagnosis'], axis=1) 
    y = data['diagnosis']
    
    return X, y

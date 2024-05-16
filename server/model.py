import sys
import json
import numpy as np
import tensorflow as tf
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# model = tf.keras.models.load_model('./models/local_model.keras')

from keras.models import Sequential
from keras.layers import Dense
from keras.layers import Dropout

model = Sequential([
    Dense(34,input_shape=((34,)), activation='relu'),
    Dense(30, activation='relu'),
    Dropout(0.2),
    Dense(20, activation='relu'),
    Dense(10, activation='relu'),
    Dense(3, activation='softmax')
])

# Compile the model if needed
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Load the saved weights into the model
model.load_weights('./models/local_model.weights.h5')

classes=['Kapha', 'Pitta', 'Vata']

def process_input(input_data):
    print(input_data)
    pred=model.predict(np.reshape(input_data['data'], (1, 34)))
    prediction = np.argmax(pred, axis=1)[0]
    return int(prediction)

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.readline())

    output = process_input(input_data)

    print(json.dumps(output))
    sys.stdout.flush()

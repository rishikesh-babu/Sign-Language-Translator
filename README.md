# 🤟 ASL Interpreter

**An AI-powered American Sign Language (ASL) recognition system that translates hand gestures into text in real-time, enabling inclusive communication for the deaf and hard-of-hearing community.**

---

## 🔗 Overview

The ASL Interpreter uses **computer vision + machine learning** to detect hand landmarks and classify gestures into meaningful alphabets/words.

It bridges the communication gap by converting **sign language → text output** in real time.

---

## 🚨 Problem

Millions of people rely on sign language as their primary mode of communication, but:

* ❌ Most people do not understand ASL
* ❌ Interpreters are not always available
* ❌ Communication barriers exist in education, healthcare, and daily life

---

## 💡 Solution

This project provides:

* 🎥 Real-time hand gesture recognition
* 🤖 ML-based classification of ASL signs
* 📝 Instant conversion of gestures into text
* 🌐 Web-based interface for accessibility

---

## ✨ Features

### 🤟 Real-Time Gesture Recognition

* Detects hand landmarks using MediaPipe
* Tracks gestures via webcam

### 🧠 Machine Learning Model

* Trained using **Support Vector Machine (SVM)**
* Custom dataset of hand landmarks

### 🔤 Sign to Text Conversion

* Converts gestures into alphabets/words
* Displays output instantly

### 🌐 Web Integration

* Flask API for predictions
* React frontend for UI

---

## 🛠️ Tech Stack

### 🔹 Computer Vision

* **MediaPipe** → Hand landmark detection
* **OpenCV** → Image processing

### 🔹 Machine Learning

* **Scikit-learn** → Model training
* **Support Vector Machine (SVM)** → Classification algorithm
* **Joblib** → Model serialization

### 🔹 Backend

* **Flask** → API for predictions
* **Flask-CORS** → Cross-origin requests

### 🔹 Frontend

* **React** → User interface
* **Vite** → Fast development server

---

## ⚙️ System Workflow

![Image](https://images.openai.com/static-rsc-4/wdh3KhE1ZjuiNNqXNDt87uSJIWUyjNu0z7etVulP7Jt4bvY2IFOGYz_uUiEm0qSDQRaIBsIJ3flOrdYvYettqKTHNoEQjYt210DtbuQ0JCBgMkiOLEzZa4n-xoEJQEA2XxJf7LG_povlh8BKK38p3FgNbiPZwTkXnKU398MXoiN06Evr7NrKqEU2JwLs81Tr?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/MU8Fo45PfB27Gd2VgUbuleoG_7QpNkHxGGBI6TPD32lFTj3Y9-OzoqyJO1CUCp_YkBUQl8dcsPIkND1zOyHs4XCkryQmr33szU7j6oB2KKD9aByQVASYKP6TvNtaKlv_12ltQKxFq0i-hb3zZWdrO2Be9qe0y2-Df9V5wANCZQgshYkUdP62WE9qh3Xo0kjC?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/EX4oJ30jG924lvexidX0AwBiRzuBfQrPOzRjPzqHPD0uwO2FV9_YHxwJ-Exg_BAGiD2qscq1HgAP5NLV54zIvGS4ySJwmm9R3NPtM7sywyP78I3WBTCelVYdxsrerhiz1_W56mA-g8l22AwWdyxIDqiMk-7g6BSoD3Kzv68VBHQQhhdVNe9gczgSqpTcdO3T?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/BQbg2ZDObr1xvrfc2Tz_rLBoJisHHp5Q_KWmYW3wO_Av03MwwWs4QXDKKdnDn6XmqZDzgAqsva8EyRDYY0LS9mKMI8GJIkrNlBZh1dNb4BMIm1b7CSM3BXFVScdIa-TF87NYV3IRQjDpOkr_mHDW8985ro468JaoBmL4M0cxF-_nEwHjm8IsqNqwLbDXBeMK?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/UrG1dCzDJ5ydrxm5mxJsuhFf6nNC4HIsmUhp67PTxQ0EOWc0gWxSNYuedlwc7S_D5V2TDUI8q11OD_4OEdxEMii_T4nrDWWsXqwUm4Psjs1mcPZmQr_fYD0ZHw0qGWQPjGbeAB2cy9Wmdi3gRP5e1njpUHFZyA6vHyN227KWctShct6wxkPAAMDTrkAw2h_n?purpose=fullsize)

1. Capture video input from webcam
2. Detect hand landmarks using MediaPipe
3. Extract feature vectors (x, y coordinates)
4. Feed features into trained SVM model
5. Predict ASL gesture
6. Display output on UI

---

## 📦 Installation & Setup

### 🔹 Clone Repository

```bash
git clone https://github.com/your-username/asl-interpreter.git
cd asl-interpreter
```

---

### 🔹 Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 🔹 Train the Model (Optional)

```bash
python train.py
```

---

### 🔹 Run Backend (Flask Server)

```bash
python server.py
```

---

### 🔹 Run Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🧪 Model Training

* Dataset created using hand landmark coordinates
* Labels encoded using LabelEncoder
* Train-test split for validation
* SVM used for high accuracy on small datasets

---

## 📊 Challenges Faced

* ⚠️ Inconsistent hand detection in low lighting
* ⚠️ Gesture similarity causing misclassification
* ⚠️ Dataset imbalance

### ✅ Solutions Implemented

* Improved preprocessing and normalization
* Increased dataset size
* Fine-tuned SVM parameters

---

## 🚀 Future Improvements

* 🔤 Full sentence formation (NLP integration)
* 🗣️ Text-to-speech output
* 🌍 Multi-sign language support
* 📱 Mobile app integration
* 🤟 Dynamic gesture recognition (words, not just alphabets)

---

## 🤝 Contribution

Contributions are welcome!

* Fork the repo
* Create a new branch
* Submit a pull request

---

## 📜 License

This project is open-source under the **MIT License**.

---

## 💙 Vision

To make communication **inclusive and barrier-free** using AI-powered assistive technology.

---

> *“Technology should empower everyone, including those who communicate differently.”*

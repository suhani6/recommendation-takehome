# 🛍️ AI-Powered Product Recommendation System

This is a full-stack AI-powered product recommendation engine built for an eCommerce context. It uses OpenAI's GPT-3.5-turbo to generate personalized product suggestions based on user preferences and browsing behavior.

---

## 📦 Features

- 🧠 **LLM-Powered Recommendations** using GPT-3.5
- 🎯 User-controlled **preferences** (price range, categories, brands)
- 🛒 Simulated **browsing history** (via product clicks)
- 🤖 AI-generated **explanations + confidence scores**
- 🧩 Built with **FastAPI** (backend) and **React** (frontend)
- 🌐 Fully integrated, responsive, clean UI

---

## 🧰 Tech Stack

| Layer    | Tools                |
|----------|----------------------|
| LLM API  | OpenAI GPT-3.5-turbo |
| Backend  | FastAPI, Python      |
| Frontend | React.js             |
| Styling  | CSS Grid & Flexbox   |
| Deployment | Run locally        |

---

## 🚀 Getting Started

### 📁 Clone the Repo

```bash
git clone https://github.com/YOUR_USERNAME/recommendation-system.git
cd recommendation-system
```

---

## ⚙️ Backend Setup (FastAPI)

### 📍 Navigate to the backend folder:

```bash
cd backend
```

### 📦 Create & activate virtual environment:

```bash
python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows
```

### 📥 Install dependencies:

```bash
pip install -r requirements.txt
```

### 🔑 Add your OpenAI API Key

Create a `.env` file or update `config.py` with your OpenAI key:

```python
config = {
    "OPENAI_API_KEY": "sk-...your-key...",
    "MODEL_NAME": "gpt-3.5-turbo",
    "MAX_TOKENS": 500,
    "TEMPERATURE": 0.7
}
```

### ▶️ Start the backend server:

```bash
uvicorn app:app --reload --port 5001
```

✅ Your backend will run on: `http://localhost:5001/api`

---

## 💻 Frontend Setup (React)

### 📍 Navigate to frontend folder:

```bash
cd ../frontend
```

### 📥 Install frontend dependencies:

```bash
npm install
```

### ▶️ Run the app:

```bash
npm start
```

✅ Frontend will open at: `http://localhost:3000`

---

## 🧪 How It Works

1. Choose your **price range**, categories, and brands
2. Click on any product in the catalog to **simulate browsing**
3. Click "Get Personalized Recommendations"
4. GPT-3.5 returns 5 suggestions with **explanations + confidence scores**

---

## 📂 Project Structure

```
recommendation-system/
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── requirements.txt
│   ├── services/
│   │   ├── llm_service.py
│   │   └── product_service.py
│   └── data/
│       └── products.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   └── styles/
│   └── public/
```

---

## ✅ Key Implementation Highlights

- Uses **GPT-3.5** for contextual reasoning and natural-language recommendations
- Efficient **prompt engineering** with price/category filtering
- Clean RESTful API with proper request/response validation
- Responsive UI with state-driven architecture
- Graceful error handling and logging

---

## ✅ Stretch Goal Implemented

- login using jwt token
- <img width="694" alt="Screenshot 2025-04-11 at 12 06 17 PM" src="https://github.com/user-attachments/assets/b030f372-a7a5-4033-93ed-980e86457474" />

  

## 📸 Screenshots

| Preferences & History | Recommendations |
|-----------------------|------------------|
| (<img width="299" alt="Screenshot 2025-04-08 at 12 18 38 PM" src="https://github.com/user-attachments/assets/75586f73-8967-48ae-a5d7-19ea08a1df58" />
 |(<img width="684" alt="Screenshot 2025-04-08 at 12 19 13 PM" src="https://github.com/user-attachments/assets/f69994bb-0a98-4bb0-94e0-dd80e44ceec6" />
|

---

## 🧠 Future Improvements

- Add auth + user sessions
- Integrate real-time analytics on product clicks
- Use vector embeddings for semantic product similarity
- UI library like Tailwind or Material UI for better UX

---

## 👩‍💻 Author

Built by Suhani Arora  
OpenAI API · React · FastAPI · Prompt Engineering

---

## 📄 License

This project is for educational and demonstration purposes. All product data is fictional.

# Mission 1

Mission 1 is a full-stack web app that lets users upload an image of a car. The AI then analyzes the image and classifies the car as a **Sedan, SUV, or Truck**.

## 🚀 Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js, Express, Multer
- **Other tools**: Axios, CORS, Concurrently

## ⚙️ Setup & Installation

Clone the repo:

```bash
git clone https://github.com/your-username/mission-1.git
cd mission-1
```

### Install dependencies

You’ll need to install dependencies in three places:

```bash
# Root dependencies (concurrently)
npm install

# Frontend dependencies
cd frontend
npm install

# Backend dependencies
cd ../backend
npm install
```

### Run the app

From the project root:

```bash
npm run dev
```

This will start both the frontend and backend together using **concurrently**.

The frontend will run on [http://localhost:5173](http://localhost:5173)  
The backend will run on [http://localhost:5000](http://localhost:5000)

## 🔑 Environment Variables

Create a `.env` file in the backend folder with the following:

```env
PORT=5000
# Add your API keys here if needed
```

You can copy from the provided `.env.example` file.

## ✨ Features

- Upload an image of a car
- AI model predicts: Sedan, SUV, or Truck
- Frontend + Backend integration with Axios

## 📌 Future Improvements

- Improve classification accuracy
- Add more vehicle categories
- Ai able to analyze car details and give an insurance premium rate
- Drag and drop image upload

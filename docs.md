# 📖 Architecture Decision Document  
**Project Name:** TypeSpeed Game  
**Author:** Pratyaksh Jain    
**Matrikelnr.:** 7324287   
**Date:** 20.06.2025

---

## 📌 Short Overview on the Specific Software Project  

The **TypeSpeed Game** is a web-based typing speed test built with React and Node.js. It allows users to measure their typing speed in words per minute (WPM) by typing randomly generated sentences and submitting their scores. The app also includes a local leaderboard that records the top performances without external advertisements or distractions.

---

## 📊 Business View  

**Purpose:**  
To create a lightweight, ad-free, educational typing game to help users improve their typing speed while offering me a hands-on opportunity to learn modern web technologies, React hooks, backend API development, and JSON-based data persistence.

**Stakeholders:**  
- Myself (Developer & Maintainer)  
- Potential Users (typists, students, developers)

---

## 🎛️ Functional View  

**Key Features:**  
- Random sentence display for typing  
- Real-time timer and WPM calculation  
- Score submission with name and time  
- Persistent local leaderboard using JSON  
- Restart functionality  

---

## 🖥️ Technical View  

**Frontend:**  
- React (Vite setup)  
- React Hooks (useState, useEffect, useRef)

**Backend:**  
- Node.js with Express  
- JSON file persistence (scores.json)

**Communication:**  
- REST API (GET and POST routes for scores)

**Development Tools:**  
- VS Code  
- npm  
- Git + GitHub  

---

## 🛠️ Implementation View  

- React app runs on `localhost:5173`
- Express server runs on `localhost:3001`
- Scores saved locally in `server/scores.json`
- API endpoints:  
  - `GET /scores` — fetch all scores  
  - `POST /scores` — submit a new score  

---

## 🔄 Process View  

1. Start backend with `node server.js`
2. Run frontend with `npm run dev`
3. User clicks **Start Game**
4. Typing begins — timer starts on first keystroke
5. On completion:
   - WPM calculated  
   - Option to submit name and save score
6. Leaderboard fetched via API and updated

---

## 🖼️ Wireframe View  

**Main Components:**  
- Header displaying game status  
- Sentence display area (with colored feedback)  
- Typing input field  
- Timer and WPM counter  
- Score submission field  
- Leaderboard section  

---

## 🔐 Security View  

- Only local access via `localhost`
- JSON file-based storage (no remote DB)
- No user authentication implemented
- No personal data beyond entered name and score

**Potential Improvements:**  
- Sanitize inputs  
- Implement rate limiting for POST requests  
- Shift to a secure hosted database if deployed publicly  

---

## 🧪 Testing View  

**Frontend Testing:**  
- Manual UI and functional testing in browser  
- React hook behavior verified via console logs

**Backend Testing:**  
- API endpoints tested via Postman  
- JSON file integrity manually verified

**Future Additions:**  
- Unit tests for React components (Jest)  
- Backend endpoint tests (Supertest)

---

## 📋 Work Breakdown Structure View  

1. Setup React frontend (Vite, components, hooks)  
2. Build typing game logic and state handling  
3. Design UI layout and style  
4. Develop Express server with REST API  
5. Implement local JSON storage for scores  
6. Connect frontend to backend  
7. Test application manually  
8. Version control with Git  
9. Write documentation  

---

## 📈 Effort Estimation View  

| Task                          | Estimated Time |
|:----------------------------|:---------------|
| React frontend setup         | 3 hrs           |
| Typing game logic            | 4 hrs           |
| Backend API and storage      | 3 hrs           |
| Frontend-backend connection  | 2 hrs           |
| UI design and polishing      | 2 hrs           |
| Testing and bug fixing       | 2 hrs           |
| Documentation and README     | 2 hrs           |

**Total:** ~18 hrs

---

## 👥 Stakeholder Matrix View  

| Stakeholder | Role                 | Interest |
|:------------|:---------------------|:-----------|
| Developer   | Creator & Maintainer  | High       |
| End User    | Typist/Game Player    | Medium     |

---

## ⚖️ Legal Protection View  

**License:** MIT  
- Free for personal and educational use  
- Can be modified, distributed, and reused  

**Privacy:**  
- No sensitive personal data collected  
- Data stored locally in scores.json  

---

## 🌐 Domain View  

**Application Domain:**  
- Educational software  
- Typing practice tool  

**Relevant Concepts:**  
- Typing speed measurement  
- User feedback through visual cues  
- Score tracking and ranking  

---

## 📌 Conclusion  

The TypeSpeed Game serves as a practical project for learning modern web development concepts in a clear, structured, and ad-free environment while providing users with a simple and enjoyable typing speed test.


# AccessLearn: AI-Driven Accessible E-Learning Platform
## Project Design & Architecture Document

---

## 1️⃣ PROJECT OVERVIEW

### **Project Title**
**AccessLearn: An AI-Powered, Inclusive E-Learning Ecosystem for Differently-Abled Students**

### **Abstract**
Traditional e-learning platforms often neglect accessibility, isolating students with hearing, visual, or motor impairments. **AccessLearn** bridges this gap by integrating **Voice-First Navigation**, **Sign Language Synchronization**, and **AI-Driven Personalization** into a unified web platform. This project proposes a scalable, API-driven architecture that transforms static learning into an interactive, multi-sensory experience, ensuring education is truly universal.

### **Problem Statement**
- **Exclusion:** Most Learning Management Systems (LMS) rely heavily on text and mouse interaction, barring access for blind or motor-impaired users.
- **Lack of Sign Language:** Deaf students are often forced to read subtitles, which is a second language for many, rather than receiving content in their primary mode of communication (Sign Language).
- **Static Content:** Current solutions lack real-time adaptation to a student's specific disability needs.

### **Proposed Solution: AccessLearn**
- **Multi-Modal Interface:** Seamless switching between Visual, Audio-Only, and Sign Language modes.
- **AI Integration:** Chatbots for doubt solving and algorithms for personalized course recommendations.
- **Accessibility First:** Native support for TTS (Text-to-Speech), STT (Speech-to-Text), and High Contrast interfaces without 3rd party plugins.

---

## 2️⃣ SYSTEM ARCHITECTURE

The system follows a **Microservices-ready, N-Tier Architecture**:

### **A. Frontend (Client Layer)**
- **Technology:** HTML5, CSS3, Vanilla JavaScript (or React.js for advanced state management).
- **Role:** Handles UI, Accessibility triggers (TTS/STT), and API consumption.
- **Key Components:**
    - **Accessibility Engine:** Intercepts DOM events to provide voice feedback.
    - **Sign Sync Engine:** Synchronizes text playback with SVG/Video sign assets.

### **B. Backend (Server Layer)**
- **Technology:** Node.js with Express.js.
- **Role:** RESTful API provider, Authentication logic, Data processing.
- **Key Modules:**
    - `Auth Service`: JWT-based user session management.
    - `Content Service`: Serves course modules and media.
    - `Assessment Service`: Handles quiz logic and scoring.

### **C. Database (Data Layer)**
- **Technology:** MongoDB (NoSQL).
- **Role:** Stores unstructured data like JSON-based course modules, user profiles, and logs.
- **Why NoSQL?**: Flexible schema allows easy addition of new accessibility preferences without breaking the DB.

### **D. AI Services Layer**
- **Chatbot:** Integrated via API (e.g., OpenAI/Gemini or custom NLP model).
- **Recommendation Engine:** A logic layer that analyzes `UserResults` to suggest `Courses`.

---

## 3️⃣ USER ROLES & WORKFLOWS

### **🎓 Student**
1.  **Registration/Login:** Secure login returns a JSON Web Token (JWT) and loads accessibility preferences (e.g., "Always Audio Mode").
2.  **Dashboard:** Personalized view of "Enrolled Courses" and "Pending Certifications".
3.  **Learning:** Data-driven `module.html` renders content.
    - *Toggle:* "Enable Sign Language" -> Sidebar loads.
    - *Toggle:* "Audio Mode" -> UI simplifies, Voice Command active.
4.  **Assessment:** Timer-based MCQ. Voice input accepted for answers.
5.  **Completion:** System checks score > 80% -> Triggers Certificate API -> PDF Download.

### **👨‍🏫 Teacher**
1.  **Course Management:** Upload text/PDF content via dashboard.
2.  **Sign Language Mapping:** (Optional) Map specific keywords to custom sign assets if the default dictionary is insufficient.
3.  **Analytics:** View class performance heatmaps (e.g., "Simple Addition" module has 40% failure rate).

### **🛡️ Admin**
1.  **User Oversight:** Manage student/teacher accounts.
2.  **Content Approval:** Review uploaded courses for accessibility compliance (e.g., "Does this image have Alt Text?").
3.  **Platform Health:** Monitor API latency and error logs.

---

## 4️⃣ ACCESSIBILITY FEATURES (CORE MODULE)

### **A. TEXT → SPEECH (TTS)**
- **Implementation:** Uses the browser's native `window.speechSynthesis` API.
- **Optimization:** Text is chunked by sentence.
- **Flow:**
    1.  User clicks "Play" or uses Voice Command "Read".
    2.  JavaScript extracts text content from the active slide.
    3.  Text is passed to the TTS engine with the user's preferred speed/pitch.

### **B. SPEECH → TEXT (STT)**
- **Implementation:** Uses `window.webkitSpeechRecognition`.
- **Use Cases:**
    - **Dictation Pad:** Students speak notes instead of typing.
    - **Voice Navigation:** "Go Back", "Open Quiz".
    - **Chatbot Input:** Students ask questions verbally.

### **C. SIGN LANGUAGE PRESENTATION**
- **Strategy:** **Static Asset Synchronization (Fingerspelling + Dictionary)**.
- **Why this approach?**
    - **ML Limitations:** Real-time 3D sign generation requires heavy GPUs, unsuitable for standard college laptops/web.
    - **Video Bandwidth:** Streaming full video lessons is data-intensive.
    - **Our Solution:** Identify words -> Play cached Svg/Gif -> Fallback to Fingerspelling (A-Z). This is **lightweight, offline-capable, and 100% accurate** for spelling functions.

---

## 5️⃣ AI FEATURES

### **A. AI Chatbot**
- **Function:** Context-aware doubt solver.
- **Flow:**
    1.  User asks: "What is photosynthesis?"
    2.  Backend sends context (Current Lesson: Biology) + Query to AI API.
    3.  AI responds: "Photosynthesis is how plants make food..."
    4.  Platform: Displays text AND reads it out (TTS).

### **B. AI Course Recommendation**
- **Logic:**
    - Input: Quiz Score in "Math Level 1" = 95%.
    - Algorithm: `if score > 90 -> Recommend "Math Level 2"`.
    - Algorithm: `if score < 50 -> Recommend "Math Remedial"`.

---

## 6️⃣ QUIZ & ASSESSMENT MODULE

- **Format:** Multiple Choice Questions (MCQ).
- **Accessibility:** 
    - Questions are read aloud.
    - Users can say "Option A" to select.
- **Scoring:**
    - Immediate feedback (Green/Red visual + "Correct/Incorrect" audio).
    - Results stored in MongoDB `Results` collection.

---

## 7️⃣ CERTIFICATE GENERATION

- **Trigger:** Course Completion status = `true`.
- **Process:**
    1.  Frontend requests `/api/certificate/generate`.
    2.  Backend fills a PDF template with `Student Name`, `Course`, `Date`.
    3.  Returns download stream.
    4.  Visual: Gold seal appearance with high-contrast text.

---

## 8️⃣ API DESIGN (NO CODE)

### **Authentication**
- `POST /api/auth/register` - Create new user.
- `POST /api/auth/login` - Validate creds, return JWT.
- `GET /api/auth/profile` - Get user details + accessibility settings.

### **Courses & Lessons**
- `GET /api/courses` - List all available courses.
- `GET /api/courses/:id` - Get specific course metadata.
- `GET /api/lessons/:courseId` - Get all lesson content (text, image URLs) for a course.

### **Quiz System**
- `GET /api/quizzes/:lessonId` - Fetch questions for a lesson.
- `POST /api/quizzes/submit` - Accept `{questionId, answer}`, return `{score, passed}`.

### **Results & Certificates**
- `GET /api/results/:userId` - Get history of all quizzes.
- `POST /api/certificate/generate` - Generate PDF for a completed course.

### **AI Interaction**
- `POST /api/chatbot/ask` - Send user text -> Get AI response.

---

## 9️⃣ DATABASE DESIGN (CONCEPTUAL)

**Database:** MongoDB

### **Collections (Tables)**

1.  **Users**
    - `_id`, `name`, `email`, `password_hash`, `role` (student/teacher), `preferences` (audio_speed, high_contrast).

2.  **Courses**
    - `_id`, `title`, `description`, `icon`, `difficulty_level`.

3.  **Lessons**
    - `_id`, `course_id`, `sequence_num`, `content_text`, `media_urls`.

4.  **Quizzes**
    - `_id`, `lesson_id`, `questions` [{`q_text`, `options`, `correct_opt`}].

5.  **Results**
    - `_id`, `user_id`, `quiz_id`, `score`, `date_attempted`.

---

## 🔟 TECHNOLOGY STACK

- **Frontend:** HTML5, CSS3, JavaScript, PDF.js (for reading), FontAwesome.
- **Backend (Proposed):** Node.js, Express.
- **Database (Proposed):** MongoDB.
- **Browser APIs:** SpeechSynthesis (TTS), SpeechRecognition (STT).

---

## 1️⃣1️⃣ SIGN LANGUAGE DETECTION – FUTURE SCOPE

*Note: This feature is designed but marked for future implementation due to current hardware limitations.*

- **Concept:** Two-way communication where the student signs to the camera, and the system converts it to text.
- **Technology:**
    - **MediaPipe Hands:** For tracking hand skeleton points.
    - **TensorFlow.js:** For classifying the gesture data.
- **Why Future Scope?**
    - Requires training a custom ML model on thousands of sign variations.
    - High potential for error (False Positives) in a browser environment without calibration.
    - We prioritize **output** (System -> Student) to ensure learning delivery first.

---

## 1️⃣2️⃣ DASHBOARD & ANALYTICS

- **Student Dashboard:** "My Journey" bar chart showing modules completed vs. total.
- **Teacher Dashboard:** "At Risk Students" list (students with low quiz scores).
- **Admin Dashboard:** System load, user registration stats.

---

## 1️⃣3️⃣ FUTURE ENHANCEMENTS

1.  **Offline PWA:** Progressive Web App to learn without internet.
2.  **Multilingual:** Auto-translate lesson text to Tamil/Spanish before TTS reading.
3.  **Emotion AI:** Detect if a student looks confused (via webcam) and pause the lesson to offer help.

---

## 1️⃣4️⃣ VIVA PREPARATION POINTS

- **Q: Why didn't you use React/Angular?**
    - *A: We prioritized lightweight accessibility. Vanilla JS ensures we have full control over the DOM for screen readers without framework overhead.*
- **Q: Is the Sign Language accurate?**
    - *A: We use a Fingerspelling + Keyword Dictionary approach. This ensures 100% accuracy for spelling, unlike Generative AI which might hallucinate signs.*
- **Q: How is this "AI" driven?**
    - *A: We use AI for 1) Content Recommendation logic and 2) The natural language Chatbot API. The core accessibility is deterministic for reliability.*

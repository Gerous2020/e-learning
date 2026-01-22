const API_BASE = 'http://localhost:5000/api';

const api = {
    // Auth
    login: async (email, password) => {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('userInfo', JSON.stringify(data));
        }
        return data;
    },

    register: async (name, email, password) => {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('userInfo', JSON.stringify(data));
        }
        return data;
    },

    logout: () => {
        localStorage.removeItem('userInfo');
        window.location.href = 'index.html';
    },

    getUser: () => {
        return JSON.parse(localStorage.getItem('userInfo'));
    },

    // Courses
    getAllCourses: async () => {
        constres = await fetch(`${API_BASE}/courses`);
        return await res.json();
    },

    getCourseById: async (id) => {
        const res = await fetch(`${API_BASE}/courses/${id}`);
        return await res.json();
    },

    // Voice Settings
    setPreferredVoice: (voiceName) => {
        localStorage.setItem('preferredVoice', voiceName);
    },

    getPreferredVoice: () => {
        return localStorage.getItem('preferredVoice');
    }
};

// Helper to check auth on protected pages
function requireAuth() {
    if (!api.getUser()) {
        window.location.href = 'login.html';
    }
}

// DEMO DATA
const courses = [
    { _id: 'math', title: 'Mathematics', description: 'Basic Arithmetic', icon: 'fas fa-calculator', content: "Welcome to Mathematics. In this module, we will learn about basic arithmetic. Addition is bringing two or more numbers together to make a new total. For example, 5 plus 3 equals 8. Subtraction is taking one number away from another. Geometry is the branch of mathematics concerned with the properties and relations of points, lines, surfaces, solids, and higher dimensional analogs." },
    { _id: 'science', title: 'Science', description: 'Biology and Physics', icon: 'fas fa-flask', content: "Science is the study of the natural world. Tonight, look up at the sky. You might see the Moon and stars. The Red Planet is called Mars. The Sun rises in the East and sets in the West. Biology is the study of life. Physics is the study of matter and energy." },
    { _id: 'language', title: 'Language Arts', description: 'Reading and Writing', icon: 'fas fa-book-reader', content: "Language Arts focuses on reading, writing, speaking, and listening. A noun is a person, place, or thing. A verb is an action word. Adjectives describe nouns. Good communication is key to understanding each other." },
    { _id: 'cs', title: 'Computer Science', description: 'Coding Basics', icon: 'fas fa-laptop-code', content: "Computer Science is the study of computers and computational systems. Coding is how we tell computers what to do. HTML is used to structure web pages. CSS is used to style them. XML stands for Extensible Markup Language." },
    { _id: 'art', title: 'Art & Music', description: 'Creative Expression', icon: 'fas fa-palette', content: "Art allows us to express ourselves creatively. Famous painters include Van Gogh and Picasso. Music is organized sound. Rhythm and melody are key components of music. Colors can make us feel different emotions." },
    { _id: 'life', title: 'Life Skills', description: 'Daily Living', icon: 'fas fa-users-cog', content: "Life skills are capabilities for adaptive and positive behavior. Cooking is a useful skill. Time management helps us do things efficiently. Financial literacy is understanding how money works." },
    { _id: 'pe', title: 'Physical Education', description: 'Health & Fitness', icon: 'fas fa-running', content: "Physical Education keeps our bodies healthy. Exercise strengthens our muscles and heart. Yoga helps with flexibility and balance. Team sports teach us cooperation and sportsmanship." },
    { _id: 'history', title: 'History & Geography', description: 'World Cultures', icon: 'fas fa-globe-americas', content: "History is the study of past events. Geography is the study of places and the relationships between people and their environments. The Earth has seven continents and five oceans. Ancient civilizations built great monuments." }
];

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
    // Return all courses from the array
    res.json(courses);
};

// @desc    Fetch single course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
    const course = courses.find(c => c._id === req.params.id);
    if (course) {
        res.json(course);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
};

module.exports = { getCourses, getCourseById };

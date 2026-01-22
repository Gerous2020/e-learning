// DEMO DATA
const courses = [
    {
        _id: 'math',
        title: 'Mathematics',
        description: 'Basic Arithmetic',
        icon: 'fas fa-calculator',
        content: "Welcome to Mathematics. In this module, we will learn about basic arithmetic. Addition is bringing two or more numbers together to make a new total. For example, 5 plus 3 equals 8. Subtraction is taking one number away from another. Geometry is the branch of mathematics concerned with the properties and relations of points, lines, surfaces, solids, and higher dimensional analogs.",
        books: [
            { title: "The Joy of x", author: "Steven Strogatz", link: "#", content: "A world-class mathematician leads us on a journey through the wonders of numbers. From the basics of arithmetic to the complexities of calculus, Strogatz makes math accessible and fun. He reveals how mathematics connects to the real world, from the spirals of a sunflower to the rhythm of our heartbeats." },
            { title: "Humble Pi", author: "Matt Parker", link: "#", content: "Matt Parker explores the greatest mathematical mistakes of all time. From bridge collapses to internet crashes, he shows how math is essential to our daily lives and what happens when it goes wrong. It's a hilarious and informative look at the importance of getting your numbers right." },
            { title: "What is Mathematics?", author: "Richard Courant", link: "#", content: "A classic introduction to the world of mathematics. This book covers everything from number theory to geometry and calculus. It is designed for improvements in mathematical literacy and offers a deep dive into the fundamental concepts that shape the field." }
        ]
    },
    {
        _id: 'science',
        title: 'Science',
        description: 'Biology and Physics',
        icon: 'fas fa-flask',
        content: "Science is the study of the natural world. Tonight, look up at the sky. You might see the Moon and stars. The Red Planet is called Mars. The Sun rises in the East and sets in the West. Biology is the study of life. Physics is the study of matter and energy.",
        books: [
            { title: "A Brief History of Time", author: "Stephen Hawking", link: "#", content: "Stephen Hawking explains the mysteries of the universe. He explores concepts like the Big Bang, black holes, and the nature of time itself. Written for non-scientists, this book attempts to explain complex physics in a way that everyone can understand." },
            { title: "Cosmos", author: "Carl Sagan", link: "#", content: "Carl Sagan takes us on a voyage across the universe. He discusses the evolution of science, the origins of life, and our place in the cosmos. It explores 15 billion years of cosmic evolution and the development of science and civilization." },
            { title: "The Selfish Gene", author: "Richard Dawkins", link: "#", content: "Richard Dawkins offers a view of evolution from the perspective of the gene. He argues that genes are the primary units of selection in evolution. This book changed the way we think about natural selection and the biology of selfishness and altruism." }
        ]
    },
    {
        _id: 'language',
        title: 'Language Arts',
        description: 'Reading and Writing',
        icon: 'fas fa-book-reader',
        content: "Language Arts focuses on reading, writing, speaking, and listening. A noun is a person, place, or thing. A verb is an action word. Adjectives describe nouns. Good communication is key to understanding each other.",
        books: [
            { title: "Eats, Shoots & Leaves", author: "Lynne Truss", link: "#", content: "A zero-tolerance approach to punctuation. Lynne Truss argues for the importance of proper punctuation in English. She uses humor and examples to show how misplaced commas and apostrophes can completely change the meaning of a sentence." },
            { title: "The Elements of Style", author: "Strunk & White", link: "#", content: "The classic guide to writing well. This little book offers timeless advice on grammar, usage, and style. It teaches writers how to be clear, concise, and effective in their communication." }
        ]
    },
    {
        _id: 'cs',
        title: 'Computer Science',
        description: 'Coding Basics',
        icon: 'fas fa-laptop-code',
        content: "Computer Science is the study of computers and computational systems. Coding is how we tell computers what to do. HTML is used to structure web pages. CSS is used to style them. XML stands for Extensible Markup Language.",
        books: [
            { title: "Clean Code", author: "Robert C. Martin", link: "#", content: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. This book is about how to write code that is easy to read, easy to understand, and easy to maintain." },
            { title: "The Pragmatic Programmer", author: "Andrew Hunt", link: "#", content: "This book cuts through the increasing specialization and technicalities of modern software development to examine the core process--taking a requirement and producing working, maintainable code that delights its users." },
            { title: "Code Complete", author: "Steve McConnell", link: "#", content: "Widely considered one of the best practical guides to programming, Steve McConnell's original CODE COMPLETE has been helping developers write better software for more than a decade. It covers everything from design to debugging." }
        ]
    },
    {
        _id: 'art',
        title: 'Art & Music',
        description: 'Creative Expression',
        icon: 'fas fa-palette',
        content: "Art allows us to express ourselves creatively. Famous painters include Van Gogh and Picasso. Music is organized sound. Rhythm and melody are key components of music. Colors can make us feel different emotions.",
        books: [
            { title: "The Story of Art", author: "E.H. Gombrich", link: "#", content: "One of the most famous and popular books on art ever written. Gombrich provides a clear and engaging history of art from ancient times to the modern era. It is a perfect introduction for anyone interested in art history." },
            { title: "Musicophilia", author: "Oliver Sacks", link: "#", content: "Neurologist Oliver Sacks explores the place music occupies in the brain and how it affects the human condition. He shares stories of patients with musical complications and how music can heal and inspire." }
        ]
    },
    {
        _id: 'life',
        title: 'Life Skills',
        description: 'Daily Living',
        icon: 'fas fa-users-cog',
        content: "Life skills are capabilities for adaptive and positive behavior. Cooking is a useful skill. Time management helps us do things efficiently. Financial literacy is understanding how money works.",
        books: [
            { title: "Atomic Habits", author: "James Clear", link: "#", content: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results." },
            { title: "How to Win Friends and Influence People", author: "Dale Carnegie", link: "#", content: "For over 60 years the rock-solid, time-tested advice in this book has carried thousands of now famous people up the ladder of success in their business and personal lives. Learn the six ways to make people like you, the twelve ways to win people to your way of thinking, and the nine ways to change people without arousing resentment." },
            { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", link: "#", content: "Robert Kiyosaki argues that what the rich teach their kids about money is different from what the poor and middle class teach. The book explodes the myth that you need to earn a high income to be rich and challenges the belief that your house is an asset." }
        ]
    },
    {
        _id: 'pe',
        title: 'Physical Education',
        description: 'Health & Fitness',
        icon: 'fas fa-running',
        content: "Physical Education keeps our bodies healthy. Exercise strengthens our muscles and heart. Yoga helps with flexibility and balance. Team sports teach us cooperation and sportsmanship.",
        books: [
            { title: "Spark", author: "John J. Ratey", link: "#", content: "Did you know you can beat stress, lift your mood, fight memory loss, sharpen your intellect, and function better than ever simply by elevating your heart rate and breaking a sweat? Ratey explores the connection between exercise and the brain." },
            { title: "Born to Run", author: "Christopher McDougall", link: "#", content: "Full of incredible characters, amazing athletic achievements, and stimulating science, Born to Run is a truly inspiring adventure. It explores the secrets of the Tarahumara Indians, who run hundreds of miles without rest or injury." }
        ]
    },
    {
        _id: 'history',
        title: 'History & Geography',
        description: 'World Cultures',
        icon: 'fas fa-globe-americas',
        content: "History is the study of past events. Geography is the study of places and the relationships between people and their environments. The Earth has seven continents and five oceans. Ancient civilizations built great monuments.",
        books: [
            { title: "Sapiens", author: "Yuval Noah Harari", link: "#", content: "Yuval Noah Harari takes us on a journey through the history of our species, from the emergence of Homo sapiens in Africa to the present day. He explores how biology and history have defined us and enhanced our understanding of what it means to be human." },
            { title: "Guns, Germs, and Steel", author: "Jared Diamond", link: "#", content: "Jared Diamond argues that geographical and environmental factors played a crucial role in shaping the modern world. He explains why some civilizations advanced more rapidly than others and how obtaining resources, weapons, and diseases influenced history." },
            { title: "Prisoners of Geography", author: "Tim Marshall", link: "#", content: "Tim Marshall shows how the choices of leaders are constrained by geography. He explains how mountains, rivers, and seas shape the decisions of countries and the lives of their people, offering a fresh perspective on world politics." }
        ]
    }
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

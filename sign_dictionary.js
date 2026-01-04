const signDictionary = {
    // INTRO & GENERAL (Use Generic/Hello theme)
    "WELCOME": "assets/signs/generic.gif",
    "HELLO": "assets/signs/generic.gif",
    "LEARN": "assets/signs/generic.gif",
    "STUDY": "assets/signs/generic.gif",
    "BASIC": "assets/signs/generic.gif",
    "START": "assets/signs/generic.gif",
    "LANGUAGE": "assets/signs/generic.gif",
    "READING": "assets/signs/generic.gif",
    "WRITING": "assets/signs/generic.gif",
    "SPEAKING": "assets/signs/generic.gif",
    "LISTENING": "assets/signs/generic.gif",

    // MATH (Use Math theme)
    "MATHEMATICS": "assets/signs/math.gif",
    "MATH": "assets/signs/math.gif",
    "ARITHMETIC": "assets/signs/math.gif",
    "ADDITION": "assets/signs/math.gif",
    "SUBTRACTION": "assets/signs/math.gif",
    "GEOMETRY": "assets/signs/math.gif",
    "NUMBERS": "assets/signs/math.gif",
    "NUMBER": "assets/signs/math.gif",
    "TOTAL": "assets/signs/math.gif",
    "EQUALS": "assets/signs/math.gif",
    "Calculus": "assets/signs/math.gif",

    // SCIENCE (Use Science theme)
    "SCIENCE": "assets/signs/science.gif",
    "BIOLOGY": "assets/signs/science.gif",
    "PHYSICS": "assets/signs/science.gif",
    "CHEMISTRY": "assets/signs/science.gif",
    "WORLD": "assets/signs/science.gif",
    "PLANET": "assets/signs/science.gif",
    "MOON": "assets/signs/science.gif",
    "SUN": "assets/signs/science.gif",
    "NATURAL": "assets/signs/science.gif",
    "EARTH": "assets/signs/science.gif",

    // TECH (Fallback to Science/Math or Generic)
    "COMPUTER": "assets/signs/science.gif",
    "CODING": "assets/signs/math.gif",

    // MISC
    "LIFE": "assets/signs/brief.gif", // If not exists, will break? No, stick to downloaded
    "GOOD": "assets/signs/generic.gif",
    "BAD": "assets/signs/generic.gif",

    // NUMBERS
    "ONE": "assets/signs/math.gif",
    "TWO": "assets/signs/math.gif",
    "THREE": "assets/signs/math.gif"
};

const genericSign = "assets/signs/generic.gif"; // Local generic file

const alphabetSigns = {
    "A": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Sign_language_A.svg/120px-Sign_language_A.svg.png",
    "B": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Sign_language_B.svg/120px-Sign_language_B.svg.png",
    "C": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Sign_language_C.svg/120px-Sign_language_C.svg.png",
    "D": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Sign_language_D.svg/120px-Sign_language_D.svg.png",
    "E": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Sign_language_E.svg/120px-Sign_language_E.svg.png",
    "F": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Sign_language_F.svg/120px-Sign_language_F.svg.png",
    "G": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Sign_language_G.svg/120px-Sign_language_G.svg.png",
    "H": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Sign_language_H.svg/120px-Sign_language_H.svg.png",
    "I": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Sign_language_I.svg/120px-Sign_language_I.svg.png",
    "J": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sign_language_J.svg/120px-Sign_language_J.svg.png",
    "K": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Sign_language_K.svg/120px-Sign_language_K.svg.png",
    "L": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Sign_language_L.svg/120px-Sign_language_L.svg.png",
    "M": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Sign_language_M.svg/120px-Sign_language_M.svg.png",
    "N": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Sign_language_N.svg/120px-Sign_language_N.svg.png",
    "O": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Sign_language_O.svg/120px-Sign_language_O.svg.png",
    "P": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Sign_language_P.svg/120px-Sign_language_P.svg.png",
    "Q": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Sign_language_Q.svg/120px-Sign_language_Q.svg.png",
    "R": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Sign_language_R.svg/120px-Sign_language_R.svg.png",
    "S": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Sign_language_S.svg/120px-Sign_language_S.svg.png",
    "T": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Sign_language_T.svg/120px-Sign_language_T.svg.png",
    "U": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Sign_language_U.svg/120px-Sign_language_U.svg.png",
    "V": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Sign_language_V.svg/120px-Sign_language_V.svg.png",
    "W": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Sign_language_W.svg/120px-Sign_language_W.svg.png",
    "X": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Sign_language_X.svg/120px-Sign_language_X.svg.png",
    "Y": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Sign_language_Y.svg/120px-Sign_language_Y.svg.png",
    "Z": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Sign_language_Z.svg/120px-Sign_language_Z.svg.png"
};

// Function to lookup a word
function getSignImage(word) {
    if (!word) return null;
    const upperWord = word.toUpperCase();

    // Direct match
    if (signDictionary[upperWord]) {
        return signDictionary[upperWord];
    }

    // Stemming
    if (upperWord.endsWith('S') || upperWord.endsWith('ED') || upperWord.endsWith('ING')) {
        // Simple heuristic
        if (signDictionary[upperWord.slice(0, -1)]) return signDictionary[upperWord.slice(0, -1)];
        if (signDictionary[upperWord.slice(0, -2)]) return signDictionary[upperWord.slice(0, -2)];
        if (signDictionary[upperWord.slice(0, -3)]) return signDictionary[upperWord.slice(0, -3)];
    }

    return null;
}

function getGenericSign() {
    return genericSign;
}

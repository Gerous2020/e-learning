document.addEventListener('DOMContentLoaded', () => {
    console.log("AccessLearn Platform Loaded");

    const audioModeToggle = document.getElementById('audio-mode-toggle');
    const emergencyBtn = document.getElementById('emergency-btn');
    let audioModeActive = false;
    let synthesis = window.speechSynthesis;

    // --- Restore Audio Mode State on Page Load ---
    if (localStorage.getItem('audioModeActive') === 'true') {
        audioModeActive = true;
        document.body.classList.add('high-contrast');
        if (audioModeToggle) {
            audioModeToggle.innerHTML = '<i class="fas fa-volume-up"></i> Disable Audio Mode';
        }
    }

    // Toggle Audio Mode
    audioModeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleAudioMode();
    });

    // Emergency Button Logic
    emergencyBtn.addEventListener('click', () => {
        const msg = "Emergency Help Requested. Connecting to support immediately.";
        alert(msg);
        speak(msg, true);
    });

    // Global Event Listeners for Accessibility
    document.body.addEventListener('mouseover', (e) => {
        if (!audioModeActive) return;
        readElement(e.target);
    });

    document.body.addEventListener('focusin', (e) => {
        // Always read on focus, even if not in full "Audio Mode" (good practice)
        readElement(e.target);
    });

    // Core TTS Function
    function speak(text, force = false) {
        if (!synthesis) return;
        if (synthesis.speaking && !force) return; // Don't interrupt unless forced
        if (force) synthesis.cancel(); // Stop current if forced

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        synthesis.speak(utterance);
    }

    function readElement(element) {
        let textToRead = "";

        // Prioritize aria-label, then alt text, then text content
        if (element.getAttribute('aria-label')) {
            textToRead = element.getAttribute('aria-label');
        } else if (element.tagName === 'IMG' && element.getAttribute('alt')) {
            textToRead = "Image: " + element.getAttribute('alt');
        } else if (element.innerText && element.innerText.trim().length > 0) {
            // Avoid reading huge blocks on hover, just read immediate text
            textToRead = element.innerText.substring(0, 150);
        }

        if (textToRead) {
            // Debounce or check duplicates could be added here
            speak(textToRead, true); // Force read on hover/focus
        }
    }

    function toggleAudioMode() {
        audioModeActive = !audioModeActive;
        document.body.classList.toggle('high-contrast');
        // Persist state across pages
        localStorage.setItem('audioModeActive', audioModeActive);

        const status = audioModeActive ? "Audio Mode Enabled. Hover over items to hear them." : "Audio Mode Disabled.";
        speak(status, true);

        // Update button text/aria
        audioModeToggle.innerHTML = audioModeActive ? '<i class="fas fa-volume-up"></i> Disable Audio Mode' : '<i class="fas fa-headphones"></i> Audio Mode';
    }

    /* --- Voice Selection Logic --- */
    const voiceSelect = document.getElementById('voice-select');
    let voices = [];

    function populateVoices() {
        voices = synthesis.getVoices();
        voiceSelect.innerHTML = '<option value="default">Default Voice</option>';
        const savedVoice = api.getPreferredVoice();

        voices.forEach((voice) => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.value = voice.name; // Save name instead of index

            if (savedVoice === voice.name) {
                option.selected = true;
            }
            voiceSelect.appendChild(option);
        });

        // Event Listener for Change
        voiceSelect.addEventListener('change', () => {
            const selected = voiceSelect.value;
            if (selected !== 'default') {
                api.setPreferredVoice(selected);
                speak("Voice updated.");
            } else {
                localStorage.removeItem('preferredVoice');
            }
        });
    }

    populateVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoices;
    }

    /* --- Core TTS Function Updated for Voice Selection & Sign Sync --- */
    function speak(text, force = false, isPdf = false) {
        if (!synthesis) return;
        if (synthesis.speaking && !force) return;
        if (force) synthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);


        // Use Preferred Voice
        const preferredVoiceName = api.getPreferredVoice();
        if (preferredVoiceName) {
            const voice = voices.find(v => v.name === preferredVoiceName);
            if (voice) utterance.voice = voice;
        }

        utterance.rate = 0.9;

        // Sign Language Sync Logic
        utterance.onboundary = (event) => {
            if (event.name === 'word') {
                const charIndex = event.charIndex;
                const charLength = event.charLength; // Note: not always supported perfectly
                // Simple word extraction approach
                // We can roughly get the word using the text and index
                const textBefore = text.substring(0, charIndex);
                const textAfter = text.substring(charIndex);
                // Regex to find the word starting at charIndex
                const match = textAfter.match(/^[\w-]+/);
                const word = match ? match[0] : "";

                if (word) {
                    updateSignPanel(word);
                }
            }
        };

        synthesis.speak(utterance);
    }

    function updateSignPanel(word) {
        // Shared logic with module.html
        const slPanel = document.querySelector('.sign-language-panel');
        if (slPanel && slPanel.style.display !== 'none') {
            const slContainer = slPanel.querySelector('.sl-video-placeholder');
            const slText = slPanel.querySelector('p');

            // 1. Clean panel
            slContainer.innerHTML = '';
            slContainer.style.background = "#fff";
            slContainer.style.display = "flex";
            slContainer.style.flexWrap = "wrap";
            slContainer.style.justifyContent = "center";
            slContainer.style.alignItems = "center";
            slContainer.style.gap = "2px";
            slContainer.style.padding = "10px";
            slContainer.style.minHeight = "150px";

            if (!word) return;

            // 2. Loop characters for Fingerspelling
            const cleanWord = word.trim().replace(/[^a-zA-Z]/g, '');

            for (let char of cleanWord) {
                const signSrc = typeof getFingerSpellingImage === 'function' ? getFingerSpellingImage(char) : null;
                if (signSrc) {
                    const img = document.createElement('img');
                    img.src = signSrc;
                    img.alt = `Sign ${char}`;
                    img.title = char;
                    img.style.width = "40px";
                    img.style.height = "auto";
                    img.style.margin = "2px";
                    slContainer.appendChild(img);
                }
            }

            // 3. Label
            const label = document.createElement('div');
            label.textContent = word;
            label.style.width = "100%";
            label.style.textAlign = "center";
            label.style.marginTop = "10px";
            label.style.fontWeight = "bold";
            label.style.color = "#333";
            slContainer.appendChild(label);
        }
    }

    /* --- PDF Reader Mockup --- */
    const pdfUpload = document.getElementById('pdf-upload');
    const pdfContent = document.getElementById('pdf-content');
    const readPdfBtn = document.getElementById('read-pdf-btn');
    const pausePdfBtn = document.getElementById('pause-pdf-btn');
    const stopPdfBtn = document.getElementById('stop-pdf-btn');
    let currentPdfText = "";

    pdfUpload.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            pdfContent.textContent = "Processing file...";
            readPdfBtn.disabled = true;
            pausePdfBtn.disabled = true;
            stopPdfBtn.disabled = true;
            speak("Processing file. Please wait.");

            try {
                if (file.type === 'text/plain') {
                    // Handle .txt files
                    const text = await file.text();
                    currentPdfText = text;
                    finalizeFileLoad(file.name);
                } else if (file.type === 'application/pdf') {
                    // Handle .pdf files
                    const arrayBuffer = await file.arrayBuffer();
                    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
                    let fullText = '';

                    // Limit to first 5 pages for performance in this demo
                    const maxPages = Math.min(pdf.numPages, 5);
                    for (let i = 1; i <= maxPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map(item => item.str).join(' ');
                        fullText += pageText + ' ';
                    }

                    if (pdf.numPages > 5) fullText += " [Comparison truncated for demo...]";

                    currentPdfText = fullText;
                    finalizeFileLoad(file.name);
                } else {
                    pdfContent.textContent = "Error: Unsupported file type. Please upload PDF or TXT.";
                    speak("Error. Unsupported file type.");
                }
            } catch (err) {
                console.error(err);
                pdfContent.textContent = "Error reading file.";
                speak("Error reading file.");
            }
        }
    });

    function finalizeFileLoad(filename) {
        if (!currentPdfText.trim()) {
            pdfContent.textContent = "Warning: No text found in file (it might be an image-only PDF).";
            speak("Warning. No text found.");
            return;
        }
        pdfContent.textContent = currentPdfText;
        readPdfBtn.disabled = false;
        pausePdfBtn.disabled = false;
        stopPdfBtn.disabled = false;
        speak("File ready. Click Read Content to listen.");
    }

    readPdfBtn.addEventListener('click', () => {
        if (synthesis.paused) {
            synthesis.resume();
        } else if (currentPdfText) {
            speak(currentPdfText, true); // Force new read
        }
    });

    pausePdfBtn.addEventListener('click', () => {
        if (synthesis.speaking && !synthesis.paused) {
            synthesis.pause();
        }
    });

    stopPdfBtn.addEventListener('click', () => {
        synthesis.cancel();
    });
    // Voice Command Button Logic
    const voiceCmdBtn = document.getElementById('voice-command-btn');
    if (voiceCmdBtn && 'webkitSpeechRecognition' in window) {
        const cmdRecognition = new webkitSpeechRecognition();
        cmdRecognition.continuous = false;
        cmdRecognition.lang = 'en-US';

        cmdRecognition.onstart = () => {
            voiceCmdBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Listening...';
            voiceCmdBtn.style.color = 'red';
        };

        cmdRecognition.onend = () => {
            voiceCmdBtn.innerHTML = '<i class="fas fa-microphone"></i> Voice Control';
            voiceCmdBtn.style.color = 'inherit';
        };

        cmdRecognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            window.processCommand(command);
        };

        voiceCmdBtn.addEventListener('click', () => {
            speak("Listening for command.");
            cmdRecognition.start();
        });
    }


    /* --- Audio to Text (Dictation) --- */
    const startDictationBtn = document.getElementById('start-dictation');
    const dictationOutput = document.getElementById('dictation-output');

    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            startDictationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Listening...';
            speak("Listening.");
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            dictationOutput.value += transcript + " ";
            speak("You said: " + transcript);
        };

        recognition.onerror = (event) => {
            startDictationBtn.innerHTML = '<i class="fas fa-microphone-slash"></i> Error';
            console.error(event.error);
        };

        recognition.onend = () => {
            startDictationBtn.innerHTML = '<i class="fas fa-microphone-alt"></i> Start Dictation';
        };

        startDictationBtn.addEventListener('click', () => {
            recognition.start();
        });
    } else {
        startDictationBtn.innerHTML = "Not Supported";
        startDictationBtn.disabled = true;
    }

    /* --- Sign Language Toggle --- */
    const toggleSlBtn = document.getElementById('toggle-sl');
    const slPanel = document.querySelector('.sign-language-panel');

    toggleSlBtn.addEventListener('click', () => {
        if (slPanel.style.display === 'none') {
            slPanel.style.display = 'block';
            toggleSlBtn.textContent = 'Hide';
        } else {
            slPanel.style.display = 'none';
            toggleSlBtn.textContent = 'Show Interpreter';
        }
    });

    /* --- Assessment Logic --- */
    // Expanded Question Bank
    const questions = [
        { q: "What is 5 + 3?", a: ["8", "eight"] },
        { q: "Which planet is known as the Red Planet?", a: ["mars"] },
        { q: "True or False: The sun rises in the east.", a: ["true"] },
        { q: "What color is a banana?", a: ["yellow"] },
        { q: "How many legs does a spider have?", a: ["8", "eight"] }
    ];
    let currentQuestionIndex = 0;

    // We can expose a function to start the quiz
    window.startQuiz = function () {
        currentQuestionIndex = 0;
        askQuestion();
    };

    function askQuestion() {
        if (currentQuestionIndex >= questions.length) {
            speak("Quiz completed! Great job.");
            alert("Quiz Completed!");
            return;
        }
        const q = questions[currentQuestionIndex];
        const text = `Question ${currentQuestionIndex + 1}: ${q.q}. Speak your answer now.`;
        speak(text, true);

        // Simulate listening (in a real app, we'd use Web Speech API's continuous listening)
        console.log("Listening for answer...");

        // Mocking the interaction for this demo
        setTimeout(() => {
            const mockInput = prompt(`Question: ${q.q}\n(Type your answer as if speaking)`);
            if (mockInput) {
                checkAnswer(mockInput.toLowerCase());
            }
        }, 3000); // Wait 3s after reading question
    }

    function checkAnswer(input) {
        const q = questions[currentQuestionIndex];
        const isCorrect = q.a.some(ans => input.includes(ans));

        if (isCorrect) {
            speak("Correct!", true);
        } else {
            speak(`Incorrect. The answer was ${q.a[0]}.`, true);
        }

        currentQuestionIndex++;
        setTimeout(askQuestion, 2000);
    }

    /* --- GLOBAL VOICE COMMAND SYSTEM --- */
    /* --- GLOBAL VOICE COMMAND SYSTEM --- */
    window.processCommand = function (command) {
        command = command.toLowerCase();
        // Feedback
        speak(`Command received: ${command}`);

        // Navigation / Scroll
        if (command.includes("home") || command.includes("top")) {
            window.location.href = "index.html";
        }
        else if (command.includes("assessment") || command.includes("quiz")) {
            const section = document.getElementById('assessment');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                speak("Moving to Assessment Zone.");
            }
        }
        else if (command.includes("module") || command.includes("course")) {
            document.getElementById('modules').scrollIntoView({ behavior: 'smooth' });
            speak("Here are the learning modules.");
        }

        // Specific Modules
        else if (command.includes("math")) {
            window.location.href = "module.html?id=math";
        }
        else if (command.includes("science")) {
            window.location.href = "module.html?id=science";
        }
        else if (command.includes("computer") || command.includes("coding")) {
            window.location.href = "module.html?id=cs";
        }
        else if (command.includes("language") || command.includes("english")) {
            window.location.href = "module.html?id=language";
        }

        // Tools
        else if (command.includes("audio mode")) {
            document.getElementById('audio-mode-toggle').click();
        }
        else if (command.includes("sign language")) {
            document.querySelector('.sign-language-panel').style.display = 'block';
            speak("Opening Sign Language Interpreter.");
        }
        else if (command.includes("help") || command.includes("emergency")) {
            document.getElementById('emergency-btn').click();
        }

        // Story Navigation (by voice)
        else if (command.includes("story") || command.includes("stories") || command.includes("library")) {
            const libSection = document.getElementById('library');
            if (libSection) {
                libSection.scrollIntoView({ behavior: 'smooth' });
                speak("Here is the Digital Library and Stories section.");
            } else {
                window.location.href = "index.html#library";
            }
        }
        else if (command.includes("lion") || command.includes("mouse")) {
            speak("Opening The Lion and the Mouse.");
            window.location.href = "book.html?storyBook=lion-mouse";
        }
        else if (command.includes("cinderella")) {
            speak("Opening Cinderella.");
            window.location.href = "book.html?storyBook=cinderella";
        }
        else if (command.includes("tortoise") || command.includes("hare") || command.includes("rabbit")) {
            speak("Opening The Tortoise and the Hare.");
            window.location.href = "book.html?storyBook=tortoise-hare";
        }

        // Module Page Controls
        else if (command.includes("read") || command.includes("play")) {
            const playBtn = document.getElementById('play-module');
            if (playBtn) playBtn.click();
        }
        else if (command.includes("stop") || command.includes("pause")) {
            const stopBtn = document.getElementById('stop-module');
            if (stopBtn) stopBtn.click();
            window.speechSynthesis.cancel();
        }
        else {
            speak("Sorry, I didn't understand that command. Try saying: stories, lion, cinderella, tortoise, math, science.");
        }
    };

    // Bind the 'Go to Assessments' button and read-book buttons
    const assessButtons = document.querySelectorAll('#assessment button, .read-book-btn');
    assessButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target.classList.contains('read-book-btn')) {
                const bookName = e.target.dataset.book;
                speak(`Opening book: ${bookName}`);
                window.location.href = `book.html?libraryBook=${encodeURIComponent(bookName)}`;
            } else {
                speak("Starting Assessment.");
                window.startQuiz();
            }
        });
    });

    // --- Stories Section ---

    // Default story buttons
    document.querySelectorAll('.read-story-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const storyKey = btn.dataset.story;
            speak(`Opening story.`);
            window.location.href = `book.html?storyBook=${encodeURIComponent(storyKey)}`;
        });
    });

    // PDF Upload for Stories
    const storyPdfInput = document.getElementById('story-pdf-upload');
    const storyUploadStatus = document.getElementById('story-upload-status');
    const readUploadedBtn = document.getElementById('read-uploaded-story-btn');

    if (storyPdfInput) {
        storyPdfInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            storyUploadStatus.textContent = '⏳ Reading PDF...';
            readUploadedBtn.style.display = 'none';

            try {
                const arrayBuffer = await file.arrayBuffer();

                if (!window.pdfjsLib) {
                    storyUploadStatus.textContent = '❌ PDF library not loaded. Please refresh.';
                    return;
                }

                const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                let fullText = '';

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    const pageText = content.items.map(item => item.str).join(' ');
                    fullText += pageText + '\n';
                }

                if (fullText.trim().length === 0) {
                    storyUploadStatus.textContent = '⚠️ No readable text found in this PDF (it may be image-based).';
                    return;
                }

                // Store in sessionStorage and show read button
                sessionStorage.setItem('uploadedStoryText', fullText.trim());
                sessionStorage.setItem('uploadedStoryName', file.name.replace('.pdf', ''));
                storyUploadStatus.textContent = `✅ "${file.name}" loaded! (${pdf.numPages} page${pdf.numPages > 1 ? 's' : ''})`;
                readUploadedBtn.style.display = 'inline-block';

            } catch (err) {
                console.error('PDF parse error:', err);
                storyUploadStatus.textContent = '❌ Could not read PDF. Please try another file.';
            }
        });

        readUploadedBtn.addEventListener('click', () => {
            window.location.href = 'book.html?storyBook=uploaded';
        });
    }
});

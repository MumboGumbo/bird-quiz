document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const weekContent = document.getElementById('week-content');
    const audioPlayer = document.getElementById('audio-player');
    const answerInput = document.getElementById('answer');
    const feedback = document.getElementById('feedback');
    const submitAnswerButton = document.getElementById('submit-answer-button');

    // List of birds for Week 1
    const birdsWeek1 = [
        { name: 'American Crow', audioFile: 'audio/AmericanCrow.mp3' },
        { name: 'American Robin', audioFile: 'audio/AmericanRobin.mp3' },
        { name: 'Bald Eagle', audioFile: 'audio/BaldEagle.mp3' },
        { name: 'Blue Jay', audioFile: 'audio/BlueJay.mp3' },
        { name: 'Carolina Chickadee', audioFile: 'audio/CarolinaChickadee.mp3' },
        { name: 'Carolina Wren', audioFile: 'audio/CarolinaWren.mp3' },
        { name: 'Cedar Waxwing', audioFile: 'audio/CedarWaxwing.mp3' },
        { name: 'Eastern Bluebird', audioFile: 'audio/EasternBluebird.mp3' },
        { name: 'European Starling', audioFile: 'audio/EuropeanStarling.mp3' },
        { name: 'Great Blue Heron', audioFile: 'audio/GreatBlueHeron.mp3' },
        { name: 'House Sparrow', audioFile: 'audio/HouseSparrow.mp3' },
        { name: 'Northern Cardinal', audioFile: 'audio/NorthernCardinal.mp3' },
        { name: 'Northern Mockingbird', audioFile: 'audio/NorthernMockingbird.mp3' },
        { name: 'Red-bellied Woodpecker', audioFile: 'audio/Red-belliedWoodpecker.mp3' },
        { name: 'Red-shouldered Hawk', audioFile: 'audio/Red-shoulderedHawk.mp3' },
        { name: 'Red-tailed Hawk', audioFile: 'audio/Red-tailedHawk.mp3' },
        { name: 'Rock Pigeon', audioFile: 'audio/RockPigeon.mp3' },
        { name: 'Tufted Titmouse', audioFile: 'audio/TuftedTitmouse.mp3' }
    ];

    // List of birds for Week 2
    const birdsWeek2 = [
        { name: 'Mallard', audioFile: 'audio/Mallard.mp3' },
        { name: 'Ruddy Duck', audioFile: 'audio/RuddyDuck.mp3' },
        { name: 'Snow Goose', audioFile: 'audio/SnowGoose.mp3' },
        { name: 'Wood Duck', audioFile: 'audio/WoodDuck.mp3' },
        { name: 'Canada Goose', audioFile: 'audio/CanadaGoose.mp3' },
        { name: 'Greater White-fronted Goose', audioFile: 'audio/GreatWhite-Fronted.mp3' }
    ];

    // List of birds for Week 3
    const birdsWeek3 = [
        { name: 'Pie-Billed Grebe', audioFile: 'audio/Pie-BilledGrebe.mp3' },
        { name: 'Ring-Necked Pheasant', audioFile: 'audio/Ring-NeckedPheasant.mp3' },
        { name: 'Ruffed Grouse', audioFile: 'audio/RuffedGrouse.mp3' },
        { name: 'Northern Bobwhite', audioFile: 'audio/NorthernBobwhite.mp3' },
        { name: 'Mourning Dove', audioFile: 'audio/MourningDove.mp3' },
        { name: 'Eurasian Collard-Dove', audioFile: 'audio/EurasianCollard-Dove.mp3' },
        { name: 'Wild Turkey', audioFile: 'audio/WildTurkey.mp3' }
    ];

    // Quiz state variables
    let shuffledBirds = [];
    let currentBirdIndex = 0;
    let score = 0;
    const userAnswers = []; // Array to store user's answers and correctness

    // Utility function to shuffle an array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Initialize the quiz
    function startQuiz(birds) {
        shuffledBirds = shuffle([...birds]); // Shuffle birds for the quiz
        currentBirdIndex = 0;
        score = 0;
        userAnswers.length = 0; // Clear previous answers
        loadBirdCall();
    }

    // Load the current bird call
    function loadBirdCall() {
        if (currentBirdIndex < shuffledBirds.length) {
            const bird = shuffledBirds[currentBirdIndex];
            audioPlayer.src = bird.audioFile;

            // Load and play the audio
            audioPlayer.load();
            audioPlayer.play().catch(() => {
                feedback.textContent = 'Autoplay blocked. Click the play button to start the audio.';
                feedback.style.color = 'orange';
            });

            // Clear feedback and input fields
            feedback.textContent = '';
            answerInput.value = '';
        } else {
            endQuiz();
        }
    }

    // Handle answer submission
    function checkAnswer() {
        const userAnswer = answerInput.value.trim();
        const correctAnswer = shuffledBirds[currentBirdIndex].name;

        const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
        if (isCorrect) {
            feedback.textContent = 'Correct!';
            feedback.style.color = 'green';
            score++;
        } else {
            feedback.textContent = `Wrong! The correct answer was: ${correctAnswer}.`;
            feedback.style.color = 'red';
        }

        // Store the user's answer
        userAnswers.push({
            bird: correctAnswer,
            userAnswer: userAnswer || 'No Answer',
            isCorrect: isCorrect
        });

        currentBirdIndex++;
        setTimeout(loadBirdCall, 1000); // Load the next question after 1 second
    }

    // End the quiz
    function endQuiz() {
        feedback.textContent = `Quiz over! Your final score is ${score}/${shuffledBirds.length}.`;
        displayResults();
    }

    // Display the results at the end of the quiz
    function displayResults() {
        let resultsHTML = `<h2>Results</h2>`;
        resultsHTML += `<ul>`;
        userAnswers.forEach(({ bird, userAnswer, isCorrect }) => {
            const color = isCorrect ? 'green' : 'red';
            resultsHTML += `<li style="color: ${color};"><strong>${bird}:</strong> Your Answer: ${userAnswer}</li>`;
        });
        resultsHTML += `</ul>`;
        resultsHTML += `<button id="restart-button">Restart Quiz</button>`;

        weekContent.innerHTML = resultsHTML;

        // Add event listener to restart button
        document.getElementById('restart-button').addEventListener('click', restartQuiz);
    }

    // Restart the quiz
    function restartQuiz() {
        startQuiz(shuffledBirds);
    }

    // Event listeners
    document.getElementById('week1-button').addEventListener('click', function () {
        // Hide all tab buttons once clicked
        document.querySelectorAll('#tabs button').forEach(button => button.style.display = 'none');

        // Show the audio player and quiz content
        weekContent.innerHTML = `<h2>Week 1: Bird Calls</h2><p>Listen to the bird calls and answer the quiz!</p>`;

        // Show the audio player and start the quiz
        audioPlayer.style.display = 'block';
        startQuiz(birdsWeek1); // Start the quiz with Week 1 birds
    });

    document.getElementById('week2-button').addEventListener('click', function () {
        // Hide all tab buttons once clicked
        document.querySelectorAll('#tabs button').forEach(button => button.style.display = 'none');

        // Show the audio player and quiz content
        weekContent.innerHTML = `<h2>Week 2: Bird Calls</h2><p>Listen to the bird calls and answer the quiz!</p>`;

        // Show the audio player and start the quiz
        audioPlayer.style.display = 'block';
        startQuiz(birdsWeek2); // Start the quiz with Week 2 birds
    });
    
    document.getElementById('week3-button').addEventListener('click', function () {
        // Hide all tab buttons once clicked
        document.querySelectorAll('#tabs button').forEach(button => button.style.display = 'none');

        // Show the audio player and quiz content
        weekContent.innerHTML = `<h2>Week 3: Bird Calls</h2><p>Listen to the bird calls and answer the quiz!</p>`;

        // Show the audio player and start the quiz
        audioPlayer.style.display = 'block';
        startQuiz(birdsWeek3); // Start the quiz with Week 3 birds
    });


    document.getElementById('test-button').addEventListener('click', function () {
        // Hide all tab buttons once clicked
        document.querySelectorAll('#tabs button').forEach(button => button.style.display = 'none');

        // Show the audio player and quiz content
        weekContent.innerHTML = `<h2>Comprehensive Test</h2><p>Listen to the bird calls from all weeks and answer the quiz!</p>`;

        // Combine birds from all weeks for the test
        const allBirds = [...birdsWeek1, ...birdsWeek2];

        // Show the audio player and start the quiz
        audioPlayer.style.display = 'block';
        startQuiz(allBirds); // Start the quiz with all birds
    });

    submitAnswerButton.addEventListener('click', checkAnswer);

    // "Enter" key press event listener for submitting the answer
    answerInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let secretCode = generateSecretCode();
    let attempts = 0;
    const guessForm = document.getElementById("guess-form");
    const guessInput = document.getElementById("guess-input");
    const feedbackDiv = document.getElementById("feedback");
    const restartBtn = document.getElementById("restart-btn");
    
    function generateSecretCode() {
        let numbers = [1, 2, 3, 4, 5, 6];
        let secret = [];
        while (secret.length < 4) {
            let index = Math.floor(Math.random() * numbers.length);
            secret.push(numbers.splice(index, 1)[0]);
        }
        console.log(secret);
        return secret;
    }

    function scoreGuess(secret, guess) {
        let black = 0, white = 0;
        let secretCopy = [...secret];
        let guessCopy = [...guess];

        for (let i = 0; i < 4; i++) {
            if (guess[i] === secret[i]) {
                black++;
                secretCopy[i] = guessCopy[i] = null; 
            }
        }

        for (let i = 0; i < 4; i++) {
            if (guessCopy[i] !== null && secretCopy.includes(guessCopy[i])) {
                white++;
                secretCopy[secretCopy.indexOf(guessCopy[i])] = null; 
            }
        }

        return { black, white };
    }

    guessForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let guessStr = guessInput.value.trim();
        let guess = guessStr.split("").map(Number);

    
        if (guess.length !== 4 || new Set(guess).size !== 4 || guess.some(num => num < 1 || num > 6)) {
            feedbackDiv.innerHTML = `<span style="color: red;">Invalid input! Enter four unique numbers between 1-6.</span>`;
            return;
        }

        attempts++;

        let { black, white } = scoreGuess(secretCode, guess);
        feedbackDiv.innerHTML += `<p>Guess ${attempts}: <strong>${guess.join(" ")}</strong> → 🖤 ${black} | ⚪ ${white}</p>`;

      
        if (black === 4) {
            feedbackDiv.innerHTML += `<p style="color: yellow;">🎉 Congratulations! You cracked the code in ${attempts} attempts! 🎉</p>`;
            guessForm.style.display = "none";
            restartBtn.style.display = "block";
            alert("🎉 Congratulations! You cracked the code in " + attempts +" attempts! 🎉")
        }

        guessInput.value = "";
    });

    restartBtn.addEventListener("click", function () {
        secretCode = generateSecretCode();
        attempts = 0;
        feedbackDiv.innerHTML = "";
        guessForm.style.display = "block";
        restartBtn.style.display = "none";
    });
});

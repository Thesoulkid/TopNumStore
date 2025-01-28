let interval; // To store the interval
let countdownInterval; // For the timer
let lastPeriod = null; // To store the last period number
const historyList = document.getElementById("history-list");

// Start Button Functionality
document.getElementById("start-btn").addEventListener("click", () => {
    const periodInput = document.getElementById("last-period");
    const predictionElement = document.getElementById("prediction");
    const timerElement = document.getElementById("timer");

    // Get the last period number
    lastPeriod = parseInt(periodInput.value);
    if (isNaN(lastPeriod) || lastPeriod < 0) {
        alert("Please enter a valid last period number!");
        return;
    }

    // Reset history and start the timer
    historyList.innerHTML = ""; // Clear history
    startCountdown(timerElement, 30); // Start the timer countdown

    // Start prediction calculation every 30 seconds
    clearInterval(interval);
    interval = setInterval(() => {
        const result = calculatePrediction(lastPeriod);
        predictionElement.textContent = result.prediction;
        lastPeriod = result.nextPeriod; // Update the last period

        // Add prediction to history
        updateHistory(result.prediction, lastPeriod);

        // Restart timer
        startCountdown(timerElement, 30);
    }, 30000);

    // Show the first prediction immediately
    const result = calculatePrediction(lastPeriod);
    predictionElement.textContent = result.prediction;
    lastPeriod = result.nextPeriod;
    updateHistory(result.prediction, lastPeriod);
});

// Stop Button Functionality
document.getElementById("stop-btn").addEventListener("click", () => {
    clearInterval(interval);
    clearInterval(countdownInterval);
    document.getElementById("prediction").textContent = "Stopped";
    document.getElementById("timer").textContent = "--";
});

// Submit Button Functionality
document.getElementById("submit-btn").addEventListener("click", () => {
    alert("Prediction submitted successfully!");
});

// Timer Countdown
function startCountdown(timerElement, seconds) {
    clearInterval(countdownInterval);
    timerElement.textContent = seconds;
    countdownInterval = setInterval(() => {
        seconds -= 1;
        timerElement.textContent = seconds;
        if (seconds <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

// Prediction Calculation Logic
function calculatePrediction(lastPeriodNumber) {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    // Math based on given logic
    const lastDigitTime = minutes % 10; // Take the last digit of the current time
    const sum1 = lastDigitTime + lastPeriodNumber; // Last digit of time + period number
    const sum2 = hours + lastDigitTime; // Hours + last digit of time

    // Final Result
    const difference = Math.abs(sum1 - sum2) % 10; // Absolute difference and take last digit
    const prediction = difference >= 5 ? "BIG" : "SMALL";

    return {
        prediction: prediction,
        nextPeriod: lastPeriodNumber + 1 // Increment period number
    };
}

// Update History
function updateHistory(prediction, period) {
    const historyItems = historyList.querySelectorAll("li");
    if (historyItems.length >= 5) {
        historyItems[0].remove(); // Remove the oldest item if there are 5 already
    }
    const listItem = document.createElement("li");
    listItem.textContent = `Period ${period}: ${prediction}`;
    historyList.appendChild(listItem);
}
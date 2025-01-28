let interval; // To store the interval
let timerInterval; // To store the timer interval
let lastPeriod = null; // To store the last period number
let countdown = 30; // Initial countdown value
const history = []; // To store the last 5 predictions

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

    // Reset the countdown timer
    resetCountdown();

    // Start prediction calculation every 30 seconds
    clearInterval(interval);
    clearInterval(timerInterval);

    interval = setInterval(() => {
        const result = calculatePrediction(lastPeriod);
        updateHistory(result.prediction, lastPeriod);
        predictionElement.textContent = result.prediction;
        lastPeriod = result.nextPeriod; // Update the last period
        resetCountdown(); // Restart the countdown
    }, 30000);

    timerInterval = setInterval(() => {
        countdown--;
        timerElement.textContent = countdown;
        if (countdown <= 0) countdown = 30; // Reset countdown when it reaches 0
    }, 1000);

    // Show the first prediction immediately
    const result = calculatePrediction(lastPeriod);
    updateHistory(result.prediction, lastPeriod);
    predictionElement.textContent = result.prediction;
    lastPeriod = result.nextPeriod;
});

// Stop Button Functionality
document.getElementById("stop-btn").addEventListener("click", () => {
    clearInterval(interval);
    clearInterval(timerInterval);
    document.getElementById("prediction").textContent = "Stopped";
    document.getElementById("timer").textContent = "30";
});

// Submit Button Functionality
document.getElementById("submit-btn").addEventListener("click", () => {
    alert("Prediction submitted successfully!");
});

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

// Update History Box
function updateHistory(prediction, periodNumber) {
    const historyList = document.getElementById("history-list");

    // Add the new prediction to the history array
    history.unshift(`Period ${periodNumber}: ${prediction}`);

    // Limit to the last 5 predictions
    if (history.length > 5) history.pop();

    // Clear and update the history list
    historyList.innerHTML = "";
    history.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });
}

// Reset Countdown Timer
function resetCountdown() {
    countdown = 30;
    document.getElementById("timer").textContent = countdown;
}
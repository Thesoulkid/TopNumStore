let interval; // To store the interval
let lastPeriod = null; // To store the last period number

// Start Button Functionality
document.getElementById("start-btn").addEventListener("click", () => {
    const periodInput = document.getElementById("last-period");
    const predictionElement = document.getElementById("prediction");

    // Get the last period number
    lastPeriod = parseInt(periodInput.value);
    if (isNaN(lastPeriod) || lastPeriod < 0) {
        alert("Please enter a valid last period number!");
        return;
    }

    // Start prediction calculation every 30 seconds
    clearInterval(interval);
    interval = setInterval(() => {
        const result = calculatePrediction(lastPeriod);
        predictionElement.textContent = result.prediction;
        lastPeriod = result.nextPeriod; // Update the last period
    }, 30000);

    // Show the first prediction immediately
    const result = calculatePrediction(lastPeriod);
    predictionElement.textContent = result.prediction;
    lastPeriod = result.nextPeriod;
});

// Stop Button Functionality
document.getElementById("stop-btn").addEventListener("click", () => {
    clearInterval(interval);
    document.getElementById("prediction").textContent = "Stopped";
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
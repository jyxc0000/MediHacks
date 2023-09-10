document.addEventListener("DOMContentLoaded", () => {
    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");
    const recordButton = document.getElementById("record-button");
    const predictionElement = document.getElementById("prediction");
    const periodList = document.getElementById("period-list");

    const periods = [];

    recordButton.addEventListener("click", () => {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;

        if (startDate && endDate) {
            periods.push({ start: startDate, end: endDate });
            updatePeriodList();
            predictNextPeriod();
            startDateInput.value = "";
            endDateInput.value = "";
        }
    });

    function updatePeriodList() {
        periodList.innerHTML = "";
        periods.forEach((period, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `Period ${index + 1}: ${period.start} to ${period.end}`;
            periodList.appendChild(listItem);
        });
    }

    function predictNextPeriod() {
        if (periods.length >= 2) {
            const lastPeriod = new Date(periods[periods.length - 1].end);
            const previousPeriod = new Date(periods[periods.length - 2].end);
            const cycleLength = (lastPeriod - previousPeriod) / (1000 * 60 * 60 * 24);
            const nextPeriod = new Date(lastPeriod.getTime() + cycleLength * (1000 * 60 * 60 * 24));
            predictionElement.textContent = `Your next period is predicted to start on ${nextPeriod.toISOString().slice(0, 10)}`;
        } else {
            predictionElement.textContent = "Not enough data to predict the next period.";
        }
    }
});

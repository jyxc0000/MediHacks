document.addEventListener("DOMContentLoaded", function() {
    let sleepGoalHours = 0;
    let sleepGoalMinutes = 0;
    let sleepLog = [];
    let reminder = "No reminders";
    let weekCount = 0;

    const sleepGoalHoursInput = document.getElementById("sleepGoalHours");
    const sleepGoalMinutesInput = document.getElementById("sleepGoalMinutes");
    const setGoalButton = document.getElementById("setGoal");
    const hoursInput = document.getElementById("hours");
    const minutesInput = document.getElementById("minutes");
    const logSleepButton = document.getElementById("logSleep");
    const averageSleepDisplay = document.getElementById("average-sleep");
    const reminderDisplay = document.getElementById("reminder");

    setGoalButton.addEventListener("click", function() {
        sleepGoalHours = parseInt(sleepGoalHoursInput.value);
        sleepGoalMinutes = parseInt(sleepGoalMinutesInput.value);
        alert(`Your sleep goal has been set to ${sleepGoalHours} hours and ${sleepGoalMinutes} minutes.`);
    });

    logSleepButton.addEventListener("click", function() {
        const hours = parseInt(hoursInput.value);
        const minutes = parseInt(minutesInput.value);
        const totalMinutes = hours * 60 + minutes;

        sleepLog.push(totalMinutes);

        if (++weekCount >= 7) {
            weekCount = 0;
            sleepLog = [];
        }

        const thisWeekSleep = sleepLog.slice(-7);

        const averageSleep = calculateAverage(thisWeekSleep);
        averageSleepDisplay.textContent = `Average sleep this week: ${formatMinutes(averageSleep)}`;

        if (thisWeekSleep.length >= 3 && averageSleep < (sleepGoalHours * 60 + sleepGoalMinutes)) {
            reminder = "You're not meeting your sleep goal. Try to get more rest.";
        } else {
            reminder = "No reminders";
        }

        reminderDisplay.textContent = reminder;

        // Clear input fields
        hoursInput.value = "";
        minutesInput.value = "";
    });

    function calculateAverage(arr) {
        if (arr.length === 0) {
            return 0;
        }
        const totalMinutes = arr.reduce((a, b) => a + b, 0);
        return totalMinutes / arr.length;
    }

    function formatMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }
});

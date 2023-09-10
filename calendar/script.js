function calculateOvulation() {
    const cycleLength = parseInt(document.getElementById("cycleLength").value);
    const lutealPhase = parseInt(document.getElementById("lutealPhase").value);
    const selectedMonth = document.getElementById("month").value;

    const ovulationDates = [];
    const startDate = new Date(selectedMonth + "-01");

    for (let day = 0; day < cycleLength; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + day);

        if (day >= cycleLength - lutealPhase) {
            ovulationDates.push(currentDate.toDateString());
        }
    }

    const ovulationDatesDiv = document.getElementById("ovulationDates");
    ovulationDatesDiv.innerHTML = "<h2>Ovulation Dates:</h2>" + ovulationDates.join("<br>");
}

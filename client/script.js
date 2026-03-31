async function loadReport() {
    try {
        const res = await fetch("http://localhost:3000/incidents");
        const data = await res.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        displayReport(data);

    } catch (error) {
        console.error(error);
        alert("Error loading report");
    }
}

function displayReport(data) {
    const reportDiv = document.getElementById("report");

    reportDiv.innerHTML = `
        <div class="card">
            <h3>🔴 High</h3>
            <p>${data.High}</p>
        </div>
        <div class="card">
            <h3>🟡 Medium</h3>
            <p>${data.Medium}</p>
        </div>
        <div class="card">
            <h3>🟢 Low</h3>
            <p>${data.Low}</p>
        </div>
    `;
}
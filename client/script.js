let chart;

async function loadReport() {
    try {
        const res = await fetch("http://localhost:3000/incidents");
        const text = await res.text();

        let data;

        try {
            data = JSON.parse(text);
        } catch (e) {
            alert("Invalid JSON from server");
            return;
        }

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
            <h3>🔥 Critical</h3>
            <p>${data.Critical}</p>
        </div>
        <div class="card">
            <h3>🔴 High</h3>
            <p>${data.High}</p>
        </div>
        <div class="card">
            <h3>🟠 Moderate</h3>
            <p>${data.Moderate}</p>
        </div>
        <div class="card">
            <h3>🟢 Low</h3>
            <p>${data.Low}</p>
        </div>
        <div class="card">
            <h3>🔵 Planning</h3>
            <p>${data.Planning}</p>
        </div>
    `;

    const ctx = document.getElementById("incidentChart").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Critical", "High", "Moderate", "Low", "Planning"],
            datasets: [{
                data: [
                    data.Critical,
                    data.High,
                    data.Moderate,
                    data.Low,
                    data.Planning
                ],
                backgroundColor: [
                    "#8B0000",  // Critical (dark red)
                    "#ff4d4d",  // High
                    "#ff9800",  // Moderate
                    "#28a745",  // Low
                    "#007bff"   // Planning
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}
// function displayReport(data) {
//     const reportDiv = document.getElementById("report");

//     reportDiv.innerHTML = `
//         <div class="card">
//             <h3>🔴 High</h3>
//             <p>${data.High}</p>
//         </div>
//         <div class="card">
//             <h3>🟡 Medium</h3>
//             <p>${data.Medium}</p>
//         </div>
//         <div class="card">
//             <h3>🟢 Low</h3>
//             <p>${data.Low}</p>
//         </div>
//     `;
// }


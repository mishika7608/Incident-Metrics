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

    reportDiv.innerHTML = "";

    const labels = [];
    const values = [];
    const colors = [];

    const colorPalette = [
        "#ff4d4d",
        "#ffc107",
        "#28a745",
        "#007bff",
        "#9c27b0",
        "#ff9800",
        "#00bcd4"
    ];

    let index = 0;

    for (let priority in data) {
        const value = data[priority];

        // 👉 Create Card
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>Priority ${priority}</h3>
            <p>${value}</p>
        `;

        reportDiv.appendChild(card);

        // 👉 Prepare chart data
        labels.push(`P${priority}`);
        values.push(value);
        colors.push(colorPalette[index % colorPalette.length]);

        index++;
    }

    const ctx = document.getElementById("incidentChart").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors
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


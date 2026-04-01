let chart;

async function loadReport() {
    try {
        const field = document.getElementById("fieldSelect").value;

        const res = await fetch(`http://localhost:3000/report?field=${field}`);
        const text = await res.text();

        let data;

        try {
            data = JSON.parse(text);
        } catch (e) {
            alert("Invalid JSON");
            return;
        }

        if (data.error) {
            alert(data.error);
            return;
        }

        displayReport(data, field);

    } catch (error) {
        console.error(error);
        alert("Error loading report");
    }
}

function displayReport(data, field) {
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

    for (let key in data) {
        const value = data[key];

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${key}</h3>
            <p>${value}</p>
        `;

        reportDiv.appendChild(card);

        labels.push(key);
        values.push(value);
        colors.push(colorPalette[index % colorPalette.length]);

        index++;
    }

    const ctx = document.getElementById("incidentChart").getContext("2d");

    if (chart) chart.destroy();

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


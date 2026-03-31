
// async function loadReport() {
//     try {
//         const res = await fetch("http://localhost:3000/incidents");

//         // Read raw response first
//         const text = await res.text();
//         console.log("RAW RESPONSE:", text);

//         let data;

//         // Try converting to JSON safely
//         try {
//             data = JSON.parse(text);
//         } catch {
//             alert("Server did not return valid JSON");
//             return;
//         }

//         if (data.error) {
//             alert(data.error);
//             return;
//         }

//         displayReport(data);

//     } catch (error) {
//         console.error("FRONTEND ERROR:", error);
//         alert("Error loading report");
//     }
// }

async function loadReport() {
    try {
        console.log("Button clicked ✅");

        const res = await fetch("http://localhost:3000/incidents");
        console.log("Response object:", res);

        const text = await res.text();
        console.log("RAW RESPONSE:", text);

        let data;

        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error("JSON parse failed:", e);
            alert("Not valid JSON from server");
            return;
        }

        console.log("Parsed data:", data);

        if (data.error) {
            alert(data.error);
            return;
        }

        displayReport(data);

    } catch (error) {
        console.error("FRONTEND ERROR:", error);
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


// async function loadReport() {
//     try {
//         const res = await fetch("http://localhost:3000/incidents");
//         const data = await res.json();

//         if (data.error) {
//             alert(data.error);
//             return;
//         }

//         displayReport(data);

//     } catch (error) {
//         console.error(error);
//         alert("Error loading report");
//     }
// }

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
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

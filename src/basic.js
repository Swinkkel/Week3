

if(document.readyState !== "loading") {
    console.log("Document is ready!");
    getData();
} else {
    document.addEventListener("DOMContentLoaded", function() {
        console.log("Document is ready after waiting!");
        getData();
    })
}

async function getData() {
    const url = "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
    const municipalityPromise = await fetch(url);
    const municipalityJson = await municipalityPromise.json();

    const labels = Object.values(municipalityJson.dataset.dimension.Alue.category.label);
    const values = Object.values(municipalityJson.dataset.value);

    const employmentDataUrl = "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";

    const employmentPromise = await fetch(employmentDataUrl);
    const employmentJson = await employmentPromise.json();

    const employments = Object.values(employmentJson.dataset.value);

    const tbody = document.getElementById("table_data");

    labels.forEach((label, index) => {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");

        td1.innerText = label;
        td2.innerText = values[index];
        td3.innerText = employments[index];

        const num = (100 * employments[index] / values[index]).toFixed(2);

        td4.innerText = num;
        if (num < 25) {
            tr.className = "under25";
        }
        else if (num > 45) {
            tr.className = "over45";
        }

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tbody.appendChild(tr);
    })
}
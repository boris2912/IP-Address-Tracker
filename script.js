let input = document.getElementById("ipInput");
let url = "https://geo.ipify.org/api/v2/country,city?apiKey=at_3qb8HTKs5vsRfoVlm74lYGMuKrsyI&"
let data;
let search = document.getElementById("searchInput");
let ipAddress = document.getElementById("ipAdress");
let locationDisplay = document.getElementById("location");
let timeDisplay = document.getElementById("timezone");
let ispDisplay = document.getElementById("isp");
let map;
let marker;

function initializeMap(lat, lng) {
    if (!map) {
        map = L.map('map').setView([lat, lng], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);
    } else {
        map.setView([lat, lng], 13);
    }
}

function fetchData() {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            data = json;
            const ip = data.ip;
            const isp = data.isp;
            const { city, country, postalCode, timezone, lat, lng } = data.location;

            initializeMap(lat, lng);

            if (map) {
                if (marker) {
                    marker.remove();
                }
                marker = L.marker([lat, lng]).addTo(map);
            }

            ipAddress.textContent = ip;
            locationDisplay.textContent = `${city},${country}${postalCode}`;
            timeDisplay.textContent = `UTC${timezone}`;
            ispDisplay.textContent = `${isp}`;
        })
    url = "https://geo.ipify.org/api/v2/country,city?apiKey=at_3qb8HTKs5vsRfoVlm74lYGMuKrsyI&"
}

fetchData();

search.addEventListener("click", () => {
    let check = parseInt(input.value[0]);
    if (check == NaN) {
        url += "ipAdress=" + input.value;
    } else {
        url += "domain=" + input.value;
    }
    fetchData();
})

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        let check = parseInt(input.value[0]);
        if (check == NaN) {
            url += "ipAdress=" + input.value;
            console.log(url)
        } else {
            url += "domain=" + input.value;
            console.log(url);
        }
        fetchData();
    }
}

input.addEventListener("keydown", handleKeyPress);
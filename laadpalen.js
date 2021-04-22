let coorArr = [];
let adrArr = [];

async function getData() {
    const api_url = "https://opendata.brussels.be/api/records/1.0/search/?dataset=laadpalen-voor-elektrische-wagens&q=&rows=10000";
    const response = await fetch(api_url);
    const data = await response.json();
    for (let i = 0; i < data.records.length; i++) {
        var getLat = parseFloat(data.records[i].geometry.coordinates[1]);
        var getLon = parseFloat(data.records[i].geometry.coordinates[0]);
        var coor = { lat: getLat, lng: getLon };
        var adres = data.records[i].fields.straat + "," + data.records[i].fields.nr + "," + data.records[i].fields.code_postal + "," + data.records[i].fields.gemeente;
        coorArr.push(coor);
        adrArr.push(adres);
    }
}
async function initMap() {
    await getData();
    const centerCoor = { lat: 50.85433215906964, lng: 4.38 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: centerCoor,
    });
    for (let i = 0; i < coorArr.length; i++) {
        let marker = new google.maps.Marker({
            position: coorArr[i],
            map,
            title: adrArr[i],
        });
        let infowindow = new google.maps.InfoWindow({
            content: "Laadpaal adres: " + marker.title,
        });
        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });
    }
}








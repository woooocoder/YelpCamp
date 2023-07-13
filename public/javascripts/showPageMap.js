mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10, // starting zoom
    
})

const nav = new mapboxgl.NavigationControl({
    visualizePitch: true
})

map.addControl(nav, 'bottom-right')

// map.on('click', function(e) {
//     var latitude = e.latlng.lat;
//     var longitude = e.latlng.lng;
//     console.log(latitude + " - " + longitude)
// });

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
            .setHTML(
                `<h3>${campground.title}</h3>
                 <p>${campground.location}</p>
                `
            )
    )
    .addTo(map)

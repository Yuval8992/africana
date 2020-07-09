/* eslint-disable */

const addPointToMap = (map, bounds, loc, color) => {
    // Create marker
    const el = document.createElement('div');
    el.className = `marker marker-${color}`;

    // Add marker
    new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
    })
        .setLngLat(loc.coordinates)
        .addTo(map);

    // Add popup
    new mapboxgl.Popup({
        offset: 30
    })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
};

export const displayMap = (startLocation, locations) => {
    mapboxgl.accessToken =
        'pk.eyJ1IjoieXV2YWwtc2hsb21vIiwiYSI6ImNrYzBrb3dsMzFrdGEyd214azQxNDU5ZHMifQ.2xUoYrGPv6At95HdJ2RI0w';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/yuval-shlomo/ckcc3vftb01pp1is24plpkw1s',

        scrollZoom: true
        // center: [-118.113491, 34.111745],
        // zoom: 10,
        // interactive: false
    });
    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach((loc) => addPointToMap(map, bounds, loc, 'green'));
    addPointToMap(map, bounds, startLocation, 'blue');

    map.fitBounds(bounds, {
        padding: {
            top: 190,
            bottom: 100,
            left: 100,
            right: 100
        }
    });
};

mapboxgl.accessToken = 'pk.eyJ1IjoiczM1NzU1NiIsImEiOiJja201NTJvdnEwYjZuMm90cHNvOXllaG43In0.oPyg05LFrXhKR5Zmd_LJzQ';

parseConfig();

var map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v11', // style URL
	center: [10.743942, 59.918721], // starting position
	zoom: 12, // starting zoom
	antialias: false
});

map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
map.addControl(new MapControlLayers(), 'top-right');
map.addControl(new MapControlSettings(), 'top-right');

var geocoder = new MapboxGeocoder({ // Initialize the geocoder
	accessToken: mapboxgl.accessToken, // Set the access token
	mapboxgl: mapboxgl, // Set the mapbox-gl instance
	marker: false, // Do not use the default marker style
	placeholder: 'Search', // Placeholder text for the search bar
	bbox: [10.343942, 59.118721, 11.343942, 60.918721], // Boundary for Berkeley
	proximity: {
		longitude: 10.7439428,
		latitude: 59.918721
	}
});

// Add the geocoder to the map
map.addControl(geocoder, 'top-left');

var dataSourceOptions = {
	'index': defaults.dataSourceIndex,
	'type': 'source',
	'timelineIndex': defaults.timelineIndex
};

initializeHeatmap(dataSourceOptions, dataSources[defaults.dataSourceIndex].colorScheme, -2, 2);

map.once('load', function() {
	initializeOverlays();
});

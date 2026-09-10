# Overview map data

`app/south-america-outline.json` contains SVG paths derived from Natural Earth's 1:110m country data:
https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson

Selected records: `CONTINENT = South America`. Rings outside longitude -85 to -30 and latitude -57 to 14 are excluded. Coordinates use a simple equirectangular locator projection: `x = (longitude + 85) * 4`, `y = (14 - latitude) * 4`. This is a generalized continental locator, not a navigation map. Natural Earth uses public-domain cartographic data and de facto country boundaries.

The route initially joins local itinerary waypoints, then uses the main map's existing driving geometry when available. The overview makes no additional Mapbox requests. It opens on mount and collapses after seven seconds unless the user interacts with it. Reopening is manual and remains open until closed.

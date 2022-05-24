var yourVlSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 500,
    "height": 300,
    "data": {
      "url": "world.geojson",
      "format": {"property": "features"}
    },
    "transform": [
      {
        "lookup": "ISO3CD",
        "from": {
          "data": {"url": "edu_data.csv"},
          "key": "ISO3",
          "fields": ["latest_value"]
        }
      }
    ],
    "mark": "geoshape",
    "encoding": {"color": {"field": "latest_value", "type": "quantitative"}}
  };
  vegaEmbed('#vis', yourVlSpec);
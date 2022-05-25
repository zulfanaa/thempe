var yourVlSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 500,
    "height": 300,
    "data": {
      "url": "un_world.geojson",
      "format": {"property": "features"}
    },
    "transform": [
      {
        "lookup": "properties.SOV_A3",
        "from": {
          "data": {"url": "4a1_se_inf_dsbl.csv"},
          "key": "ISO3",
          "fields": ["latest_value"]
        }
      }
    ],
    "mark": "geoshape",
    "encoding": {"color": {"field": "latest_value", "type": "quantitative"}}
  };
  vegaEmbed('#vis', yourVlSpec);
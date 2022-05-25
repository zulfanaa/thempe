var yourVlSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 500,
    "height": 300,
    "data": {
      "url": "world_try.json",
      "format": {"property": "features"}
    },
    "transform": [
      {
        "lookup": "properties.sov_a3",
        "from": {
          "data": {"url": "spi.csv"},
          "key": "ISO3",
          "fields": ["latest_value"]
        }
      }
    ],
    "mark": "geoshape",
    "encoding": {"color": {"field": "latest_value", "type": "quantitative"}}
  };
  vegaEmbed('#vis', yourVlSpec);
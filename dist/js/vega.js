var yourVlSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 500,
    "height": 300,
    "data": {
      "url": "assets/data/un_world.geojson",
      "format": {"property": "features"}
    },
    "transform": [
      {
        "lookup": "properties.SOV_A3",
        "from": {
          "data": {"url": "assets/data/441_se_adt_acts_lv.csv"},
          "key": "ISO3",
          "fields": ["latest_value"]
        }
      }
    ],
    "mark": "geoshape",
    "encoding": {
      "color": {
        "condition": {
          "test": "datum['latest_value'] === null",
          "value": "#aaa"
        },
        "field": "latest_value", "type": "quantitative"
      },
      "tooltip": {"condition": {
        "test": "datum['latest_value'] === null",
        "value": "No Data"
      },
      "field": "latest_value", "type": "quantitative"}
    },
    "config": {
      "mark": {"invalid": null}
    },
  };
  vegaEmbed('#vis', yourVlSpec);
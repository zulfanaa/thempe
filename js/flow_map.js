var options = {
    "Export - Qualitative": {"filename": "assets/data/export.csv",
    "description": "Export (Dummy) Data"},
    "Immigration -Quantitative": {"filename": "assets/data/imigration.csv",
    "description": "Imigration (Dummy) Data"},    
};

var color = {
    "color hue" : {"field": "data", "type": "nominal"},
    "color value" : {"field": "data", "type": "quantitative", "scale": {"scheme": "reds"}},
}

var yourVlSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 800,
    "height": 640,
    "config": {
      "legend": {
        "orient": "top-left",
        "labelColor": "black",
      }
    },
    "layer" : [
      {
        "mark": {"type": "geoshape", "fill": "lightgray", "stroke": "white"},
        "data": {
          "url": "assets/data/un_world.geojson",
          "format": {"property": "features"}
        }
      },
      {
        "mark": {"type": "rule", "color": "#000", "opacity": 0.80, 
      },
        "projection": {"type": "equalEarth"},
        "transform": [
          {
            "lookup": "origin",
            "from": {
              "data": {"url": "assets/data/country.csv"},
              "key": "NAME_EN",
              "fields": ["latitude", "longitude"]
            }
          },
          {
            "lookup": "destination",
            "from": {
              "data": {"url": "assets/data/country.csv"},
              "key": "NAME_EN",
              "fields": ["latitude", "longitude"]
            },
            "as": ["lat2", "lon2"]
          }
        ],
        "encoding": {
          "latitude": {"field": "latitude"},
          "longitude": {"field": "longitude"},
          "latitude2": {"field": "lat2"},
          "longitude2": {"field": "lon2"},
          "size" : {"value": 10},
          "color": {"field": "data", "type": "nominal"},
          "tooltip": [
            {"field": "data"},
            {"field": "origin", "type": "nominal"},
            {"field": "destination", "type": "nominal"}
          ]
        }
      },
    ]
  };
  vegaEmbed('#vis', yourVlSpec);

  var data_dropdown = document.getElementById("selectData");
// https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript
for (const [key, value] of Object.entries(options)) {
    var el = document.createElement("option");
    el.textContent = key;
    el.value = key;
    data_dropdown.appendChild(el);
}

var color_dropdown = document.getElementById("selectColor");
for (const [key, value] of Object.entries(color)) {
    var el = document.createElement("option");
    el.textContent = key;
    el.value = key;
    color_dropdown.appendChild(el);
}

function selectData(attribute) {
    filename = options[attribute].filename;
    description = options[attribute].description;
    document.getElementById("dataDescription").textContent = description;
    data = {"url": filename};
    yourVlSpec.layer[1]["data"] = data;
    vegaEmbed('#vis', yourVlSpec);
}

function selectColor(colschemes) {
    cs = color[colschemes];
    yourVlSpec.layer[1].encoding.color = cs;
    vegaEmbed('#vis', yourVlSpec);
}
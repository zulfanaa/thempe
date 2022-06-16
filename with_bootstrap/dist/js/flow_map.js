var options = {
    "Export": {"filename": "assets/data/export.csv"},
    "Imigration": {"filename": "assets/data/imigration.csv"},    
};

var color = {
  "Browns": {"scheme" : "browns"},
  "Blues": {"scheme" : "blues"},
  "Red": {"scheme" : "reds"},
  "Green" : {"scheme" : "greens"},
  "Purple" : {"scheme" : "purples"}
}

var yourVlSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 1000,
    "height": 800,
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
        "mark": {"type": "rule", "color": "#000", "opacity": 0.35},
        "projection": {"type": "equalEarth"},
        "transform": [
          {
            "lookup": "origin",
            "from": {
              "data": {"url": "assets/data/country.csv"},
              "key": "SOV_A3",
              "fields": ["latitude", "longitude"]
            }
          },
          {
            "lookup": "destination",
            "from": {
              "data": {"url": "assets/data/country.csv"},
              "key": "SOV_A3",
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
          "size": {"value": 5}
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
    yourVlSpec.encoding.color.scale = cs;
    vegaEmbed('#vis', yourVlSpec);
}
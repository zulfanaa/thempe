var options = {
  "Schools with Internet": {"filename": "assets/data/4a1_se_acs_intnt_lv.csv", 
  "description": "Sustainable Development Goals: \r\n Indicator 4.a.1 Series Proportion of schools with access to the internet for pedagogical purposes, by education level in percentage"},

  "Schools with Infrastructure for Dissabilities": {"filename": "assets/data/4a1_se_inf_dsbl.csv", 
  "description": "Sustainable Development Goals: \r\n Indicator 4.a.1 Series Proportion of schools with access to adapted infrastructure and materials for students with disabilities, by education level"},

  "Total Flows of Scholarship": {"filename": "assets/data/4b1_dc_tof_schipsl_lv.csv", 
  "description": "Sustainable Development Goals: \r\n Indicator 4.b.1 Series Total official flows for scholarships, by recipient countries (millions of constant 2019 United States dollars)"},

  "Teacher with Minimum Required Qualifications": {"filename": "assets/data/4c1_se_tra_grdl_lv.csv", 
  "description": "Sustainable Development Goals: \r\n Indicator 4.c.1 Series Proportion of teachers with the minimum required qualifications, by education level and sex in percentage"},

  "Minimum Proficiency Level in Reading and Mathematics": {"filename": "assets/data/411_se_tot_prfl_lv.csv", 
  "description": "Sustainable Development Goals: \r\n Indicator 4.1.1 Series Proportion of children and young people achieving a minimum proficiency level in reading and mathematics in percentage"},

  "Participation rate in organized learning": {"filename": "assets/data/422_se_pre_partn_lv.csv", 
  "description": "Sustainable Development Goals: \r\n Indicator 4.2.2 Series Participation rate in organized learning (one year before the official primary entry age) by sex in percentage"},

  "Normal and non-formal education and training": {"filename": "assets/data/431_se_adt_eductrn_lv.csv", 
  "description": "Sustainable Development Goals: \r\n Indicator 4.3.1 Series Participation rate in formal and non-formal education and training by sex in percentage"},

  "Communications Technology Skills": {"filename": "assets/data/441_se_adt_acts_lv.csv", 
  "description": "Sustainable Development Goals: \r\n Indicator 4.4.1 Series Proportion of youth and adults with information and communications technology (ICT) skills by sex and type of skill in percentage"},

  "Parity Index": {"filename": "assets/data/451_se_tot_sespi.csv", 
  "description": "Sustainable Development Goals: \r\n Indicator 4.5.1 Series Parity indices (female/male, rural/urban, bottom/top wealth quintile and others such as disability status, indigenous peoples and conflict-affected, as data become available) for all education indicators on this list that can be disaggregated"}    
};

var scale = {
  "0-5": {"domain": [0, 5]},
  "0-10": {"domain": [0, 10]},
  "0-25": {"domain": [0, 25]},
  "0-50" : {"domain": [0, 50]},
  "0-100" : {"domain": [0, 100]}
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
      "data": {
        "url": "assets/data/un_world_latlon.geojson",
        "format": {"property": "features"}
      },
      "transform": [
        {
          "lookup": "properties.SOV_A3",
          "from": {
            "key": "ISO3",
            "fields": ["latest_value"]
          }
        }
      ],
      "projection": {"type": "equalEarth"},
      "mark": {"type": "circle"},
      "encoding" : {
        "longitude": {"field": "properties.longitude", "type": "quantitative"},
        "latitude": {"field": "properties.latitude", "type": "quantitative"},
        "size": {
          "field": "latest_value",
          "type": "quantitative",
          "scale": {"domain": [0, 100]}
        },
        },
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

var scale_dropdown = document.getElementById("selectScale");
for (const [key, value] of Object.entries(scale)) {
    var el = document.createElement("option");
    el.textContent = key;
    el.value = key;
    scale_dropdown.appendChild(el);
}

function selectData(attribute) {
    filename = options[attribute].filename;
    description = options[attribute].description;
    document.getElementById("dataDescription").textContent = description;
    data = {"url": filename};
    yourVlSpec.layer[1].transform[0].from["data"] = data;
    vegaEmbed('#vis', yourVlSpec);
}

function selectScale(symscale) {
    cs = scale[symscale];
    yourVlSpec.layer[1].encoding.size.scale = cs;
    vegaEmbed('#vis', yourVlSpec);
}
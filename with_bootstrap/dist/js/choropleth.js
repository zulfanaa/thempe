var options = {
    "4A1_SE_ACS_INTNT": {"filename": "assets/data/4a1_se_acs_intnt_lv.csv", 
    "description": "Sustainable Development Goals: \r\n Indicator 4.a.1 Series Proportion of schools with access to the internet for pedagogical purposes, by education level in percentage"},

    "4A1_SE_INF_DSBL": {"filename": "assets/data/4a1_se_inf_dsbl.csv", 
    "description": "Sustainable Development Goals: \r\n Indicator 4.a.1 Proportion of schools with access to adapted infrastructure and materials for students with disabilities, by education level"},

    "4B1_TOF_SCHIPSL": {"filename": "assets/data/4b1_dc_tof_schipsl_lv.csv", 
    "description": "Sustainable Development Goals: \r\n Indicator 4.b.1 Series Total official flows for scholarships, by recipient countries (millions of constant 2019 United States dollars)"},

    "4C1_SE_TRA_GRDL": {"filename": "assets/data/4c1_se_tra_grdl_lv.csv", 
    "description": "Sustainable Development Goals: \r\n Indicator 4.c.1 Series Proportion of teachers with the minimum required qualifications, by education level and sex in percentage"},

    "411_SE_TOT_PRFL": {"filename": "assets/data/411_se_tot_prfl_lv.csv", 
    "description": "Sustainable Development Goals: \r\n Indicator 4.1.1 Series Proportion of children and young people achieving a minimum proficiency level in reading and mathematics in percentage"},

    "422_SE_PRE_PARTN": {"filename": "assets/data/422_se_pre_partn_lv.csv", 
    "description": "Sustainable Development Goals: \r\n Indicator 4.2.2 Series Participation rate in organized learning (one year before the official primary entry age) by sex in percentage"},

    "431_SE_ADT_EDUCTRN": {"filename": "assets/data/431_se_adt_eductrn_lv.csv", 
    "description": "Sustainable Development Goals: \r\n Indicator 4.3.1 Series Participation rate in formal and non-formal education and training by sex in percentage"},

    "441_SE_ADT_ACTS": {"filename": "assets/data/441_se_adt_acts_lv.csv", 
    "description": "Sustainable Development Goals: \r\n Indicator 4.4.1 Series Proportion of youth and adults with information and communications technology (ICT) skills by sex and type of skill in percentage"},

    "451_SE_TOT_SESPI": {"filename": "assets/data/451_se_tot_sespi.csv", 
    "description": "Sustainable Development Goals: \r\n Indicator 4.5.1 Parity indices (female/male, rural/urban, bottom/top wealth quintile and others such as disability status, indigenous peoples and conflict-affected, as data become available) for all education indicators on this list that can be disaggregated"}    
};

var color = {
  "Browns": {"scheme" : "browns"},
  "Blues": {"scheme" : "blues"},
  "Red": {"scheme" : "reds"},
  "Green" : {"scheme" : "greens"},
  "Grey" : {"scheme" : "greys"}
}

var yourVlSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 1000,
    "height": 800,
    "data": {
      "url": "assets/data/un_world.geojson",
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
    "mark": "geoshape",
    "encoding": {
      "color": {
        "condition": {
          "test": "datum['latest_value'] === null",
          "value": "#aaa"
        },
        "field": "latest_value", "type": "quantitative",
        "scale": {"scheme": "tealblues"}
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
    yourVlSpec.transform[0].from["data"] = data;
    vegaEmbed('#vis', yourVlSpec);
}

function selectColor(colschemes) {
    cs = color[colschemes];
    yourVlSpec.encoding.color.scale = cs;
    vegaEmbed('#vis', yourVlSpec);
}
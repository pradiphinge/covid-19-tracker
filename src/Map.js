import React from "react";
import { MapContainer as LeafletMap, TileLayer,useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

import "./Map.css";
import { casesTypeColors } from "./utils";


const showDataOnMap = (data, casesType = 'cases') => {
  console.log('inside showDataOnMap', casesType);
  
  const color1 = casesTypeColors[casesType].rgb;
  const fillColor1 = casesTypeColors[casesType].half_op;
  
  const fillColorOptions = { fillColor: fillColor1 }
  const colorOptions = { color: color1 }
//{ color: color1 }
  
  
  return data.map((country, index) => (
    <Circle key={index}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={colorOptions}
      pathOptions={fillColorOptions}
      fillOpacity={0.8}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
}
function ChangeMap({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

function Map({ countries, casesType, center, zoom }) {

  return (
    <div className="map">
        <LeafletMap >
          <ChangeMap center={center} zoom={zoom} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />   
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
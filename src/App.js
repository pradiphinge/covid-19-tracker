import React,{useState,useEffect} from 'react'
import './App.css'

import InfoBox from './InfoBox';
import LineChart from './LineChart';
import "leaflet/dist/leaflet.css";


import Map from './Map';
import Table from './Table';
import { sortData,prettyPrintStat } from './utils';

const { FormControl, Select, MenuItem,Card,CardContent } = require("@material-ui/core");


let url = "https://disease.sh/v3/covid-19/countries"

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 20.80746, lng: 77.4796 });
  const [mapZoom, setMapZoom] = useState(2);  
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');
  // const [view, setView] = useState([34.80746, -40.4796], 3); 
  useEffect( () => {
    const fetchDefault = async () => {
      const data = await (await fetch('https://disease.sh/v3/covid-19/all')).json();
      setCountryInfo(data);
    }  
    fetchDefault();
  },[])


  useEffect(() => {
    const fetchCountries = async () => {
      const response = await (await fetch(url)).json();
      const sortedData = sortData(response);
      
      setTableData(sortedData);
      const countries = response.map(country => (
        {
          name: country.country,
          value: country.countryInfo.iso2,
        }
      ))
      
      
      setCountries(countries); 
      setMapCountries(response);
    }
    fetchCountries();
  }, [])

  

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const fetchUrl = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    
    const data = await (await fetch(fetchUrl)).json();
    setCountry(countryCode);
    setCountryInfo(data);
    
    // const lat = data.countryInfo.lat;
    // const lng = data.countryInfo.long;
    // console.log('lat long is ',lat, lng);
    if (countryCode === 'worldwide')
      setMapCenter([20.80746, 77.4796]);
    else {
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      // setView([data.countryInfo.lat, data.countryInfo.long],setMapZoom(3))
    }
    setMapZoom(3);

  }

  return (
    <div className="app">
      <div className="app__left">
          {/* Header */}
        <div className="app__header">
              {/* Title + select input (dropdown) */}
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown"> 
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {/* Country dropdown */}
              {
                countries.map((country,index)=>(
                  <MenuItem key = {index} value={country.value}>{country.name}</MenuItem>  
                )
                )
              }
            </Select>
          </FormControl> 
        </div>
        
        {/* infoboxes */}
        {/* infoboxes */}
        {/* infoboxes */}
        <div className="app__stats">
          <InfoBox isRed active ={casesType==='cases' } onClick={(e) =>setCasesType("cases")} title='Coronavirus Cases' cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />
          <InfoBox active ={casesType==='recovered' } onClick={(e) =>setCasesType("recovered")} title='Recovered' cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} />
          <InfoBox isRed active ={casesType==='deaths' } onClick={(e) =>setCasesType("deaths")} title='Deaths' cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} /> 
        </div>     
          {/* Map */}
        <Map countries={mapCountries} casesType={casesType} center={mapCenter} zoom={mapZoom}/>
      </div>
      <Card className="app__right">
        <CardContent>
        {/* Table */}
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
        {/* Graph */}
          <h3>Worldwide New {casesType}</h3>
          <LineChart casesType={casesType} />
        </CardContent>  
      </Card>
    
    </div>

  );
}

export default App;

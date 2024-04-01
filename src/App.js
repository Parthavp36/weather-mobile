import logo from './logo.svg';
import './assets/App.css';
import React, { useState, useEffect } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { RiCelsiusLine } from "react-icons/ri";
function App() {
  const [det, setDet] = useState(null);
  const [city,setcity]=useState('chennai');
  const [temp,settemp]=useState('');
  const [forecast,setforecast]=useState();
  const handleData = async () => {
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=b85049295997480382a43402242303&q=${city}`);
      const result = await response.json();
      const resp=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=b85049295997480382a43402242303&q=${city}&days=3`);
      const rlt=await resp.json();
      console.log(rlt.forecast.forecastday[0].day);
      setforecast(rlt);
      if (response.ok) {
        console.log("success");
        setDet(result);
      } else {
        console.log("fails");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    handleData();
  }, []);

  return (
    <main className='container'>
      <nav>
        <input type='text' placeholder='Search your city' onChange={(e)=>setcity(e.target.value)}/><IoSearch style={{height:30,width:30,marginTop:50,color:'white'}} onClick={()=>handleData()}/>
        <FaLocationDot style={{ height: 30, width: 30, marginTop: 50, color: 'white' }} /></nav>
      <section className='condition'>
        {det && det.current && det.current.condition && det.current.condition.icon && (
          <>
          <p style={{marginBottom:0,width:'100%',textAlign:'center'}}>{det.location.name}</p>
          {/* <img src={det.current.condition.icon} height={220} width={250} alt="Weather Icon" /> */}
          <p style={{fontSize:130,margin:0,marginLeft:30,width:'100%',textAlign:'center'}}>{parseInt(det.current.temp_c)}
            <sup><RiCelsiusLine style={{height:30,width:30}}/></sup>
          </p>
          <p>
            {det.current.condition.text}
          </p>
          </>
        )}
      </section>
      <section className='bottom'>
          <div>
            {forecast && forecast.current && forecast.current.condition && forecast.current.condition.icon &&
            <>
              <div style={{display:'flex',alignItems:'center',justifyContent:'start',width:'50%'}}>
                <img src={det.current.condition.icon} height={50} width={50} />
                <p>Today {det.current.condition.text}</p>
              </div>
              <span>{parseInt(forecast.forecast.forecastday[0].day.maxtemp_c)}<RiCelsiusLine style={{height:15,width:15}}/>  /  {parseInt(forecast.forecast.forecastday[0].day.mintemp_c)}<RiCelsiusLine style={{height:15,width:15}}/></span>
             
            </>
            }
          </div>
          <div>
            {forecast && forecast.current && forecast.current.condition && forecast.current.condition.icon &&
            <>
              <div style={{display:'flex',alignItems:'center',justifyContent:'start',width:'50%'}}>
                <img src={forecast.forecast.forecastday[1].day.condition.icon} height={50} width={50} />
                <p>Tomorrow {forecast.forecast.forecastday[1].day.condition.text}</p>
              </div>
              <span>{parseInt(forecast.forecast.forecastday[1].day.maxtemp_c)}<RiCelsiusLine style={{height:15,width:15}}/>  /  {parseInt(forecast.forecast.forecastday[1].day.mintemp_c)}<RiCelsiusLine style={{height:15,width:15}}/></span>
            </>
            }
          </div>
          <div>
            {forecast && forecast.current && forecast.current.condition && forecast.current.condition.icon &&
            <>
              <div style={{display:'flex',alignItems:'center',justifyContent:'start',width:'50%'}}>
                <img src={forecast.forecast.forecastday[2].day.condition.icon} height={50} width={50} />
                <p>Overmorrow {forecast.forecast.forecastday[2].day.condition.text}</p>
              </div>
              <span>{parseInt(forecast.forecast.forecastday[2].day.maxtemp_c)}<RiCelsiusLine style={{height:15,width:15}}/>  /  {parseInt(forecast.forecast.forecastday[2].day.mintemp_c)}<RiCelsiusLine style={{height:15,width:15}}/></span>
            </>
            }
          </div>
      </section>
    </main>
  );
}

export default App;

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [temp, setTemp] = useState("")
  const [condition, setCondition] = useState("")
  const [location, setLocation] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [input, setInput] = useState("")

  async function handleSubmit (e) {
    e.preventDefault;

    fetch(
      `https://api.weatherapi.com/v1/current.json?key=ace4d94a1a8c4a129b5160532230504&q=${input.toString()}`,
      { mode: "cors" }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setTemp(response.current.temp_f + "° F");
        setCondition(response.current.condition.text);
        setLocation(response.location.name + ", " + response.location.region)
        setImageURL(response.current.condition.icon);

      });


 
  }

  return (
    <>
    <div className="container">
      <div className="input-container">
        <form onSubmit={(e) => {e.preventDefault(); handleSubmit }}>
          <input type="" id="input" onChange={(e) => setInput(e.target.value)}/>
          <button id="submit" type="button" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
      <div className="data-container">
        <p id="location">{location}</p>
        <div className="condition-container">
          <img src={imageURL} id="condition-img" />
          <p id="weather">{condition}</p>
        </div>
        <p id="temp">{temp}</p>
      </div>
    </div>
    </>
  )
}

export default App

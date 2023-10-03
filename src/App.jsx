import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createApi } from 'unsplash-js'



const unsplashApi = createApi({
  accessKey: 'cEdDJvlZ-0D4e1Aq5ochvo3gbEeC3JJPnPIgaOvw8Qg'
})






function App() {
  const [temp, setTemp] = useState("")
  const [condition, setCondition] = useState("")
  const [location, setLocation] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [input, setInput] = useState("")
  const [bgImg, setBgImg] = useState("")
  const [textColor, setTextColor] = useState("")
  const [hasVisited, setHasVisited] = useState(false);

  async function handleSubmit (e) {
    e.preventDefault();

    fetch(
      `https://api.weatherapi.com/v1/current.json?key=ace4d94a1a8c4a129b5160532230504&q=${input.toString()}`,
      { mode: "cors" }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setTemp(response.current.temp_f + "° F");
        setCondition(response.current.condition.text);
        setLocation(response.location.name + ", " + response.location.region)
        setImageURL(response.current.condition.icon);
        

        unsplashApi.search.getPhotos({
          query: response.location.name,
          page: 1,
          perPage: 1,
        }).then((newResponse) => {
          const newBgImg = newResponse.response.results[0];
  
          // Bitshift operation to invert hexcode from API
        let hex = newBgImg.color.replace(/^#/, '');
         hex = parseInt(hex, 16);
          const invertHex = ~hex & 0xFFFFFF;
          setTextColor(`#${invertHex.toString(16)}`);
          setHasVisited(true);

        // Update bgImg state
        setBgImg(newBgImg);
        })

 


      });
      

   
  }

    if (hasVisited) return (
      <>
      <div className="container" style={{ backgroundImage: `url(${bgImg?.urls?.raw})`, color: textColor, textShadow: `2px 3px 2px black`} }>
        <h2>Whats the weather like today?</h2>
        <div className="input-container">
          <form onSubmit={(e) => {e.preventDefault(); handleSubmit }}>
            <input placeholder="Location" type="" id="input" onChange={(e) => setInput(e.target.value)}/>
            <button id="submit" type="button" onClick={handleSubmit}>Submit</button>
          </form>
        </div>
  
        <div className="data-container" style={{backgroundColor: bgImg.color}}>
      <h1 id="location">{location}</h1>
      <div className="condition-container">
        <img src={imageURL} id="condition-img" />
        <p id="weather">{condition}</p>
      </div>
      <p id="temp">{temp}</p>
    </div>
      </div>
      </>
    ) 
    return (
    <>
    <div className="container" style={{ backgroundImage: `url(${bgImg?.urls?.raw})`, color: textColor, textShadow: `2px 3px 2px black`} }>
      <h2>Whats the weather like today?</h2>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <input placeholder="Location" type="" id="input" onChange={(e) => setInput(e.target.value)}/>
          <button id="submit" type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      </div>

      
    </div>
    </>
  )
}

export default App

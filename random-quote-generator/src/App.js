import { useEffect, useState } from 'react' //for App module
import axios from "axios"; //for App module
import { FaQuoteRight } from "react-icons/fa"; //for Quote module
import { FaQuoteLeft } from "react-icons/fa"; //for Quote module
import { FaTwitter } from "react-icons/fa"; //for Tweet module

//Quote Component
const Quote = ({ color, quote, author }) => {
  return (
    <div>
      <h1 id="text"><FaQuoteLeft className="quote-icon" 
      color={color}/> {quote} <FaQuoteRight 
      className="quote-icon" color={color} /></h1>
      <h3 id="author">-{author}</h3>
    </div>
  )
}

//Tweet Component
const Tweet = ({ color }) => {
  return (
    <div>
      <a id="tweet-quote"a target="_blank" title="" href="https://twitter.com/intent/tweet"><FaTwitter
      color={color}></FaTwitter></a>
    </div>
  )
}

//Button Component
const Button = ({ color, handleClick }) => {
  return (
    <button id="new-quote" className="btn" style={{backgroundColor: color}}
    onClick={() => handleClick()}>New Quote</button>
  )
}

//Main App
function App() {
  //state 
  const [randColor, setRandColor] = useState("steelblue");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  //function to generate a random highlight color
  const getRandomColor = () => {
    let color = "#";
    for (let i = 0; i < 3; i++)
      color += ("0" + Math.floor(Math.random() * Math.pow(16, 2) / 2).toString(16)).slice(-2);
    setRandColor(color);
  }

  //function to retrieve a random quote and author
  const quoteAPI = async () => {
    let quotes = [];
    try {
      const data = await axios.get("https://api.quotable.io/random");
      quotes = data.data;
    }
    catch (error) {
      console.log(error);
    }
    try {
      setQuote(quotes.content);
      setAuthor(quotes.author);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    quoteAPI();
  }, []);

  const handleClick = () => {
    getRandomColor();
    quoteAPI();
  };
  
  return (
    <div className="page" style={{backgroundColor: randColor}}>
      <div className="container" id="quote-box">
        <Quote color={randColor} quote={quote} author={author} />
        <Tweet color={randColor}/>
        <Button handleClick={handleClick} color={randColor}/>
      </div>
    </div>
  );
}


export default App;
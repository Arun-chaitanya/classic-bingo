import { useEffect, useState } from 'react';
import './App.css';
import Confetti from "react-confetti";

function App() {
  const [phrases, setPhrases] = useState([
    {phrase: "child noises in the background", selected:false},
    {phrase: "Hello, hello?", selected:false},
    {phrase: "I need to jump in another call", selected:false},
    {phrase: "Can everyone go on mute", selected:false},
    {phrase: "Could you please get closer to the mic", selected:false},
    {phrase: "(Load painful echo/ feedback)", selected:false},
    {phrase: "Next slide please", selected:false},
    {phrase: "Can we take this offline?", selected:false},
    {phrase: "Is Sasha on call?", selected:false},
    {phrase: "Could you share this slides afterwards", selected:false},
    {phrase: "Grant me presenter rights", selected:false},
    {phrase: "Can we email this online", selected:false},
    {phrase: "CONF CALL BINGO", selected:true},
    {phrase: "Sorry, I had problems logging in", selected:false},
    {phrase: "Animal noises in the background", selected:false},
    {phrase: "Sorry, I didn't find the conference id", selected:false},
    {phrase: "I was having connection issues", selected:false},
    {phrase: "I'll have to get back to you", selected:false},
    {phrase: "who just joined", selected:false},
    {phrase: "Sorry, something messed my calender", selected:false},
    {phrase: "Do you see my screen", selected:false},
    {phrase: "Let's wait for god", selected:false},
    {phrase: "You will send the minutes?", selected:false},
    {phrase: "Sorry, I was on mute", selected:false},
    {phrase: "Can you repeat, please", selected:false},
  ])
  const [result, setResult] = useState({
    r1: 0,
    r2: 0,
    r3: 1,
    r4: 0,
    r5: 0,
    c1: 0,
    c2: 0,
    c3: 1,
    c4: 0,
    c5: 0,
    d1: 1,
    d2: 1
  })
  const [show, setShow] = useState(false);

  useEffect(()=>{
    if(show){
      setTimeout(()=>{
        setShow(false)
      }, 3000)
    }
  },[show])

  const toggleCardSelect = (index) => {
    const phrasesList = [...phrases]
    const resultObj = {...result}
    const rowNumber = (Math.ceil((index+1)/5))
    const colNumber = ((index+1)%5) ? ((index+1)%5) : 5
    let isDiagonal = false

    const row = "r" + rowNumber
    const col = "c" + colNumber
    if(index!==12){
      phrasesList[index].selected = !phrasesList[index].selected
      setPhrases(phrasesList)
      if(phrasesList[index].selected){
        resultObj[row] += 1
        resultObj[col] += 1
        if((rowNumber ===  colNumber)){
          resultObj["d1"]+=1
          isDiagonal = true
        }
        if((rowNumber + colNumber === 6)){
          resultObj["d2"]+=1
          isDiagonal = true
        }
      }
      else{
        resultObj[row] -= 1
        resultObj[col] -= 1
        if((rowNumber ===  colNumber)){
          resultObj["d1"]-=1
        }
        if((rowNumber + colNumber === 6)){
          resultObj["d2"]-=1
        }
      }
      if(resultObj[row] === 5 || resultObj[col] === 5 || (isDiagonal && (resultObj["d1"] === 5 || resultObj["d2"] === 5))){
        setShow(true)
      }
      setResult(resultObj)
    }
  }

  const resetData = () => {
    const phrasesList = [...phrases]
    phrasesList.forEach((item,index)=>{
      if(index !== 12){
        item.selected = false
      }
    })
    setPhrases(phrasesList)
    setResult({r1: 0, r2: 0, r3: 1, r4: 0, r5: 0, c1: 0, c2: 0, c3: 1, c4: 0, c5: 0, d1: 1, d2: 1})
  }

  return (
    <div className="app">
      <h1>Classic Bingo</h1>
      <div className="container">
        {phrases.map((item, index)=>(
          <div key={index} className={"card" + (item.selected ? " card-selected" : " card-not-selected")} onClick={()=>toggleCardSelect(index)}>
            <p className = {item.selected ? "selected" : "not-selected"}>{item.phrase}</p>
          </div>
        ))}
      </div>
      <button onClick={resetData}>Reset</button>
      <Confetti
        numberOfPieces={300}
        recycle={show}
        colors= {["#9a5916", "#e4b04d", "#fff1a3", "#e7b14f", "#ae6f27"]}
      />
    </div>
  );
}

export default App;

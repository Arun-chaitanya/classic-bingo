import { useEffect, useState } from 'react';
import './App.css';
import Confetti from "react-confetti";
import db from './firebase';

function App() {
  const [phrases, setPhrases] = useState([])
  const [result, setResult] = useState({})
  const [show, setShow] = useState(false);

  useEffect(()=>{
    db.collection('phrases').onSnapshot(snapshot =>{
      setPhrases(snapshot.docs[0].data().phrases)
    })
    db.collection('show').onSnapshot(snapshot =>{
      setShow(snapshot.docs[0].data().show)
    })
    db.collection('checkedStatus').onSnapshot(snapshot =>{
      setResult(snapshot.docs[0].data().result)
    })
  },[])

  useEffect(()=>{
    if(show){
      setTimeout(()=>{
        db.collection("show").doc('1').update({
          show: false
        });
      }, 3000)
    }
  },[show])

  const toggleCardSelect = (index) => {
    const phrasesList = [...phrases]
    const resultObj = {...result}
    const rowNumber = (Math.ceil((index+1)/5))
    const colNumber = ((index+1)%5) ? ((index+1)%5) : 5
    let isDiagonal1 = false
    let isDiagonal2 = false

    const row = "r" + rowNumber
    const col = "c" + colNumber
    if(index!==12){
      phrasesList[index].selected = !phrasesList[index].selected
      db.collection("phrases").doc('1').update({
        phrases: phrasesList
      });
      if(phrasesList[index].selected){
        resultObj[row] += 1
        resultObj[col] += 1
        if((rowNumber ===  colNumber)){
          resultObj["d1"]+=1
          isDiagonal1 = true
        }
        if((rowNumber + colNumber === 6)){
          resultObj["d2"]+=1
          isDiagonal2 = true
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
      if(resultObj[row] === 5 || resultObj[col] === 5 || (isDiagonal1 && (resultObj["d1"] === 5)) || (isDiagonal2 && (resultObj["d2"] === 5))){
        db.collection("show").doc('1').update({
          show: true
        });
      }
      db.collection("checkedStatus").doc('1').update({
        result: resultObj
      });
    }
  }

  const resetData = () => {
    const phrasesList = [...phrases]
    phrasesList.forEach((item,index)=>{
      if(index !== 12){
        item.selected = false
      }
    })
    db.collection("phrases").doc('1').update({
      phrases: phrasesList
    });
    db.collection("checkedStatus").doc('1').update({
      result: {r1: 0, r2: 0, r3: 1, r4: 0, r5: 0, c1: 0, c2: 0, c3: 1, c4: 0, c5: 0, d1: 1, d2: 1}
    });
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

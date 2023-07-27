

import { useEffect, useState } from "react";
import Die from "./Die";
import './style.css'
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';

function App() {
const[tenzies, setTenzies] = useState(setalldice());
const [roll, setRoll] = useState(false);
const [count, setCount] = useState(0);
const [bestCount, setbestCount] = useState(JSON.parse(localStorage.getItem("bestCount")||count));

useEffect(()=>{

localStorage.setItem("bestCount", JSON.stringify(bestCount))
},[bestCount, tenzies])

useEffect(()=>{
  const allheld= tenzies.every(die=> die.isHeld)
  const same= tenzies.every(die=> die.value===tenzies[0].value)

  if(allheld && same)
  {
    
    setRoll(true)

  }


},[bestCount, count, tenzies])

function setNew(){

 

  
if(!roll){
  setCount(prevCount=> prevCount+1)
  setTenzies(prevTenzie=> prevTenzie.map(die=>{
   if(die.isHeld)
    return die;
    else {
      return{
        ...die,
        value:Math.ceil(Math.random()*6),
        
      }
    }
    
  }))}

  else{
    setTenzies(setalldice())
    setRoll(false)
    setCount(0)
    if(count<bestCount || bestCount===0){
      setbestCount(count)
    }
  }
}

 

function setalldice(){
  const arr=[]

for(let i=0;i<10;i++){
  arr[i]={
    value:Math.ceil(Math.random()*6),
    isHeld:false,
    id:nanoid(),
    count:0
  }
}
return arr;
}

function Held(id){
 
  setTenzies(prevTenzie=> prevTenzie.map(die=>{
    if(die.id===id){
      return{
        ...die,
        isHeld:!die.isHeld
      }
    }
    return die;
  }))
  
}

const dieArray= tenzies.map(die=> <Die  key={die.id}
                                        value={die.value}
                                        isHeld={die.isHeld} 
                                        Held={()=>Held(die.id)}
                                        count={count}
                                        
                                       />)

  
  return (
    <main>
     
      <div className="box-container">
      {roll && <Confetti/>}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <h3 className="count">Rolls: {count}</h3>
        <div className="box">
        
            {dieArray}
          </div>
          <button onClick={setNew} className="Roll"> {roll? "New Game": "Roll"}</button>
          <h3 className="best">Best: {bestCount}</h3>
      </div>
    </main>
  );
}

export default App;

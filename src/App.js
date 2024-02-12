import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState('EUR')
  const [to, setTo] = useState('USD')
  const [outPut, setOutPut] = useState("")
  useEffect(() => {
   async function getData (){
    try{
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
      if(!res.ok){
        throw new Error('Api data response is not ok!')
      }
      const data= await res.json();
      setOutPut(data.rates[to])
      console.log(data)
      console.log(to)
    }
    catch(err){
      console.log(err.message)
    }
   }
   getData()
  
  }, [amount, to, from ])
  
  return (
    <div className="App">
      <input type='text' value={amount} placeholder='enter amount' onChange={(e)=>setAmount(Number(e.target.value))}/>
      <select value={from} onChange={(e)=>setFrom(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="GBP">GBP</option>
      </select>
      <select value={to} onChange={(e)=>setTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="GBP">GBP</option>
      </select>
      <p>Output : {outPut}</p>
    </div>
  );
}

export default App;

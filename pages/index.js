import React from "react"
import css from  "../styles/Home.module.css"

const evalPoly = (coeffList,x) => {
  var answer = 0
  coeffList.map(([coeff,exponent]) => answer += coeff * x**exponent)
  return answer
}

export default function Home() {
  const [answer, setAnswer]= React.useState("")
  const [submit, setSubmit] =React.useState(false)
  const [xIntersection, setXIntersection] = React.useState("")
  const [initialNumber, setInitialNumber] = React.useState(0)

  const handleSubmit= (event)=>{
    event.preventDefault()
    setSubmit(true)

    var parsedPoly = answer
      .split(/\s*(?=[+-])\s*/g)
      .map(monomial => {
        if (monomial.includes("x^"))
        return monomial.split("x^").map(x => x.replace(/\s/g,""))
        else if (monomial.includes("x"))
        return [monomial.replace("x","").replace(/\s/g,""),1]
        else 
        return [monomial.replace(/\s/g,""),0]
      } )
      .map(parsedMonomial => {
        if (parsedMonomial[0] == "")
        return [1,parseInt(parsedMonomial[1])]
        else if (parsedMonomial[0] == "+")
        return [1,parseInt(parsedMonomial[1])]
        else
        return [parseInt(parsedMonomial[0]),parseInt(parsedMonomial[1])]
      })
      console.log(JSON.stringify(parsedPoly))

    var  parsedDerivative = parsedPoly.map(([coeff,exponent]) => {
      if(exponent==0){
        return([0,0])
      }
      else{
       return([coeff*exponent, exponent - 1])}
      }
    )

    var approximateRoot = initialNumber
    console.log(approximateRoot)

    while (Math.abs(evalPoly(parsedPoly,approximateRoot)) > 1/100000000000)
    { approximateRoot = approximateRoot - 
        evalPoly(parsedPoly,approximateRoot)/evalPoly(parsedDerivative,approximateRoot)
        console.log("root: ",approximateRoot)
        console.log("poly: ",evalPoly(parsedPoly,approximateRoot))
        console.log("deri: ",evalPoly(parsedDerivative,approximateRoot))
    setXIntersection(approximateRoot)
    }

  }

  return (
    <div >
      <div className= {css.calculatingbox}>
      <h2>Nullstellen durch Newton-Algorithmus finden</h2>
      <form onSubmit={handleSubmit}>
        <label>Funktion f(x) = </label>
        <input value={answer} 
        onChange={(event)=>{setAnswer(event.target.value)
          setSubmit(false)
         }}
        type="text"/>

        <div>
        <label>Anfangswert= </label>
        <input value={initialNumber}
          onChange={(event)=> setInitialNumber(event.target.value)}
         type="number"></input>
        </div>

        <div>
        <input className={css.submit}type="submit" value="Submit"></input>
        </div>
      </form>
      {
        submit?
        <div className={css.result}>{xIntersection}</div>: null
      }
      
       </div>

    </div>
  )
}

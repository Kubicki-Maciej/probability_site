import React, {useState, useEffect} from 'react'
// import SingleChart from './SingleChart'
import SingleChart from './SingleChart'
import TableToKill from './TableToKill'
import TableStats from '../tableStats/TableStats'

class Dice{
    binomialCoefficient(n, k) {
      if (k > n) {
        return 0;
      }
      function factorial(num) {
        if (num === 0 || num === 1) {
          return 1;
        } else {
          return num * factorial(num - 1);
        }
      }
      return factorial(n) / (factorial(k) * factorial(n - k));
    }
    probabilityOnNumber(numDice, numDiceExpected, number) {
      let probDice = (1 + 6 - number) / 6;
      let probExactNumber =
        probDice ** numDiceExpected *
        (1 - probDice) ** (numDice - numDiceExpected);
      let combinations = this.binomialCoefficient(numDice, numDiceExpected);
      return probExactNumber * combinations;
    }
  
    probabilityForAllDices(diceUsed, number) {
      let listOfProbability = [];
  
      for (let i = 1; i < diceUsed + 1; i++) {
        listOfProbability.push(
          this.probabilityOnNumber(diceUsed, i, number) * 100
        );
      }
      
      let firstElement = 100 - listOfProbability.reduce((partialSum, a) => partialSum + a, 0)
      let allProbability = []
      allProbability.push(firstElement)
      allProbability = allProbability.concat(listOfProbability)
      return allProbability;
    }
}

export default function ChartComponenent() {
    // const tab
    const [tableStats, setTableStats] = useState({})

    // to hit table
    const [createHitBool, setCreateHitBool] = useState(false)
    const [toHitDicesLabel , setToHitDicesLabel] =useState([])
    const [toHitDicesProbability , setToHitDicesProbability] =useState([])
    const [indexToHitPicked , setIndexToHitPicked] = useState(0)

    function getIndexHitTable(index){
        setIndexToHitPicked(index)
        procederTalbeStatsToWound(index)
        setCreateTableToWound(true)
    }
    // to wound table
    const [createTableToWound, setCreateTableToWound] =useState(false)
    const [toWoundDicesLabel , setToWoundDicesLabel] =useState([])
    const [toWoundDicesProbability , setToWoundDicesProbability] =useState([])
    const [indexToWoundPicked , setIndexToWoundPicked] = useState(0)

    function getIndexWoundTable(index){
        setIndexToWoundPicked(index)
        procederTalbeStatsToSave(index)
        setCreateTableToSave(true)
    }


    // to save table
    const [createTableToSave, setCreateTableToSave] =useState(false)
    const [toSaveDicesLabel , setToSaveDicesLabel] =useState([])
    const [toSaveDicesProbability , setToSaveDicesProbability] =useState([])
    const [indexToSavePicked , setIndexToSavePicked] = useState(0)


    function setupTableStats(stats){
        setTableStats(stats)
        setCreateHitBool(true)
        // console.log(tableStats);
    }

    function createLabelList(numberOfAtacks){
        const list = [];
        for (let i = 0; i <= numberOfAtacks; i++) {
          list.push(i);
        }
        return list;
    }

    function procederTalbeStatsToHit(){
        let labelHit = createLabelList(tableStats.numAttacks) // label for hit chart
        let DiceHit = new Dice() // to hit table is always max = tableStats.numAtacks
        let diceProbabilityTable = DiceHit.probabilityForAllDices(tableStats.numAttacks, tableStats.toHit)
        setToHitDicesLabel(labelHit)
        setToHitDicesProbability(diceProbabilityTable)
    }

    function procederTalbeStatsToWound(numberAtacks){
        let labelWound = createLabelList(numberAtacks) // label for hit chart
        let DiceWound = new Dice() // to hit table is always max = tableStats.numAtacks
        let diceProbabilityTableWound = DiceWound.probabilityForAllDices(numberAtacks, tableStats.toWound)
        setToWoundDicesLabel(labelWound)
        setToWoundDicesProbability(diceProbabilityTableWound)
    }

    function procederTalbeStatsToSave(numberAtacks){
        let labelSave = createLabelList(numberAtacks) // label for hit chart
        let DiceSave = new Dice() // to hit table is always max = tableStats.numAtacks
        let diceProbabilityTableSave = DiceSave.probabilityForAllDices(numberAtacks, tableStats.enemySave)
        setToSaveDicesLabel(labelSave)
        setToSaveDicesProbability(diceProbabilityTableSave)
    }

    useEffect(()=>{
        // console.log(tableStats);
        if(createHitBool){
            procederTalbeStatsToHit()
            // setCreateHitBool(!createHitBool)
        }
    },[tableStats])


    return (
    <div className='site'>
        <TableStats tableSetFunction={setupTableStats}/>

      
        {createHitBool ? <TableToKill stats={tableStats} diceOjbect={Dice}/> : ''}

        {createHitBool ? <SingleChart chartLabelData={toHitDicesLabel} chartProbabilityData={toHitDicesProbability} tableName={'To Hit'} indexPicker={getIndexHitTable}/> : ''}

        {createTableToWound ? <SingleChart chartLabelData={toWoundDicesLabel} chartProbabilityData={toWoundDicesProbability} tableName={'To Wound'} indexPicker={getIndexWoundTable}/> : ''}

        {createTableToSave ? <SingleChart chartLabelData={toSaveDicesLabel} chartProbabilityData={toSaveDicesProbability} tableName={'To Save'}/> : ''}

    </div>
  )
}

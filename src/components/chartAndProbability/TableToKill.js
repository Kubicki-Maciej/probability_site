import React, {useState, useEffect} from 'react'


function summ(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

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

export default function TableToKill({stats}) {
    const [numberOfAtacks, setNumberOfAtacks] = useState(stats.numAttacks)
    const DiceObject = new Dice()

    const diceToHitProbability = DiceObject.probabilityForAllDices(stats.numAttacks, stats.toHit)
    const diceToWoundProbability = DiceObject.probabilityForAllDices(stats.numAttacks, stats.toWound)
    const diceToSaveProbability = DiceObject.probabilityForAllDices(stats.numAttacks, stats.enemySave)
    diceToSaveProbability.reverse()
    // const diceToWoundProbability = Dice.probabilityForAllDices(numberOfAtacks, stats.toWound)
    // const diceToSaveProbability = Dice.probabilityForAllDices(numberOfAtacks, stats.enemySave)
    // console.log(diceToHitProbability);
    // console.log('stats.enemyHP');
    // console.log(stats.enemyHP);
    // console.log(stats.damage);
    const minAtacksToKillEnemy = stats.enemyHP/stats.damage
    console.log('minAtacksToKillEnemy');
    console.log(minAtacksToKillEnemy);
    // console.log('slice');
    let sumProbabilityToHitToKill = summ(diceToHitProbability.slice(minAtacksToKillEnemy, diceToHitProbability.length))
    let sumProbabilityToWoundToKill = summ(diceToWoundProbability.slice(minAtacksToKillEnemy, diceToWoundProbability.length))
    let sumProbabilityToSaveToKill = summ(diceToSaveProbability.slice(minAtacksToKillEnemy, diceToSaveProbability.length))
    
    // console.log(sumProbabilityToHitToKill);
    // console.log(sumProbabilityToWoundToKill);
    // console.log(sumProbabilityToSaveToKill);

    // console.log(`prawdopodobienstwo zabicia tego przeciwnika wszystkimi atakami wynosi ${}`);

    




    return (
    <div>Szansa na zabicie wynosi {(sumProbabilityToHitToKill/100*sumProbabilityToWoundToKill/100*sumProbabilityToSaveToKill/100*100).toFixed(2)}%</div>
  )
}

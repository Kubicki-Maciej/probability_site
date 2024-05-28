import React , { useState } from 'react'

export default function TableStats({tableSetFunction}) {
    const [numAttacks, setNumAttacks] = useState(1);
    const [toHit, setToHit] = useState(2);
    const [toWound, setToWound] = useState(2);
    const [damage, setDamage] = useState(1);
    const [enemySave, setEnemySave] = useState(2);
    const [enemyHP, setEnemyHP] = useState(1);
    
    const handleNumAttacksChange = (e) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value)) {
        setNumAttacks(value);
      }
    };
  
    const handleToHitChange = (e) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value) && value > 1) {
        setToHit(value);
      }
    };
  
    const handleToWoundChange = (e) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value) && value > 1) {
        setToWound(value);
      }
    };
    const handleToDamageChange = (e) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value) && value > 0) {
        setDamage(value);
      }
    };
  
    const handleEnemySaveChange = (e) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value) && value > 1) {
        setEnemySave(value);
      }
    };
  
    const handleEnemyHPChange = (e) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value)) {
        setEnemyHP(value);
      }
    };

    function setupTable(){
        tableSetFunction({
            numAttacks:numAttacks,
            toHit:toHit,
            toWound:toWound,
            damage:damage,
            enemySave:enemySave,
            enemyHP:enemyHP,

        })
    }
  
    return (
        <div className='statsTable'>
            <div>
               <p>Number of Atacks</p>  
              <input type="number" value={numAttacks} onChange={handleNumAttacksChange}  min={1} defaultValue={1}/>
            </div>
            <div>
            <p>To Hit</p>  
              <input type="number" value={toHit} onChange={handleToHitChange} maxLength={1} min={2} max={6} defaultValue={2}/>
            </div>
            <div>
            <p>To Wound</p>  
              <input type="number" value={toWound} onChange={handleToWoundChange} maxLength={1} min={2} max={6} defaultValue={2}/>
            </div>
            <div>
            <p>Weapon Damage</p>  
              <input type="number" value={damage} onChange={handleToDamageChange} defaultValue={1} min={1}/>
            </div>
            <div>
            <p>Enemy Save</p>  
              <input type="number" value={enemySave} onChange={handleEnemySaveChange} maxLength={1} min={2} max={6} defaultValue={2} />
            </div>
            <div>
            <p>Enemy HP</p>  
              <input type="number" value={enemyHP} onChange={handleEnemyHPChange} min={1} defaultValue={1}/>
            </div>
            <div>
                <button onClick={setupTable}>calculate</button>
            </div>
        </div>
    );
}

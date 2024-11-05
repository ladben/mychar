import './SpellItem.css';
import { spells } from '../../sources.js';

const parse = require('html-react-parser');

function SpellItem({spell, concentration, updateConcentration}) {

  let concentrationSpell = false;
  if (spell.duration.includes('Concentration')) {
    concentrationSpell = true;
  }

  const spellItemClickHandler = (e) => {
    e.target.closest('.spell-item').classList.toggle('active');
    const topPosition = e.target.closest('.spell-item').offsetTop - 10;
    window.scrollTo({top: topPosition, left: 0, behavior: 'smooth'});
  }

  const concentrationHandler = () => {
    if (spell.id === concentration.spellId) {
      updateConcentration({active: false, spellId: 0});
    }
    if (spell.id !== concentration.spellId) {
      updateConcentration({active: true, spellId: spell.id})
    }
  }

  let concentrationDiffClass = ''
  if (concentration.active && concentrationSpell) {
    // setting differentiating class if concentration is active
    if (spell.id === concentration.spellId) {
      concentrationDiffClass = ' accented';
    } else {
      concentrationDiffClass = ' disabled';
    }
  }

  return (
    <div className={'spell-item flex-column-centered' + concentrationDiffClass} onClick={spellItemClickHandler} data-concentration-spell={concentrationSpell}>
      <div className='spell-name'>{spell.name}</div>
      <div className='spell-level'>{spell.level}</div>
      {concentrationSpell && <div className='concentration-spell-indicator' onClick={concentrationHandler}>C</div>}
      <div className='spell-info'>
        <div className='spell-casting-time'><b>Casting Time: </b>{spell.castingTime}</div>
        <div className='spell-range'><b>Range: </b>{spell.range}</div>
        <div className='spell-duration'><b>Duration: </b>{spell.duration}</div>
        <div className='spell-description'>{parse(spell.description)}</div>
      </div>
    </div>
  );
}

export default SpellItem;
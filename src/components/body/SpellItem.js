import './SpellItem.css';
import { spells } from '../../sources.js';

const parse = require('html-react-parser');

function SpellItem(props) {
  let activeSpell = {};
  spells.forEach(spell => {
    if (spell.id === props.spellId) {
      activeSpell = {...spell};
    }
  });

  let concentrationSpell = false;
  if (activeSpell.duration.includes('Concentration')) {
    concentrationSpell = true;
  }

  const spellItemClickHandler = (e) => {
    e.target.closest('.spell-item').classList.toggle('active');
    const topPosition = e.target.closest('.spell-item').offsetTop - 10;
    window.scrollTo({top: topPosition, left: 0, behavior: 'smooth'});
  }

  const concentrationHandler = () => {
    if (props.spellId === props.concentration.spellId) {
      props.updateConcentration({active: false, spellId: 0});
    }
    if (props.spellId !== props.concentration.spellId) {
      props.updateConcentration({active: true, spellId: props.spellId})
    }
  }

  let concentrationDiffClass = ''
  if (props.concentration.active && concentrationSpell) {
    // setting differentiating class if concentration is active
    if (props.spellId === props.concentration.spellId) {
      concentrationDiffClass = ' accented';
    } else {
      concentrationDiffClass = ' disabled';
    }
  }

  return (
    <div className={'spell-item flex-column-centered' + concentrationDiffClass} onClick={spellItemClickHandler} data-concentration-spell={concentrationSpell}>
      <div className='spell-name'>{activeSpell.name}</div>
      <div className='spell-level'>{activeSpell.level}</div>
      {concentrationSpell && <div className='concentration-spell-indicator' onClick={concentrationHandler}>C</div>}
      <div className='spell-info'>
        <div className='spell-casting-time'><b>Casting Time: </b>{activeSpell.castingTime}</div>
        <div className='spell-range'><b>Range: </b>{activeSpell.range}</div>
        <div className='spell-duration'><b>Duration: </b>{activeSpell.duration}</div>
        <div className='spell-description'>{parse(activeSpell.description)}</div>
      </div>
    </div>
  );
}

export default SpellItem;
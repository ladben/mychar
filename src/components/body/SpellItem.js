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

  const spellItemClickHandler = (e) => {
    e.target.closest('.spell-item').classList.toggle('active');
  }

  return (
    <div className='spell-item flex-column-centered' onClick={spellItemClickHandler}>
      <div className='spell-name'>{activeSpell.name}</div>
      <div className='spell-level'>{activeSpell.level}</div>
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
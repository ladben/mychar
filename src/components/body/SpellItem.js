import './SpellItem.css';
import { processText } from '../../functions/dynamicContentParser';
import { supabase } from '../../client';

const parse = require('html-react-parser');

function SpellItem({
  spell,
  concentration,
  updateConcentration,
  character,
  activeSpellFilter,
  spellsToPrepare,
  spellsPrepared,
  onUpdate
}) {

  let concentrationSpell = false;
  if (spell.duration.includes('Concentration')) {
    concentrationSpell = true;
  }

  const spellItemClickHandler = (e) => {
    if (activeSpellFilter === 'prepared' || !e.target.classList.contains('spell-level')) {
      e.target.closest('.spell-item').classList.toggle('active');
      const topPosition = e.target.closest('.spell-item').offsetTop - 10;
      window.scrollTo({top: topPosition, left: 0, behavior: 'smooth'});
    }
  }

  const concentrationHandler = () => {
    if (spell.id === concentration.spellId) {
      updateConcentration({active: false, spellId: 0});
    }
    if (spell.id !== concentration.spellId) {
      updateConcentration({active: true, spellId: spell.id})
    }
  }

  async function prepareHandler(spellId, prevPreparedValue) {
    const prepareMode = activeSpellFilter === 'selectable';
    if (prepareMode) {
      const wantsToRemove = prevPreparedValue === true;
      const canAdd = spellsPrepared < spellsToPrepare;
      if (wantsToRemove || canAdd) {
        const { error } = await supabase
        .from('spells')
        .update({ prepared: !prevPreparedValue })
        .eq('id', spellId);
    
        if (!error) {
          onUpdate();
        }
      }
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

  const alwaysAvailable = spell.prepared === null;
  const prepared = spell.prepared === true;

  const isActive = activeSpellFilter === 'prepared' ? alwaysAvailable || prepared : activeSpellFilter === 'selectable' ? !alwaysAvailable : false;

  if (!isActive) {
    return <></>;
  }

  return (
    <div
      className={
        'spell-item flex-column-centered'
        + concentrationDiffClass
        + (activeSpellFilter === 'selectable' && spell.prepared === true ? ' prepared' : '')
      }
      onClick={spellItemClickHandler} data-concentration-spell={concentrationSpell}
    >
      <div className='spell-name'>{spell.name}</div>
      <div
        className='spell-level'
        onClick={() => prepareHandler(spell.id, spell.prepared)}
      >{spell.level}</div>
      {concentrationSpell && activeSpellFilter === 'prepared' && <div className='concentration-spell-indicator' onClick={concentrationHandler}>C</div>}
      <div className='spell-info'>
        <div className='spell-casting-time'><b>Casting Time: </b>{spell.castingTime}</div>
        <div className='spell-range'><b>Range: </b>{spell.range}</div>
        <div className='spell-duration'><b>Duration: </b>{spell.duration}</div>
        <div className='spell-description'>{parse(processText(spell.description, character))}</div>
      </div>
    </div>
  );
}

export default SpellItem;
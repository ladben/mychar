import './SpellSlots.css';
import SlotTracker from './SlotTracker';

const SpellSlots = ({
  maxSpellSlots,
  currentSpellSlots,
  setCurrentSpellSlots,
  characterId,
  shortRestTriggered,
  longRestTriggered,
}) => {
  return (
    <div className='spell-slots-item flex-column-centered'>
      <div className='spell-slots-item-title'>Spell Slots</div>
      <div className='spell-slots-item-values'>
        {Object.entries(maxSpellSlots).map(([lvl, value], i) => (
          <div key={`spell-slot-${i}`} className='slot-tracker-wrapper'>
            <div className='spell-slot-level'>
              {lvl.replace('-level', ' Level')}
            </div>
            <SlotTracker
              lvl={lvl}
              maxValue={value}
              currentValue={currentSpellSlots[lvl]}
              resetAt={currentSpellSlots.reset_at}
              setCurrentSpellSlots={setCurrentSpellSlots}
              characterId={characterId}
              shortRestTriggered={shortRestTriggered}
              longRestTriggered={longRestTriggered}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpellSlots;

import { useMemo, useState } from 'react';
import './SpellStatistics.css';
import SpellRoleRadar from './Charts/SpellRoleRadar';

const SpellStatistics = ({ spellList }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const roleChartInput = useMemo(() => {
    const availableSpells = spellList.filter(
      (spell) => spell.prepared || spell.prepared === null,
    );

    const groupedByTag = {};

    availableSpells.forEach((spell) => {
      const tags = Object.entries(spell).filter(([key]) =>
        key.includes('tag_'),
      );

      tags.forEach(([tag, value]) => {
        if (value) {
          const tagName = tag.replace('tag_', '');
          if (groupedByTag[tagName]) {
            groupedByTag[tagName] += 1;
          } else {
            groupedByTag[tagName] = 1;
          }
        }
      });
    });

    const chartInput = Object.entries(groupedByTag)
      .map(([tag, spellNum]) => ({
        role: tag.charAt(0).toUpperCase() + tag.slice(1),
        value: spellNum / availableSpells.length,
      }))
      .sort((tagA, tagB) => tagA.role.localeCompare(tagB.role));

    return chartInput;
  }, [spellList]);

  return (
    <div className='spell-statistics-wrapper'>
      <i
        id='spell-statistics-open-btn'
        className='fa-solid fa-chart-simple'
        onClick={() => setModalOpen(true)}
      ></i>
      <div className={`spell-statistics-modal${modalOpen ? ' open' : ''}`}>
        <div
          className='close-statistics-modal-btn'
          onClick={() => setModalOpen(false)}
        >
          <i className='fa-solid fa-xmark'></i>
        </div>
        <div className='spell-statistics-title'>Arcane Power Profile</div>
        <SpellRoleRadar data={roleChartInput} />
      </div>
    </div>
  );
};

export default SpellStatistics;

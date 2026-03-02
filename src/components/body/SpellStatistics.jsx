import { useMemo, useState } from 'react';
import './SpellStatistics.css';
import SpellRoleRadar from './Charts/SpellRoleRadar';
import SpellLevelDonut from './Charts/SpellLevelDonut';

const SpellStatistics = ({ spellList }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = (direction) => {
    if (direction) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    setModalOpen(direction);
  };

  const chartInputs = useMemo(() => {
    const availableSpells = spellList.filter(
      (spell) => spell.prepared || spell.prepared === null,
    );

    const groupedByTag = {};
    const groupedByLevel = {};

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

      const level = spell.level.replace(' (rit)', '');

      if (groupedByLevel[level]) {
        groupedByLevel[level] += 1;
      } else {
        groupedByLevel[level] = 1;
      }
    });

    const roleChartInput = Object.entries(groupedByTag)
      .map(([tag, spellNum]) => ({
        role: tag.charAt(0).toUpperCase() + tag.slice(1),
        value: spellNum / availableSpells.length,
      }))
      .sort((tagA, tagB) => tagA.role.localeCompare(tagB.role));

    const levelChartInput = Object.entries(groupedByLevel).map(
      ([lvl, spellNum]) => ({
        level: lvl === 'cantrip' ? 'Cantrip' : lvl,
        value: spellNum,
      }),
    );

    return { roleChartInput, levelChartInput };
  }, [spellList]);

  return (
    <div className='spell-statistics-wrapper'>
      <i
        id='spell-statistics-open-btn'
        className='fa-solid fa-chart-simple'
        onClick={() => toggleModal(true)}
      ></i>
      <div
        className={`spell-statistics-modal-backdrop${modalOpen ? ' open' : ''}`}
        onClick={() => toggleModal(false)}
      ></div>
      <div className={`spell-statistics-modal${modalOpen ? ' open' : ''}`}>
        <div
          className='close-statistics-modal-btn'
          onClick={() => toggleModal(false)}
        >
          <i className='fa-solid fa-angle-down'></i>
        </div>
        <div className='spell-statistics-charts'>
          <div className='spell-statistics-title'>Arcane Power Profile</div>
          <SpellRoleRadar data={chartInputs.roleChartInput} />
          <div className='spell-statistics-title'>Spell Level Profile</div>
          <SpellLevelDonut data={chartInputs.levelChartInput} />
        </div>
      </div>
    </div>
  );
};

export default SpellStatistics;

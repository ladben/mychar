import './Navigation.css';

function Navigation(props) {
  let featuresClass = '';
  let spellsClass = '';
  let resourcesClass = '';

  if (props.selectedAbility === 'features') {
    featuresClass = ' active';
  }
  if (props.selectedAbility === 'spells') {
    spellsClass = ' active';
  }
  if (props.selectedAbility === 'resources') {
    resourcesClass = ' active';
  }
  if (props.concentration) {
    spellsClass = spellsClass.concat(' accented');
  }

  return (
    <nav className='ability-navigation'>
      <div
        className={'nav-item' + featuresClass}
        onClick={() => {
          props.updateSelectedAbilityHandler('features');
        }}
      >
        Features
      </div>
      <div
        className={'nav-item' + spellsClass}
        onClick={() => {
          props.updateSelectedAbilityHandler('spells');
        }}
      >
        Spells
      </div>
      <div
        className={'nav-item' + resourcesClass}
        onClick={() => {
          props.updateSelectedAbilityHandler('resources');
        }}
      >
        Resources
      </div>
    </nav>
  );
}

export default Navigation;

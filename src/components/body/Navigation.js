import './Navigation.css';

function Navigation(props) {
  let featuresClass = '';
  let spellsClass = '';

  if (props.selectedAbility === 'features') {
    featuresClass = ' active';
  }
  if (props.selectedAbility === 'spells') {
    spellsClass = ' active';
  }

  return (
    <nav className='ability-navigation'>
        <div className={'nav-item' + featuresClass} onClick={() => {props.updateSelectedAbilityHandler('features')}}>Features</div>
        <div className={'nav-item' + spellsClass} onClick={() => {props.updateSelectedAbilityHandler('spells')}}>Spells</div>
    </nav>
  );
}

export default Navigation;
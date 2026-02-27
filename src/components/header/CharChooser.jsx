import { useCallback } from 'react';
import './CharChooser.css';

function CharChooser(props) {
  const { selectedChar, characters, updateSelectedCharHandler } = props;

  const getCharClass = useCallback(
    (char) => {
      const charClass = Object.entries(char)
        .filter(
          ([key, value]) =>
            key.endsWith('_lvl') && key !== 'overall_lvl' && !!value,
        )
        .map(([key]) => key.replace('_lvl', ''))[0];

      return charClass;
    },
    [characters],
  );

  function toggleCharacterChooser() {
    const characterListWrapper = document.querySelector(
      '.character-chooser-wrapper .character-list-wrapper',
    );
    if (characterListWrapper) {
      characterListWrapper.classList.toggle('open');
    }
  }

  return (
    <div className='character-chooser-wrapper flex-column-centered'>
      <div className='chosen-character' onClick={toggleCharacterChooser}>
        {selectedChar.name}
      </div>
      <div className='character-list-wrapper' onClick={toggleCharacterChooser}>
        <ul className='character-list flex-column-centered'>
          {characters.map((character, i) => (
            <li
              key={'character-' + i}
              onClick={() => {
                updateSelectedCharHandler(characters[i]);
              }}
              className={character.id === selectedChar.id ? 'selected' : ''}
              data-class={getCharClass(character)}
            >
              {character.name}
            </li>
          ))}
          <li className='close-character-chooser'>
            <div className='arrow-container'>
              <div className='arrow-up'></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CharChooser;

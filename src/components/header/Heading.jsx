import './Heading.css';

import CharChooser from './CharChooser';

function Heading(props) {

  const runAnimation = (e) => {
    e.target.classList.add('animating');

    setTimeout(() => {
      e.target.classList.remove('animating');
    }, 5200);
  }

  return (
    <div className='header-wrapper'>
      <div className='header' onClick={runAnimation}>MyDndChar</div>
      <CharChooser {...props}/>
    </div>
  );
}

export default Heading;
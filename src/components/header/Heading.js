import './Heading.css';

import CharChooser from './CharChooser';

function Heading(props) {
  return (
    <div className='header-wrapper'>
      <div className='header'>MyChar</div>
      <CharChooser {...props}/>
    </div>
  );
}

export default Heading;
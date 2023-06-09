import './FeatureItem.css';
import { features } from '../../sources.js';

const parse = require('html-react-parser');

function FeatureItem(props) {
  let activeFeature = {};
  features.forEach(feature => {
    if (feature.id === props.featureId) {
      activeFeature = {...feature};
    }
  });

  const featureItemClickHandler = (e) => {
    e.target.closest('.feature-item').classList.toggle('active');
    const topPosition = e.target.closest('.feature-item').offsetTop - 10;
    window.scrollTo({top: topPosition, left: 0, behavior: 'smooth'});
  }

  return (
    <div className='feature-item flex-column-centered' onClick={featureItemClickHandler}>
      <div className='feature-name'>{activeFeature.name}</div>
      <div className='feature-description'>{parse(activeFeature.description)}</div>
    </div>
  );
}

export default FeatureItem;
import './FeatureItem.css';

const parse = require('html-react-parser');

function FeatureItem({feature}) {

  const featureItemClickHandler = (e) => {
    e.target.closest('.feature-item').classList.toggle('active');
    const topPosition = e.target.closest('.feature-item').offsetTop - 10;
    window.scrollTo({top: topPosition, left: 0, behavior: 'smooth'});
  }

  return (
    <div className='feature-item flex-column-centered' onClick={featureItemClickHandler}>
      <div className='feature-name'>{feature.name}</div>
      <div className='feature-description'>{parse(feature.description)}</div>
    </div>
  );
}

export default FeatureItem;
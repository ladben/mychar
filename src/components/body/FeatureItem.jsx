import './FeatureItem.css';
import { processText } from '../../functions/dynamicContentParser';
import parse from 'html-react-parser';

function FeatureItem({feature, character, activeFeatureFilters}) {

  const featureItemClickHandler = (e) => {
    e.target.closest('.feature-item').classList.toggle('active');
    const topPosition = e.target.closest('.feature-item').offsetTop - 10;
    window.scrollTo({top: topPosition, left: 0, behavior: 'smooth'});
  }

  const isActive = activeFeatureFilters[feature.source];

  if (!isActive) {
    return <></>;
  }

  return (
    <div className='feature-item flex-column-centered' onClick={featureItemClickHandler}>
      <div className='feature-name'>{feature.name}</div>
      <div className='feature-description'>{parse(processText(feature.description, character))}</div>
    </div>
  );
}

export default FeatureItem;
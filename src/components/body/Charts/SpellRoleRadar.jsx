import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

const SpellRoleRadar = ({ data }) => {
  const renderCustomTick = ({ payload, x, y, textAnchor, index, ...rest }) => {
    const item = data.find((d) => d.role === payload.value);
    const percentage = item.labelText;
    const shift = {
      0: 'translate(0px, -20px)',
      3: 'translate(-40px, 10px)',
      4: 'translate(-30px, -10px)',
      5: 'translate(-30px, -10px)',
    };

    const iconSize = 32;
    const gap = 4;
    let iconUrl = `/assets/icons/${payload.value.toLowerCase()}_icon.svg`;
    const iconPos = [0, 4, 5].includes(index) ? 'right' : 'left';

    const imageEl = (
      <image
        x={x}
        y={y - 10} // Adjust to align with the middle of your text block
        width={iconSize}
        height={iconSize}
        href={iconUrl}
      />
    );
    const textEl = (
      <text
        x={x}
        y={y}
        textAnchor={iconPos === 'right' ? 'end' : 'start'}
        fill='var(--light)'
        fontSize={14}
        letterSpacing='1px'
        {...rest}
      >
        <tspan
          x={x}
          dy='0'
          dx={iconPos === 'left' ? iconSize + gap : 0}
          fill='var(--light)'
        >
          {payload.value}
        </tspan>
        <tspan
          x={x}
          dy='1.2em'
          dx={iconPos === 'left' ? iconSize + gap : 0}
          fontSize={16}
          fill='var(--accent)'
          fillOpacity={0.8}
          fontWeight='bold'
        >
          {percentage}
        </tspan>
      </text>
    );

    return (
      <g style={{ transform: shift[index] }}>
        {imageEl}
        {textEl}
      </g>
    );
  };

  const viewWidth = window.innerWidth;

  return (
    <ResponsiveContainer width='100%' height={Math.min(viewWidth * 0.76, 285)}>
      <RadarChart
        data={data}
        margin={{ top: 0, right: 40, bottom: 80, left: 40 }}
      >
        <defs>
          <filter id='radarGlow' x='-20%' y='-20%' width='140%' height='140%'>
            <feGaussianBlur stdDeviation='4' result='blur' />
            <feComposite in='SourceGraphic' in2='blur' operator='over' />
          </filter>

          <linearGradient id='radarGradient' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='var(--accent)' stopOpacity={0.8} />
            <stop offset='95%' stopColor='var(--accent)' stopOpacity={0.2} />
          </linearGradient>
        </defs>

        <PolarGrid
          stroke='var(--light)'
          strokeOpacity={0.3}
          gridType='polygon'
        />

        <PolarAngleAxis dataKey='role' tick={renderCustomTick} />

        <PolarRadiusAxis domain={[0, 1]} tick={false} axisLine={false} />

        <Radar
          name='Spell Profile'
          dataKey='value'
          stroke='var(--accent)'
          strokeWidth={3}
          fill='url(#radarGradient)'
          fillOpacity={0.6}
          style={{ filter: 'url(#radarGlow)' }}
          isAnimationActive={false}
          dot={{
            r: 4,
            fill: 'var(--accent)',
            stroke: 'var(--light)',
            strokeWidth: 1,
          }}
          activeDot={{ r: 6 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SpellRoleRadar;

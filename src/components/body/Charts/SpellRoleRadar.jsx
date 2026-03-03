import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

const SpellRoleRadar = ({ data }) => {
  const renderCustomTick = ({
    payload,
    x,
    y,
    textAnchor,
    verticalAnchor,
    index,
    ...rest
  }) => {
    const item = data.find((d) => d.role === payload.value);

    const percentage = Math.round(item.value * 100);

    const verticalShift = index === 0 ? y - 20 : y;

    return (
      <text
        x={x}
        y={verticalShift}
        textAnchor={textAnchor}
        verticalanchor={verticalAnchor}
        fill='var(--light)'
        fontSize={16}
        letterSpacing='1px'
        {...rest}
      >
        <tspan x={x} dy='0' fontWeight='bold' fill='var(--light)'>
          {payload.value}
        </tspan>
        <tspan
          x={x}
          dy='1.2em'
          fontSize={14}
          fill='var(--accent)'
          fillOpacity={0.8}
        >
          {percentage}%
        </tspan>
      </text>
    );
  };

  return (
    <ResponsiveContainer width='100%' height={350}>
      <RadarChart
        data={data}
        margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
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

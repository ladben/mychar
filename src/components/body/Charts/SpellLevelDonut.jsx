import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
  LabelList,
} from 'recharts';

const SpellLevelDonut = ({ data }) => {
  const renderCustomLabel = ({ payload, x, y, textAnchor, verticalAnchor }) => {
    return (
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        verticalanchor={verticalAnchor}
        fill='var(--light)'
        fontSize={16}
        letterSpacing='1px'
      >
        <tspan x={x} dy='0' fontWeight='bold' fill='var(--light)'>
          {payload.level}
          <tspan
            x={x}
            dy='1.2em'
            fontSize={14}
            fill='var(--accent)'
            fillOpacity={0.8}
            fontWeight={500}
          >
            ({payload.value})
          </tspan>
        </tspan>
      </text>
    );
  };

  return (
    <ResponsiveContainer width='100%' height={275}>
      <PieChart>
        <defs>
          <filter id='donutGlow' x='-20%' y='-20%' width='140%' height='140%'>
            <feGaussianBlur stdDeviation='4' result='blur' />
            <feComposite in='SourceGraphic' in2='blur' operator='over' />
          </filter>

          <linearGradient id='donutGradient' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='var(--accent)' stopOpacity={0.5} />
            <stop offset='50%' stopColor='var(--accent)' stopOpacity={1} />
            <stop offset='95%' stopColor='var(--accent)' stopOpacity={0.5} />
          </linearGradient>
        </defs>

        <Pie
          data={data}
          cx='50%'
          cy='50%'
          innerRadius={70}
          outerRadius={90}
          paddingAngle={8}
          dataKey='value'
          isAnimationActive={false}
          stroke='none'
          label={renderCustomLabel}
          labelLine={{ stroke: 'none' }}
        >
          {/* The Centered Total */}
          <Label
            value={`${data.reduce((acc, curr) => acc + curr.value, 0)} Total`}
            position='center'
            fill='var(--light)'
            style={{
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          />

          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill='url(#donutGradient)'
              style={{ filter: 'url(#donutGlow)' }}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SpellLevelDonut;

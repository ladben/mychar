import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
  LabelList,
} from 'recharts';

const SpellLevelDonut = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <PieChart>
        <defs>
          <filter id='arcaneGlow' x='-20%' y='-20%' width='140%' height='140%'>
            <feGaussianBlur stdDeviation='2' result='blur' />
            <feComposite in='SourceGraphic' in2='blur' operator='over' />
          </filter>
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
          // Custom label function to pull the 'name' property
          label={({ name }) => name}
          // Customizing the label appearance
          labelLine={{ stroke: 'var(--light)', strokeOpacity: 0.3 }}
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
              fill='var(--accent)'
              fillOpacity={1 - index * 0.15}
              style={{ filter: 'url(#arcaneGlow)' }}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SpellLevelDonut;

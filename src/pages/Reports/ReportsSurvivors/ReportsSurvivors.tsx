import { useCallback, useMemo } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

import {
  ReportsSurvivorsChart,
  ReportsSurvivorsChartLabels,
  ReportsSurvivorsChartLabel,
  ReportsSurvivorsChartLabelColor,
} from './ReportsSurvivors.styles';

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

interface ReportsSurvivorsProps {
  infectedSurvivors: number;
  otherSurvivors: number;
}

const ReportsSurvivors = ({ infectedSurvivors, otherSurvivors }: ReportsSurvivorsProps) => {
  const data = useMemo(() => {
    return [
      { name: 'Infected Survivors', value: infectedSurvivors, color: '#0088FE' },
      { name: 'Other Survivors', value: otherSurvivors, color: '#00C49F' }
    ];
  }, [infectedSurvivors, otherSurvivors]);

  const renderCustomizedLabel = useCallback(({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: CustomLabelProps) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }, []);

  return (
    <ReportsSurvivorsChart>
      <PieChart width={240} height={240}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((item, index: number) => (
            <Cell key={`cell-${index}`} fill={item.color} />
          ))}
        </Pie>
      </PieChart>
      <ReportsSurvivorsChartLabels>
        {data.map((item, index) => (
          <ReportsSurvivorsChartLabel key={index}>
            <ReportsSurvivorsChartLabelColor style={{ backgroundColor: item.color }} />
            <div>{item.name}</div>
          </ReportsSurvivorsChartLabel>
        ))}
      </ReportsSurvivorsChartLabels>
    </ReportsSurvivorsChart>
  );
}

export default ReportsSurvivors;

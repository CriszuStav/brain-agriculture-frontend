import { PieChart } from '@mui/x-charts';

export function PieChartComponent(props: any) {
  return (
    <PieChart
      margin={{ top: 20 }}
      slotProps={{
        legend: {
          itemMarkWidth: 7,
          itemMarkHeight: 7,
          markGap: 5,
          itemGap: 10,
          labelStyle: {
            color: 'text.primary',
            fontSize: 14,
          }
        }
      }}
      series={props.series}
      width={350}
      height={250}
      {...props}
    />
  );
}
import * as React from 'react';
import { BarChart, LineChart } from '@mui/x-charts';
import Container from '@mui/material/Container';
import { tGroup } from "../groupdata";
import SettingChart from "./SettingChart";

type GroupProps = {
  data: tGroup;
};

type tSeries = {
  'Максимальная высота': boolean;
  'Средняя высота': boolean;
  'Минимальная высота': boolean;
};

function GroupChart({ data }: GroupProps) {
  const [series, setSeries] = React.useState<tSeries>({
    'Максимальная высота': true,
    'Средняя высота': false,
    'Минимальная высота': false,
  });

  const [isBar, setIsBar] = React.useState(true);

  const chartSetting = {
    yAxis: [{ label: 'Высота (м)' }],
    height: 400,
  };

  let seriesY = Object.entries(series)
    .filter(item => item[1] === true)
    .map(item => {
      return { "dataKey": item[0], "label": item[0] };
    });

  const barLabel = seriesY.length === 1 ? "value" : undefined;

  return (
    <Container maxWidth="lg">
      <SettingChart
        series={series}
        setSeries={setSeries}
        isBar={isBar}
        setIsBar={setIsBar}
      />
      {isBar ? (
        <BarChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
          series={seriesY.map(s => ({ ...s, barLabel }))}
          slotProps={{
            legend: { position: { vertical: 'bottom', horizontal: 'middle' } },
          }}
          {...chartSetting}
        />
      ) : (
        <LineChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
          series={seriesY}
          slotProps={{
            legend: { position: { vertical: 'bottom', horizontal: 'middle' } },
          }}
          {...chartSetting}
        />
      )}
    </Container>
  );
}

export default GroupChart;
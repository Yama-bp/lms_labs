import * as React from 'react';
import { BarChart, LineChart } from '@mui/x-charts';
import Container from '@mui/material/Container';
import { tGroup } from "../groupdata";
import SettingChart from "./SettingChart";

type GroupProps = { data: tGroup; };

type tSeries = {
  'Максимальная популярность': boolean;
  'Средняя популярность': boolean;
  'Минимальная популярность': boolean;
};

function GroupChart({ data }: GroupProps) {
  const [series, setSeries] = React.useState<tSeries>({
    'Максимальная популярность': true,
    'Средняя популярность': false,
    'Минимальная популярность': false,
  });
  const [isBar, setIsBar] = React.useState(true);

  const chartSetting = { yAxis: [{ label: 'Популярность (млн)' }], height: 400 };

  let seriesY = Object.entries(series).filter(item => item[1] === true)
    .map(item => ({ "dataKey": item[0], "label": item[0] }));

  const barLabel = seriesY.length === 1 ? "value" : undefined;

  return (
    <Container maxWidth="lg">
      <SettingChart series={series} setSeries={setSeries} isBar={isBar} setIsBar={setIsBar} />
      {isBar ? (
        <BarChart dataset={data} xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
          series={seriesY.map(s => ({ ...s, barLabel }))} {...chartSetting} />
      ) : (
        <LineChart dataset={data} xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]} series={seriesY} {...chartSetting} />
      )}
    </Container>
  );
}

export default GroupChart;
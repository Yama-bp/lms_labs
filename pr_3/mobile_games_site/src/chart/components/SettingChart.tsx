import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

type tSeries = {
  'Максимальная популярность': boolean;
  'Средняя популярность': boolean;
  'Минимальная популярность': boolean;
};

type CheckboxProps = {
  series: tSeries;
  setSeries: React.Dispatch<React.SetStateAction<tSeries>>;
  isBar: boolean;
  setIsBar: React.Dispatch<React.SetStateAction<boolean>>;
};

function SettingChart({ series, setSeries, isBar, setIsBar }: CheckboxProps) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeries({ ...series, [event.target.name]: event.target.checked });
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsBar(event.target.value === "bar");
  };

  return (
    <Stack direction="row"
      divider={<Divider orientation="vertical" flexItem />} spacing={2} sx={{ m: "20px 0", justifyContent: 'center' }}>
      <FormControl>
        <FormLabel>Тип диаграммы:</FormLabel>
        <RadioGroup name="group-radio" value={isBar ? "bar" : "dot"} onChange={handleRadioChange}>
          <FormControlLabel value="bar" control={<Radio checked={isBar} />} label="Гистограмма" />
          <FormControlLabel value="dot" control={<Radio checked={!isBar} />} label="Линейная" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>На диаграмме показать:</FormLabel>
        <FormControlLabel control={<Checkbox checked={series["Максимальная популярность"]}
          onChange={handleCheckboxChange} name="Максимальная популярность" />} label="максимальную" />
        <FormControlLabel control={<Checkbox checked={series["Средняя популярность"]}
          onChange={handleCheckboxChange} name="Средняя популярность" />} label="среднюю" />
        <FormControlLabel control={<Checkbox checked={series["Минимальная популярность"]}
          onChange={handleCheckboxChange} name="Минимальная популярность" />} label="минимальную" />
      </FormControl>
    </Stack>
  );
}

export default SettingChart;
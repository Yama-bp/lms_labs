import * as React from 'react';
import { useState, useEffect } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GroupGrid from "./components/GroupGrid";
import GroupChart from "./components/GroupChart";
import { fetchAggregate } from "../api";

type tSelect = "Издатель" | "Год" | "Тип";

function ChartPage() {
  const [group, setGroup] = useState<tSelect>("Издатель");
  const [groupData, setGroupData] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      let type = 'by-publisher';
      if (group === 'Год') type = 'by-year';
      else if (group === 'Тип') type = 'by-type';
      
      const data = await fetchAggregate(type);
      if (data.success) {
        const formatted = data.data.map((item: any, idx: number) => ({
          id: idx + 1,
          'Группа': item.name,
          'Максимальная популярность': item.max_popularity,
          'Минимальная популярность': item.min_popularity,
          'Средняя популярность': item.avg_popularity,
        }));
        setGroupData(formatted);
      }
    };
    load();
  }, [group]);

  const handleChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value as tSelect);
  };

  return (
    <div>
      <Navbar active="3" />
      <Box sx={{ width: "250px", m: "20px auto" }}>
        <FormControl fullWidth>
          <InputLabel>Группировать по</InputLabel>
          <Select value={group} label="Группировать по" onChange={handleChange}>
            <MenuItem value="Издатель">Издателю</MenuItem>
            <MenuItem value="Год">Году</MenuItem>
            <MenuItem value="Тип">Типу</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {groupData.length > 0 && (
        <>
          <GroupChart data={groupData} />
          <GroupGrid data={groupData} />
        </>
      )}
      <Footer />
    </div>
  );
}

export default ChartPage;
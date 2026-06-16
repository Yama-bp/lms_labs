import * as React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GroupGrid from "./components/GroupGrid";
import GroupChart from "./components/GroupChart";
import { publishers, years, types, tGroup } from "./groupdata";

type tSelect = "Издатель" | "Год" | "Тип";

function ChartPage() {
  const [group, setGroup] = React.useState<tSelect>("Издатель");
  const [groupData, setGroupData] = React.useState<tGroup>(publishers);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as tSelect;
    setGroup(value);
    if (value === "Издатель") setGroupData(publishers);
    else if (value === "Год") setGroupData(years);
    else if (value === "Тип") setGroupData(types);
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
      <GroupChart data={groupData} />
      <GroupGrid data={groupData} />
      <Footer />
    </div>
  );
}

export default ChartPage;
import games from "../gamesData";
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

function GamesGrid() {
  const rows: GridRowsProp = games;
  const columns: GridColDef[] = [
    { field: 'Название', headerName: 'Название', flex: 1 },
    { field: 'Издатель', flex: 0.7 },
    { field: 'Год выхода', flex: 0.3 },
    { field: 'Игроков (млн)', flex: 0.4 },
    { field: 'Тип подсчёта', flex: 0.5 },
  ];

  return (
    <Container maxWidth="lg" sx={{ height: '700px', mt: '20px', mb: 4 }}>
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
      />
    </Container>
  );
}

export default GamesGrid;
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

function GamesGrid({ data }: { data: any[] }) {
  const rows: GridRowsProp = data.map((g: any) => ({
    id: g.id,
    Название: g.title,
    Издатель: g.publishers ? g.publishers.join(', ') : '',
    'Год выхода': g.release_year,
    'Игроков (млн)': g.player_count,
    'Тип подсчёта': g.count_type,
  }));

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
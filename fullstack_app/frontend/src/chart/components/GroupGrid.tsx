import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

type GroupProps = { data: any[]; };

function GroupGrid({ data }: GroupProps) {
  const rows: GridRowsProp = data;
  const columns: GridColDef[] = [
    { field: 'Группа', headerName: 'Группа', flex: 1 },
    { field: 'Максимальная популярность', flex: 1 },
    { field: 'Минимальная популярность', flex: 1 },
    { field: 'Средняя популярность', flex: 1 },
  ];

  return (
    <Container maxWidth="lg" sx={{ height: '500px', mt: '20px', mb: '20px' }}>
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
      />
    </Container>
  );
}

export default GroupGrid;
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchGames, createGame, updateGame, deleteGame, fetchPublishers } from '../api';

function AdminPage() {
  const [games, setGames] = useState<any[]>([]);
  const [allPublishers, setAllPublishers] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [editGame, setEditGame] = useState<any>(null);
  const [form, setForm] = useState({
    title: '', release_year: 2020, player_count: 0, count_type: '', description: '', image_url: '', publishers: [] as string[]
  });

  const loadGames = async () => {
    const data = await fetchGames({ per_page: '100' });
    if (data.success) setGames(data.games);
  };

  const loadPublishers = async () => {
    const data = await fetchPublishers();
    if (data.success) setAllPublishers(data.publishers.map((p: any) => p.name));
  };

  useEffect(() => { loadGames(); loadPublishers(); }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'title', headerName: 'Название', flex: 1 },
    { field: 'release_year', headerName: 'Год', width: 80 },
    { field: 'player_count', headerName: 'Игроков (млн)', width: 130 },
    { field: 'count_type', headerName: 'Тип', width: 150 },
    {
      field: 'publishers', headerName: 'Издатели', width: 200, sortable: false,
      renderCell: (params: any) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {(params.value || []).map((p: string, i: number) => (
            <Chip key={i} label={p} size="small" variant="outlined" />
          ))}
        </Box>
      )
    },
    {
      field: 'actions', headerName: 'Действия', width: 200, sortable: false,
      renderCell: (params: any) => (
        <Box>
          <Button size="small" onClick={() => handleEdit(params.row)}>Ред.</Button>
          <Button size="small" color="error" onClick={() => handleDelete(params.row.id)}>Уд.</Button>
        </Box>
      )
    },
  ];

  const handleEdit = (game: any) => {
    setEditGame(game);
    setForm({
      title: game.title, release_year: game.release_year, player_count: game.player_count,
      count_type: game.count_type, description: game.description || '', image_url: game.image_url || '',
      publishers: game.publishers || []
    });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteGame(id);
    loadGames();
  };

  const handleSave = async () => {
    if (editGame) {
      await updateGame(editGame.id, form);
    } else {
      await createGame(form);
    }
    setOpen(false);
    setEditGame(null);
    setForm({ title: '', release_year: 2020, player_count: 0, count_type: '', description: '', image_url: '', publishers: [] });
    loadGames();
  };

  return (
    <div>
      <Navbar active="5" />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>Управление играми (CRUD)</Typography>
        <Button variant="contained" sx={{ mb: 2 }} onClick={() => { setEditGame(null); setForm({ title: '', release_year: 2020, player_count: 0, count_type: '', description: '', image_url: '', publishers: [] }); setOpen(true); }}>Добавить игру</Button>
        <DataGrid
          rows={games}
          columns={columns}
          autoHeight
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          getRowHeight={() => 'auto'}
          sx={{ '& .MuiDataGrid-cell': { py: 1 } }}
        />
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editGame ? 'Редактировать игру' : 'Добавить игру'}</DialogTitle>
          <DialogContent>
            <TextField fullWidth label="Название" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} sx={{ mt: 2 }} />
            <TextField fullWidth label="Год выхода" type="number" value={form.release_year} onChange={e => setForm({ ...form, release_year: parseInt(e.target.value) || 0 })} sx={{ mt: 2 }} />
            <TextField fullWidth label="Игроков (млн)" type="number" value={form.player_count} onChange={e => setForm({ ...form, player_count: parseFloat(e.target.value) || 0 })} sx={{ mt: 2 }} />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Тип подсчёта</InputLabel>
              <Select value={form.count_type} label="Тип подсчёта" onChange={e => setForm({ ...form, count_type: e.target.value })}>
                <MenuItem value="daily players">daily players</MenuItem>
                <MenuItem value="monthly players">monthly players</MenuItem>
                <MenuItem value="peak daily players">peak daily players</MenuItem>
                <MenuItem value="peak monthly players">peak monthly players</MenuItem>
                <MenuItem value="total downloads">total downloads</MenuItem>
              </Select>
            </FormControl>
            <TextField fullWidth label="Описание" multiline rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} sx={{ mt: 2 }} />
            <TextField fullWidth label="URL изображения" value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} sx={{ mt: 2 }} />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Издатели</InputLabel>
              <Select multiple value={form.publishers} onChange={e => {
                const val = e.target.value;
                setForm({ ...form, publishers: Array.isArray(val) ? val : [val] });
              }} input={<OutlinedInput label="Издатели" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => <Chip key={value} label={value} size="small" />)}
                  </Box>
                )}>
                {allPublishers.map((name) => (
                  <MenuItem key={name} value={name}>{name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Отмена</Button>
            <Button variant="contained" onClick={handleSave}>Сохранить</Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
    </div>
  );
}

export default AdminPage;
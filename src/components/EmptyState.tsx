import { Box, Button, Typography } from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';

export function EmptyState() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '100px'
      }}
    >
      <BarChartIcon sx={{ fontSize: 80, color: '#bbb', mb: 2 }} />
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Nenhum dado disponível
      </Typography>
      <Typography variant="body2" color="textSecondary" mb={2}>
        Parece que não há informações para exibir no momento.
      </Typography>
    </Box>
  );
}

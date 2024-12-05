import { TabPanel } from './TabPanel';
import { PieChartComponent } from './PieChart';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import { EmptyState } from './EmptyState';

export function Dashboard(props: any) {
  return (
    <TabPanel value={props.value} index={0}>
      {props.data.totalArea ? (
        <>
          <section style={{ marginBottom: '50px' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 5,
                marginTop: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  height: '40px',
                  bgcolor: 'background.paper',
                  color: 'text.secondary',
                  padding: '0px 15px',
                  gap: 3,
                  '& svg': {
                    m: 1,
                  },
                }}
              >
                <Typography fontWeight={600}>Total de fazendas</Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Typography>{props.data.totalFarms}</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  height: '40px',
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  color: 'text.secondary',
                  padding: '0px 10px',
                  gap: 5,
                  '& svg': {
                    m: 1,
                  },
                }}
              >
                <Typography fontWeight={600}>
                  Total de fazendas (em hectares)
                </Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Typography>
                  {props.data.totalArea.toLocaleString('pt-BR')}ha{' '}
                </Typography>
              </Box>
            </Box>
          </section>
          <Container>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Card>
                <CardContent>
                  <Typography sx={{ color: 'text.secondary', fontSize: 16 }}>
                    Fazendas por Estado
                  </Typography>
                  <PieChartComponent
                    margin={{
                      left: 12,
                      right: 12,
                      top: 12,
                      bottom: 40,
                    }}
                    slotProps={{
                      legend: {
                        itemMarkWidth: 7,
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: -5,
                        itemMarkHeight: 7,
                        markGap: 5,
                        itemGap: 10,
                        labelStyle: {
                          color: 'text.primary',
                          fontSize: 14,
                        },
                      },
                    }}
                    series={[
                      {
                        data: props.data?.farmsByState?.map((farm: any) => ({
                          value: farm.count,
                          label: farm.state,
                        })),
                      },
                    ]}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: 'text.secondary', fontSize: 16 }}
                  >
                    Fazendas por Cultura
                  </Typography>
                  <PieChartComponent
                    margin={{
                      left: 12,
                      right: 12,
                      top: 12,
                      bottom: 40,
                    }}
                    slotProps={{
                      legend: {
                        itemMarkWidth: 7,
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: 5,
                        itemMarkHeight: 7,
                        markGap: 5,
                        itemGap: 10,
                        labelStyle: {
                          color: 'text.primary',
                          fontSize: 14,
                        },
                      },
                    }}
                    series={[
                      {
                        data: props.data?.farmsByCulture?.map((farm: any) => ({
                          value: farm.count,
                          label: farm.culture,
                        })),
                      },
                    ]}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: 'text.secondary', fontSize: 16 }}
                  >
                    Uso do Solo
                  </Typography>
                  <PieChartComponent
                    margin={{
                      left: 12,
                      right: 12,
                      top: 12,
                      bottom: 40,
                    }}
                    slotProps={{
                      legend: {
                        itemMarkWidth: 7,
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: 5,
                        itemMarkHeight: 7,
                        markGap: 5,
                        itemGap: 10,
                        labelStyle: {
                          color: 'text.primary',
                          fontSize: 14,
                        },
                      },
                    }}
                    series={[
                      {
                        data: props.data.landUsage.map((land: any) => ({
                          value: land.area,
                          label: land.type,
                        })),
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </Box>
          </Container>
        </>
      ) : (
        <EmptyState />
      )}
    </TabPanel>
  );
}

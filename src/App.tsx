import './App.css';
import { Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { ApiService } from './services/api.service';
import { ProductorsList } from './components/ProductorsList';

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function App() {
  const api = new ApiService();
  // const [value, setValue] = React.useState(0);
  const [produtores, setProdutores] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData]: any = useState({
    farmsByState: [],
    farmsByCulture: [],
    landUsage: [],
    totalArea: 0,
    totalFarms: 0,
  });

  const fetchProdutores = async () => {
    const response = await api.getPorudores();

    setProdutores(response.data);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    (async () => {
      const dashboardInfos = await api.getDashboardInfos();
      if(dashboardInfos.data) {
        setData(dashboardInfos.data);
      }

      await fetchProdutores();
    })();
  }, [selectedTab]);

  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo.png" alt="logo" />
      </header>

      <Tabs
        value={selectedTab}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Dashboard" {...a11yProps(0)} />
        <Tab label="Produtores" {...a11yProps(1)} />
      </Tabs>

      <Dashboard value={selectedTab} index={0} data={data} />
      <ProductorsList
        value={selectedTab}
        index={1}
        produtores={produtores}
        handleUpdateProductors={fetchProdutores}
      />
    </div>
  );
}

export default App;

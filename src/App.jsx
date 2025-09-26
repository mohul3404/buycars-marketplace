import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import AddCarPage from './pages/AddCarPage';
import Navbar from './components/Navbar';
import ViewInventoryPage from './pages/ViewInventoryPage';

function App() {
  const [carList, setCarList] = useState([]);
  const navigate = useNavigate();


  const [priceFilter, setPriceFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [mileageFilter, setMileageFilter] = useState('');


  useEffect(() => {
    const params = new URLSearchParams();
    if (priceFilter) params.append('maxPrice', priceFilter);
    if (mileageFilter) params.append('maxMileage', mileageFilter);
    if (colorFilter) params.append('color', colorFilter);

    const queryString = params.toString();
    
    fetch(`http://localhost:3001/api/inventory?${queryString}`)
      .then(res => res.json())
      .then(data => setCarList(data))
      .catch(err => console.error("Failed to fetch cars:", err));
  }, [priceFilter, mileageFilter, colorFilter]);

  const handleDelete = async (idToDelete) => {
    try {
      const response = await fetch(`http://localhost:3001/api/inventory/${idToDelete}`, { method: 'DELETE' });
      if (response.ok) {
        setCarList(carList.filter(car => car.id !== idToDelete));
      }
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  const handleAddCar = async (newCarData) => {
    try {
      const response = await fetch('http://localhost:3001/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCarData),
      });
      if (response.ok) {
        const addedCar = await response.json();
        setCarList(prevList => [addedCar, ...prevList]);
        navigate('/inventory');
      }
    } catch (error) {
      console.error("Failed to add car:", error);
    }
  };

  const handleUpdateCar = async (updatedCarData) => {
    try {
      const response = await fetch(`http://localhost:3001/api/inventory/${updatedCarData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCarData),
      });
      if (response.ok) {
        const updatedCar = await response.json();
        setCarList(prevList =>
          prevList.map(car => car.id === updatedCar.id ? updatedCar : car)
        );
        navigate('/inventory');
      }
    } catch (error) {
      console.error("Failed to update car:", error);
    }
  };

  const handleDeleteSelected = (selectedIds) => {
    selectedIds.forEach(id => handleDelete(id));
  };


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/inventory"
          element={
            <ViewInventoryPage
              cars={carList}
              onDelete={handleDelete}
              onDeleteSelected={handleDeleteSelected}
              price={priceFilter}
              onPriceChange={setPriceFilter}
              color={colorFilter}
              onColorChange={setColorFilter}
              mileage={mileageFilter}
              onMileageChange={setMileageFilter}
            />
          }
        />
        <Route
          path="/add-car"
          element={<AddCarPage onAddCar={handleAddCar} />}
        />
        <Route
          path="/edit-car/:carId"
          element={
            <AddCarPage
              cars={carList}
              onUpdateCar={handleUpdateCar}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
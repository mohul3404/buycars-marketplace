import { useState } from 'react';
import CarCard from '../components/CarCard';
import Filters from '../components/Filters';
import './ViewInventoryPage.css';

function ViewInventoryPage({ cars, onDelete, onDeleteSelected, price, onPriceChange, color, onColorChange, mileage, onMileageChange }) {
  const [selectedCars, setSelectedCars] = useState([]);

  const handleSelectCar = (id) => {
    setSelectedCars(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(carId => carId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleDeleteClick = () => {
    onDeleteSelected(selectedCars);
    setSelectedCars([]);
  };

  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <div>
          <h1>My Inventory</h1>
          <p>Here are all the cars you have listed for sale.</p>
        </div>
        {selectedCars.length > 0 && (
          <button onClick={handleDeleteClick} className="delete-selected-btn">
            Delete Selected ({selectedCars.length})
          </button>
        )}
      </div>
      
      <Filters 
        price={price}
        onPriceChange={onPriceChange}
        color={color}
        onColorChange={onColorChange}
        mileage={mileage}
        onMileageChange={onMileageChange}
      />

      <div className="inventory-grid">
        {cars.map(car => (
          <CarCard 
            key={car.id} 
            car={car} 
            onDelete={() => onDelete(car.id)}
            onSelect={() => handleSelectCar(car.id)}
            isSelected={selectedCars.includes(car.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ViewInventoryPage;
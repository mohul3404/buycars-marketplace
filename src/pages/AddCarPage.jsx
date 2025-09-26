import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AddCarPage.css';

const initialFormState = {
  title: '',
  imageUrl: '',
  kms_on_odometer: '',
  listingPrice: '',
  description: ['', '', '', '', ''],
};

function AddCarPage({ cars, onAddCar, onUpdateCar }) {
  const [formData, setFormData] = useState(initialFormState);
  const { carId } = useParams();
  const navigate = useNavigate();
  
  const isEditMode = Boolean(carId);

  useEffect(() => {
    if (isEditMode) {
      const carToEdit = cars.find(car => car.id === Number(carId));
      if (carToEdit) {
        setFormData(carToEdit);
      }
    }
  }, [carId, cars, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDescriptionChange = (index, value) => {
    const newDescription = [...formData.description];
    newDescription[index] = value;
    setFormData(prev => ({ ...prev, description: newDescription }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      onUpdateCar(formData);
    } else {
      onAddCar(formData);
    }
  };

  return (
    <div className="add-car-container">
      <div className="add-car-card">
        <h2>{isEditMode ? 'Edit Car Details' : 'Add New Car to Inventory'}</h2>
        <p>{isEditMode ? 'Update the details below.' : 'Fill out the details of the car you want to list.'}</p>
        
        <form onSubmit={handleSubmit} className="add-car-form">
          <div className="form-group">
            <label htmlFor="title">Car Title</label>
            <input type="text" id="title" name="title" value={formData.title || ''} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label htmlFor="listingPrice">Listing Price (₹)</label>
            <input type="number" id="listingPrice" name="listingPrice" value={formData.listingPrice || ''} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="kms_on_odometer">Kilometers on Odometer</label>
            <input type="number" id="kms_on_odometer" name="kms_on_odometer" value={formData.kms_on_odometer || ''} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Description (5 Bullet Points)</label>
            {formData.description.map((point, index) => (
              <input 
                key={index}
                type="text" 
                value={point || ''}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                placeholder={`Bullet point ${index + 1}`} 
                className="desc-input" 
                required
              />
            ))}
          </div>

          <button type="submit" className="submit-button">
            {isEditMode ? 'Save Changes' : 'Add Car'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCarPage;
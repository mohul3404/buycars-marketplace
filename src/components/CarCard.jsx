import { Link } from 'react-router-dom';
import './CarCard.css';

function CarCard({ car, onDelete, onSelect, isSelected }) {
  const formatPrice = (price) => {
    if (!price) return 'Price not available';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="car-card">
      <input 
        type="checkbox" 
        className="card-checkbox" 
        onChange={onSelect}
        checked={isSelected}
      />
      <img src={car.imageUrl} alt={car.title} className="car-image" />
      <div className="car-info">
        <h3 className="car-title">{car.title}</h3>
        
        <p className="car-price">{formatPrice(car.listingPrice)}</p>
        
        <ul className="car-description">
          {car.description && car.description.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
        <div className="card-actions">
          <Link to={`/edit-car/${car.id}`} className="edit-btn">
            Edit
          </Link>
          <button className="delete-btn" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
import './Filters.css';

function Filters({ price, onPriceChange, color, onColorChange, mileage, onMileageChange }) {
  return (
    <div className="filters-container">
      <div className="filter-group">
        <label htmlFor="price">Price</label>
        <select id="price" name="price" value={price} onChange={(e) => onPriceChange(e.target.value)}>
          <option value="">Any Price</option>
          <option value="1000000">Under ₹10,00,000</option>
          <option value="1500000">Under ₹15,00,000</option>
          <option value="2000000">Under ₹20,00,000</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="color">Color</label>
        <select id="color" name="color" value={color} onChange={(e) => onColorChange(e.target.value)}>
          <option value="">Any Color</option>
          <option value="Red">Red</option>
          <option value="White">White</option>
          <option value="Black">Black</option>
          <option value="Silver">Silver</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="mileage">Mileage</label>
        <select id="mileage" name="mileage" value={mileage} onChange={(e) => onMileageChange(e.target.value)}>
          <option value="">Any Mileage</option>
          <option value="20000">Under 20,000 km</option>
          <option value="40000">Under 40,000 km</option>
          <option value="60000">Under 60,000 km</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
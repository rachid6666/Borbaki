import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      {item.photos && item.photos.length > 0 && (
        <img src={item.photos[0]} alt="picture" className="siImg" />
      )}
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
      
        <span className="siSubtitle">
          {item.address}
        </span>
        <span className="siFeatures">{item.desc}</span>
       
        <span className="siCancelOpSubtitle">
          {item.address}
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span>Starts from</span>
          <span className="siPrice">€{item.cheapestPrice}</span>

          <span className="siTaxOp"></span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">View Rooms</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;

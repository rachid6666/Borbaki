import "../featuredProperties/featuredProperties.css";
import "./chooseforyou.css"
import useFetch from './../../hook/useFetch';

const ChooseForYou = () => {

  const { data, loading, error } = useFetch("/hotels/chooseforyou");

  return (
    <div className="fp">
      {loading ? (
         <div class="loader"></div>
      
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from €{item.cheapestPrice}</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ChooseForYou;

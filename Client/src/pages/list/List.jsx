import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from './../../hook/useFetch';
import PriceRangeSlider from "../../components/priceSlider/PriceRangeSlider";
import Footer from "../../components/footer/Footer"
const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)

  const handleClick = () => {
    reFetch();
  }
  const handlePriceChange = (newPrice) => {
    setMax(newPrice);
  };

  return (
    <div>
      <Navbar style='position: sticky;' />

      {/* <Header type="list" /> */}
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">

            <div className="lsItem">
              <label> <span className="desName">{destination}  Hotels </span>  </label>


            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">

              <div className="lsOptions">

              </div>
              <div className="sliderPrice">
                <PriceRangeSlider onChange={handlePriceChange}></PriceRangeSlider>
              </div>
            </div>

            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? <div className="watting">
              <div class="loader"></div>
            </div> :
              error ? "error connection" :
                data.length === 0 ? "no available hotels" :
                  <>
                    {data.map(item => (
                      <SearchItem item={item} key={item._id} />
                    ))}
                  </>}
          </div>
        </div>

      </div>
      <Footer />

    </div>
  );
};

export default List;

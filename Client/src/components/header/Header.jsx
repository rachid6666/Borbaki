import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPizzaSlice,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState, useContext,useEffect } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "./../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

import imageSlider from './dataBgImg.js'

const Header = ({ type }) => {

  const [currentState,setCurrentState] = useState(0)
  useEffect(()=>{
      const timer = setTimeout(() => {
          if (currentState===2){
              setCurrentState(0)
          }else{
              setCurrentState(currentState+1)
          }
          
      }, 5000);
  }

  )
  const bgImageStyle={
      backgroundImage : `url(${imageSlider[currentState].url})`,
      backgroundPosition : 'center',
      backgroundSize:'cover',
      height:'100%',
 
      width:'100%'     
      

  }
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const handleSearch = () => {
      dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
      navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="header">
     <div style={bgImageStyle}>


     
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          {/* <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPizzaSlice} />
            <span>Resturant</span>
          </div> */}
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
            Start Discovering Algeria.
            </h1>
            <p className="headerDesc">
            Create Your North African Adventure: Explore, Discover, Experience.
            </p>
            {!user && <Link to="/login"><button className="headerBtn">Sign in / Register</button></Link>}{" "}
         
            <div className='transparent-Background'>
               </div>
            <div className="headerSearch">
              
              <div className="headerSearchItem">
            
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  onClick={ ()=>setOpenDate(!openDate)}
                  placeholder="Hotel,City..."
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => {
                    setOpenOptions(false);
                    setOpenDate(!openDate);

                  }
                  }
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")}  -  ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                    <div className="dateContainer">
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDates([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dates}
                        className="date"
                        rangeColors={["#000000"]}
                        minDate={new Date()}
                      />
                    </div>
                  )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => 
                    {
                      setOpenOptions(!openOptions)
                  
                      setOpenDate(false);
  
                    }
                    
                    }
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
            
          </>
          
        )}
      </div>
      
      </div>
      <div className='transparent-Background-bottom'></div>
    </div>
  );
};

export default Header;

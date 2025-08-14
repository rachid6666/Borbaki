import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";

const Single = () => {

  const location = useLocation();
  const [userSingle, setUserSingle] = useState()
  useEffect(() => {
    // console.log("location", location.state)
    setUserSingle(location.state);
  }, [location.state]);

  useEffect(() => {
    console.log(userSingle);
  }, [userSingle]);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={userSingle && userSingle.user.img}
                alt="userimage"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{userSingle && (<>{userSingle.user.username}</>)}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email: </span>
                  <span className="itemValue">{userSingle && (<>{userSingle.user.email}</>)}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{userSingle && (<>{userSingle.user.phone}</>)}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {userSingle && (<>{userSingle.user.city}</>)}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{userSingle && (<>{userSingle.user.country}</>)}</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        {/* <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div> */}
      </div>
    </div>
  );
};

export default Single;

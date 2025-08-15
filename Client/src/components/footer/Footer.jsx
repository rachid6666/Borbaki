import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="fContainer">
        <div className="fColumn">
          <h4 className="fTitle">Explore</h4>
          <ul className="fList">
            <li className="fListItem">Countries</li>
            <li className="fListItem">Regions</li>
            <li className="fListItem">Cities</li>
            <li className="fListItem">Hotels</li>
          </ul>
        </div>

        <div className="fColumn">
          <h4 className="fTitle">Company</h4>
          <ul className="fList">
            <li className="fListItem">About Us</li>
            <li className="fListItem">Careers</li>
            <li className="fListItem">Privacy Policy</li>
            <li className="fListItem">Help Center</li>
            <li className="fListItem">FAQ</li>
          </ul>
        </div>

        <div className="fColumn">
          <h4 className="fTitle">Services</h4>
          <ul className="fList">
            <li className="fListItem">Car Rental</li>
            <li className="fListItem">Hotel Finder</li>
          </ul>
        </div>

        <div className="fColumn">
          <h4 className="fTitle">Follow Us</h4>
          <div className="socialIcons">
            <span className="icon">🌐</span>
            <span className="icon">🐦</span>
            <span className="icon">📘</span>
            <span className="icon">📸</span>
          </div>
        </div>
      </div>

      <div className="fBottom">© 2025 YG.Ltd. All rights reserved.</div>
    </footer>
  );
};

export default Footer;

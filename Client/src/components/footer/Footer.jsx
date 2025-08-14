import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem">Countries</li>
          <li className="fListItem">Regions</li>
          <li className="fListItem">Cities</li>
          <li className="fListItem">Hotels</li>
        </ul>

        <ul className="fList">
          <li className="fListItem">Privacy Policy</li>
          <li className="fListItem">About US</li>
          <li className="fListItem">Careers</li>
          <li className="fListItem">help Center</li>
          <li className="fListItem">FAQ</li>

        </ul>
        
        <ul className="fList">
          <li className="fListItem">Car rental </li>
          <li className="fListItem">Hotel Finder</li>
  
        </ul>
        <ul className="fList">
          <li className="fListItem">Follow us on : </li>
          
       
        </ul>

      </div>
      <div className="fText">dz-tourism</div>
    </div>
  );
};

export default Footer;

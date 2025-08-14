import "./featured.css";
import useFetch from "../../hook/useFetch";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=alger,oran,constantine"
  );
  return (
    <div className="featured">
      {loading ? (
         <div class="loader"></div>
        
      ) : (
        <>
          <div className="featuredItem" >
          
            <img
              src="./img/alger.jpg"
              alt=""
              className="featuredImg"
              
            />
            <div className="featuredTitles">
              <h1>ALGER</h1>
              <h2>{data[0]} Hotels </h2>
            </div>
            
            <div className="paragprah1">
                <p>
                <h1>Algiers, </h1>
                <h2> Inattendue et Conviviale</h2>

                      Ville Historique et Terre d'Aventures

                      Expositions, concerts, festivals… la Ville Blanche a toujours 
                      plein d’événements à l’affiche ! Et pour les plus gourmands, 
                      il y a toujours un nouveau restaurant à découvrir.
                </p> 
              </div>
            
          </div>
         
          
          

          <div className="featuredItem2">
   
            <img
              src="./img/oranVille.jpg"
              alt=""
              className="featuredImg2"
            />
            
           
            <div className="featuredTitles2">
              <div className="titleOran">
              <h1>ORAN</h1>
              <h2>{data[1]} Hotels</h2>
              
              </div>
              
              <div className="paragprah2">
                <p>
                <h1>ORAN</h1>
                <h2> Ville Portuaire et Terre de Rencontres</h2>
                 Oran, surnommée «Wahrān» et « la Joyeuse », 
                 est la deuxième ville d’Algérie par sa population et 
                 l'une des plus importantes villes du Maghreb.
                 C'est une ville portuaire de la mer Méditerranée,
                </p> 
              </div>
            
            </div>
          </div>
          <div className="featuredItem3">
            <img
              src="./img/const.jpg"
              alt=""
              className="featuredImg3"
            />
            <div className="featuredTitles3">
              <h1>CONSTANTINE</h1>
              <h2>{data[2]} Hotels</h2>
            </div>
            <div className="paragprah2">
                <p>
                <h1>Constantine</h1>
                <h2> City of Bridges and Ancient Splendor</h2>
                Towering bridges lace across a dramatic gorge, 
                a testament to both its strategic location and impressive engineering feats.  
                 A place where history and present intertwine.

                </p> 
              </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;

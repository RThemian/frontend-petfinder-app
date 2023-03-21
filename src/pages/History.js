import React from 'react';
import { Link } from 'react-router-dom';

const History = ({ dbAnimals, setDbAnimals, setSelectedPet, getAnimalsData }) => {
  
    if(dbAnimals.length === 0) {
        getAnimalsData();
    }
  



  return (
    <div className="displayPetDiv">
      <h1 className="available">Previously Viewed Animals</h1>
      <ul>
        {dbAnimals?.map(dbAnimal => (
          <li className="indexCard" key={dbAnimal._id}>
            <Link to={`/pet/${dbAnimal.id}`} onClick={() => setSelectedPet(dbAnimal)}>
              <h2 className="petName">{dbAnimal.name}</h2>
              <img className="pic" src={dbAnimal.photos.length > 0 ? dbAnimal.photos[0].medium : ''} alt={dbAnimal.name} />
            </Link>
            {/* published_at transformed into MM-DD-YYYY */}
            <p className="indexAge">{dbAnimal.published_at.slice(5,7) + "-" + dbAnimal.published_at.slice(8,10) + "-" + dbAnimal.published_at.slice(0,4)}</p>
            <p className="indexAge">{dbAnimal.age}</p>
            <p className="indexLocation">{dbAnimal.contact.address.city}, {dbAnimal.contact.address.state}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default History;

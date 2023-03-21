import axios from 'axios';
import React, { useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import DisplayPets from './../components/DisplayPets';

async function getZipcode() {
  try {
    const response = await axios.get("https://ipapi.co/json");
    const data = response.data;
    const zip = data.postal;
    console.log("zip", zip);
    if (/^\d{5}$/.test(zip)) {
      return zip;
    } else {
      throw new Error("Invalid zipcode format");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}


const API_KEY = 'baDs8oID8IQUpYQra2skjNjP61EYh11AjnR8WgbuW0rl1bS611';
const API_SECRET = 'KvPewNgFx2D8PXJMnI2ppPGanvqPNS2oP4trSHtj';
const AUTH_ENDPOINT = 'https://api.petfinder.com/v2/oauth2/token';
const API_ENDPOINT = 'https://api.petfinder.com/v2';

function Index({ 
  animals, 
  setAnimals, 
  animalType, 
  setAnimalType, selectedPet, 
  setSelectedPet, getPets, removeSpecChar,
  deletePets, saveAnimalsData, dbAnimals, getAnimalsData, user }) {
  

    console.log("user", user)
    const [zipcode, setZipcode] = useState('');
    const [isZipcodeProvided, setIsZipcodeProvided] = useState(false);

    useEffect(() => {
      const getLocation = async () => {
        try {
          const zip = await getZipcode();
          setZipcode(zip);
          setIsZipcodeProvided(true);
        } catch (error) {
          console.error(error);
          setIsZipcodeProvided(false);
        }
      };
      getLocation();
    }, []);


    const handleZipcodeChange = (event) => {
      setZipcode(event.target.value);
    };
  
    const handleZipcodeSubmit = (event) => {
      event.preventDefault();
      if (/^\d{5}$/.test(zipcode)) {
        setIsZipcodeProvided(true);
      } else {
      // add temporary error message to submit only valid zipcodes to className = "location-error"
        // style the error message to display in red
        document.querySelector('.location-error').style.color = 'red';
        document.querySelector('.location-error').innerHTML = 'Please enter a valid zipcode';

        setTimeout(() => {
          document.querySelector('.location-error').innerHTML = '';
        }
        , 3000);

        

        
      }
    };
    

  const handleAnimalTypeChange = (event) => {
    setAnimalType(event.target.value);
  };

  const handleGetAnimals = useCallback(() => {
    let token;
    axios.post(AUTH_ENDPOINT, {
      grant_type: 'client_credentials',
      client_id: API_KEY,
      client_secret: API_SECRET
    })
      .then(response => {
        token = response.data.access_token;
        return axios.get(`${API_ENDPOINT}/animals?type=${animalType}&location=${zipcode}&page=1`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      })
      .then(response => {
        console.log("animals", response.data.animals)
        //filter out animals without photos and use removeSpecChar function to remove special characters
         let filteredAnimals = response.data.animals.filter(animal => animal.photos.length > 0 );
       
        // filteredAnimals.forEach(animal => {
        //   animal.name = removeSpecChar(animal.name);
        //   animal.description = removeSpecChar(animal.description);  
        // })


        setAnimals(filteredAnimals.slice(0, 19));
       
        // only run saveAnimalsData if user is logged in
        if (user) {
          saveAnimalsData(filteredAnimals.slice(0, 19));
        }
        
        // saveAnimalsData(filteredAnimals.slice(0, 19));

      })
      .catch(error => {
        console.error(error);
      });
  }, [animalType, setAnimals, zipcode, user]);

  useEffect(() => {
    if (isZipcodeProvided && /^\d{5}$/.test(zipcode)) {
      handleGetAnimals();
    }
  }, [isZipcodeProvided, handleGetAnimals, zipcode, animalType]);
  

  
    

  return (
    <div>
      <div className='location-search' >
      
      <form onSubmit={handleZipcodeSubmit}>
        <label htmlFor="zipcode">Zipcode:</label>
        <input type="text" id="zipcode" name="zipcode" value={zipcode} onChange={handleZipcodeChange} />
        <button type="submit" >Search</button>
      </form>
      <div className="location-error"></div>
      </div>
      <div className='animals-button'>
        <input className='dog-button'
          type="radio"
          id="dog"
          name="animal-type"
          value="dog"
          checked={animalType === 'dog'}
          onChange={handleAnimalTypeChange}
        />
        <label htmlFor="dog">Dog</label>
        <input className='cat-button'
          type="radio"
          id="cat"
          name="animal-type"
          value="cat"
          checked={animalType === 'cat'}
          onChange={handleAnimalTypeChange}
        />
        <label htmlFor="cat">Cat</label>
        <input className='rabbit-button'
          type="radio"
          id="rabbit"
          name="animal-type"
          value="rabbit"
          checked={animalType === 'rabbit'}
          onChange={handleAnimalTypeChange}
        />
        <label htmlFor="rabbit">Rabbit</label>
        
       <Link to='/favorites' className='favorites-link' onClick={()=>getPets()}>
            <div className="favorites">View Favorites</div>
        </Link>
      </div>
      
      <div className='display-pet-div'>
      <DisplayPets deletePets={deletePets} dbAnimals= {dbAnimals} animalType ={animalType} animals={animals} selectedPet={selectedPet} setSelectedPet={setSelectedPet} />
      </div>
      </div>

   
  );
}

export default Index;
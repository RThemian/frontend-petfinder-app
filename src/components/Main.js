import { useState} from "react";
import {Routes, Route} from "react-router-dom";
import Index from "../pages/Index";
import ShowPet from "../pages/ShowPet";
import Favorites from "../pages/Favorites"
import History from "../pages/History"
import Header from "./Header";



const Main = ({user}) => {
  const [favoritePets, setFavoritePets] = useState([]); // returns from mongoDB
  const [animals, setAnimals] = useState([]);
  const [animalType, setAnimalType] = useState('dog');
  const [selectedPet, setSelectedPet] = useState({});
  const API_URL = "http://localhost:5001/petfinder"
  const [dbAnimals, setDbAnimals] = useState([]);

  const removeSpecChar = (props) => {
    if (props === null || props === undefined) {
      return "";
    }
    let result = props
      .replace(/&quot;/g, "''")
      .replace(/&#039;/g, "'")
      .replace(/&shy;/g, "-")
      .replace(/&amp;/g, "&")
      .replace(/&Iacute;/g, "í")
      .replace(/&uuml;/g, "ü")
      .replace(/&rsquo;/g, "’")
      .replace(/&eacute;/g, "é")
      .replace(/&Uuml;/g, "Ü");

    return result;
  };

// getPets favorited by the useremail
  const getPets = async () => {
    try {
      let token;
      console.log("user", user)
      if(user) {
        token = await user.getIdToken();
      
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
        
      });
      const data = await response.json();
      console.log("mongoDB get request", data)
      
      setFavoritePets(data);
    }
    } catch (error) {
      console.log("error", error)
    }
  }

// saves animals data from petFinder API to mongoDB 
  const saveAnimalsData = async (data) => {
    if(user) {
 try {
   
      console.log("USER",user)
      
        console.log("saveAnimalsData FRONTEND USER called");
        const token = await user.getIdToken();
        await fetch(`${API_URL}/save_animal_data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(data), // data should be an array of animal objects
        });
        console.log("Animals data saved successfully");
      
    } catch (error) {
      console.error("Error saving animal data: ", error);
    }
  } 
  };
  
  // get animals data from mongoDB
  const getAnimalsData = async () => {
    try { 
      if (user) {
        const token = await user.getIdToken();
        const response = await fetch(`${API_URL}/get_animal_data`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("Animals data retrieved successfully", data);
        setDbAnimals(data);
      }
    } catch (error) {
      console.error("Error retrieving animal data: ", error);
    }
  };





//creates a useremail favorite pets in mongoDB
  const createPets = async (pet) => {
    try {
      if(user) {
        const token = await user.getIdToken();
        await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(pet),
        });
        
      }
     
    } catch (error) {
    }
  }
  const deletePets = async (id) => {
    try {
      if(user) {
        const token = await user.getIdToken();
        await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        getPets();
        
      }
    } catch (error) {
      console.log("error", error)
    }
  }


// invoke useRef hook to create a ref
// create the mutable ref object and assign it to the current property
  // const getPetsRef = useRef(); // {current: null}
  // useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.
  // give example: https://reactjs.org/docs/hooks-reference.html#useref







  return (
    <>
    <Header 
    user={user} 
    getAnimalsData={getAnimalsData}
    getPets={getPets} 
     />
    <main>
      <Routes>
        <Route path="/" 
        element={
        <Index animals ={animals} 
        setAnimals={setAnimals} 
        animalType={animalType} 
        setAnimalType={setAnimalType} 
        selectedPet={selectedPet}
        setSelectedPet={setSelectedPet}
        getPets={getPets}
        user = {user}
        deletePets={deletePets}
        favoritePets={favoritePets}
        removeSpecChar={removeSpecChar}
        saveAnimalsData={saveAnimalsData}
        getAnimalsData={getAnimalsData}
        dbAnimals={dbAnimals}
        />} />
        <Route path="/pet/:id"
        element={
        <ShowPet animals={animals} 
        selectedPet={selectedPet} 
        createPets={createPets} 
        deletePets={deletePets} 
        />} />
        <Route path="/favorites"
        element={
        <Favorites favoritePets={favoritePets}
        selectedPet={selectedPet}
        setSelectedPet={setSelectedPet}
        deletePets={deletePets}

        />} />
        <Route path="/history"
        element={
        <History dbAnimals={dbAnimals}
        setDbAnimals={setDbAnimals}
        selectedPet={selectedPet}
        setSelectedPet={setSelectedPet}
        getAnimalsData={getAnimalsData}
        />} />

      </Routes>
    </main>
    </>
  )
}

export default Main
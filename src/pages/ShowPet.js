import { useNavigate } from 'react-router-dom';

const ShowPet = (props) => {
  
  const navigate = useNavigate();
  const pet = props.selectedPet;

  const addToFavorites = () => {
    props.createPets(pet);
    document.getElementById("favorite-added").innerHTML = "Added to favorites"; 
    document.getElementById("favorites").disabled = true;
    document.getElementById("favorites").value="I am your favorite ❤ ";
    setTimeout(function(){
      document.getElementById("favorite-added").innerHTML = "Take me home";
    }, 2000) };

 return (
  <div className='showContainer'>

    <div className='showPet'>
      <h1 className='showPetName'>{pet.name}</h1>

      <img className='showPic' src={pet.photos[0].medium} alt={pet.name} />
      <p className='showDescription'>{pet.description}</p>
      <p className='showBreed'>{pet.breed}</p>
      <p className='showAge'>{pet.age}</p>
      <p className='showGender'>{pet.gender}</p>
      <p className='showVid'>{pet.video}</p>
      <p className='showStatus'>{pet.status}</p>
      <p className='showEmail'>{pet.contact.email}</p>
      <p className='showPhone'>{pet.contact.phone}</p>
       <div>
        <a href={pet.url}>
          <h3 className="showLink">Link to more information</h3>
        </a>
      <p className='showAddress'>
        {pet.contact.address.address1} 
        {pet.contact.address.city},{" "} 
        {pet.contact.address.state}{" "}
        {pet.contact.address.postcode}{" "} 
        {pet.contact.address.country}
      </p>
       </div>
       <div id="favorite-added" style={{'color': 'blue'}}></div>
      <p><input
      type="submit" 
      id="favorites"
      value="Add to favorites" 
      onClick={addToFavorites} /></p>
      {/* add return to index button */}
      <p><input className='return' type="submit" value="Return to index" onClick={() =>navigate('/')} /></p>
      
    </div>
      </div>
  )
}

export default ShowPet
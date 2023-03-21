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
      <ul className='showInfoContainer' > 

      <p className='showBreed'><b>Breed: </b> {pet.breed ? pet.breed : 'N/A'}</p>
      <p className='showAge'><b>Age: </b> {pet.age ? pet.age : 'Age unknown'}</p>
      <p className='showGender'><b>Gender: </b> {pet.gender ? pet.gender : 'Gender not specified' }</p>
      <p className='showStatus'><b>Status: </b>{pet.status ? pet.status : 'Status not specified' }</p>
      <p className='showEmail'><b>Email: </b>{pet.contact.email ? pet.contact.email : 'Email not provided'}</p>
      <p className='showPhone'><b>Phone: </b>{pet.contact.phone ? pet.contact.phone : 'Phone not provided'}</p>
      </ul>
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
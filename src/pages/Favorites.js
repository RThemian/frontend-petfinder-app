import { Link } from 'react-router-dom';



const Favorites = (props) => {
    const pets = props.favoritePets;
    console.log(props)

    return pets.map((pet) => (
    <>
        <ul>
      <div key={pet._id} className="favoritePetsContainer">
          {/* <div className="favoritePetRow"> */}
          
          <div className='favoritePetCard'>
          <Link className='faveLink' to={`/pet/${pet.id}`} onClick = {()=>props.setSelectedPet(pet)}>
          <h3 className="favoriteName">{pet.name}</h3>
          <img className="favoritePic" src={pet.photos.length>0? pet.photos[0].medium: ""} alt={pet.name} />
          <h4 className='favoriteAge'>{pet.age}</h4>{"    "}
          <h4 className='favoriteGender'> {pet.gender}</h4>{"    "}
          <h4 className='favoriteBreed' >{pet.breeds ? pet.breeds.primary:""}</h4> 
          </Link>
          <button className="deleteButton grow" onClick={() => props.deletePets(pet._id)}>Delete</button>
          </div>
          </div>
          
          </ul>
    </>
        // </div>
      ))
    }

export default Favorites
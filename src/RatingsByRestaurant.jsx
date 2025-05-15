import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RestaurantCard.css'; // Import your CSS file
import StarRating from './StarRating'; // Assuming you have a StarRating component


function RatingsByRestaurant() {
    const {id} = useParams();
    const [ratings, setRatings] = useState([])

  const removeRating = async (ratingId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/restaurants/${id}/ratings/${ratingId}`, {
        method: 'DELETE'
      })
      if(!response.ok) {
        throw new Error(response.statusText)
      }
      const remainingRatings = ratings.filter((rating) => {
        return rating.id != ratingId
      })
      setRatings(remainingRatings)
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/restaurants/${id}/ratings`)
        if(!response.ok) {  
            throw new Error(response.statusText)
        }
        const responseData = await response.json()
        setRatings(responseData)
      } catch(e) {
        console.log(e)
      }
    }
    fetchRatings()
  }, [])

  return (
    <div className="rating-container">
      {ratings.map((rating) => (
       <RatingItem rating={rating} key={rating.id} removeRating={removeRating}/>
      ))}
    </div>
  );
};

function RatingItem({rating, removeRating}) {
    return (
        <div key={rating.id} className="rating-card">
          <h1>Rating: {rating.value} stars</h1>
          <button className="remove-button" onClick={() => removeRating(rating.id)}>Delete</button>
          <h3>
          <StarRating rating={rating.value} />
          </h3>
          <p>{rating.description}</p>
          <p>{rating.date_rated}</p>
        </div>
    )
}

export default RatingsByRestaurant;
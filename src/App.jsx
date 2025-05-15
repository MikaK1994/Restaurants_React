import RestaurantList from "./RestaurantList"
import RatingsByRestaurant from "./RatingsByRestaurant";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./Login";
import './App.css';
import { useState } from "react";



function App() {

  

  return (
    
    <Router>
      <div>
        {/* Navigation Bar (optional) */}
        <nav>
          <ul>
            <li>
              <Link to="/">Restaurants</Link>
            </li>
            <li>
              <Link to="restaurants/ratings">Ratings</Link>
            </li>
            
          </ul>
        </nav>

       
        <Routes>
          
          <Route path="/restaurants/:id/ratings" element={<RatingsByRestaurant />} />
          <Route path="/" element={<RestaurantList />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

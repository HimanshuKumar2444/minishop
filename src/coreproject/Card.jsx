// import React from 'react'

// function Card({ title, image, price, description }) {
//   return (
//     <div className="card h-100">
//       <img
//         src={image}
//         className="card-img-top"
//         alt={title}
//         style={{ height: '200px', objectFit: 'contain' }}
//       />
//       <div className="card-body d-flex flex-column">
//         <h5 className="card-title">{title}</h5>
//         <p className="card-text text-truncate">{description}</p>
//         <p className="card-text fw-bold">${price}</p>
//         <a href="#" className="btn btn-primary mt-auto">View Details</a>
//       </div>
//     </div>
//   );
// }

// export default Card;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite, removeFavourite } from '../store/slices/favouritesSlice';

const Card = ({ id, title, price, image, category }) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites);

  const isFavourite = favourites.some((item) => item.id === id);

  const handleFavouriteClick = () => {
    if (isFavourite) {
      dispatch(removeFavourite(id));
    } else {
      dispatch(addFavourite({ id, title, price, image, category }));
    }
  };

  return (
    <div className="card h-100">
      <img src={image} alt={title} className="card-img-top" height="200" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p>₹ {price}</p>
        <p className="text-muted">{category}</p>
        <button className="btn btn-outline-primary" onClick={handleFavouriteClick}>
          {isFavourite ? '❤️ Remove Favourite' : '♡ Add to Favourites'}
        </button>
      </div>
    </div>
  );
};

export default Card;
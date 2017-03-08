import React from 'react';

export const Favorites = ({ locations, className }) => {
  return (
    <ul className={className}>
      {locations.map((location, i) => {
        return (
          <li key={i}>
            {location.name}
          </li>
        );
      })}
    </ul>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../service/api';
import { FaTimes } from 'react-icons/fa';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await api.get('restaurants/');
            setRestaurants(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`restaurants/${id}/`);
            fetchRestaurants();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Restaurants</h1>
            <ul className="list-group">
                {restaurants.map(restaurant => (
                    <li key={restaurant.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <Link to={`/restaurant/${restaurant.id}`}>{restaurant.name}</Link>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(restaurant.id)}>
                            <FaTimes />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantList;

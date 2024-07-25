import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../service/api';
import CommentForm from './CommentForm';
import { FaTimes } from 'react-icons/fa';

const RestaurantDetail = () => {
    const [restaurant, setRestaurant] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchRestaurant();
    }, [id]);

    const fetchRestaurant = async () => {
        try {
            const response = await api.get(`restaurants/${id}/`);
            setRestaurant(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCommentAdded = (newComment) => {
        setRestaurant(prevState => ({
            ...prevState,
            comments: [...prevState.comments, newComment]
        }));
    };

    const handleCommentDelete = async (commentId) => {
        try {
            await api.delete(`comments/${commentId}/`);
            fetchRestaurant();
        } catch (error) {
            console.error(error);
        }
    };

    if (!restaurant) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h2>{restaurant.name}</h2>
            <p>{restaurant.address}</p>
            <img src={restaurant.image} alt={restaurant.name} className="img-fluid" />
            <h3 className="mt-4">Average Rating: {restaurant.average_rating}</h3>
            <h3>Comments:</h3>
            <ul className="list-group">
                {restaurant.comments.map(comment => (
                    <li key={comment.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                            <strong>{comment.name}:</strong> {comment.description} ({comment.rating})
                        </span>
                        <button className="btn btn-danger btn-sm" onClick={() => handleCommentDelete(comment.id)}>
                            <FaTimes />
                        </button>
                    </li>
                ))}
            </ul>
            <CommentForm restaurantId={restaurant.id} onCommentAdded={handleCommentAdded} />
            <Link to={`/edit/${restaurant.id}`} className="btn btn-primary mt-4">Edit Restaurant</Link>
        </div>
    );
};

export default RestaurantDetail;

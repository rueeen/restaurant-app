import React, { useState } from 'react';
import api from '../service/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const CommentForm = ({ restaurantId, onCommentAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newComment = { name, description, rating, restaurant: restaurantId };

        try {
            const response = await api.post('comments/', newComment);
            console.log(response.data);
            setSuccessMessage('Comment added successfully!');
            onCommentAdded(response.data);
            setName('');
            setDescription('');
            setRating('');
            setTimeout(() => setSuccessMessage(''), 3000); // Clear the message after 3 seconds
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <h3>Add a Comment</h3>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <div className="mb-3">
                <label className="form-label">Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" required />
            </div>
            <div className="mb-3">
                <label className="form-label">Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" required />
            </div>
            <div className="mb-3">
                <label className="form-label">Rating:</label>
                <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default CommentForm;

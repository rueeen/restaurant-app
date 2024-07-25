import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../service/api';

const RestaurantEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await api.get(`restaurants/${id}/`);
                const restaurant = response.data;
                setName(restaurant.name);
                setAddress(restaurant.address);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRestaurant();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await api.put(`restaurants/${id}/`, formData);
            console.log(response.data);
            navigate(`/restaurant/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Edit Restaurant</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image:</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default RestaurantEdit;

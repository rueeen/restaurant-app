import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';

const RestaurantCreate = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('image', image);

        try {
            const response = await api.post('restaurants/', formData);
            console.log(response.data);
            navigate('/'); //window.location.href = '/'
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Create Restaurant</h2>
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
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default RestaurantCreate;

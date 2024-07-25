import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import RestaurantCreate from './components/RestaurantCreate';
import RestaurantEdit from './components/RestaurantEdit';
import Navbar from './components/Navbar';

const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<RestaurantList />} />
                <Route path="/restaurant/:id" element={<RestaurantDetail />} />
                <Route path="/create" element={<RestaurantCreate />} />
                <Route path="/edit/:id" element={<RestaurantEdit />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;

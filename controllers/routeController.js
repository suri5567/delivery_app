import Route from '../models/route.js';

// Create a new route
export const createRoute = async (req, res) => {
  try {
    const route = new Route(req.body);
    await route.save();
    res.status(201).json(route);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all routes
export const getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a route by ID
export const getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a route
export const updateRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.status(200).json(route);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a route
export const deleteRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.status(200).json({ message: 'Route deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

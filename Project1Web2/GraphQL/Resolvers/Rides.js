const RidesDriver = require('../models/RidesDriversModel.js');
const Driver = require('../models/DriversModel'); //Verifica la existencia del conductor

const resolvers = {
  Query: {
    // Obtiene todos los rides
    getRides: async () => {
      try {
        return await RidesDriver.find().populate('userId', 'firstName lastName');
      } catch (error) {
        throw new Error('Error fetching rides');
      }
    },

    // Obtiene un ride por ID
    getRide: async (_, { id }) => {
      try {
        const ride = await RidesDriver.findById(id).populate('userId', 'firstName lastName');
        if (!ride) {
          throw new Error('Ride not found');
        }
        return ride;
      } catch (error) {
        throw new Error('Error fetching ride');
      }
    },

    // Obtiene los rides por ID del conductor
    getRidesByDriver: async (_, { userId }) => {
      try {
        const rides = await RidesDriver.find({ userId }).populate('userId', 'firstName lastName');
        if (!rides.length) {
          throw new Error('No rides found for this driver');
        }
        return rides;
      } catch (error) {
        throw new Error('Error fetching rides by driver');
      }
    },
  },

  Mutation: {
    // Crea un nuevo ride
    createRide: async (_, { input }) => {
      try {
        const { userId } = input;

        // Verifica si el conductor existe
        const driverExists = await Driver.findById(userId);
        if (!driverExists) {
          throw new Error('Driver not found');
        }

        const newRide = new RidesDriver(input);
        return await newRide.save();
      } catch (error) {
        throw new Error('Error creating ride');
      }
    },

    // Actualiza un ride existente
    updateRide: async (_, { id, input }) => {
      try {
        const updatedRide = await RidesDriver.findByIdAndUpdate(id, input, { new: true }).populate('userId', 'firstName lastName');
        if (!updatedRide) {
          throw new Error('Ride not found');
        }
        return updatedRide;
      } catch (error) {
        throw new Error('Error updating ride');
      }
    },

    // Elimina un ride existente
    deleteRide: async (_, { id }) => {
      try {
        const deletedRide = await RidesDriver.findByIdAndDelete(id);
        if (!deletedRide) {
          throw new Error('Ride not found');
        }
        return deletedRide;
      } catch (error) {
        throw new Error('Error deleting ride');
      }
    },
  },
};

module.exports = resolvers;
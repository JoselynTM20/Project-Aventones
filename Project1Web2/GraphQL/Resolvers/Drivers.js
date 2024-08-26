const Driver = require('../models/DriversModel');
const bcrypt = require('bcryptjs');

const resolvers = {
  Query: {
    // Obtiene todos los conductores
    getDrivers: async () => {
      try {
        return await Driver.find();
      } catch (error) {
        throw new Error('Error fetching drivers');
      }
    },

    // Obtiene un conductor por ID
    getDriver: async (_, { id }) => {
      try {
        const driver = await Driver.findById(id);
        if (!driver) {
          throw new Error('Driver not found');
        }
        return driver;
      } catch (error) {
        throw new Error('Error fetching driver');
      }
    },
  },

  Mutation: {
    // Crea un nuevo conductor
    createDriver: async (_, { input }) => {
      try {
        const { email, password } = input;

        // Verifica si ya existe un conductor con el mismo correo electrónico
        const existingDriver = await Driver.findOne({ email });
        if (existingDriver) {
          throw new Error('Email already exists');
        }

        // Encripta la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        const newDriver = new Driver({
          ...input,
          password: hashedPassword,
        });

        return await newDriver.save();
      } catch (error) {
        throw new Error('Error creating driver');
      }
    },

    // Actualiza un conductor existente
    updateDriver: async (_, { id, input }) => {
      try {
        const updatedDriver = await Driver.findByIdAndUpdate(id, input, { new: true });
        if (!updatedDriver) {
          throw new Error('Driver not found');
        }
        return updatedDriver;
      } catch (error) {
        throw new Error('Error updating driver');
      }
    },

    // Elimina un conductor existente
    deleteDriver: async (_, { id }) => {
      try {
        const deletedDriver = await Driver.findByIdAndDelete(id);
        if (!deletedDriver) {
          throw new Error('Driver not found');
        }
        return deletedDriver;
      } catch (error) {
        throw new Error('Error deleting driver');
      }
    },
  },
};

module.exports = resolvers;
const Booking = require('../models/BookingsModels');
const Ride = require('../models/RidesDriversModel'); 
const Driver = require('../models/DriversModel'); 

const resolvers = {
  Query: {
    // Obtiene todos los bookings
    getBookings: async () => {
      try {
        return await Booking.find().populate('userId', 'firstName');
      } catch (error) {
        throw new Error('Error fetching bookings');
      }
    },

    // Obtiene un booking por ID
    getBooking: async (_, { id }) => {
      try {
        const booking = await Booking.findById(id);
        if (!booking) {
          throw new Error('Booking not found');
        }
        return booking;
      } catch (error) {
        throw new Error('Error fetching booking');
      }
    },

    // Obtiene los bookings por ID de usuario
    getBookingsByUser: async (_, { userId }) => {
      try {
        const bookings = await Booking.find({ userId });
        if (!bookings.length) {
          throw new Error('No bookings found for this user');
        }
        return bookings;
      } catch (error) {
        throw new Error('Error fetching bookings by user');
      }
    },

    // Obtiene los bookings por ID de ride
    getBookingsByRide: async (_, { rideId }) => {
      try {
        const bookings = await Booking.find({ rideId });
        if (!bookings.length) {
          throw new Error('No bookings found for this ride');
        }
        return bookings;
      } catch (error) {
        throw new Error('Error fetching bookings by ride');
      }
    },
  },

  Mutation: {
    // Crea una nueva reserva
    createBooking: async (_, { input }) => {
      try {
        const { userId, rideId } = input;

        // Verifica si el ride y el usuario existen
        const rideExists = await Ride.findById(rideId);
        const userExists = await Driver.findById(userId);
        if (!rideExists) {
          throw new Error('Ride not found');
        }
        if (!userExists) {
          throw new Error('User not found');
        }

        const newBooking = new Booking(input);
        return await newBooking.save();
      } catch (error) {
        throw new Error('Error creating booking');
      }
    },

    // Actualiza una reserva existente
    updateBooking: async (_, { id, status }) => {
      try {
        const updatedBooking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedBooking) {
          throw new Error('Booking not found');
        }
        return updatedBooking;
      } catch (error) {
        throw new Error('Error updating booking');
      }
    },

    // Elimina una reserva existente
    deleteBooking: async (_, { id }) => {
      try {
        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) {
          throw new Error('Booking not found');
        }
        return deletedBooking;
      } catch (error) {
        throw new Error('Error deleting booking');
      }
    },
  },
};

module.exports = resolvers;
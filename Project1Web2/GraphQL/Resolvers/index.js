const bcrypt = require('bcryptjs');
const User = require('../../BackEend/models/UsersModel'); 
const Driver = require('../../BackEend/models/DriversModel');
const RidesDriver = require('../../BackEend/models/RidesDriversModel');
const Booking = require('../../BackEend/models/BookingsModels');


const resolvers = {
  Query: {
    // Usuarios
    getUser: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) throw new Error('User does not exist');
        return user;
      } catch (err) {
        throw new Error('Server error');
      }
    },
    getUsers: async () => {
      try {
        return await User.find();
      } catch (err) {
        throw new Error('Server error');
      }
    },
    
    // Conductores
    getDrivers: async () => {
      try {
        return await Driver.find();
      } catch (error) {
        throw new Error('Error fetching drivers');
      }
    },
    getDriver: async (_, { id }) => {
      try {
        const driver = await Driver.findById(id);
        if (!driver) throw new Error('Driver not found');
        return driver;
      } catch (error) {
        throw new Error('Error fetching driver');
      }
    },
    
    // Rides
    getRides: async () => {
      try {
        return await RidesDriver.find().populate('userId', 'firstName lastName');
      } catch (error) {
        throw new Error('Error fetching rides');
      }
    },
    getRide: async (_, { id }) => {
      try {
        const ride = await RidesDriver.findById(id).populate('userId', 'firstName lastName');
        if (!ride) throw new Error('Ride not found');
        return ride;
      } catch (error) {
        throw new Error('Error fetching ride');
      }
    },
    getRidesByDriver: async (_, { userId }) => {
      try {
        const rides = await RidesDriver.find({ userId }).populate('userId', 'firstName lastName');
        if (!rides.length) throw new Error('No rides found for this driver');
        return rides;
      } catch (error) {
        throw new Error('Error fetching rides by driver');
      }
    },

    // Bookings
    getBookings: async () => {
      try {
        return await Booking.find().populate('userId', 'firstName');
      } catch (error) {
        throw new Error('Error fetching bookings');
      }
    },
    getBooking: async (_, { id }) => {
      try {
        const booking = await Booking.findById(id);
        if (!booking) throw new Error('Booking not found');
        return booking;
      } catch (error) {
        throw new Error('Error fetching booking');
      }
    },
    getBookingsByUser: async (_, { userId }) => {
      try {
        const bookings = await Booking.find({ userId });
        if (!bookings.length) throw new Error('No bookings found for this user');
        return bookings;
      } catch (error) {
        throw new Error('Error fetching bookings by user');
      }
    },
    getBookingsByRide: async (_, { rideId }) => {
      try {
        const bookings = await Booking.find({ rideId });
        if (!bookings.length) throw new Error('No bookings found for this ride');
        return bookings;
      } catch (error) {
        throw new Error('Error fetching bookings by ride');
      }
    }
  },
  Mutation: {
    // Usuarios
    createUser: async (_, { firstName, Lastname, cardIdNumber, BirthDate, email, password, phoneNumber }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error('Email already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          firstName,
          Lastname,
          cardIdNumber,
          BirthDate,
          email,
          password: hashedPassword,
          phoneNumber,
        });

        await user.save();
        return user;
      } catch (err) {
        throw new Error('Server error');
      }
    },

    // Conductores
    createDriver: async (_, { input }) => {
      try {
        const { email, password } = input;

        const existingDriver = await Driver.findOne({ email });
        if (existingDriver) throw new Error('Email already exists');

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
    updateDriver: async (_, { id, input }) => {
      try {
        const updatedDriver = await Driver.findByIdAndUpdate(id, input, { new: true });
        if (!updatedDriver) throw new Error('Driver not found');
        return updatedDriver;
      } catch (error) {
        throw new Error('Error updating driver');
      }
    },
    deleteDriver: async (_, { id }) => {
      try {
        const deletedDriver = await Driver.findByIdAndDelete(id);
        if (!deletedDriver) throw new Error('Driver not found');
        return deletedDriver;
      } catch (error) {
        throw new Error('Error deleting driver');
      }
    },

    // Rides
    createRide: async (_, { input }) => {
      try {
        const { userId } = input;

        const driverExists = await Driver.findById(userId);
        if (!driverExists) throw new Error('Driver not found');

        const newRide = new RidesDriver(input);
        return await newRide.save();
      } catch (error) {
        throw new Error('Error creating ride');
      }
    },
    updateRide: async (_, { id, input }) => {
      try {
        const updatedRide = await RidesDriver.findByIdAndUpdate(id, input, { new: true }).populate('userId', 'firstName lastName');
        if (!updatedRide) throw new Error('Ride not found');
        return updatedRide;
      } catch (error) {
        throw new Error('Error updating ride');
      }
    },
    deleteRide: async (_, { id }) => {
      try {
        const deletedRide = await RidesDriver.findByIdAndDelete(id);
        if (!deletedRide) throw new Error('Ride not found');
        return deletedRide;
      } catch (error) {
        throw new Error('Error deleting ride');
      }
    },

    // Bookings
    createBooking: async (_, { input }) => {
      try {
        const { userId, rideId } = input;

        const rideExists = await Ride.findById(rideId);
        const userExists = await Driver.findById(userId);
        if (!rideExists) throw new Error('Ride not found');
        if (!userExists) throw new Error('User not found');

        const newBooking = new Booking(input);
        return await newBooking.save();
      } catch (error) {
        throw new Error('Error creating booking');
      }
    },
    updateBooking: async (_, { id, status }) => {
      try {
        const updatedBooking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedBooking) throw new Error('Booking not found');
        return updatedBooking;
      } catch (error) {
        throw new Error('Error updating booking');
      }
    },
    deleteBooking: async (_, { id }) => {
      try {
        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) throw new Error('Booking not found');
        return deletedBooking;
      } catch (error) {
        throw new Error('Error deleting booking');
      }
    }
  }
};

module.exports = resolvers;
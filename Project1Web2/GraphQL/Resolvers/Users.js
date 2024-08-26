const User = require('');
const bcrypt = require('bcryptjs');

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error('User does not exist');
        }
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
  },
  Mutation: {
    createUser: async (_, { firstName, Lastname, cardIdNumber, BirthDate, email, password, phoneNumber }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('Email already exists');
        }

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
    // Uncomment and implement when needed
    /*updateUser: async (_, { id, firstName, Lastname, cardIdNumber, BirthDate, email, password, phoneNumber }) => {
      try {
        const updateUser = {};
        if (firstName) updateUser.firstName = firstName;
        if (Lastname) updateUser.Lastname = Lastname;
        if (cardIdNumber) updateUser.cardIdNumber = cardIdNumber;
        if (BirthDate) updateUser.BirthDate = BirthDate;
        if (email) updateUser.email = email;
        if (password) updateUser.password = await bcrypt.hash(password, 10);
        if (phoneNumber) updateUser.phoneNumber = phoneNumber;

        const user = await User.findByIdAndUpdate(id, { $set: updateUser }, { new: true, runValidators: true });
        if (!user) {
          throw new Error('User does not exist');
        }
        return user;
      } catch (err) {
        throw new Error('Server error');
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error('User does not exist');
        }
        await User.deleteOne({ _id: id });
        return true;
      } catch (err) {
        throw new Error('Server error');
      }
    }*/
  }
};

module.exports = resolvers;
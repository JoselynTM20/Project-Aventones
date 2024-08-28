const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('./models/User'); 
const sendgrid = require('@sendgrid/mail');
const twilio = require('twilio');
const uuid = require('uuid').v4;

// Configura SendGrid y Twilio
//sendgrid.setApiKey('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');

//const accountSid = 'AC8640541fe01e6d087cdc9f3a8d5a9ca0';
//const authToken = '1ef72e59deb6b4647d23eca3ac246a95';
//const twilioClient = new twilio(accountSid, authToken);

exports.registerUser = async (req, res) => {
    try {
        const { firstName, Lastname, cardIdNumber, BirthDate, email, password, phoneNumber } = req.body;

        // Verifica si ya existe un usuario con el mismo correo electrónico
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Crea un nuevo usuario con la contraseña cifrada
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = new User({
            firstName,
            Lastname,
            cardIdNumber,
            BirthDate,
            email,
            password: hashedPassword,
            phoneNumber,
            status: 'pending', // Inicialmente está en estado pendiente
        });

        await user.save();

        // Genera un código de verificación y envía el SMS
        const verificationCode = Math.floor(100000 + Math.random() * 900000); // Código de 6 dígitos
        await twilioClient.messages.create({
            body: `Your verification code is ${verificationCode}`,
            from: '+1234567890', // Tu número de Twilio
            to: phoneNumber,
        });

        // Envia un correo electrónico de verificación
        const verificationLink = `https://yourdomain.com/verify?token=${uuid()}`;
        const msg = {
            to: email,
            from: 'your-email@example.com',
            subject: 'Verify your email',
            html: `<p>Please click the following link to verify your email: <a href="${verificationLink}">Verify</a></p>`,
        };
        await sendgrid.send(msg);

        res.status(201).json({ message: 'User registered successfully, verification email and SMS sent' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
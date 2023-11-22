const Prisma = require('../database/config').getPrismaInstance();
const PrismaHelper = require('../helpers/PrismaHelper');
const ApiError = require('../helpers/ApiError');
const { generarJWT } = require('../helpers/generateJWT');
const bcryptjs = require('bcryptjs');

module.exports = {
    async login(req, res) {
        const { email, password } = req.body;
        // verificar si el correo existe
        const user = await Prisma.users.findFirst({
            where: {
                email: email
            },
            select: {
                email: true,
                id: true,
                role: true,
                isDeleted: true,
                isVerified: true,
                password: true
            }
        });

        if (!user) {
            return res.status(401).json(new ApiError({ clientErrorMessage: 'Error de Usuario y Contraseña', debugErrorMessage: "userAndPasswordError" }));
        }
        // si el usuario está activo

        if (user.isDeleted) {
            return res.status(403).json(new ApiError({ clientErrorMessage: 'Usted no tiene acceso a nuestros servicios', debugErrorMessage: "userIsBanned" }))
        }
        // verificar la contraseña
        const ValidPassword = bcryptjs.compareSync(password, user.password);
        if (!ValidPassword) {
            return res.status(401).json(new ApiError({ clientErrorMessage: 'Error de Usuario y Contraseña', debugErrorMessage: "userAndPasswordError" }));
        }
        // generar JWT
        const jwt = await generarJWT(user.id)
        user.password = undefined;
        delete user.password;
        return res.json(
            {
                user,
                jwt
            }
        )


    },
    async register(req, res) {
        const { email, password, name, phone } = req.body;
        //Verificar teléfono registrado
        const userPhone = await Prisma.users.findFirst({
            where: {
                id: userID
            }
        });
        if (userPhone.email) {
            return res.status(401).json(new ApiError({ clientErrorMessage: 'El teléfono ya se encuentra registrado', debugErrorMessage: "mobileAlreadyRegistered" }));
        }
        if (!userPhone) {
            return res.status(401).json(new ApiError({ clientErrorMessage: 'El teléfono no se encuentra registrado', debugErrorMessage: "mobileNotRegistered" }));
        }

        // verificar si el correo existe
        const user = await Prisma.users.findFirst({
            where: {
                email: email
            }
        });
        if (user) {
            return res.status(400).json(new ApiError({ clientErrorMessage: 'El correo ya existe', debugErrorMessage: "emailAlreadyExists" }));
        }
        // si el usuario está activo
        // verificar la contraseña
        // generar JWT
        const salt = bcryptjs.genSaltSync();
        //Actualizar usuario y vincular datos

        const newUser = await Prisma.users.update({
            data: {
                email,
                password: bcryptjs.hashSync(password, salt),
                name,
            },
            where: {
                id: userID
            },
            select: {
                email: true,
                id: true,
                role: true,
                isDeleted: true,
                isVerified: true
            }
        })
        const jwt = await generarJWT(newUser.id)
        return res.json(
            {
                user: PrismaHelper.objectBigIntToInt(newUser),
                jwt
            }
        )
    },
}
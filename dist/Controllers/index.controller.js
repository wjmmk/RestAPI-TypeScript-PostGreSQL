"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.createUsers = exports.getUserById = exports.getUsers = void 0;
const database_1 = require("../database");
exports.getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Result = yield database_1.pool.query('Select * From users');
        console.log(Result.rows);
        return res.send(Result.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error Interno del Servidor');
    }
});
exports.getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const Result = yield database_1.pool.query('Select * From users Where id = $1', [id]);
        console.log(Result.rows);
        return res.status(200).json(Result.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('El Usuario No Existe !!!');
    }
});
exports.createUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, lastname, phone, email } = req.body;
        const Result = yield database_1.pool.query('Insert Into users (name, lastname, phone, email) Values ($1, $2, $3, $4)', [name, lastname, phone, email]);
        return res.json({
            message: 'Usuario Creado Exitosamente !!!',
            body: {
                user: {
                    name,
                    lastname,
                    phone,
                    email
                }
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error al Momento de Crear un Usuario !!!');
    }
});
exports.updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, lastname, phone, email } = req.body;
        yield database_1.pool.query('Update users Set name = $1, lastname = $2, phone = $3, email = $4 Where id = $5', [name, lastname, phone, email, id]);
        return res.json(`Usuario ${id}, Actualizado Correctamente`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Error al Momento de Actualizar un Usuario !!!');
    }
});
exports.deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield database_1.pool.query('Delete From users Where id = $1', [id]);
        return res.json(`Usuario con el id: ${id} fue Eliminado con Exito !!! `);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('NO se pudo eliminar el Usuario !!!');
    }
});

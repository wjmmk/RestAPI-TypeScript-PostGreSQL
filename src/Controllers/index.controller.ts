import { Request, Response } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";

export const getUsers = async ( req: Request, res: Response): Promise<Response> => {
    try {
        const Result:QueryResult = await pool.query('Select * From users');
        console.log(Result.rows);
        return res.send(Result.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error Interno del Servidor');
    }
}

export const getUserById = async ( req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const Result:QueryResult = await pool.query('Select * From users Where id = $1', [id]);
        console.log(Result.rows);
        return res.status(200).json(Result.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json('El Usuario No Existe !!!');
    }
}

 export const createUsers = async ( req: Request, res: Response): Promise<Response> => {
     try {
        const { name, lastname, phone, email} = req.body;
        const Result:QueryResult = await 
        pool.query('Insert Into users (name, lastname, phone, email) Values ($1, $2, $3, $4)', [name, lastname, phone,email]);
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
        })  
     } catch (error) {
        console.log(error);
        return res.status(500).json('Error al Momento de Crear un Usuario !!!');
     }  
}

export const updateUserById = async ( req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const { name, lastname, phone, email } = req.body;

        await pool.query('Update users Set name = $1, lastname = $2, phone = $3, email = $4 Where id = $5',
         [name, lastname, phone, email, id]);
        return res.json(`Usuario ${id}, Actualizado Correctamente`);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al Momento de Actualizar un Usuario !!!');
    }
} 

export const deleteUserById = async ( req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        await pool.query('Delete From users Where id = $1', [id]);
        return res.json(`Usuario con el id: ${id} fue Eliminado con Exito !!! `);

    } catch (error) {
        console.log(error);
        return res.status(500).json('NO se pudo eliminar el Usuario !!!');
    }
} 
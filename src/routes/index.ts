import { Router } from "express";
import { getUsers, getUserById, createUsers, deleteUserById, updateUserById } from "../Controllers/index.controller";

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUsers);
router.put('/users/:id', updateUserById);
router.delete('/users/:id', deleteUserById);

export default router;
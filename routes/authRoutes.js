import { Router } from "express";
import { compare } from "bcryptjs";
import pkg from 'jsonwebtoken';
const { sign } = pkg;

const router = Router();

router.post("/register", async (req, res) => {
});

router.post("/login", async (req, res) => {
});

export default router;
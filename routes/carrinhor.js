import express from "express";
import {
    getCarrinho,
    addCarrinho,
    updateCarrinho,
    deleteCarrinho
} from "../controllers/carrinhoc.js";

const router = express.Router();

router.get("/", getCarrinho);
router.post("/", addCarrinho);
router.put("/:codigo", updateCarrinho);
router.delete("/:codigo", deleteCarrinho);

export default router;
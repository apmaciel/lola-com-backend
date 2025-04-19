import { db } from "../db.js";
//No caso do get não é necessário incluir req de requisição 

export const getCarrinho = (_, res) => {
    const q = "SELECT * FROM tb_carrinho ORDER BY produto";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
};

export const addCarrinho = (req, res) => {
    const q = "INSERT INTO tb_carrinho (`produto`, `preco`, `tamanho`) VALUES(?)"; 
    const values = [
        req.body.produto,
        req.body.preco,
        req.body.tamanho,
    ];
    db.query(q, [values], (err) => {
        if (err) return res.json(err);
        return res.status(200).json("Pedido adicionado com sucesso!"); 
});
};

export const updateCarrinho = (req, res) => {
    const q = "UPDATE tb_carrinho SET `produto` = ?, `preco` = ? ,`tamanho` = ? WHERE`id` = ? "; 
const values = [
        req.body.produto,
        req.body.preco,
        req.body.tamanho,
    ];
    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);
        return res.status(200).json("Pedido atualizado com sucesso!"); 
});
};

export const deleteCarrinho = (req, res) => {
    const q = "DELETE FROM tb_carrinho WHERE `id` = ?";
    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);
        return res.status(200).json("Pedido deletado com sucesso!"); 
});
};
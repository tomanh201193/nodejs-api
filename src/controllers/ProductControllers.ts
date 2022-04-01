import {Controller, Get, Post, Put, Delete} from "@overnightjs/core"
import { Request, Response } from "express";

import { Product } from "../models/database";

@Controller("api/product")
export class ProductControllers {
    @Get('')
    private async getAll(req: Request, res: Response) {
        let products = await Product.findAll();
        return res.status(200).json({
            message: "get_all_called",
            data: products
        });
    }

    @Post("create")
    public async store(req: Request, res: Response): Promise<Response> {
        const { name, color, price } = req.body;

        let product = await Product.findOne({
            where: { name },
        });

        if (product) {
            return res.status(400).send({
                message: "Product is existing"
            });
        }

        product = await Product.create({
            name,
            color,
            price
        });

        return res.status(200).json({
            message: "Create success!",
            data: product
        });
    }

    @Put("update/:id")
    public async update(req: Request, res: Response): Promise<Response> {
        const { name, color, price } = req.body;
        const id = req.params.id;

        let product = await Product.findOne({
            where: { id },
        });

        if (!product) {
            return res.status(400).send({
                message: "Product no existing"
            });
        }

       await Product.update({
            name: name,
            color: color,
            price: price,
        }, {
            where: { id: id}
        });

        return res.status(200).json({
            message: "Update success!"
        });
    }

    @Delete("delete/:id")
    public async delete(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        if (!id) return;
         await Product.destroy({where: {
                id: id
            }})

        return res.status(200).json({
            message: "Delete success!"
        });
    }
}
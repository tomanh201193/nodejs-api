import {
    Table,
    Column,
    DataType,
    Model,
} from "sequelize-typescript";

@Table({
    tableName: "product",
})

export class Product extends Model {

    @Column({ type: DataType.STRING })
    public name!: string;

    @Column({ type: DataType.STRING })
    public color!: string;

    @Column({ type: DataType.STRING })
    public price!: string;
}
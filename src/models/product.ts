import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { db } from "../config";

const TABLE_NAME = "Products";

// https://sequelize.org/docs/v6/other-topics/typescript/
class Products extends Model<
  InferAttributes<Products>,
  InferCreationAttributes<Products>
> {
  declare id: string;
  declare name: string;
}

Products.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: TABLE_NAME,
    modelName: TABLE_NAME,
    timestamps: true,
  }
);

export default Products;

import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { db } from "../config";

const TABLE_NAME = "Order";

class Order extends Model<
InferAttributes<Order>,
InferCreationAttributes<Order>
> {
  declare id: string;
  declare userId: string;
  declare product: string;
  declare quantity: number;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
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

export default Order;

import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { db } from "../config";

const TABLE_NAME = "Users";

// https://sequelize.org/docs/v6/other-topics/typescript/
class Users extends Model<
  InferAttributes<Users>,
  InferCreationAttributes<Users>
> {
  declare id: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare phone: string;
  declare password: string;
}

Users.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
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

export default Users;

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db-setup';
import { Comment } from './comment';

export interface BoardAttributes {
  id : number,
  writer : string,
  password : string,
  title : string,
  content : string,
  isDelete? : boolean
}

export class Board extends Model<BoardAttributes>{
  public writer : string;
  public password : string;
  public title : string;
  public content : string;
  public isDelete : boolean;
  public createdAt: Date;
  public updatedAt: Date;
}

Board.init(
  {
    id : {
      type : DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    writer : {
        type : DataTypes.STRING(255),
        allowNull: false
    },
    password : {
        type : DataTypes.STRING(255),
        allowNull : false
    },
    title : {
        type : DataTypes.STRING(255),
        allowNull : false
    },
    content : {
        type : DataTypes.STRING(1024),
        allowNull : false
    },
    isDelete : {
        type : DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull : false
    }
  },
  {
      tableName : 'board',
      sequelize,
      freezeTableName : true,
      timestamps : true,
  }
)

Board.hasMany(Comment, {
  sourceKey : "id",
  foreignKey : "boardId",
});
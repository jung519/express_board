import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db-setup';

interface CommentAttributes {
  writer : string,
  content : string,
}

export class Comment extends Model<CommentAttributes>{
  public writer : string;
  public content : string;
  public createdAt: Date;
  public updatedAt: Date;
}

Comment.init(
  {
      writer : {
          type : DataTypes.STRING(255),
          allowNull: false
      },
      content : {
          type : DataTypes.STRING(1024),
          allowNull : false
      },
  },
  {
      tableName : 'comment',
      sequelize,
      freezeTableName : true,
      timestamps : true,
  }
)


module.exports = (sequelize, DataTypes) => (
    sequelize.define('review', {
      content : {
          type : DataTypes.STRING(140),
          allowNull : false,
      },
      img: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      userImg : {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      userNick : {
        type: DataTypes.STRING(15),
        allowNull: false,
      }
    }, {
      timestamps: true,
      paranoid: true,
      //삭제되었을 때 그 정보를 저장해둔다
      //후에 복구할 때 사용할 수 있는 요소가 된다 
    })
  );
  
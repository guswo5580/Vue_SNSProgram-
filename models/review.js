module.exports = (sequelize, DataTypes) => (
    sequelize.define('review', {
      content : {
          type : DataTypes.STRING(140),
          allowNull : false,
      },
    }, {
      timestamps: true,
      paranoid: true,
      //삭제되었을 때 그 정보를 저장해둔다
      //후에 복구할 때 사용할 수 있는 요소가 된다 
    })
  );
  
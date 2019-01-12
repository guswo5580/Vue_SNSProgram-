module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
      email: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
        //카카오를 이용할 수도 있기 때문에 필수로 지정하지 말자
      },
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      userImg: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    }, {
      timestamps: true,
      paranoid: true,
      //삭제되었을 때 그 정보를 저장해둔다
      //후에 복구할 때 사용할 수 있는 요소가 된다 
    })
  );
  
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Review = require('./review')(sequelize, Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

db.Post.hasMany(db.Review);
db.Review.belongsTo(db.Post);
//게시글과 리뷰는 1:n 관계 
db.User.hasMany(db.Review);
db.Review.belongsTo(db.User);

db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });


db.User.belongsToMany(db.User, {
  foreignKey: 'followingId',
  //연결할 상대의 ID값을 의미한다
  as: 'Followers',
  //같은 테이블이 연결되기 때문에 어떤게 어떤것인지 구분해주어야한다
  through: 'Follow',
});
db.User.belongsToMany(db.User, {
  foreignKey: 'followerId',
  as: 'Followings',
  through: 'Follow',
});

db.User.belongsToMany(db.Post, {through : 'Like'});
db.Post.belongsToMany(db.User, {through : 'Like' , as : 'Liker'});

module.exports = db;

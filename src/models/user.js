module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    email: { type: DataTypes.STRING, unique:true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    nickName: { type: DataTypes.STRING, allowNull: false },
    loginAt: { type: DataTypes.DATE },
  },
  {timeStamps: false});

  // user.associate = models => {
  //   user.hasMany(models.content, {
  //     foreignKey: 'user_id',
  //     sourceKey: 'id'
  //   })
  // };

  return user;
};

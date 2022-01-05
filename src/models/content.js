module.exports = (sequelize, DataTypes) => {
  const content = sequelize.define('content', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER, defaultValue: 0 },
    view: { type: DataTypes.INTEGER, defaultValue: 0 },
    like: { type: DataTypes.INTEGER, defaultValue: 0 },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {timeStamps: false});

  return content;
};

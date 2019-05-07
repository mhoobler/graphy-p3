module.exports = function(sequelize, DataTypes) {
    var MongoKeys = sequelize.define("MongoKeys", {
      user_id: DataTypes.INTEGER,
      mongo_id: DataTypes.STRING,
      symbol: DataTypes.STRING
    });
    return MongoKeys;
};
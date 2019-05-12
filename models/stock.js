module.exports = function (sequelize, DataTypes) {
    var Stock_master = sequelize.define("stock_master", {
      symbol: DataTypes.STRING,
      name: DataTypes.STRING,
      search_term: DataTypes.STRING
    }, {
        timestamps: false,
        freezeTableName: true
      }
    );
    return Stock_master;
  };
  
  
  
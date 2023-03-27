const { DataTypes, BOOLEAN } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "favorite",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        isUnique: true,
        allowNull:false,
        defaultValue: DataTypes.UUIDV4,
      },

      image: {
        type: DataTypes.STRING,
      },

      name: {
        type: DataTypes.STRING, 
        allowNull: false,
      },

      
    },
    { timestamps: false }
  );
};

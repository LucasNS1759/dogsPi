const { DataTypes, BOOLEAN } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
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
        allowNull: false,
        // validator:{
        // is:/(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i
        // }
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lifeSpan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created:{
      type:BOOLEAN,
      defaultValue: true
      }
    },
    { timestamps: false }
  );
};

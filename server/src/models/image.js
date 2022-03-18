import DataTypes, { Model } from 'sequelize'

export default class Image extends Model {
	static init(sequelize) {
		return super.init(
			{
				src: { type: DataTypes.STRING(200), allowNull: false }
			},
			{
				modelName: 'Image',
				tableName: 'images',
				charset: 'utf8',
				collate: 'utf8_general_ci',
				sequelize
			}
		)
	}
	static associate(db) {
		db.Image.belongsTo(db.Post)
	}
}

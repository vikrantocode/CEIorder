const Sequelize = require('sequelize');
const db = require('../config/database');

const ImageDetail = db.define('imageDetails', {
	imageNameItem: {
		type: Sequelize.STRING(1000)
	},
	imageNameItemAlt: {
		type: Sequelize.STRING(1000)
	},
	imageNameLineDrawing: {
		type: Sequelize.STRING(1000)
	},
	imageNameMSDSPDF: {
		type: Sequelize.STRING(1000)
	},
	imageNameProductLit: {
		type: Sequelize.STRING(1000)
	},
	imageNameSKUGroup: {
		type: Sequelize.STRING(1000)
	},
	imageNameSKUGroupAlt: {
		type: Sequelize.STRING(1000)
	},
	imageNameSwatches: {
		type: Sequelize.STRING(1000)
	},
	itemPictureId: {
		type: Sequelize.STRING
	},
	imageText: {
		type: Sequelize.STRING(1000)
	},
	imageThumbnailURL: {
		type: Sequelize.STRING
	}
});

// db.sync()
//     .then(() => {
//         console.log('Image Details Table Created Successfully!')
//     })
//     .catch(err => {
//         console.log(err)
//     })

module.exports = ImageDetail;

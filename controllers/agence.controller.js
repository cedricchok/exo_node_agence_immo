const Agence = require('../models').Agence;
// const Agent_immo = require('../models').Agent_immo;

/**
 * 
 * List all agences
 */
exports.agence_list = (req, res, next) => {
	Agence.findAll({
		attributes: ['id', 'name'],
		include: [{
			model: Agent_immo,
			attributes: ['id', 'name', 'tel', 'email', 'pwd']
		}]
	})
		.then((agences) => res.status(200).json(agences))
		.catch((err) => console.log(err));
};

/**
 * 
 * Detail agence
 */
exports.detail_agence = (req, res, next) => {
	const id = req.params.id;
	Agence.findByPk(id).then((agence) => res.status(200).json(agence)).catch((err) => console.log(err));
};

/**
 * 
 * Add a agence
 */
exports.add_agence = (req, res, next) => {
	const agence = req.body;
	Agence.create(agence)
	.then( (agenceCreated) => {
		if (agence.name != undefined && agence.name.length > 0) {
		agenceCreated.setStyles(agence.Styles)
		.then(() => res.status(201).json(agenceCreated))
		.catch((err) => console.log(err));
		} else {
			res.status(201).json(agenceCreated);
		}
	})
	.catch(err => console.log(err));
}

/**
 * 
 * Edit a agence
 */
exports.edit_agence = (req, res, next) => {
	const id = req.params.id;
	const agence = req.body;
	Agence.update(agence, {
		where: {
			id: id
		}
	})
		.then((agenceEdited) => res.status(201).json(agenceEdited))
		.catch((err) => console.log(err));
};

/**
 * 
 * Delete a agence
 */
exports.delete_agence = (req, res, next) => {
	const id = req.params.id;
	Agence.destroy({
		where: {
			id: id
		}
	})
		.then((agenceDeleted) => res.status(200).json({ message: `Agence deleted ${agenceDeleted}` }))
		.catch((err) => console.log(err));
};

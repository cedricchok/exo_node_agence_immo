const Annonce = require('../models').Annonce;
const Bien = require('../models').Bien;
const Acheteur = require('../models').Acheteur;

/**
 * 
 * List all annonces
 */
exports.annonce_list = (req, res, next) => {
	Annonce.findAll({
		attributes: ['id', 'date_debut_vente', 'date_fin_vente', 'status'],
		include: [
            {
                model: Bien,
                attributes: ['id', 'desc', 'prix', 'surface', 'atouts', 'caracteristiques']
            },
            {
                model: Acheteur,
                attributes: ['id', 'name', 'tel']
            }
        ]
	})
		.then((annonces) => res.status(200).json(annonces))
		.catch((err) => console.log(err));
};

/**
 * 
 * Detail annonce
 */
exports.detail_annonce = (req, res, next) => {
	const id = req.params.id;
	Annonce.findByPk(id).then((annonce) => res.status(200).json(annonce)).catch((err) => console.log(err));
};

/**
 * 
 * Add a annonce
 */
exports.add_annonce = (req, res, next) => {
	const annonceCreated = req.body;
	Annonce.create(annonceCreated)
	.then(() => res.status(201).json(annonceCreated))
	.catch((err) => console.log(err));
}

/**
 * 
 * Edit a annonce
 */
exports.edit_annonce = (req, res, next) => {
	const id = req.params.id;
	const annonce = req.body;
	Annonce.update(annonce, {
		where: {
			id: id
		}
	})
		.then((annonceEdited) => res.status(201).json(annonceEdited))
		.catch((err) => console.log(err));
};

/**
 * 
 * Delete a annonce
 */
exports.delete_annonce = (req, res, next) => {
	const id = req.params.id;
	Annonce.destroy({
		where: {
			id: id
		}
	})
		.then((annonceDeleted) => res.status(200).json({ message: `Annonce deleted ${annonceDeleted}` }))
		.catch((err) => console.log(err));
};

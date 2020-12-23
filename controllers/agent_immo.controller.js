const Agent_immo = require('../models').Agent_immo;

/**
 * 
 * List all agents
 */
exports.agent_list = (req, res, next) => {
	Agent.findAll({
		attributes: ['id', 'name', 'tel', 'email', 'pwd'],
		include: [
            {
                model: Agence,
                attributes: ['id', 'name']
            },
            {
                model: Bien,
                attributes: ['id', 'desc', 'prix', 'surface', 'atouts', 'caracteristiques']
            },
            {
                model: Annonce,
                attributes: ['id', 'date_debut_vente', 'date_fin_vente', 'status']
            },
            {
                model: Acheteur,
                attributes: ['id', 'name', 'tel']
            }
        ]
	})
		.then((agents) => res.status(200).json(agents))
		.catch((err) => console.log(err));
};

/**
 * 
 * Detail agent
 */
exports.detail_agent = (req, res, next) => {
	const id = req.params.id;
	Agent.findByPk(id).then((agent) => res.status(200).json(agent)).catch((err) => console.log(err));
};

/**
 * 
 * Add a agent
 */
exports.add_agent = (req, res, next) => {
	const agent = req.body;
	Agent.create(agent)
	.then( (agentCreated) => {
		if (agent.name != undefined && agent.name.length > 0) {
		agentCreated.setStyles(agent.Styles)
		.then(() => res.status(201).json(agentCreated))
		.catch((err) => console.log(err));
		} else {
			res.status(201).json(agentCreated);
		}
	})
	.catch(err => console.log(err));
}

/**
 * 
 * Edit a agent
 */
exports.edit_agent = (req, res, next) => {
	const id = req.params.id;
	const agent = req.body;
	Agent.update(agent, {
		where: {
			id: id
		}
	})
		.then((agentEdited) => res.status(201).json(agentEdited))
		.catch((err) => console.log(err));
};

/**
 * 
 * Delete a agent
 */
exports.delete_agent = (req, res, next) => {
	const id = req.params.id;
	Agent.destroy({
		where: {
			id: id
		}
	})
		.then((agentDeleted) => res.status(200).json({ message: `Agent deleted ${agentDeleted}` }))
		.catch((err) => console.log(err));
};

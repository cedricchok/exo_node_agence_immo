const Agent_immo = require('../models').Agent_immo;
const Agence = require('../models').Agence;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * 
 * List all agents
 */
exports.agent_list = (req, res, next) => {
	Agent_immo.findAll({
		attributes: ['id', 'name', 'tel', 'email', 'pwd'],
		include: [
            {
                model: Agence,
                attributes: ['id', 'name']
            }
        ]
	})
		.then((agents) => res.status(200).json(agents))
		.catch((err) => console.log(err));
};

/**
 * 
 * Register agent
 */
exports.agent_register = (req, res, next) => {
	bcrypt.hash(req.body.pwd, 10, (err, hash) => {
		if (err) {
			throw err;
		}

		let agent = req.body;
		agent.pwd = hash;
		Agent_immo.create(agent).then((data) => res.status(201).json(data)).catch((err) => console.log(err));
	});
};

/**
 * 
 * Login agent
 */
exports.agent_login = (req, res, next) => {
	Agent_immo.findOne({
		where: {
			email: req.body.email
		}
	})
		.then((agent_immo) => {
			if (agent_immo) {
				console.log(agent_immo)
				bcrypt.compare(req.body.pwd, agent_immo.pwd, (err, result) => {
					if (err) res.status(500).json(err);
					else {
						if (result) {
							const token = jwt.sign({ email: agent_immo.email, name: agent_immo.name }, 'blabla', {
								expiresIn: '24h'
							});
							res.status(200).json({ token: token });
						} else {
							res.status(500).json({ message: 'You fail' });
						}
					}
				});
			} else {
				res.status(404).json({ message: 'Bad login / pwd' });
			}
		})
		.catch((err) => res.status(500).json(err));
};

/**
 * 
 * Detail agent
 */
exports.detail_agent = (req, res, next) => {
	const id = req.params.id;
	Agent_immo.findByPk(id).then((agent) => res.status(200).json(agent)).catch((err) => console.log(err));
};

/**
 * 
 * Add a agent
 */
exports.add_agent = (req, res, next) => {
	const agentCreated = req.body;
	Agent_immo.create(agentCreated)
	.then(() => res.status(201).json(agentCreated))
	.catch((err) => console.log(err));
}

/**
 * 
 * Edit a agent
 */
exports.edit_agent = (req, res, next) => {
	const id = req.params.id;
	const agent = req.body;
	Agent_immo.update(agent, {
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
	Agent_immo.destroy({
		where: {
			id: id
		}
	})
		.then((agentDeleted) => res.status(200).json({ message: `Agent deleted ${agentDeleted}` }))
		.catch((err) => console.log(err));
};

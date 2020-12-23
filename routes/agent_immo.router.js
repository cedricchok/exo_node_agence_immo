const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const agentImmoController = require('../controllers/agent_immo.controller');

router.get('/', auth(), agentImmoController.agent_list);
router.post('/register', agentImmoController.agent_register);
router.post('/login', agentImmoController.agent_login);
router.get('/:id', auth(), agentImmoController.detail_agent);
router.post('/', agentImmoController.add_agent);
router.put('/:id', agentImmoController.edit_agent);
router.delete('/:id', agentImmoController.delete_agent);

module.exports = router;
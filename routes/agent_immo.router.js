const express = require('express');
const router = express.Router();

const agentImmoController = require('../controllers/agent_immo.controller');

router.get('/', agentImmoController.agent_list);
router.get('/:id', agentImmoController.detail_agent);
router.post('/', agentImmoController.add_agent);
router.put('/:id', agentImmoController.edit_agent);
router.delete('/:id', agentImmoController.delete_agent);

module.exports = router;
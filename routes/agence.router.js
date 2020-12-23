const express = require('express');
const router = express.Router();

const agenceController = require('../controllers/agence.controller');

router.get('/', agenceController.agence_list);
router.get('/:id', agenceController.detail_agence);
router.post('/', agenceController.add_agence);
router.put('/:id', agenceController.edit_agence);
router.delete('/:id', agenceController.delete_agence);

module.exports = router;
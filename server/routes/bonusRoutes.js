const express = require('express');
const router = express.Router();
const {
  getBonusBenefits,
  getBonusBenefit,
  createBonusBenefit,
  updateBonusBenefit,
  deleteBonusBenefit
} = require('../controllers/bonusBenefitController');
const { protect, headPosterOnly } = require('../middleware/auth');

router.route('/')
  .get(getBonusBenefits)
  .post(protect, headPosterOnly, createBonusBenefit);

router.route('/:id')
  .get(getBonusBenefit)
  .put(protect, headPosterOnly, updateBonusBenefit)
  .delete(protect, headPosterOnly, deleteBonusBenefit);

module.exports = router;

import express from 'express';
const router = express.Router();

import bodyParser from 'body-parser';
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

import apiCtrl from './api/apiCtrl';

// api
// ROUTES HERE

export default router;

import express from 'express';
import MAIN from './controllers/MainController.js';
import PLAYER from './controllers/PlayerController.js';
import CLIP from './controllers/VideoController.js';
import GAME from './controllers/GameController.js';

const router = express.Router();

router.get('/', (req, res) => {
	res.redirect('/home');
});

router.get('/home', MAIN.index);
router.get('/stats', PLAYER.stats);
router.get('/players', PLAYER.player);
router.get('/rankings', PLAYER.ranking);
router.get('/clips', CLIP.allVideo);
router.post('/clips', CLIP.video_create);
router.get('/premier-league-bulls', GAME.indexGame);

export default (app) => {
  app.use(router);
}

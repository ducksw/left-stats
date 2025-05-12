import Game from '../models/GameModels.js';
import Steam from '../models/UserSteamModels.js'
import help from '../helpers/random.js';

const gm = {};

gm.indexGame = async (req, res) => {
  res.render('premier-league');
}

gm.createGame = async (req, res) => {
  if (!req.session.steamId) {
    res.send("Debes iniciar sesión con steam");
  }

  const code = help.randomString();
  const userSteamId = req.session.steamId;
  const displayName = req.session.displayName;
  const avatar = req.session.avatar;

  const player = { steamId: userSteamId, displayName, avatar };

  const newGame = new Game({
    code,
    players: [player],
    teamA: { players: [], points: "0" }, // Se inicializa con 0 puntos
    teamB: { players: [], points: "0" }
  });

  await newGame.save();
  console.log(`Partida creada (${code}) por ${displayName}`);
}

export default gm;

import Steam from '../models/UserSteamModels.js';
const pl = {};

pl.stats = async (req, res) => {
  const search = req.query.search?.trim();

  // almacena los datos
  let steam = [];

  if (search) {
    steam = await Steam.find({ displayName: { $regex: new RegExp(search, 'i') } });
  } else {
    steam = await Steam.find();
  }

  steam.sort((a, b) => (b.elo || 800) - (a.elo || 800));

  res.render('stats', { steam, search });
}

pl.player = async (req, res) => {
  const steam = await Steam.find();

  steam.sort((a, b) => (b.elo || 800) - (a.elo || 800));
  res.render('players', { steam });
}

pl.ranking = async (req, res) => {
  // rank, match, elo, damage, kills, win, loser

  // ranking 1 a 1
  let elos = await Steam.find();
  let damage = await Steam.find();
  let kill = await Steam.find();
  let wins = await Steam.find();

  elos.sort((a, b) => (b.elo || 800) - (a.elo || 800));
  damage.sort((a, b) => (b.damage) - (a.damage));
  kill.sort((a, b) => (b.kills) - (a.kills));
  wins.sort((a, b) => (b.win) - (a.win));

  elos = elos.slice(0, 1);
  damage = damage.slice(0, 1);
  kill = kill.slice(0, 1);
  wins = wins.slice(0, 1);

  // ranking 10 a 10
  let ranks = await Steam.find();
  let matchs = await Steam.find();
  let eloss = await Steam.find();
  let damages = await Steam.find();
  let kills = await Steam.find();
  let winss = await Steam.find();
  let losers = await Steam.find();

  ranks.sort((a, b) => (b.rank) - (a.rank));
  matchs.sort((a, b) => (b.match) - (a.match));
  eloss.sort((a, b) => (b.elo || 800) - (a.elo || 800));
  damages.sort((a, b) => (b.damage) - (a.damage));
  kills.sort((a, b) => (b.kills) - (a.kills));
  winss.sort((a, b) => (b.win) - (a.win));
  losers.sort((a, b) => (b.loser) - (a.loser));

  ranks = ranks.slice(0, 10);
  matchs = matchs.slice(0, 10);
  eloss = eloss.slice(0, 10);
  damages = damages.slice(0, 10);
  kills = kills.slice(0, 10);
  winss = winss.slice(0, 10);
  losers = losers.slice(0, 10);

  res.render('ranking' , { 
    elos, 
    damage, 
    kill, 
    wins,
    ranks,
    matchs,
    eloss,
    damages,
    kills,
    winss,
    losers
  });
}

export default pl;

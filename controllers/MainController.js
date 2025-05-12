import Steam from '../models/UserSteamModels.js';
import Video from '../models/VideoModel.js';

const mn = {};


mn.index = async (req, res) => {
  let user;
  const steamId = req.session.steamId;

  if (steamId) {
    user = await Steam.findOne({ steamId });
  }

  let video = await Video.find();
  let steam = await Steam.find();
  let eloRanking = await Steam.find();
  let win = await Steam.find();

  // ranking que tiene mas elo
  eloRanking.sort((a, b) => (b.elo || 800) - (a.elo || 800));
  win.sort((a, b) => (b.win || 0) - (a.win || 0));

  steam.reverse();
  video.reverse();
  steam = steam.slice(0, 10); // mostrar 10 players
  eloRanking = eloRanking.slice(0, 10); // mostrar 10 players con elo
  win = win.slice(0, 10);
  video = video.slice(0, 6);
  console.log("VIDEO", video);;


  res.render('index', {
    steam,
    eloRanking,
    elo: user?.elo,
    win,
    video,
  });
}

export default mn;

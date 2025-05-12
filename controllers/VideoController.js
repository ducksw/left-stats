import Video from '../models/VideoModel.js';

const vd = {};

vd.video_create = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.send("Debes iniciar sesión con Steam para subir clips");
    }

    const { title, link } = req.body;

    const newVideo = new Video({
    title,
    link,
    creator: {
      id: req.user.id,
      name: req.user.displayName
    }
    });

    await newVideo.save();

    res.redirect('/clips');
  } catch (error) {
    console.log(error);
  }
}

vd.allVideo = async (req, res) => {
  const videoId = req.params.id;
  const videos = await Video.findById(videoId);

  const video = await Video.find();
  video.reverse();

  res.render('clips', { video, videoId, videos });
}

export default vd;

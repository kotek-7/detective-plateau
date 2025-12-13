import express from "express";

const router = express.Router();

// 目標到達地点に関するイベントデータを返すエンドポイント
router.get('/events', (req, res) => {
  const events = [
    { type: "human", latitude: 35.01191, longitude: 135.76919, message: "「桂小五郎像」江里敏明" },
    { type: "hint", latitude: 35.01094, longitude: 135.7695, message: "アイランド・レイク (水の浮島)" },
    { type: "hint", latitude: 35.01093, longitude: 135.76438, message: "御池通の紫陽花" },
    { type: "hint", latitude: 35.00921, longitude: 135.76241, message: "京都文化博物館" },
    { type: "hint", latitude: 35.0105, longitude: 135.76264, message: "御所八幡宮" },
    { type: "human", latitude: 35.00889, longitude: 135.77132, message: "弥次さん、喜多さん像" },
    { type: "hint", latitude: 35.00721, longitude: 135.76356, message: "SAMURAI NINJA MUSEUM" },
    { type: "goal", latitude: 35.01244, longitude: 135.76773, message: "最終目標地点 京都市役所 分庁舎" },    
    { type: "footprints", latitude: 35.0150, longitude: 135.7720, message: "古い足跡" },
      ];
  res.json(events);
});

export default router;

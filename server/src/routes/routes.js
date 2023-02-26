import express from 'express';
const router = express.Router();
router.use(express.json());
router.get('/', function (req, res) {
  res.send('<h1>Israel is the Great</h1>');
});

router.get('/h', function (req, res) {
  res.send('<h1>You are fake</h1>');
});

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });
export default router;

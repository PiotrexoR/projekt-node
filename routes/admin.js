const express = require('express');
const News = require('../models/news');
const router = express.Router();

router.all('*', (req, res, next) => {
  if(!req.session.admin) {
    res.redirect('login');
    return;
  }

  next();
});

/* GET home page. */
router.get('/', (req, res) => {
  News.find({}, (err, data) => {
    console.log(data);
    res.render('admin/index', { title: 'Admin', data });

  });

});

router.get('/news/add', (req, res) => {
  res.render('admin/news-form', { title: 'Dodaj news', body: {}, error: {} });
});

router.post('/news/add', (req, res) => {
  const body = req.body;
  const newsData = new News(body);
  const error = newsData.validateSync();

  newsData.save((err) => {
    if(err) {
      res.render('admin/news-form', {title: 'Dodaj news', error, body});
      return;
    }

    res.redirect('/admin')
  });


  res.render('admin/news-form', { title: 'Dodaj news', error, body });
});

router.get('/news/delete/:id', (req, res) => {
News.findByIdAndDelete(req.params.id, (err) => {
  res.redirect('/admin');
})
})

module.exports = router;



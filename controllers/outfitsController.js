const Outfit = require('../models/outfit');
const mongoose = require('mongoose');

exports.index = (req, res) => {
    Outfit.find()
      .then(outfits => {
          res.render('outfits/index', {
            outfits: outfits,
            name: 'Archive'
          });
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/');
      });
};

exports.show = (req, res) => {
    Outfit.findOne({
        _id: req.params.id
      })
      .then(outfit => {
        res.render('outfits/show', {
          outfit: outfit,
          name: outfit.name,
          top: outfit.top,
          bottom: outfit.bottom,
          shoes: outfit.shoes
        });
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/');
      });
};

exports.new = (req, res) => {
    res.render('outfits/new', {
        title: 'New Outfit'
      });
};

exports.edit = (req, res) => {
    Outfit.findOne({
        _id: req.params.id
      })
      .then(outfit => {
        res.render('outfits/edit', {
          outfit: outfit,
          name: outfit.name,
          top: outfit.top,
          bottom: outfit.bottom,
          shoes: outfit.shoes
        });
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/');
      });
};

exports.create = async (req, res) => {
  req.isAuthenticated();

    Outfit.create(req.body.outfit)
      .then(() => {
        req.flash('success', 'New Outfit was created successfully.');
        res.redirect('/outfits');
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/outfits/new');
      });
};

exports.update = (req, res) => {
  req.isAuthenticated();
    Outfit.updateMany({
        _id: req.body.id,
        name: req.session.name
      }, req.body.outfit, {
        runValidators: true
      })
      .then(() => {
        req.flash('success', 'The Outfit was updated successfully.');
        res.redirect(`/outfits/${req.body.id}`);
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect(`/outfits/${req.body.id}/edit`);
      });
};

exports.destroy = (req, res) => {
  req.isAuthenticated();

  Outfit.deleteOne({
    _id: req.body.id,
    user: req.session.userId
  })
  .then(() => {
    req.flash('success', 'The Outfit was deleted successfully.');
    res.redirect('/outfits');
  })
  .catch(err => {
    req.flash('error', `ERROR: ${err}`);
    res.redirect(`/outfits`);
  });
};
const { new: _new, index, show, create, edit, update, delete: _delete } = require('../controllers/PlansController');

// Step 1: Write an authentication function to identify if a request is authenticated
function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({message: "You need to authenticate first"});
  }
  next();
}


// Step 2: Add the authentication function to all the routes below

module.exports = router => {
  router.get('/plans', index);
  router.get('/plans/new', auth, _new);
  router.post('/plans',auth, create); 
  router.post('/plans/update',auth, update); 
  router.post('/plans/delete',auth, _delete); 
  router.get('/plans/:id/edit',auth, edit); 
  router.get('/plans/:id', show);
};
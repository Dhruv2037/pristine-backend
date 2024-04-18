const express =  require("express");
const router  = express.Router();
const contactController =  require("../controllers/contactController");

router.post('/contactus', contactController.contactUsRegister);

module.exports = router;
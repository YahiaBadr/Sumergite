// Dependencies
const express = require("express");
const router = express.Router();
const passport = require('passport')

const adminController = require("../../controllers/adminController");
const caseController = require("../../controllers/caseController");
const formTemplateController = require("../../controllers/formTemplateController");
const adminAuth = passport.authenticate('adminAuth',{session: false});
const allAuth = passport.authenticate(['adminAuth','lawyerAuth','reviewerAuth'],{session: false});


//authorization
router.get('/auth',adminAuth,(req,res)=>{res.json({msg:"Hello Admin!"})});
router.get('/allAuth',allAuth,(req,res)=>{res.json({msg:"Hello All!"})});

//Read
router.get('/',adminAuth,adminController.getAllAdmins);

router.get("/:id",adminAuth, adminController.getAdmin);

//Create
router.post('/',adminAuth, adminController.createAdmin);

//Update
router.put("/:id", adminAuth, adminController.updateAdmin);

//Delete
router.delete("/:id", adminAuth, adminController.deleteAdmin);

router.get('/admin/getAllCases', adminAuth, adminController.getAllCases);

//get last lawyer worked on case
router.get("/getCaseLastLawyer/:id", adminAuth, caseController.getCaseLastLawyer);

//Register Lawyer
router.post('/registerLawyer', adminAuth, adminController.registerLawyer)

//Register Reviewer
router.post('/registerReviewer', adminAuth, adminController.registerReviewer);

//Login
router.post("/login", adminController.loginAdmin);

//Create FormTemplate
router.post('/createFormTemplate', adminAuth, formTemplateController.createFormTemplate)

module.exports = router;

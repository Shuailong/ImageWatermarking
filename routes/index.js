var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');

var express = require('express');
var router = express.Router();

var watermark = require('../utils/watermark')

/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', {});
});

/* Add watermark to image */
router.post('/addmark', function (req, res) {
	watermark.addMark();
	res.send('success');
});

/* Extract watermark from image */
router.post('/extract', function (req, res) {
	watermark.getMark();
	res.send('success');
});

/*
 * POST to get image and watermark.
 */
router.post('/upload', function (req, res){

	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
		res.send('success');
	});

	form.on('end', function(fields, files) {
		/* Temporary location of our uploaded file */
		var temp_path = this.openedFiles[0].path;		
		/* The file name of the uploaded file */
		var file_name = 'image.png';
		
		var temp_path2 = this.openedFiles[1].path;		
		/* The file name of the uploaded file */
		var file_name2 = 'mark.png';

		/* Location where we want to copy the uploaded file */
		var new_location = 'public/images/';

		fs.copy(temp_path, new_location + file_name, function(err) {  
			if (err) {
			console.error(err);
			}
		});
		fs.copy(temp_path2, new_location + file_name2, function(err) {  
			if (err) {
			console.error(err);
			}
		});
	});
});

/*
 * POST to get watermarked image to be tested.
 */
router.post('/upload2', function (req, res){

	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
		res.send('success');
	});

	form.on('end', function(fields, files) {
		/* Temporary location of our uploaded file */
		var temp_path = this.openedFiles[0].path;		
		/* The file name of the uploaded file */
		var file_name = 'marked.png';
				/* Location where we want to copy the uploaded file */
		var new_location = 'public/images/';

		fs.copy(temp_path, new_location + file_name, function(err) {  
			if (err) {
			console.error(err);
			}
		});
	});
});


module.exports = router;

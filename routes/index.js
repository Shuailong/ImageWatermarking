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

function callback(res)
{
	res.send('success');
}

/* Add watermark to image */
router.post('/addmark', function (req, res) {
	watermark.addMark(callback, res);
});

/* Extract watermark from image */
router.post('/extract', function (req, res) {
	watermark.getMark(callback, res);
});

/*
 * POST to get image and watermark.
 */
router.post('/upload', function (req, res){
	var form = new formidable.IncomingForm();
	var imgs = [];
	form.on('file', function(field, file){
		imgs.push([field, file]);
	})
	.on('end', function() {
		var uploaddir = 'public/images/';
		if(imgs[0][0] == 'imgfile1'){
			fs.copySync(imgs[0][1].path, uploaddir + 'image.png');
			fs.copySync(imgs[1][1].path, uploaddir + 'mark.png');
		}
		else{
			fs.copySync(imgs[1][1].path, uploaddir + 'image.png');
			fs.copySync(imgs[0][1].path, uploaddir + 'mark.png');
		}
		res.send('success');
	});
	form.parse(req);
});

/*
 * POST to get watermarked image to be tested.
 */
router.post('/upload2', function (req, res){
	var form = new formidable.IncomingForm();
	form.on('file', function(field, file){
		var uploaddir = 'public/images/';
		fs.copySync(file.path, uploaddir + 'marked.png');
	})
	.on('end', function(){
		res.send('success');
	});
	form.parse(req);
});


module.exports = router;

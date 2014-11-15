var fs = require('fs'),
	gm = require('gm'),
	PNG = require('pngjs').PNG,
    events = require('events').EventEmitter;

exports.addMark = function(callback, res)
{
	var mark_mat = new Array();
	for(var i = 0; i < 255; ++i){
		mark_mat[i] = new Array();
		for(var j = 0; j < 255; ++j){
			mark_mat[i][j] = new Array();
		}
	}

	fs.createReadStream('./public/images/mark.png')
	.pipe(new PNG({
		filterType: 3
	}))
	.on('parsed', function(){
		for (var i = 0; i < 255; i++) {
            for (var j = 0; j < 255; j++) {
                var idx = (255 * i + j) << 2;
                mark_mat[i][j][0] = this.data[idx];
                mark_mat[i][j][1] = this.data[idx+1];
                mark_mat[i][j][2] = this.data[idx+2];
            }
        }
        fs.createReadStream('./public/images/image.png')
        .pipe(new PNG({
            filterType: 3
        }))
        .on('parsed', function() {
            for (var i = 0; i < 255; i++) {
                for (var j = 0; j < 255; j++) {
                    var idx = (255 * i + j) << 2;
                    mark_mat[i][j][0] /= 85;
                    mark_mat[i][j][1] /= 85;
                    mark_mat[i][j][2] /= 85;

                    this.data[idx]   &= 0xfc;
                    this.data[idx]   |= mark_mat[i][j][0]; 

                    this.data[idx+1] &= 0xfc;
                    this.data[idx+1] |= mark_mat[i][j][1];

                    this.data[idx+2] &= 0xfc;
                    this.data[idx+2] |= mark_mat[i][j][2];
                }
            }
            var data = this.pack();
            var marked = fs.createWriteStream('./public/images/marked.png');
            data.pipe(marked, {end: false});
            data.on('end', function(){
                marked.end();
                callback(res);
            });            
        });
	});
}


exports.getMark = function(callback, res)
{
	/* Deprive watermark from marked marked img
	   return watermark */
	fs.createReadStream('./public/images/marked.png')
    .pipe(new PNG({
        filterType: 3
    }))
    .on('parsed', function() {
        for (var i = 0; i < 255; i++) {
            for (var j = 0; j < 255; j++) {
            	var idx = (255 * i + j) << 2;
                this.data[idx] &= 0x3;
                this.data[idx] *= 85;

                this.data[idx+1] &= 0x3;
                this.data[idx+1] *= 85;

                this.data[idx+2] &= 0x3;
                this.data[idx+2] *= 85;
            }
        }
        var data = this.pack();
        var marked = fs.createWriteStream('./public/images/remark.png');
        data.pipe(marked, {end: false});
        data.on('end', function(){
            marked.end();
            callback(res);
        });     
    });
}

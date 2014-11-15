$(document).ready(function() {
    $('#images').on('submit', function(e){
    	e.preventDefault();
        $(this).ajaxSubmit({
            success: function(response, status) {
                if(response == 'success') {
                    $('#img1').html('<img src="images/image.png" />');
                    $('#img2').html('<img src="images/mark.png" />');
                    $('#img1 img').load('/images/image.png');
                    $('#img2 img').load('/images/mark.png');
                }
            }
        }); 
    });

    $('#markform').on('submit', function(e){
        e.preventDefault();
        $(this).ajaxSubmit({
            success: function(response, status) {
                if(response == 'success') {
                    $('#img3').html('<img src="images/marked.png" />');
                    $('#img3 img').load('/images/marked.png');
                }
            }
        }); 
    });

    $('#upload2').on('submit', function(e){
        e.preventDefault();
        $(this).ajaxSubmit({
            success: function(response, status) {
                if(response == 'success') {
                    $('#img3').html('<img src="images/marked.png" />');
                    $('#img3 img').load('/images/marked.png');
                }
            }
        }); 
    });

    $('#extractform').on('submit', function(e){
        e.preventDefault();
        $(this).ajaxSubmit({
            success: function(response, status) {
                if(response == 'success') {
                    $('#img4').html('<img src="images/remark.png" />');
                    $('#img4 img').load('/images/remark.png');
                }
            }
        }); 
    });
});
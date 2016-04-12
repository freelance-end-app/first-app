var yourApiKey = 'ASXK1AyXYRFuC4vLzw8oGz';
filepicker.setKey(yourApiKey);

document.getElementById("uploadPhotoBtn").onclick = function(){
  filepicker.pick({
      services:['COMPUTER', 'CONVERT'],
      mimetype:'image/*',
      cropRatio:1,
      cropForce:true,
    },
    function onSuccess(Blob){
      var image = document.getElementById("imgPlaceholder");
      var src = 'https://process.filestackapi.com/' + yourApiKey +
        '/circle/' + Blob.url;
      image.setAttribute('src', src);
      console.log(src);
    var imgn =  $('<img>').attr('src', src);
      $('body').append(imgn);
    }
  );
};

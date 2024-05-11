// Check if there's a previously saved image in local storage
var savedImage = localStorage.getItem('profileImage');
if (savedImage) {
  document.getElementById('photo').setAttribute('src', savedImage);
}

document.getElementById('uploadbtn').addEventListener('click', function () {
  document.getElementById('file').click();
});

document.getElementById('file').addEventListener('change', function () {
  var file = this.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('photo').setAttribute('src', e.target.result);
      // Save the image data to local storage
      localStorage.setItem('profileImage', e.target.result);
    }
    reader.readAsDataURL(file);
  }
});
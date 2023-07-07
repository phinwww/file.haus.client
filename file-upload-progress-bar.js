let fileInput, uploadProgress, message;

function init() {
    fileInput = document.getElementById('filetoupload');
    uploadProgress = document.getElementById('upload-progress');
    message = document.getElementById('message');

    fileInput.addEventListener('change', function () {
        let xhr = new XMLHttpRequest(),
            fd = new FormData();

        fd.append('filetoupload', fileInput.files[0]);

        xhr.upload.onloadstart = function (e) {
            uploadProgress.classList.add('visible');
            uploadProgress.value = 0;
            uploadProgress.max = e.total;
            message.textContent = 'uploading...';
            fileInput.disabled = true;
        };

        xhr.upload.onprogress = function (e) {
            uploadProgress.value = e.loaded;
            uploadProgress.max = e.total;
        };

        xhr.upload.onloadend = function (e) {
            uploadProgress.classList.remove('visible');
            message.textContent = 'complete!';
            fileInput.disabled = false;
        };

        xhr.onload = function () {
            message.textContent = 'server says: "' + xhr.responseText + '"';
        };

        xhr.open('POST', 'https://file.haus/cdn1/', true);
        xhr.send(fd);
    });
}

init();

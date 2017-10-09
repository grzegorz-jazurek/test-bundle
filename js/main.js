import userController from './user-controller';
import videoController from './video-controller';
import uploadController from './upload-controller';
import configConstants from './config';

$(document).ready(function () {
    userController.init(configConstants);
    videoController.init(configConstants);
    uploadController.init(configConstants);
});



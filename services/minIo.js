// @ts-nocheck
const MinIo = require('minio');
const variables = require('../constants/variables');
const Photo = require('../models/Photo');

const minIoClient = new MinIo.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'long',
  secretKey: 'test1234',
});

exports.minIoUpload = async (userId, files) => {
  let retrieveNewURL, imgPath;

  // Upload photos of the post
  if (files.length > 0) {
    await Promise.all(
      files.map(async (file) => {
        retrieveNewURL = await retrieveAndUpload(file, false);
        console.log('retrieveNewURL1 :>> ', retrieveNewURL);

        return Photo.update(
          { avatar: retrieveNewURL },
          { where: { id: userId } }
        );
      })
    );

    return `${variables.UPLOADED_PHOTOS}`;
  }

  // Upload Avatar
  retrieveNewURL = await retrieveAndUpload(files, true);
  console.log('retrieveNewURL2 :>> ', retrieveNewURL);
  await User.update({ avatar: retrieveNewURL }, { where: { id: userId } });
  return `${variables.UPLOADED_AVATAR}`;

  async function retrieveAndUpload(file, isUploadAvatar) {
    imgPath = `uploads/${isUploadAvatar ? `avatars` : `photos`}/${file.name}`;
    file.mv(imgPath);
    console.log('file.data :>> ', file.data);
    return minIoClient.putObject(
      process.env.MIN_IO_BUCKET,
      file.name,
      file.data,
      function (err, etag) {
        return console.log('err, etag :>> ', err, etag); // err should be null
      }
    );
  }
};

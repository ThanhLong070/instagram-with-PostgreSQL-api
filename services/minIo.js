// @ts-nocheck
const variables = require('../constants/variables');
const Photo = require('../models/Photo');
const User = require('../models/User');
const minIoClient = require('../configs/minIo');
const client = require('../loaders/redis');

exports.minIoUpload = async (user, postId, files) => {
  let retrieveNewURL, imgPath;

  // Upload photos of the post
  if (files.length > 0) {
    await Promise.all(
      files.map(async (file) => {
        retrieveNewURL = await retrieveAndUpload(file, false);

        const photo = await Photo.findOne({
          where: { postId },
        });

        const body = { name: retrieveNewURL, postId };
        if (photo) return Photo.update(body);
        return Photo.create(body);
      })
    );

    return { message: `${variables.UPLOADED_PHOTOS}`, retrieveNewURL };
  }

  // Upload Avatar
  retrieveNewURL = await retrieveAndUpload(files, true);
  await User.update({ avatar: retrieveNewURL }, { where: { id: user.id } });
  return { message: `${variables.UPLOADED_AVATAR}`, retrieveNewURL };

  async function retrieveAndUpload(file, isUploadAvatar) {
    try {
      const fileName = isUploadAvatar
        ? `${user.username}_avatar_${file.name}`
        : `${postId}_photo_${file.name}`;

      const folderUpload = isUploadAvatar ? `avatars` : `photos`;
      imgPath = `uploads/${folderUpload}/${fileName}`;
      file.mv(imgPath);

      const metaData = {
        'Content-Type': file.mimetype,
      };

      await minIoClient.putObject(
        process.env.MIN_IO_BUCKET,
        fileName,
        file.data,
        file.size,
        metaData
      );

      // // get url
      // const url = await minIoClient.presignedGetObject(
      //   process.env.MIN_IO_BUCKET,
      //   fileName
      // );

      // const url = await minIoClient.getObject(
      //   process.env.MIN_IO_BUCKET,
      //   fileName
      // );

      const url = `/${process.env.MIN_IO_BUCKET}/${fileName}`;
      return url;
    } catch (err) {
      throw new Error(err.message);
    }
  }
};

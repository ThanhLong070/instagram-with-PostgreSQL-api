// @ts-nocheck
const minIoClient = require('../configs/minIo');
const Logger = require('../loaders/logger');

module.exports = async () => {
  Logger.info(`👀 Creating Bucket: ${process.env.MIN_IO_BUCKET}`);
  await minIoClient
    .makeBucket(process.env.MIN_IO_BUCKET, 'hello-there')
    .catch((e) => {
      Logger.info(
        `👀 Error while creating bucket '${process.env.MIN_IO_BUCKET}': ${e.message}`
      );
    });

  Logger.info(`👀 Listing all buckets...`);
  const bucketsList = await minIoClient.listBuckets();
  Logger.info(
    `👀 Buckets List: ${bucketsList.map((bucket) => bucket.name).join(',\t')}`
  );

  let assets = [];
  let objectsStream = minIoClient.listObjects(process.env.MIN_IO_BUCKET, '');
  objectsStream.on('data', function (obj) {
    // Lets construct the URL with our object name.
    let publicUrl =
      minIoClient.protocol +
      '//' +
      minIoClient.host +
      ':' +
      minIoClient.port +
      '/' +
      process.env.MIN_IO_BUCKET +
      '/' +
      obj.name;
    assets.push(publicUrl);
  });
  objectsStream.on('error', function (e) {
    console.log('👀 erorr', e);
  });
  objectsStream.on('end', function (e) {
    console.log('👀 assets', assets);
    // Pass our assets array to our home.handlebars template.
    // res.render('home', { url: assets });
  });
};

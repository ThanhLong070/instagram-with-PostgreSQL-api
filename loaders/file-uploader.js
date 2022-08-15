const Minio = require('minio');

var minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'long',
  secretKey: 'test1234',
});

var file =
  '/Users/draco/Documents/work/mine/instagram-with-PostgreSQL-api/uploads/avatar/621c96ce5d4e8.png';

minioClient.listBuckets(function (err, buckets) {
  if (err) return console.log(err);
  console.log('buckets :', buckets);
});

// Make a bucket called photos.
minioClient.makeBucket('photos', 'us-east-1', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Bucket created successfully in "us-east-1".');
  }

  var metaData = {
    'Content-Type': 'application/octet-stream',
  };
  // Using fPutObject API upload your file to the bucket photos.
  minioClient.fPutObject(
    'photos',
    'icon.png',
    file,
    metaData,
    function (err, etag) {
      if (err) return console.log(err);
      console.log('File uploaded successfully.');
    }
  );
});

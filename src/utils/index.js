export const APIURL =
  'https://elfnovrye5.execute-api.eu-west-2.amazonaws.com/dev/api/';
export const S3BUCKETURL =
  'https://findmeacontractor5f0bcc14d932483aabc269104b955010736-dev.s3.eu-west-2.amazonaws.com/public/';
export const FORMATE_DATE = function (date) {
  date = new Date(date);
  return (
    date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()
    // +
    // ' ' +
    // ('0' + date.getHours()).slice(-2) +
    // ':' +
    // ('0' + date.getMinutes()).slice(-2) +
    // ':' +
    // ('0' + date.getSeconds()).slice(-2) +
    // ' ' +
    // (date.getHours() < 12 ? 'AM' : 'PM')
  );
};

export function RANDOMWORDS(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export const LIMIT = 2;

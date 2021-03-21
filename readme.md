# FindMeAContractor

## Installation

    git clone https://github.com/karandaid/FindMeAContractor.git
    yarn cd FindMeAContractor
    yarn
    yarn pod
    yarn ios

## Migration

// Make sure to remember where ever there is content with ${} or ${ name here } is an indicator that your need to replace it will appropriate string.

- Migrating AWS Account will require a removal of two files, 1 - amplify, and second will be inside of src folder named aws-exports

  - Then in the root
    Start configuration, will require you to login and after that will ask you to input the aws key and secret key.
    Ref : https://docs.amplify.aws/cli/start/install#option-2-follow-the-instructions

  ```
  amplify configure
  ```

  amplify init will initialize the project.

  ```
  amplify init
  ```

  amplify auth enable auth for the project
  ref : https://docs.amplify.aws/lib/auth/getting-started/q/platform/js#authentication-with-amplify

  ```
  amplify add Auth
  ```

  amplify auth enable storage will enable storage usage for the project
  ref : https://docs.amplify.aws/cli/storage/overview

  ```
  amplify add Storage
  ```

  amplify push will push all the configuration to the cloud.

  ```
  amplify push
  ```

Reference for future developer to follow this ref for better configuration of the project.
ref : https://itnext.io/aws-amplify-react-native-authentication-full-setup-7764b452a138

- Renaming Project.

  ```
  npx react-native-rename "Your App name" -b com.${ your organization name }.${ your app name }
  ```

- Migrating lambda will require changes in the front-end as well.

  - Change the url for the pervious lambda https functions url inside of 'src/utils/index.js' and change the url

- Migrating bucket will need few additional steps as well.

  - visit aws console and and visit s3.
  - Find your bucket name and visit the bucket link.
  - On the top tabs there will be a permission tab, click on it and scroll to the bottom. there you will find a bucket policy. Edit it to.

  ```
  {
  "Version": "2008-10-17",
  "Statement": [
      {
          "Sid": "AllowPublicRead",
          "Effect": "Allow",
          "Principal": {
              "AWS": "*"
          },
          "Action": "s3:GetObject",
          "Resource": "YOUR Bucket ARN" <--- Replace this to the ARN provided just above the textarea.
      }
      ]
  }
  ```

  - Next step is to generate a public url for the bucket which can be done like this.

  ```
    'https://{ Your bucket name here }.s3.{ Your region for e.g eu-west-2 }.amazonaws.com/public/';
  ```

  - Next step would be to replace the above s3 public in "src/utils/index.js" S3BUCKETURL

- Migrating reverse Geocode api, visit "src/utils/index.js" and replace GEOCODEAPIKEY with the new one.

- Migrating Firebase, you will need to get two files "google-service.json" and "GoogleService-Info.plist".
  for GoogleService-Info.plist, ref : https://rnfirebase.io/#3-ios-setup
  for google-service.json,
  Open the Firebase console, add a new Android application and enter your projects details. Project package name is com.rajaosama.findmeacontractor. Download the google-services.json file and place it inside of your project at the following location: /android/app/google-services.json.
  Ref : https://rnfirebase.io/#generating-android-credentials

## Backend EndPoint

You can change the backend endPoint by going to src/utils/index.js, you will find an api url, Just change the Endpoint url your backend.

## Developing Backend and Integration with the front-end:

The FindMeAContractor features includes, Jobs Posting, Filtering that job posting by categories and search, Users bids, and filtering those bids by status, Jobs, and filtering those jobs by status, Making a Job, with images, Chating system and Profile.

I have written the backend for the project FindMeAContractor and this short description will be acting as documentation of the schema and Features and functions for the backend Part.

### Stack :

The stack that has been used for the development of the backend includes,
MongoDB Hosted on Atlas
Restful API is written in framework node.js over express.js, deployed on AWS.
Images are being uploaded into s3 Bucket

An additional feature that includes, pagination, search by Text and searches by category is implemented within the app which was not the requirement.

There is a chatting system, it is not real-time, since it was not the requirement as well.

The above writing routes like Post, update by id, and delete contain side effects. Those sided effects will affect the database such as if the job is being rated, it will be implemented on the user's profile automatically.

### NOTE :

Kindly do the QA for all the functionality that was mentioned in the requirmenet.

`The UI of the app is basic, that is because no design was provided and there was no design support as well, I had to create it on my own, so any QA on UI look wise would be considered as a suggestion, and will be decided by the developer to be implemented or not. All the asked feature is being implemented, and the feature specification was very weak, So any specification that makes it more complex will be considered as a suggestion, therefore will be dependent on the developer to implement it or not.`

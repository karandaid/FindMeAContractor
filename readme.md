# FindMeAContractor

## Installation

    git clone https://github.com/karandaid/FindMeAContractor.git
    yarn cd FindMeAContractor
    yarn
    yarn pod
    yarn ios

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

### Schema :

# Users :

    uid : user Cognito ID
    email : user email
    name : user name
    phone : user phone number
    address : user Address
    status : user Status, if status deactivated, he won’t be able to login
    jobs : Jobs posted
    bids : bids posted
    awarded : jobs awarded
    rating : rating
    image : profile image
    created_at

# Jobs :

    uid : user id, who posted this job - relation
    title : title of the post
    description : description
    price : price of the job
    category : which category the job falls in
    images : job gallery
    status : jobs status, it won’t show in jobs if closed
    awarded : check if the job is being awarded or not.
    rating : the contractor rating
    review : the review for the contractor
    created_at :

# Bids :

    uid : who posted the bid
    jid : which job the bid is posted on
    status : status of the bid, it can be awarded, active, and closed
    description : the description of the bid more then 100 character needed
    highlighted : is paid for
    cost : the offered cost.
    created_at

# Categories :

    name : the name of the category
    created_at

# Chats :

    alias : the name of the person who commented
    jid : Relation - > which job the conversation is happening on.
    uid : the user id who is writing the message
    message : message
    attachment : attachment, only include images.
    created_at

`The Database structured is mostly relation-based. The backend rest includes 6 routes. `

    -> Get
    -> Post
    -> Get by id
    -> Update by id
    -> Delete by Id

An additional feature that includes, pagination, search by Text and searches by category is implemented within the app which was not the requirement.

There is a chating system, it is not real-time, since it was not the requirement as well.

The above writing routes like Post, update by id, and delete contain side effects. Those sided effects will affect the database such as if the job is being rated, it will be implemented on the user's profile automatically.

### NOTE :

Kindly do the QA for all the functionality that was mentioned in the requirmenet.

`The UI of the app is basic, that is because no design was provided and there was no design support as well, I had to create it on my own, so any QA on UI look wise would be considered as a suggestion, and will be decided by the developer to be implemented or not. All the asked feature is being implemented, and the feature specification was very weak, So any specification that makes it more complex will be considered as a suggestion, therefore will be dependent on the developer to implement it or not.`

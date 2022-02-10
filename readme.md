# Ecommerce Database : 
This is a simple database for an ecommerce developed with Node.js:
## Geting Started 🚀
- Clone this repository `https://github.com/TheBouns/SocialBackend.git`
- Install the dependencies `npm install`
- Create a new repo on GitHub: `https://github.com/new`
    - Make sure the "Initialize this repository with a README" option is left unchecked
- Update the remote to point to your GitHub repository: git remote set-url origin `https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME`

## Working on the project 👷‍♂️
* Move into the project directory: `cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME`
* Run the project with : `npm run dev`
    * Server runs at [https://localhost:3000](https://localhost:3000) (by default).
    * Automatically restarts when any of your files change

## Databases

By default the template is configured to connect to a MongoDB database.
The database has 2 collections: users,posts.

## Starting with the project🌟🌟

First set the configuration to your database:
you gonna need to create inside the folder `config/` keys.js, with a code like this: 
```js
module.exports ={
    MONGO_URI: 'mongodb+srv://<name>:<password>@cluster0.okkb4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

}

```
By default alls user role is set by dafefault ("admin") to start creating and making changes   to the data base.

**LAST STEP ENJOY**

----------------------------------------------------------------------------------------------------------

## Endpoints:

You have all endpoints information here : [https://documenter.getpostman.com/view/15043871/UVeMGN](https://documenter.getpostman.com/view/15043871/UVeMGN)

--------------------------------------------------------------------

## Build with 🛠
- **JavaScript**
- **Node.js**
- **Express**
- **Nodemon**
- **MongoDB**
- **DotEnv**/**Multer**
- **Nodemailer** / **jsonwebtoken**
- **Postman**
--------------------------------------------------------------------
## License
[MIT](https://choosealicense.com/licenses/mit/)
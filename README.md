# RedditPG

## Development Stack
* Meteor
* React
* FlowRouter
* Roles
* Material-UI
* FlexBox Grid
* Formsy
* Cheerio

## Setup
```
git clone git@github.com:sunlee-newyork/RedditPG.git
cd RedditPG
sudo meteor update --patch (current workaround to meteor-tools download hangup)
npm install
meteor --settings=settings-development.json
```

## Accounts
There are 3 types of roles in RedditPG:
1. Admin
2. Mod
3. Poster

The ```setAdminData``` fixture will initialize an admin account if none is found. The credentials for this admin account is located in ```settings-development.json```. Only the admin will have access to the "Admin Page" and "Create User" options in the profile dropdown menu. From the Admin Page, an admin will be able to manipulate user accounts.

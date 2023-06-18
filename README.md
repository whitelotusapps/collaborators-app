# Collaborators App

![GitHub tag checks state](https://img.shields.io/github/checks-status/whitelotusapps/collaborators-app/v1.0)
![GitHub language count](https://img.shields.io/github/languages/count/whitelotusapps/collaborators-app)
![GitHub top language](https://img.shields.io/github/languages/top/whitelotusapps/collaborators-app)
![GitHub repo size](https://img.shields.io/github/repo-size/whitelotusapps/collaborators-app)
![GitHub all releases](https://img.shields.io/github/downloads/whitelotusapps/collaborators-app/total)
![GitHub issues](https://img.shields.io/github/issues-raw/whitelotusapps/collaborators-app)
![GitHub](https://img.shields.io/github/license/whitelotusapps/collaborators-app)
![GitHub last commit](https://img.shields.io/github/last-commit/whitelotusapps/collaborators-app)

## Purpose

Add unique tags to Zendesk tickets that allow you to create views based on the collaborators on the ticket.

Things to know about v1.0:
- This app runs in the background; there are no icons for this app displayed anywhere within the Agent Workspace.
- At the moment, I am unable to differentiate between CC and Followers; within this framework, both CC and Followers are known as "collaborators". This means that ANYONE who is a CC *OR* a Follower on the ticket will have a tag generated for them; this includes external contacts.
## Known Issues:
As of 2023-06-18, there are no known issues.
## Safety Level
CAUTION

- WRITES TAGS TO TICKET
## Installation
1. Download the "source.zip" from the Releases section, which is located on the right hand side of this page
2. Login to the Admin Console of your Zendesk Instance
3. Navigate to "Zendesk Support Apps"
4. In the upper right hand corner of the screen, there should be a "Upload private app" button, click on this
5. For the "App Name", type in "Collaborators App"
6. Click "Choose File"
7. Browse to the location on your computer where you saved the "collaborators-app-1.0.zip" (NOTE: the version number is subject to change)
8. Click "Upload"
9. Another screen should appear, review the caveats, and if you are sure, then press "Upload"
10. The app will then queue and then install into your Zendesk instance
11. You will be presented with the standard config screen to enable role and/or group restrictions
12. Once you have defined the restrictions, click "Install"
13. The "Collaborators App" app is now installed into your Zendesk instance
## Configuration

When you first install the app, you will be presented with 3 options for this app:

1. Collaborator Tag Prefix
  - This is a text field.
  - Whatever is entered into this field will be the start of the tag

2. Collaborator Tag Suffix
  - This is a text field.
  - Whatever is entered into this field will be appended to the end of the tag

3. Include collaborator email address in tag
  - This is a checkbox
  - This will include the collaborators email address as part of the tag
  - This is recommended to ensure truly unique tag names

An example of this is below:

```
Below is an example of a tag:

v1_packaged_app_pre_zack_test-account_test-account_at_example.com_v1_packaged_app_suf

* The 'Collaborator Tag Prefix' was defined as "v1_packaged_app_pre"
* The 'Collaborator Tag Suffix' was defined as "v1_packaged_app_suf"
* The 'Include collaborator email address in tag' option was checked
* The name of the user is: "Zack (Test-Account)"
* The email address of the user is: test-account@example.com
```
## Usage

1. Once the app is installed, and the prefix, suffix, and include email address settings are configured, the Collaborators App is ready to go

2. All that needs to be done is to:
  - Have followers and/or CCs saved to a ticket
  - Once the ticket is viewed by an Agent, the app will read in all of the collaborators on the ticket, generate tags based upon the configuration, and then check the ticket to see if those tags already exist on the ticket, and any collaborator tags that do not already exist get applied to the ticket

3. Once tags have been created within the Zendesk instance, then Views can be created based upon these tags
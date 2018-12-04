# resume-generator
Project for SE575 at Drexel University. Generates resumes on demand based on JSON data from remote users.

Author: Jonathan McDaniel

Video Demo: **[insert link here]**

## Building the Project
### Prerequisites
1. Download and install Node.js if it is not already installed on your system. Node.js can be downloaded from its [website](https://nodejs.org/en/).

### Building
1. Download or clone this repo.
2. Navigate to the repo directory.
3. Open a Node.js command shell.
4. Navigate into the app folder `cd app`.
5. Install mobile app dependencies `npm install`.
6. Navigate to the webservices folder `cd ../webservice` or `cd ..\webservice` for Windows.
7. Navigate to the repo root `cd ..`.
8. Start the project `npm start`.
9. The mobile app should open in your default web browser.

## Using the Application
1. Enter desired information in the form on the **Home** tab.
2. Select your desired template name from the dropdown at the bottom of the form.
3. Click the *Generate Resume* button.
4. Once your resume is generated, a *View Resume* button will appear.
5. Click the *View Resume* button to view your newly generated resume.
6. Repeat as needed.

## Architectural Diagrams

## Screenshots
### Data Collection Used in Generation
![Full Data Collection Form](/images/screenshots/full_form.png)

### Allow User to Choose Template Before Generation
![Choose Resume Template](/images/screenshots/choose_template.PNG)

### Basic Resume Template
![Generated Resume Basic](/images/screenshots/generated_resume_basic.PNG)

### Red Resume Template
![Generated Resume Red](/images/screenshots/generated_resume_red.PNG)

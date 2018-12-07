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
4. Run the command `npm run build-start`
5. The mobile app should open in your default web browser.
6. Terminate the webservice and the app by using `^C` in the terminal window.

## Using the Application
1. Enter desired information in the form on the **Home** tab.
2. Select your desired template name from the dropdown at the bottom of the form.
3. Click the *Generate Resume* button.
4. Once your resume is generated, a *View Resume* button will appear.
5. Click the *View Resume* button to view your newly generated resume.
6. Repeat as needed.

## Architectural Diagrams
### Context Diagram
The context of the system is that a user will use the system to generate resumes based on provided templated. The system depends on a file system to store resumes and templates and a tool called puppeteer to handle the creation of PDFs.

![Context Diagram](/images/architecture/context.png)

### Container Diagram
The resume-generator system consists of two main containers: a mobile application, and a web service. The mobile application is what allows the user to input their information and view their resume once it is generated. The web service does all of the heavy lifting with compiling the data and the actual generation of the resume PDF. A website or API application could also be easily tied to the same web service without modification but they do not exist in the implementation contained in this repository so they are not shown.

![Container Diagram](/images/architecture/container.png)

### Component Diagram
The following component diagram is actually two component diagrams combined into one view, a componend diagram for the mobile application and another for the web service.

Within the mobile application there are two components that the user will interact with directly. The AboutComponent is strictly informational with a view containing instructions on how to use the system. The HomeComponent provides a view to the user so that they may enter their resume information. The HomeComponent also handles compiling the data provided into JSON and handing this data off to the GenerateService. The GenerateService handles network requests for the system from the mobile application. This includes getting current network information, sending the JSON payload to the appropriate location on the web service, and handling network errors.

On the web service container, the router component takes in all incoming network requests and routes them to the appropriate code. The generate service is where the JSON data is decoded and applied to a Handlebars template which is then translated to HTML from the templating engine component. This generated HTML is then handed to Puppeteer to be saved as a PDF. The Generate Service also handles working with the server file system to load templates and for saving the generated PDF resumes for future use.

![Component Diagram](/images/architecture/component.png)

## Screenshots of the Application
### Data Collection Used in Generation
This image shows what the complete data collection form looks like.

![Full Data Collection Form](/images/screenshots/full_form.png)

### Allow User to Choose Template Before Generation
Shows the UI that is used to allow the user to select which template they would like to use for their resume before it is generated.

![Choose Resume Template](/images/screenshots/choose_template.PNG)

### Basic Resume Template
One of the generated resumes. This is from the basic template.

![Generated Resume Basic](/images/screenshots/generated_resume_basic.PNG)

### Red Resume Template
One of the generated resumes. This is from the red template.

![Generated Resume Red](/images/screenshots/generated_resume_red.PNG)

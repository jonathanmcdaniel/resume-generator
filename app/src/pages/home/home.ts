import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GenerateService} from '../../services/generate.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pdfUrl = "";

  resumeData = {};
  resumeTemplate = "";

  biographicData = {
    "name": "",
    "addr1": "",
    "addr2": "",
    "city": "",
    "state": "",
    "email": "",
    "summary": ""
  };
  educationData = {
    "name": "",
    "city": "",
    "state": "",
    "degree": "",
    "date": ""
  };
  experienceData = {
    "title": "",
    "employer": "",
    "city": "",
    "state": "",
    "startDate": "",
    "endData": "",
    "description": ""
  };
  skillData = [];

  skillDataString = "";

  states = [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
  ];

  constructor(public navCtrl: NavController, public generateService: GenerateService) {
    
  }

  cleanSkillData(){
    var skills = this.skillDataString.split(",");
    skills.forEach(skill => {
      var trimmedSkill = skill.trim();
      this.skillData.push(trimmedSkill);
    });
  }
  
  buildResumeJSON() {
    this.resumeData['biographics'] = this.biographicData;

    this.resumeData['education'] = [];
    this.resumeData['education'].push(this.educationData)

    this.resumeData['experience'] = [];
    this.resumeData['experience'].push(this.experienceData)

    this.resumeData['skills'] = [];
    this.resumeData['skills'] = this.skillData;
  }

  generateResume(event) {
    this.pdfUrl = "";
    this.cleanSkillData();
    this.buildResumeJSON();
    let resumeDataJSON = JSON.stringify(this.resumeData);
    this.generateService.postResumeData(resumeDataJSON, this.resumeTemplate).subscribe(
      data => this.storeResume(data),
      error => console.error(error)
    );
  }

  storeResume(data){
    this.pdfUrl = data.pdfUrl;
  }

  viewResume(){
    let localUrl = this.generateService.getLocalURL();
    window.open(localUrl + ":3000/" + this.pdfUrl, "_blank");
  }

}

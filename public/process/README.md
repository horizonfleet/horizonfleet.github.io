---
title: Documentation
sidebar: auto
sidebarDepth: 2
lang: en-US
---

# Our Process

Welcome to the official documentation of the development process of Horizon.

Horizon was build on the basis of two processes:

 1. The Design Thinking Process
 2. The Data Driven Decision Making Process / Cross-industry standard process for data mining

Both processes where necessary to not only work with the data, but also ideate and develop ideas for the frontend. The Cross-industry standard process for data mining is separated in 6 steps, which will guide through this documentation. 
The documentation is structured into Design Thinking, Data Source, Backend, Frontend and Deployment part.
At the right times, reference to the corresponding stage in CRISP-DM will be given by indicating the number of the process step. However, this project has went through many more stages than are found in a typical data science / data mining process, mainly due to the data streaming nature of Horizon.
The documentation is therefore enriched with ideas and results from the design thinking process as well as a description of most other steps that were part of the project.
In the conclusion, we give a resume of what we learned, difficulties and challenges we faced and how Horizon could be further improved.  


![CRISP](/CRISP.png?raw=true)

# Design Thinking

Following is the description of the first stage inside the CRISP-DM process model. The second step follows in the description of the [Data Source](/datasource).

## 1. Business Understanding

**Responsible: Jan Anders, Felix Bieswanger, Sebastian Hermann, David Rundel & Anja Stütz**

Horizon is a student project based on concrete, predefinied tasks. The main goal is to optimize the costs of truck fleets by means of data analysis and a dashboard. 

### Task

**The following predefined Tasks were given**:
- Dashboard design for data visualization after expansion of an existing database with two options:
- Option 1: Batch analysis and creation of a dashboard for the user "fleet management" as well as selection and application of a DM clustering algorithm
- Option 2: Real-time analysis and creation of a dashboard for the users "fleet management" and "drivers" (indirect) as well as selection and application for real-time visual monitoring

After discussion and evaluation within the group and assessment of the skills of all group members, **option 2** was chosen: 

**"Real-time analysis and creation of a dashboard for the users "fleet management" and "drivers" (indirect) as well as selection and application for visual monitoring in real time".**

**The following objectives were to be pursued:**
- Adjustment of the parameters for realistic simulation
- Visualization of the data
- Derivation of recommendations for action from visualized data

### Understanding the Scope and Research

In order to understand the scope of the project and to bring all team members up to the same level, design thinking methods were applied first. Brainstorming was chosen as the first method to get a first impression. The results are presented below. The brainstorming was created on the topic of fleet management and trucks as well as for dashboards in this area.  

![Brainstorming Fleet Management](/Flottenmanagement.png?raw=true)


![Brainstorming Fleet Dashboard](/FleetDashboard.png?raw=true)

Based on the results of the brainstorming an extensive literature research was conducted. The results are listed and cited at the appropriate place in the description of the simulation. 

In addition to the literature research, competing products were also considered and analysed.

### Current state of the market

To understand the current state of the art other fleet management products were evaluated.

| Product | Website  | Some of the Services |
|--|--|--|
|Carano Software Solutions  | [Access Website](https://www.carano.de/fleet-fuhrparksoftware/?gclid=Cj0KCQjw17n1BRDEARIsAFDHFewogEtD8ZFeJbRqEqwj0jlFWKkffA-nJccrchcA-L7SzfZbTUeR55EaAkHiEALw_wcB) | Data handling  and  management; Cost  management  and  controlling; Dashboards as well as Fuel data management |
|VIMCAR Fleet | [Access Website](https://vimcar.de/flottenmanagement/kostenmanagement) |Cost  management  and  comparison; Fuel data  management; Recommendations  for  cost  efficency; Hint  for  irregulatories |
|TRIBMLE| [Access Website](https://www.trimbletl.com/de/kraftstoff/fahrverhalten-und-coaching/) | Flexible KPI; Driver comparisons  and  analysis  of  the  driver; Consumption; Coach Assistant  for  recommendations; Onboard Driver Scorecard |


### Evaluation of KPIs

Based on researches, brainstorming and market analysis the following key performance indices were derived:

 - Fuel consumption --> biggest cost factor
	 -  Depending on speed, mass, air resistance, truck model, road, driver and more
 - Breaking behaviour
	 - Unnecessary behaviour, abrasion
	 - automatic breaking
 - Route
	 - Influences breaking behavior: City or Incidents
	 - Influences fuel consumption
	 - Influence Time
		 - Route length
		 - Incidents
	 - Road toll
	 - Speed limit
 - Cargo
 - Time

 - Leasing costs


### Personas

Asses Situation (Inventory of Resources Requirements, Assumptions and Constraints, Risks and Contingencies Terminology, Costs and Benefits)

- Ressourcen: Abwägung Datenquelle & neue Simulation
- Evaluation verschiedener Datenquellen
- Entscheidung Projektmanagement
- Annahmen und Einschränkungen
- Terminologie
- Risiken
- Vorteile
- Kosten

Determine Data Mining Goals (Data Mining Goals and Success Criteria)

_____________________
- Spezifikation der Ziele: Wann ist das Projekt erfolgreich?
Produce Project Plan (Project Plan, Initial Assesment of Tools and Techniques)
- Projektplan mit Meilensteinen 
______________________________



## 6. Deployment

Responsible:  David Rundel, Felix Bieswanger, Jan Anders and Sebastian Hermann

#### For a detailed description of how to deploy Horizon yourself, please see the tab [Instructions](/instructions).
Deployment Plan

Before beginning work on Horizon, Microsoft Azure was chosen as the plattform on which it would later be deployed.
This is for two reasons: 
Firstly, Azure is currently shaping to be the main competitor to the industry leading Amazon Web Services and offers a free student credit program, making it well suited for a study project.
Secondly, while some team-members had previous experience with Googles' Cloud Plattform, another option with a student credit offering, we wanted to gain experience with another solution.

We did not expect that hosting our solution would require as many resources, but in the end the student credit of multiple accounts was fully used up.

Azure Kubernetes Service and Azure Cosmos DB were chosen early in the process as the two main components on which Horizon runs. Subsequent architecture and tool decisions were made accordingly.

After testing parts of the solution in clusters or containers on local machines, the live deployment only required small changes to the general workflow, the largest being heavy wait times while waiting for container images to upload for live testing.  
 
As Horizon was developed as a prototype and underwent constant changes, in addition to the high cost of hosting the service, Horizon did not run online for extendend periods of time. This means that no large database of data for training could be collected.
Monitoring was therefore not required (and would have cost additional credit). The Batch Database did not reach full capacity and remained below the free tier of 400 RU/s for the duration of the project.  

Final Presentation
During the live presentation of the system, Horizon was deployed and the frontend was publicly available.
Given that enough funds remain, the Horizon dashboard will be available [here](janders.net/horizon) as a static application in the first week of August, 2020 for trying out features (such as filter criteria), which could not be shown during the presentation.


# Outlook

The current version of the app is the first, initial version (1.0) Further versions could contain the following features:

 - Introducing of the controller as a target group: here an additional batch-layer view with its own frontend could show **historical**, **consolidated** data from which medium to long-term **strategic decisions** could be made
 - Frontend:
    - Increase in the number of end devices: the application could be developed in the form of a **mobile app** so that the respective target groups can consume the information and recommendations for action on the trucks while on the move
![Horizon: Outlook](/frontend13.png?raw=true)
 - Backend:
    - Dynamically enrich master data like the truck year or license plate from the simulation database
    - Build own weather database (save frequently accessed locations) with unlimited calls to remove cost factor for external API.
    - Improve existing and add further machine learning components 
 - Simulation:
    - Extend the simulation even further to make it more realistic, e.g. consider current weather, laws and regulations, add international routes, ...
    - Include live route planning for insertion of new routes during runtime -> Additional route planning frontend


# Review of the Project

## What we learned

 - New tools:
    - Docker
    - Kubernetes
    - React
    - Spark
    - Kafka
 - Deploying a streaming architecture
 - Importance of scope and time management -> With freedom comes responsibility: Not everything you think of and want to do can actually be done
 - Importance of mockups and iterative evaluation


## Challenges we faced

 - Not knowing where to start and how to organize a large group project in a digital semester -> "Too much" freedom?
 - Finding a viable data source and customizing it for our needs without loosing too much time
 - Containerizing an existing Java-App with dependencies
 - Debugging a live-streaming application with limited logging capabilities and high turnaround times
 - Data mapping: From pure values to a user-interpretable dashboard
 - Familiarizing with previously unknown tools and concepts: React, Docker and Spark streaming



---
title: Outlook and Review
sidebar: auto
sidebarDepth: 2
lang: en-US
---

# Outlook and Review of the Project

#### Final Presentation
During the live presentation of the system, Horizon was deployed and the frontend was publicly available.
Given that enough funds remain in our account, the [_Horizon dashboard will be available_](http://janders.net/horizon) as a static application in the first week of August, 2020 for trying out features (such as filter criteria), which were not shown during the presentation.


## Outlook

The current version of the app is the first, initial version (1.0) Further versions could contain the following features:

 - Introducing of the controller as a target group: here an additional batch-layer view with its own frontend could show **historical**, **consolidated** data from which medium to long-term **strategic decisions** could be made

#### Frontend:
 - Increase in the number of end devices: the application could be developed in the form of a **mobile app** so that the respective target groups can consume the information and recommendations for action on the trucks while on the move

![Horizon: Outlook](/frontend13.png?raw=true)

#### Backend:
 - Dynamically enrich master data like the truck year or license plate from the simulation database
 - Build own weather database (save frequently accessed locations) with unlimited calls to remove cost factor for external API.
 - Improve existing and add further machine learning components 

#### Simulation:
 - Extend the simulation even further to make it more realistic, e.g. consider current weather, laws and regulations, add international routes, ...
 - Include live route planning for insertion of new routes during runtime -> Additional route planning frontend


## Review of the Project

### What we learned

 - New tools:
    - Docker
    - Kubernetes
    - React
    - Spark
    - Kafka
 - Deploying a streaming architecture
 - Importance of scope and time management <br />
    -> With freedom comes responsibility: Not everything you think of and want to do can actually be done (within the time constraints of 10 ECTS)
 - Importance of mockups and iterative evaluation


### Challenges we faced

 - Not knowing where to start and how to organize a large group project in a digital semester -> "Too much" freedom?
 - Finding a viable data source and customizing it for our needs without loosing too much time
 - Containerizing an existing Java-App with dependencies
 - Debugging a live-streaming application with limited logging capabilities and high turnaround times
 - Data mapping: From pure values to a user-interpretable dashboard
 - Familiarizing with previously unknown tools and concepts: React, Docker and Spark streaming
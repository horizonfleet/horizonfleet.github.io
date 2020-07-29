
## 6. Deployment

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

---
title: Data Source
sidebar: auto
sidebarDepth: 3
lang: en-US
---

# Data Source

Welcome to the official documentation of the Data Source of Horizon - an extended fleetSim.

Here you can find the original [FleetSim](https://github.com/fleetSim/trucksimulation) repository.

### Contributors to the Data Source

**Anja Stütz** and **Jan Anders** were mainly involved in the development of the data source.


## Data Understanding (CRISP-DM 2. Step)

Firstly, a data source had to be found which delivers realistic and arbitrary amount of real time streaming data of a truck fleet.
[FleetSim](https://github.com/fleetSim/trucksimulation) was found to be a suitable base simulation which could be extended to deliver the required data fields and amounts.

The original fleetSim simulation was extended in three important ways:
- Important variables, physical and random effects were added to make the simulation more realistic.
- Each simulated truck is able to stream updates of its movements to a kafka server.
- A large simulation that runs on predefined routes in endless mode was created. 

### Description of the data
A typical message from the simulation looks like this:
`{"truckCond":1,"timeStamp":1595455986000,"speed":13.05292451466845,"avgIntervSpeed":10.38730585107233,
"secSinceLast":120,"acceleration":1.5121130926381294,"bearing":315.8724852614906,"mass":27636.0,
"consumption":11.251371489442374,"lat":51.05354230592819,"lon":13.724075328077138,"engineEff":0,
"tireEff":0,"truckYear":2014,"truckType":2,"speedWarn":0,"accWarn":1,"brakeWarn":0,"incident":false,
"routeId":"5f070923c92647260c2b28e9","tripId":"278JHYXZAW","truckLP":"S HZ 9831",
"truckId":"5f070923c92647260c2b28f1","roadType":1,"arrived":0}`

We can see that there are a few data points which help to identify a record.
Such are:
 - truckId (and truckLP - license plate)
 - routeId
 - tripId
 - timeStamp 
 
Most data points deliver updates on the state the truck is in. Examples for this are:
 - truckCond
 - lat and lon (latitude and longitude)
 - acceleration


### Data amounts and format
The simulation can run at arbitrary speed and can send messages in custom time intervals. There are therefore two settings controlling the amount of messages which are received from the simulation.
The amount of milliseconds in real time that are required to pass for one second in the simulation and the message interval in which trucks send in seconds.
Assuming an interval of 120 seconds with the simulation running in real time, this means that on average, a message from a truck is received every two seconds.

Variables providing information on the state the truck or its components are in are encoded in a three tier system:
 - 0: normal status
 - 1: conspicuous status
 - 2: bad status
 
Identifying information is mostly delivered as string. Most other variables are provided in numeric format such as the coordinates, timestamp (unix time) or consumption. The speed in provided in m/s.

### Data Exploration

As the focus on the project lied on live streaming data to a dashboard, data exploration was mainly carried out to ensure data quality and consistency.

For a simulation with many trucks and a sufficiently large time-frame of multiple days it was found that moving variables such as speed and acceleration are normally distributed.
![SpeedDistribution](/speeddistribution.png)
Trucks send their data in reliable intervals and drive on their assigned routes. They commence to a different destination after a random delay (driver gets a break).


## How to deploy the Horizon Data Source

#### Disclaimer
Apart from the extension of the simulation and adding streaming capabilities and an additional simulation mode, changes were made to fleetSim in order to make the deployment inside DockerContainers feasible.
These customizations may have heavily altered aspects of fleetSim which are not required by Horizon. The only purpose of the simulation inside the Horizon system is to endlessly generate telemetry data on known routes with known trucks, or in other words, to simulate the movements of a truck fleet of a logistics company as closely as possible. Other simulation modes are not used by fleetSim and may not run as intended in the current state of fleetSim. Knowledge of the original fleetSim is strongly recommended if this version shall be further developed for other use cases.

### Setup
Installation requirements for fleetSim:
 - Java > 1.8
 - maven
 - Access to a mongoDB
 
Make sure JAVA_HOME is set on the fleetSim host and mongoDB is running.

The initial setup/bootstrap of fleetSim in order to obtain a compatible mongoDB database requires extensive system resources.
For the setup of the simulation for Horizon, an osm file for Germany is required ([e.g. from here](https://download.geofabrik.de/europe/germany.html)) and has to be located inside the osm folder.

When first set up on a local machine, the simulation tries to execute a mongoimport command on the host machine, assuming that a mongoDB is running on localhost.
If this is not the case, as when the simulation runs in a container, this mongoimport has to have been executed manually to import the collection cities, which are required for route calculations.

The mongoimport was disabled inside fleetSim as it is not needed for the purposes of Horizon after an initial setup of the database.

To initialize the database and calculate routes using GraphHopper, run 

    mvn compile exec:java@bootstap
    
This can require some time to execute while GraphHopper first initializes. On a decent computer in 2020, the first bootstrapping phase required 20 minutes while producing timeout messages. There is no indication of when the bootstrapping phase finishes. Laptops or virtualized environments could require significantly more time.

For deployment, it is advisable to only run the initialization phase once on a local machine and save the files GraphHopper requires inside the fleetSim container/host system if dynamic route calculations are needed. Horizon relies on precalculated routes which are stored inside the mongo database. If new routes are needed, this only requires updating the database image, instead of including route calculation logic and large GraphHopper files inside the fleetsim image. FleetSim itself does not require the osm file or an initialized GraphHopper to run, as long as precomputed routes are used.

Once the mongoDB has been setup and the bootstrapper run, the simulation server can be started with

    mvn exec:java@run
    
Alternatively, the simulation can be converted to a .jar and run by any JVM.

From here, the instructions in [How to deploy](/deployment) can be followed.

The most important settings that are required during operation can be set inside conf.json. Some considerations on the conf.json that are new to this version of the simulation:

 - When seperating simulation and mongoDB, the usingDocker argument should be set to true. This prevents errors when the program tries to load GraphHopper.
All functionality that enables endless simulations using dynamic calculation of new routes on the spot has been manually disabled and is not affected by this.
 - Streaming to kafka can be turned on/off alltogether by setting the "postData" argument

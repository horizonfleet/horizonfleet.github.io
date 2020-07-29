---
title: Documentation
sidebar: auto
sidebarDepth: 2
lang: en-US
---

# Documentation

Welcome to the official documentation and extended readme of Horizon - a student project at the Stuttgart Media University in collaboration with Adesso.

Horizon was designed and developed to enable fleet management enterprises to optimize their truck management by saving costs due to data analysis and engineering.

Horizon was build on the basis of two processes:

 1. The Design Thinking Process
 2. The Data Driven Decision Making Process / Cross-industry standard process for data mining

Both processes where necessary to not only work with the data, but also ideate and develop ideas for the frontend. The Cross-industry standard process for data mining is separated in 6 steps, which will guide through this documentation. 
The documentation is structured into Desing Thinking, Data Source, Backend and Frontend part. At the right times, reference to the corresponding stage in CRISP-DM will be given by indicating the number of the process step. 
(At the right points the documentation is enriched with ideas and results from the design thinking process)


![CRISP](/CRISP.png?raw=true)

# Design Thinking

## 1. Business Understanding

**Responsible: Jan Anders, Felix Bieswanger, Sebastian Hermann, David Rundel & Anja Stütz**

Horizon is a student project based on concrete, predefinied tasks. The main goal is to optimize the costs of truck fleets by means of data analysis and a dashboard. 

### Task

**The following predefined Tasks were given**:
- Dashboard design for data visualization after expansion of an existing database with two options:
- Option 1: Batch analysis and creation of a dashboard for the user "fleet management" as well as selection and application of a DM clustering algorithm
- Option 2: Real-time analysis and creation of a dashboard for the users "fleet management" and "drivers" (indirect) as well as selection and application for real-time visual monitoring

After discussion and evaluation within the group and assessment of the skills of all group members, **option 2** is chosen for processing: 

**"Real-time analysis and creation of a dashboard for the users "fleet management" and "drivers" (indirect) as well as selection and application for visual monitoring in real time".**


**The following objectives are pursued:**
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

- Spezifikation der Ziele: Wann ist das Projekt erfolgreich?

Produce Project Plan (Project Plan, Initial Assesment of Tools and Techniques)

- Projektplan mit Meilensteinen 

# Data Source
## 2. Data Understanding

Responsible: Anja Stütz, Jan Anders, David Rundel

Firstly, a data source had to be found which delivers realistic and arbitrary amount of real time streaming data of a truck fleet.
[FleetSim](https://github.com/fleetSim/trucksimulation) was found to be a suitable base simulation which could be extended to deliver the required data fields and amounts.

The original fleetSim simulation was extended in three important ways:
- Important variables, physical and random effects were added to make the simulation more realistic.
- Each simulated truck is able to stream updates of its movements to a kafka server.
- A large simulation that runs on predefined routes in endless mode was created. 

More details on the changes made to fleetsim and how to setup fleetsim inside a container can be found [here]().

#### Description of the data
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


#### Data amounts and format
The simulation can run at arbitrary speed and can send messages in custom time intervals. There are therefore two controlling settings controlling the amount of messages which are received from the simulation.
The amount of milliseconds in real time that are required to pass for one second in the simulation and the message interval in which trucks send in seconds.
Assuming an interval of 120 seconds with the simulation running in real time, this means that on average, a message from a truck is received every two seconds.

Variables providing information on the state the truck or its components are in are encoded in a three tier system:
 - 0: normal status
 - 1: conspicuous status
 - 2: bad status
 
Identifying information is mostly delivered as string. Most other variables are provided in numeric format such as the coordinates, timestamp (unix time) or consumption.

#### Data Exploration

As the focus on the project lied on live streaming data to a dashboard, data exploration was mainly carried out to ensure data quality and consistency.

For a simulation with many trucks and a sufficiently large time-frame of multiple days it was found that moving variables such as speed and acceleration are normally distributed.
Trucks send their data in reliable intervals and drive on their assigned routes. They commence to a different destination after a random delay (driver gets a break).

### Contributors to the Data Source

**Anja Stütz** and **Jan Anders** were mainly involved in the development of the data source.

## 3. Data Preparation - Speed Layer

Responsible: David Rundel, Jan Anders, Anja Stütz

The following paragraph will focus on the data preparation and aggreagtion as it is performed in the speed layer.
This closly represents the Data Preparation phase of the CRISP-DM approach. However, it does not cover the process for selecting relevant variables during development of the solution. A few remarks on this step will be given after the documentation of the speed layer. 
____________________________________________
### Input
The Speed Layer processes the simulation-data which is consumed from a Kafka-Stream. 
After parsing the JSON-data, it gets converted to a pyspark-DataFrame (pyspark.sql.DataFrame).

    df = spark.readStream.format("kafka") \
        .option("kafka.bootstrap.servers", "kafka:9092") \
        .option("subscribe", "simulation") \
        .load()
    
    df = df.selectExpr("CAST(value AS STRING)")
    
    df = df.withColumn("value", from_json("value", schema)) \
        .select(col('value.*')) \


### Transformation
In the transformation phase, the data goes through several steps: Filtering, Harmonization, Aggregation, Enrichment. The Filtering- and Harmonization-Phase are less needed due to the fact that most of the data comes from the same simulated data source and is pretty much homogeneous. For real world data, this processing step would have to be extended.

#### Aggregation
The incoming data-stream gets aggregated by each trip. 
- Master-data (such as the corresponding route, truck or trip) is saved once.
- Moving-data is converted to time series. This enables the resource efficient historization of the data for later use in the Batch Layer. The time series are of use for computing metrics like averages, moving averages (not implemented in the latest version), standard-deviations (not implemented), and for deriving most recent values, which are used in the frontend. 
- As mentioned above, moving data for which only the last value is of relevance to the frontend is saved in a separate field to be forwarded to the frontend api. Some constantly changing values which are not of importance for machine learning (such as the weather, which currently has no influence on the simulation) are treated the same way to save on resources. In a production environment, it would be a good idea to save everything to the batch database in case this data is needed in the future for different use cases.

An example of all three aggregation types:

    df_serve = df_serve \
        .groupBy('tripId') \
        .agg(F.first("truckId").alias("sd_truckId"), \
        F.collect_list('speed').alias("ts_speed"), \
        F.avg('consumption').alias("agg_last_consumption"))

#### Enrichment
 Additional master-data is joined, such as the length of each route, to compute metrics like the current progress per trip. The length of each route is a static dataframe that does not require recomputation in the batch-layer. Rather, this dataframe would have to be updated by a route planning system as soon as a new route is entered into the system.

    AS.download_file(save_path, cloud_file_name, container_name)
    route_dist_pd = pd.read_csv("./route_dist.csv")
    route_dist = sqlCtx.createDataFrame(route_dist_pd)
    df_serve = df_serve.join(route_dist, 'sd_routeId', how='left_outer')
    
    @udf("array<integer>")  
	def PRODUCE_ts_agg_acc_meters(xs):  
	    if xs:  
	        temp = [int(round(sum(xs[0:i]), 0)) \
	        for i in (range(1, len(xs) + 1))]  
	        return temp
        
    df_serve = df_serve \
        .withColumn("ts_agg_acc_meters", \
        PRODUCE_ts_agg_acc_meters("ts_meters_intervall"))

Historical aggregates, stemming from the Batch Layer, are used to compute Delta-KPIs. Those fulfill the purpose to better assess current data, when seeing it in relation to values which can be considered normal for each route. For this, similar to joining master data above, aggregation data is joined and then used set current values into comparison. The aggregations are periodically recomputed by the batch layer to ensure that averages are up to date.

External datasources, such as the current weather for each truck, get joined as additional data for the frontend. A custom weather api caller was defined in order to obtain weather codes in concordance with the frontend specification. Additional information, such as a description of the weather, the temperature or humidity would also be available.

    @udf("integer")
    def get_weather_code_for_location(lat, lon, unix_time):
        result = Weather.get_weather_for_location(lat, lon, unix_time)
        return result[0]
    
    if (enrich_weather_data):
        try:
            df_serve = df_serve \
                .withColumn("weatherCode", \
                get_weather_code_for_location("lat","lon","timeStamp"))

Machine Learning Models are used as inference-engines, to enrich the streaming data with predictions, such as the delay per trip. The models are fetched from Azure Blob Storage. A simplified code fragment showing the general process:

    newest_filename, s = AS.get_newest_file(container_name, arrival_file_substring)
    filepath, s = AS.download_file(save_path, newest_filename, container_name)
    arrival_model_path = AS.unzip(".", filepath)
    model_arrival = PipelineModel.read().load(arrival_model_path)
    df_serve = model_arrival.transform(df_serve)


### Output
There are two outputs of the Speed Layer. 
A subset of all features (mostly aggregates such as averages or last values and identifying labels) get forwarded to the frontend via an Kafka-Stream. 

    df_to_frontend_stream = df_to_frontend \
        .writeStream \
        .format("kafka") \
        .option("kafka.bootstrap.servers", "kafka:9092") \
        .option("topic", "frontend") \
        .outputMode("Complete") \
        .option("checkpointLocation", False) \
        .start()
  A sample of one message to the frontend:

    {"trip_id":"VA1Z9OT98P","truck_id":"5f070922c92647260c2b2886","number_plate":"S HZ 8245","route_id":"5f070922c92647260c2b287e","truck_mass":14070,"departure":"Muenchen","arrival":"Stuttgart","departure_time":1595456465                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ,"telemetry_timestamp":1595456465                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ,"arrival_time":1595466901,"telemetry_lat":48.16400894659716,"telemetry_lon":11.483320377669836,"truck_speed":13.08,"truck_consumption":6.66,"avg_truck_speed":13.08,"truck_acceleration":-6.07,"avg_truck_acceleration":-6.07,"normal_consumption":6.66,"route_progress":0,"driver_class":1,"delay":-1773,"driver_acceleration":2,"driver_speed":2,"driver_brake":0,"incident":false,"truck_condition":1,"tires_efficiency":0,"engine_efficiency":0,"weather":0,"year":2008,"arrived":0,"truck_type":"LOCAL","driver_duration":0,"road_type":"INTERURBAN","next_service":212,"service_interval":9000}

Secondly, all master data along with all time series is saved to the batch layer, by inserting it into the persistence-layer (Cosmos-DB) in a historized fashion. We decided to insert the already preprocessed and enriched data into the batch-db (and not directly from the simulation) to ensure consistency in terms of enrichment steps. Therefore, the foreachBatch()-Method was used, in order to insert data via the pymongo library.

    def write_to_mongo(df_to_batch, epoch_id):
        tempdataframe = df_to_batch.toPandas()
            with pymongo.MongoClient(uri) as client:
                mydb = client[mongodb_name]
                sparkcollection = mydb[mongodb_collection]
                df_json = json.loads(tempdataframe.T.to_json()).values()
                try:
                    sparkcollection.insert(df_json)

    df_to_batch_stream = df_to_batch.writeStream \
        .outputMode("Update") \
        .foreachBatch(write_to_mongo) \
        .start()

A major hurdle was inserting the label for time series into the database. The dependent variable for the estimated delay prediction is calculated using the accumulated amount of seconds per trip. This value is only available with the last signal for each trip, as soon as a truck has arrived at its destination, but has to be inserted for all previous tuples of the corresponding trip, which have already been saved to the database at that point. Updating the documents in the batch-db has to be done to allow the training of models, eligible of predicting the label for each step of the time series.

    sparkcollection.update_many( \
		        {"tripId": temp_tripId}, \
			    {"$set": {"LABEL_final_agg_acc_sec": temp_LABEL}})

____________________________________________________		    
As the data stems from a simulation, data cleaning did not have to be performed.
However, a large problem that was faced during development was the constantly changing nature of the data,
as the development of the simulation was simultaneous to 
It would have been better to have a fixed data source from the start. This would have enabled more structured work.
As the selected task of the group 
Data Set Description
Select Data (Rationale for Inclusion / Exclusion)
- Auswahl der wichtigen Variablen 
Clean Data (Data Cleaning Report)
- Ausreisser erkennen, fehlende Werte behandeln
Construct Data (Derived Attributes Generated Reports)
- Abgeleitete Variablen (Summe oder logische Verknüpfungen)
Integrate Data (Merge Data)
- Daten aus verschiedenen Tabellen zusammenfüren
Format Data (Reformatted Data)
- Formatierung (Datenformat (Datum...), Transformation der Daten (normierte Verteilung oder PCA))
____________________________________________________

## 4. Modeling - Batch Layer

Responsible: David Rundel

In the modeling phase, we ended up with two models. One supervised, and one unsupervised approach.

We clustered the driver-habits using the spark-proprietary K-Means-Clustering-Algorithm and evaluated the models with Silhouettes. Incremental-Model-Training / Online-Training was considered for the clustering, but could not yet be implemented.

    CL_kmeans = KMeans() \
		    .setK(3) \
		    .setSeed(1) \
		    .setFeaturesCol("scaledFeatures")

Gradient Boosted Trees (GMT) were utilized to regress on the delay per trip and evaluated using the Mean Absolute Error. 

    EA_gbt = GBTRegressor(labelCol="label", featuresCol="features")

The GBT-Algorithm was challenged against LSTM-Networks, which held the potential to make better use of Time Series Data. However, while the data is available in time series format, the prediction is a regression task and heavily profits from the ability of GBT to learn different patterns in data. Unfortunately the LSTM, implemented with Keras and Tensoflow as Backend, was not able to achieve better results than the sequentially growing decision trees.
In the next iteration of the data science process, it could be tried to predict the delay using a multi model or multi input model approach with LSTM's and dense networks, concatenating several input streams with different dimensionality. This would not only process time-series, but also one-dimensional master data, which turned out to be a good predictor with the GBT. Anyway, the LSTM code can be found in /Backend/Kafka/mvp/batch_layer/NN_Test.py.

For both models, hyperparameters were optimized with the help of a Grid Search. The grid could be extended by further variables if better results are required, it is however more likely that training data amounts and data preparation play a bigger role in the quality of the models.

    EA_paramGrid = ParamGridBuilder() \
            .addGrid(EA_gbt.maxDepth, [3, 5, 7]) \
            .addGrid(EA_gbt.maxIter, [10, 20, 50, 100]) \
            .addGrid(EA_gbt.stepSize, [0.001, 0.01, 0.1, 1]) \
            .build()

____________________________
Generate Test Design (Test Design)
- Wie wird Modelgüte gemessen?
- Aufteilung der Daten in Trainings-, Test- und Validierungsmenge
Assess Model (Model Assessment, Revised Parameter Settings)
- Technische Bewertung der Modellgüte ggf. mit anderen Parametern wiederholen
_____________________________

## 5. Evaluation

Responsible: Jan Anders, Felix Bieswanger, David Rundel & Anja Stütz

### Evaluation of Machine Learning Models
Each parameter combination in our grid is evaluated using  10-Fold-Cross-Validation, due to the fact that is an sufficiently big and decorrelated estimate of our error-metric.
    
    EA_pipeline=Pipeline().setStages([EA_indexer1,\
				    EA_indexer2, \
				    EA_vectorAssembler, \
				    EA_gbt])
    
    EA_crossval = CrossValidator(estimator=EA_pipeline, \
                              estimatorParamMaps=EA_paramGrid, \
                              evaluator=RegressionEvaluator(), \
                              numFolds=10)
    
    EA_crossval = EA_crossval.fit(sql_df_trips) 
    EA_best_model = EA_crossval.bestModel

Lastly, we found an Heteroscedasticity in our prediction-error, meaning that the variance of our error-estimate was not constant. We were not able to eliminate this issue yet.

    jointplot= sns.jointplot(x="label", \ 
			    y="pred", \
			    data=sql_df_trips)
			 
### Evaluation of the Horizon Fleet Management System   


Evaluate Results (Assessment of Data Mining Results, Buisness Success, Criteria, Approved Models)

- Bewertung aller Resultate in Bezug auf betriebswirtschaftliche Ziele

Review Process (Review of Process)

- Begutachtung aller Schritte. Wurden auch nur Daten verwendet, die in Zukunft verfügbar sind? Was wurde übersehen?

Determine Next Steps (List of possible actions decision)



## 6. Deployment

Responsible: Jan Anders, Felix Bieswanger, Sebastian Hermann, David Rundel

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

## Contributors
**David Rundel**, **Felix Bieswanger** and **Jan Anders** were maily involved in the development of the backend and deployment. 


# Frontend 

This is the official documentation of the frontend of **Horizon**. The interactive app visualizes **live recommendations** for fleet managers and truck drivers.

## Getting Started

The app was created using [**React.js**](https://reactjs.org/). React.js is a Javascript library to create user interfaces. To start the app **locally** you need [**node.js**](https://nodejs.org/en/) and [**npm**](https://www.npmjs.com/). Node.js is the platform needed for the React.js development.

| Step | Description                                                                 |
| ---- | --------------------------------------------------------------------------- |
| 0    | Install the latest stable version of [**node.js**](https://nodejs.org/en/). |

> **NOTE**: The latest version of **node.js** includes **npm** already. Therefore, npm does not need to be installed separately.

To run the app on the local machine, navigate in the console to the folder _DataScienceSS20>Frontend>React-Mockup-v2_. Here, execute the command `npm start`. A browser window should open automatically after some time (about 20 seconds) and show the application on _localhost:3000_. If not, open a browser window and enter the address _localhost:3000_.

| Step | Description                                                                       |
| ---- | --------------------------------------------------------------------------------- |
| 1    | In the console, navigate to the folder _DataScienceSS20>Frontend>React-Mockup-v2_ |
| 2    | In _React-Mockup-v2_, execute the command `npm start`                             |

At this point you should be able to see the running application.
![Horizon Frontend](/frontend1.png?raw=true)

## General Principles

The guideline for the creation of the application was to translate the complex calculations of the backend to live **recommendations** for action for the target groups **truck drivers** and **fleet managers**. Accordingly, the application focuses on the presentation of **live** data.

![Horizon: Structure of the application](/frontend2.png?raw=true)

The application can be divided into **four areas**: the **filter** bar (1), the **list of currently driving truck** (2), the **map overview** (3) and the **detail view** (4) for a selected truck. The four areas are presented below.

### Filter Bar

The filter bar is used to **limit the view** of the trucks according to various criteria. This gives the fleet manager a **faster overview** of all trucks and at the same time allows him to view critical trucks **more quickly**.

The current version allows two filter criteria: the restriction of the **delay range** and a switch to filter only those trucks that show **anomalies**, **warnings** or **urgent messages**.

### List of Currently Driving Trucks

This overview lists all trucks that match the filter criteria. All information that might be of particular interest to the fleet manager at first glance is displayed. The following graphic shows the structure of an individual truck card.
![Horizon: List of currentl driving trucks](/frontend3.png?raw=true)
|Nr.|Description |
|--|--|
| 1 | **Number plate** of the respective truck|
| 2 | **Route** from start to destination|
| 3 | The amount of **delay** in minutes |
| 4 | The amount of **conspicuous warnings** in the truck (_more in Detail View_)|
| 5 | The amount of **bad warnings** in the truck (_more in Detail View_)|
| 6 | The **speed** of the respective truck |

### Map Overview

The map overview shows the **location of all trucks** that match the filter criteria on a map. The Mapbox API is used to display the interactive map. Mapbox is an open source mapping platform for custom designed maps (more information on [https://www.mapbox.com](https://www.mapbox.com)). The individual points on the map represent the locations of the different trucks. In the upper left area, **two KPI cards** are positioned, which give information about the **number of delays** and **warnings** (both conspicuous and bad).
![Horizon: Map Overview](/frontend4.png?raw=true)

### Detail View

In the detail view, several details of a **selected truck** are displayed. On the one hand, general information on **the route and the truck** is displayed here. On the other hand, concrete recommendations for various warnings that are already indicated in the _list view_ are displayed in this area.

##### Route Information

The first card shows the selected truck with its departure time and place, planned arrival time and place as well as the current weather and the type of road. The weather information serves to avert the **imminent dangers** associated with **slipperiness**, **wetness** or **restricted visibility** as early as possible. The road information helps to better understand the driving behaviour based on the different types of road, as motorways, for example, have different characteristics than country roads.

![Horizon: Route Information](/frontend5.png?raw=true)

##### Driving Information

On the second card, three pieces of information about the current trip are displayed: **Speed**, **acceleration** and **consumption**. All three pieces of information are compared to average values calculated for the respective route in the speed layer of the backend (for more information see chapter Backend and Architecture). If the current value is higher than the average value of the route, a warning symbol for the corresponding value is displayed.

![Horizon: Driving Information](/frontend6.png?raw=true)

##### Driving Behaviour

The third card shows the truck driver's **driving behaviour**, from which **recommendations** for action can be derived directly. At the top, centrally positioned, there is a bar chart showing the KPI **Eco Status**. **Eco Status** is a key figure calculated from several factors such as **speed**, acceleration, etc. which indicates the driving behaviour of the truck driver. The closer the value is to 100%, the better the driver drives. An Eco Status of 100% means that the driver shows a very good driving behaviour and therefore drives very efficiently in terms of costs. A value of 0%, on the other hand, implies an urgent adjustment of the driving behaviour. In order to get a detailed idea of what is wrong with the driving behaviour, there are four more illustrations below. These show concrete recommendations for action which the driver must implement in order to achieve a better eco status. There are three categories:

1.  **Normal Behaviour** (indicated by dark grey colouring)
    Arrow points to the right: Behaviour does not have to be adapted.
2.  **Conspicuous Behaviour** (indicated by orange coloring)
    Arrow is tilted down 45°: The driving behaviour should be improved.
3.  **Bad Behaviour** (indicated by red colouring)
    Arrow is tilted downwards by 90°: Driving behaviour urgently needs to be improved.

The colours and classifications have a direct reference to the "Conspicious" or "Bad" counters shown in the truck cards.

![Horizon Driving Behaviour](/frontend7.png?raw=true)

##### Truck Information

The fourth card shows **general information** about the **truck**. Here again, the warnings are in the foreground. Included are warnings about **tire status**, **engine efficiency** and **truck condition** in general. The gradations are similar to the "Driving Behavior" map.
The example of the _tire status_ is given below to illustrate the gradations:

1.  **Normal Behaviour** (indicated by dark grey colouring)
    Tires are ok.
2.  **Conspicuous Behaviour** (indicated by orange coloring)
    The tires should be checked.
3.  **Bad Behaviour** (indicated by red colouring)
    The tyres need to be checked.

Similarly, the factors _engine efficiency_ and general _truck condition_ are graded.

With the information **vehicle type**, **year** of manufacture, **mass** and next **service**, the fleet manager receives even more detailed information about the truck. This allows him to interpret further conclusions about the **driving behaviour** (e.g. a truck with a larger mass has a different acceleration behaviour than a truck with a lower mass) or the **maintenance susceptibility** (e.g. depending on the age of the truck and the next service due).

![Horizon: Truck Information](/frontend8.png?raw=true)

### Interactivity

The application provides some interactions that help the user to view the desired information as quickly and efficiently as possible.

#### Selection of a truck

To select a truck, the user can either click on the map within the list area or select the truck on the map.

![Horizon: Selection of a truck](/frontend9.png?raw=true)

#### Filter

As already mentioned, it is possible to filter by the criteria **delay** and **warnings**. The selection can be reset to the default value by clicking the _Clear_ button. You can filter by delays by selecting a delay interval.

![Horizon: Filter](/frontend10.png?raw=true)

Warnings can be filtered by enabling/disabling the _Only Warnings_ switcher.

#### Helper

Within the detailed overview there are **helper icons** (symbolized as quesion mark icons), which should help the user to **get familiar** with the application **faster**. By clicking on the icon, a pop-up window is displayed that explains the elements of the respective card in **more detail** or shows how the individual symbols and colors are to be **interpreted**.

![Horizon: Helpertext](/frontend11.png?raw=true)

## Data Source

The frontend is connected to the backend via a **REST API**. The application uses an _HTTP-GET-Request_ in intervals of 60 seconds to check whether changes have been made to the data and renders only the components affected by the changes. The **JSON** (_JavaScript Object Notation_) data format is used for data exchange, since it supports good readability on the developer side and is independent of the script language on the machine side. Below is an excerpt from the JSON of a truck.

![Horizon: Data Format](/frontend12.png?raw=true)

> **NOTE**: For more information about the data and its calculations, visit the _Backend_ section.

# Challenges

During the development we were confronted with several **challenges**. These can be grouped into challenges related to the **business case**, challenges related to the **architecture** and last but not least challenges related to the **presentation** of the data. The most important of these are shown below.

### Business Case

During the development of the application we dealt iteratively with the following questions.

- Which information is **relevant** for the target groups? Which information has a rather **high priority**, which a rather **low priority**?
- Which **main benefit** should the application offer?

Several wireframes were created during the development process. On the business case level the challenges mentioned so far were evaluated. In addition, the following question was also discussed:

- Is it clearly **communicable** and **plausible** for the respective target group?

### Architecture

The architecture of the application is complex, which resulted in immediate challenges for the development.

One challenge was the **data connection**. Since we only deal with live data, a **dummy pipeline** had to be created to test the behaviour of the frontend in case of data changes.

In addition, a high degree of **data consistency** had to be guaranteed, since the target group in particular expects the data from the back end to be displayed in the front end **without corruption**.

Furthermore, it could be determined that the application in a productive, deployed environment shows fundamental differences to the development environment in **data retrieval**. Especially the asynchronous queries often led to **unexpected** [race conditions](https://www.computerweekly.com/de/definition/Race-Condition) in the deployed state.

Last but not least, a **constant exchange** between backend and frontend developers was necessary, since even the smallest changes on the backend side could cause the frontend application to stop working. To ensure a certain degree of reliability, a **data catalog** was created in advance, which defines the **name**, **format** and **value range** of every attribute.

### Presentation

In close coordination with the backend, a lot of data was available which had to be mapped. The structuring and simultaneous translation of the data into **user-friendly** information proved to be a challenge. Thus, it had to be differentiated which information was **relevant at first glance** and which could be categorized as **details**. Furthermore, a certain degree of **liveliness** of the information had to be introduced. Thus, the application should not only provide information and recommendations for action on the various trucks, but should also be **fun to use**.

But also the development of the **interactions**, in particular the development of the **filters**, presented a challenge. The selection of a truck, as well as the change of the data in the background had a direct effect on all related components. For example, when a truck is selected in the _list of currently driving trucks_, it must be ensured that it is both highlighted on the map and its details are displayed in the detail view. At the same time it had to be intercepted that the selection of the truck crashes when the data in the background is changed.


## Contributors to the Frontend

**Anja Stütz** and **Sebastian Hermann** were mainly involved in the development of the frontend.

### Anja Stütz

Information Science Student at the Stuttgart Media University.
Mail: as314@hdm-stuttgart.de
GitHub: https://github.com/anjastvtz

### Sebastian Hermann

Business Information Systems student at Stuttgart Media University.
Mail: sh267@hdm-stuttgart.de
GitHub: https://github.com/SebastianHermann


# Outlook

The current version of the app is the first, initial version (1.0) Further versions could contain the following features:

- Introducing of the controller as a target group: here an additional
  view could show **historical**, **consolidated** data from which medium to long-term **strategic decisions** could be made
- Increase in the number of end devices: the application could be developed in the form of a **mobile app** so that the respective target groups can consume the information and recommendations for action on the trucks while on the move

![Horizon: Outlook](/frontend13.png?raw=true)


# Review of the Project

## Experience, Documentation

- Begutachtung Gesamtprojekt
- Lessons Learned
- Was lief schief
- Was lief gut

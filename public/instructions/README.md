---
title: Instructions
sidebar: auto
sidebarDepth: 2
lang: en-US
---

# Deployment

The Horizon fleet management system is deployed by containerizing all subcomponents and running them orchestrated by kubernetes in a cluster.
Apart from the batch database, which is hosted outside the cluster to achieve location independence, all components can be shut down and replaced dynamically. Following is a description of how to set up horizon yourself.
All files and sources reference the official public [Horizon GitHub repository](https://github.com/horizonfleet/Horizon).


## Azure

Horizon requires three main components to execute:
- A document-based batch-database
- A blob storage / cloud drive for file exchange
- A kubernetes cluster

In addition, it is advisable to use a private container registry for the docker images.

Horizon FMS has been tested using services by Microsoft Azure in July 2020, but can be customized to work with any other cloud provider that offers services similar to the above-mentioned. The resources used were:
 - Azure Cosmos DB (Free tier with 400 RU/s is sufficient)
 - Azure blob storage container
 - One Azure Kubernetes Service (AKS) D2s v2 and D2s v3 instance
 - Azure container registry (10 GB are enough)

The speed and batch layer both require access to the batch-database and blob storage container to work. Fleetsim comes with its own database hosted inside the cluster. 

Access keys to both the cosmos db ("mongoConnectionString") as well as the blob storage  ("storageConnectionString") have to be present as text files (without ".txt"-ending) inside the speed- and batch-layer folders from which the docker images are built. If live weather enrichment is desired, a file with at least one (more are recommended in separate lines per key) openWeatherMap access keys should be present inside the speed-layer folder as well.

## Building docker images

Horizon FMS makes use of 8 docker images:
|Function|	Image name| 	Source |	Folder | 
|--|--|--|--|
|Zookeeper|	    zookeeper| 	dockerhub/library/zookeeper:3.4.14 | -
|Kafka-Server|	kafka|		dockerhub/wurstmeister/kafka:2.11 | -
|Fleetsim|	    fleetsim|	Custom build | Data_Source>trucksimulation-master
|Fleetsim mongo-db|mongosim|Custom build | Data_Source>mongo
|Speed-Layer|	speedlayer|	Custom build | Backend>speed-layer
|Batch-Layer|	batchlayer|	Custom build | Backend>batch-layer
|Frontend-API|	api|		Custom build | Frontend>api
|Frontend|	    react|		Custom build | Frontend>react

In every folder, make sure all additional files that are needed are present (API Keys, mongo data folder) and run

    docker build --tag <image_name> .
    
if you use a container registry, upload the built image:

    docker push <image_name>

The fleetsim mongo-db image requires a copy of a local mongo database "data" folder to run correctly. These files are obtained by running the fleetsim bootstrapper and simulation once on a local machine and precomputing the route information as well as truck master data and then copying the entire data folder of the local mongo-db into the fleetsim mongo folder. Unfortunately, there is no easier way to achieve a persistent and consistent mongo-db image with preexisting data.

In addition, when first setting up the cluster it is advisable to create dummy consumers that simply consume a kafka topic and print its contents to the console in order to monitor kafka topics and evaluate if some services may not work as intended. 

## Kubernetes

> **NOTE**: Refer to the files in [this folder](https://github.com/horizonfleet/Horizon/tree/master/Deployment/K8_Azure) for the yaml files for deployment in a K8 cluster or [here](https://github.com/horizonfleet/Horizon/tree/master/Deployment/K8_Minikube) for local Minicube development.
> All following commands can be found [here](https://github.com/horizonfleet/Horizon/blob/master/Deployment/K8_Azure/kubectl.txt) or [here (with additional minikube commands)](https://github.com/horizonfleet/Horizon/blob/master/Deployment/K8_Minikube/kubectl.txt).


A kubernetes cluster with a minimum of 6GB of RAM needs to be accessible. Lower memory will result in eviction of pods or unscheduled restarts/crashes due to memory pressure. Normally, this leads to a short downtime of the frontend or another service, in the worst case this results in the loss of data, creation of inconsistencies, or the full stop of the simulation (which has to be started manually).

The cluster should be deployed in the following order using the command

    kubectl apply -f <filename>
The filename refers to a yaml with the deployment specification for a specific pod or service, which can be found inside the Deployment>K8_Azure or Deployment>K8_Minikube folders, respectively. Inside these yamls, only the image name (or container registry + image name) and the pull rights secret have to be changed. For local deployment in minikube only change the image name to your locally built image.

Firstly, all services should be created. The services of frontend-api and frontend should not be altered afterwards as this changes their ip-adress.

    kubectl apply -f 01-zookeeper-service.yaml
    kubectl apply -f 03-mongo-service.yaml,04-simulation-service.yaml
    kubectl apply -f 06-api-service.yaml,07-react-service.yaml

Secondly, deploy zookeeper and kafka before any other services that rely on these.

    kubectl apply -f 01-zookeeper-deployment.yaml,02-kafka-broker1-deployment.yaml  

When first deploying, there is no data in the batch-database on which the batch-layer could run. Instead of deploying the speed-layer, batch-layer and all other components, deploy the lightspeed-layer instead and let it run for a while, ideally with the simulation set to a higher speed. Simulation speeds of 50x can be easily achieved with a message interval of 120 seconds.

    kubectl apply -f 03-mongo-deployment.yaml,04-simulation-deployment.yaml    
    kubectl apply -f 05-light-speed-deployment.yaml

After the lightspeed-layer has run for some time and there are sufficient amounts of data for every route in the batch-database, shutdown the simulation and lightspeed-layer and first let the batch-layer run.

    kubectl delete -f 05-light-speed-deployment.yaml
    kubectl delete -f 03-mongo-deployment.yaml,04-simulation-deployment.yaml
    kubectl apply -f 05-batch-layer-deployment.yaml 
    kubectl apply -f 05-batch-layer-cronjob.yaml 

The regular speed-layer along all other services can be deployed as soon as the batch-layer finishes (After the first time deploument, deploy the batch-layer along with the following components) :

    kubectl apply -f 03-mongo-deployment.yaml,04-simulation-deployment.yaml    
    kubectl apply -f 05-spark-graph-deployment.yaml 
    kubectl apply -f 06-api-deployment.yaml  
    kubectl apply -f 07-react-deployment.yaml
    
Port forward the fleetsim pod on port 8080 and start the simulation in another console:

    kubectl get pods
    kubectl port-forward <fleetsim_pod_id> 8080:8080
Start the simulation in another console:

     curl -X POST http://localhost:8080/api/v1/simulations/<simulation_name>/start

To check which simulations are available and whether a simulation is running, port forward the fleetsim pod as above and run one of the two commands:

    curl -X GET http://localhost:8080/api/v1/simulations
    curl -X GET http://localhost:8080/api/v1/simulations/<simulation_name>
Now everything should be up and running. Run

    kubectl get services
to get the public pod ip-adress of the react-frontend and access the dashboard under port *3000*. Alternatively, port forward the react frontend and access the dashboard under *localhost:3000* for local development.

To shutdown the cluster, delete all pods and services in reverse order. Optimally, also stop the simulation first:

    curl -X POST http://localhost:8080/api/v1/simulations/largeSim/stop
    
    kubectl delete -f 07-react-deployment.yaml
    kubectl delete -f 06-api-deployment.yaml
    kubectl delete -f 05-spark-graph-deployment.yaml
    kubectl delete -f 05-batch-layer-deployment.yaml
    kubectl delete -f 03-mongo-deployment.yaml,04-simulation-deployment.yaml
    kubectl delete -f 01-zookeeper-deployment.yaml,02-kafka-broker1-deployment.yaml

and finally:

    kubectl delete -f 03-mongo-service.yaml,04-simulation-service.yaml
    kubectl delete -f 06-api-service.yaml,07-react-service.yaml
    kubectl delete -f 01-zookeeper-service.yaml

The cluster can now shutdown safely. 

### Contact

Contact [Jan Anders](mailto:contact@janders.net) if you require help deploying Horizon yourself.

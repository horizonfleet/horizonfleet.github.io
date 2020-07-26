---
title: Documentation
sidebar: auto
sidebarDepth: 2
lang: en-US
---

# Documentation

Welcome to the official documentation and extended readme of Horizon - a student project at the Stuttgart Media University in collaboriation with Adesso.

Horizon was designed and developed to enable fleet management enterprises to optimize their truck management by saving costs due to data analysis and engineering.

Horizon was build on the basis of two processes:

 1. The Design Thinking Process
 2. The Data Driven Decision Making Process / Cross-industry standard process for data mining

Both processes where necessary to not only work with the data, but also ideate and develop ideas for the frontend. The Cross-industry standard process for data mining is separated in 6 steps, which will guide through this documentation. 



![CRISP](/CRISP.png?raw=true)




At the right points the documentation is enriched with ideas and results from the design thinking process.

# Backend

## 1. Buisness Understanding

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


## 2. Data Understanding

Responsible: Jan Anders, Felix Bieswanger, Sebastian Hermann, David Rundel & Anja Stütz

Collect Initial Data (Inital Data Collection Report)

- Wo kommen die Daten her? Wie? Joins über mehrere Datenbanken notwendig?

Describe Data (Data Description Report)

- Metadaten (Anzahl Attribute, Werte, Format, Typen, Mengen)

Explore Data (Data Exploration Report)

- Daten untersuchen
- Verteilung / Korrelation
- Visualisierung

Verify Data Quality (Data Quality Report)

- Datenqualität bestimmen, Fehler erkennen, Vollständigkeit der Daten

## 3. Data Preparation 

Responsible: Jan Anders, Anja Stütz

Data Set
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

## 4. Modeling

Responsible: Jan Anders, Felix Bieswanger, David Rundel

Select Modeling Technique (Modeling Technique, Modeling Assumptions)
- Auswahl der Methoden

Generate Test Design (Test Design)
- Wie wird Modelgüte gemessen?
- Aufteilung der Daten in Trainings-, Test- und Validierungsmenge

Build Model (Parameter Settings, Models, Model Description)
- Modell bauen
- Parameter einstellen und begründen

Assess Model (Model Assessment, Revised Parameter Settings)
- Technische Bewertung der Modellgüte ggf. mit anderen Parametern wiederholen


## 5. Evaluation

Responsible: Jan Anders, Felix Bieswanger, David Rundel & Anja Stütz

Evaluate Results (Assessment of Data Mining Results, Buisness Success, Criteria, Approved Models)

- Bewertung aller Resultate in Bezug auf betriebswirtschaftliche Ziele

Review Process (Review of Process)

- Begutachtung aller Schritte. Wurden auch nur Daten verwendet, die in Zukunft verfügbar sind? Was wurde übersehen?

Determine Next Steps (List of possible actions decision)

- Wie geht es weiter?


## 6. Deployment

Responsible: Jan Anders, Felix Bieswanger, Sebastian Hermann, David Rundel

Plan Deployment (Deployment Plan)

- Implemntierungsstrategie
- Einsatz von DM in Praxis

Plan Monitoring and Maintanance (Monitoring and Maintanance Plan)

- Überwachung der Gültigkeit der Modelle, Strategie für Überarbeitungen

Produce Final Report (Final Report and Presentation)

- Zusammenfassender Bericht, Präsentation

Review Project (Experience, Documentation)

- Begutachtung Gesamtprojekt
- Lessons Learned
- Was lief schief
- Was lief gut

# Frontend 

Responsible: Sebastian Hermann, Anja Stütz

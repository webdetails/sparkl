<!-- 

Here's the template we should use. Actual implementation follows


Application
=============

In this section you should have the overall description of the application.


Dashboards
==========

This section list and describes the application main visual "landing points": the application dashboards.

Dashboard 1
--------------

### Goal

This subsection has a description of the goal of dashboard 1

### description, actions and visual mockup

This subsection has a more detailed description of dashboard, including a list of actions allowed on this dashboard, along with a mockup to give a visual insigh.

### navigation

Here should be the information regarding the dashboard navigation restrictions (eg. if there should be a link to a contextual help page or where/when the user should navigate to dashboard 2).


### endpoints

In this subsection you will find the list of kettle end points associated to actions on the dashboard.


Endpoints
---------

This section describes the End Points (Kettle) in the application. These endpoints were mentioned in the previous section, in connection to the application dashboards. Here, we have a detailed description of each one of them, including their logic, input parameters and output types.

* Endpoint 1
	* Description:	
	* Parameters: 
	* Output: 
* Endpoint 2
	* Description: 
	* Parameters: 
	* Output:  

-->


CPK UI
======

The Community Plugin Kick-starter (CPK) is a tool that allows you to create and manage Business Intelligence applications based on the Pentaho-Ctools framework. These applications (or Plugins) are basically a set of dashboards and Kettle Endpoints organized in a way to accomplish the application's goal. The CPK User Interface is itself a CPK application and thus it follows the same planning roadmap as any other CPK application. 
The present document consists on the planning of the CPK User Interface. At the end it should be clear to the reader what are the application's Dashboards and Kettle Endpoints, their goals, logic, actions and how all these are wrapped up to form a consistent plugin.

The CPK UI plugin offers a visual interface to CPK. Its goal is to allow managing CPK plugins and creating new ones.

Dashboards
==========

The CPK UI is constituted by three dashboards. Tha main dashboard, that we call "CPK UI", the "View Plugin" dashboard and the "New Endpoint" dashboard.

CPK UI dashboard 
--------------


### Goal

The CPK UI dashboard must give user access to the existing CPK plugins. Mainly it consists in a list of existing plugins, a set of global options and a set of plugin options.

### Description, actions and visual mockup

The dashboard contains a set of four *global options*:

* **New Plugin**: allows to create a new plugin. A new item will show up on the list of plugins. This new plugin should be acceeded via the plugin option **View** (see below);

* **Import Plugin**: allows to import a remote plugin to the CPK plugins folder;

* **Refresh List**: updates the list of plugins;

* **Request Pentaho Services**: send email requesting Pentaho services/support.

The dasbhboard also contains a *table* listing the existing plugins, each with a small description, and a set of *plugin options* accessible to each item in the table:

* **View**: Open a new dashboard with the plugin info and editing options; 

* **Rate**: ??.
	
### Navigation

The **CPK UI** dashboard gives access to the **View Plugin** dashboard, whenever the user chooses the "view" option, for a specific item on the plugins table.

### Endpoints

The set of Endpoints for the **CPK UI** dashboard are:

* List plugins;
* New plugin;
* Refresh list;
* Import plugin;
* Plugin description.
	


View Plugin dashboard
---------------------

### Goal

The View Plugin dashboard must give full infomation about the selected plugin and the allow user to edit it.

### Description, actions and visual mockup

The dashboard contains a set of *global options*:

* **Submit changes to author**: ;

* **Delete**: ;

* **Update**: ;

* **Edit**: ;

* **Pack/zip**: ;

* **Email**: ;

* **Market Place push**: ;

* **Feedback (email)**: ;

* **Report a Bug (email)**: ;

* **New Endpoint/Dashboard**: .

The dashboard contains a *list* of the plugin metadata, with the following info: 

* **Name**;

* **Description**;

* **Author**:
	* Name,
	* Email; 

* **Company**:
	* Name,
	* Url;
	
* **Creation date**;

* **Version**;

* **CPK Version**.
 

The dasbhboard also contains a *table* listing the plugin endpoints and a set of *endpoint options* accessible to each item in the table:

* **Delete**: ; 

* **Duplicate**: ;

* **Edit (dashboards only)**: Open a new dashboard with the endpoint info and editing options.

### Navigation

The **View Plugin** dashboard gives access to the **New Endpoint** dashboard, whenever the user chooses the "New Endpoint/dashboard" option, from the global options list.

The **View Plugin** opens the Community Dashboard Editor (CDE), whenever the user chooses the "Edit" option, for a specific dashboard on the endpoints table.
### Endpoints

The set of Endpoints for the **View Plugin** dashboard are:

* Submit changes to author;
* Delete plugin;
* Edit Metadata;
* Update CPK libraries;
* Pack/download;
* send as email;
* delete endpoint;
* duplicate endpoint.

New Endpoint dashboard
----------------------

### Goal
The New Endpoint dashboard allows the user to import endpoints from templates or other plugins to the presently selected plugin.

### Description, actions and visual mockup

### Navigation

### Endpoints

The set of Endpoints for the **New Endpoint** dashboard are:

* Import endpoint;
* Import from template;
* List endpoints from all plugins;
* List templates.

Endpoints
=========

These endpoints were mentioned in the previous section. Here, we have a "detailed" description of each one of them:

* Endpoint 1
	* Description:
	* Parameters: 
	* Output: 

* List plugins
	* Description:
	* Parameters: 
	* Output: 

* New plugin
	* Description:
	* Parameters: 
	* Output: 

* Refresh list
	* Description:
	* Parameters: 
	* Output: 

* Import plugin
	* Description:
	* Parameters: 
	* Output: 

* Plugin description
	* Description:
	* Parameters: 
	* Output: 

* Submit changes to author
	* Description:
	* Parameters: 
	* Output: 

* Delete plugin
	* Description:
	* Parameters: 
	* Output: 

* Edit Metadata
	* Description:
	* Parameters: 
	* Output: 

* Update CPK libraries
	* Description:
	* Parameters: 
	* Output: 

* Pack/download
	* Description:
	* Parameters: 
	* Output: 

* send as email
	* Description:
	* Parameters: 
	* Output: 

* delete endpoint
	* Description:
	* Parameters: 
	* Output: 

* duplicate endpoint
	* Description:
	* Parameters: 
	* Output:
	
* Import endpoint
	* Description:
	* Parameters: 
	* Output: 
	
* Import from template
	* Description:
	* Parameters: 
	* Output: 
	
* List endpoints from all plugins
	* Description:
	* Parameters: 
	* Output: 
	
* List templates
* 	* Description:
	* Parameters: 
	* Output: 
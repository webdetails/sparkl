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

The Community Plugin Kick-starter (CPK) is a tool that allows you to create and manage Business Intelligence applications based on the Pentaho-Ctools framework. These applications (or Plugins) are basically a set of dashboards and Kettle Endpoints organized in a way to accomplish the application's goal. These Dashboards and Endpoints (Kettle) are the plugins building blocks and are refered to as the plugin "Elements".
The CPK User Interface is itself a CPK application and thus it follows the same planning roadmap as any other CPK application. The present document consists on the planning of the CPK User Interface. At the end it should be clear to the reader what are the application's Dashboards and Kettle Endpoints, their goals, logic, actions and how all these are wrapped up to form a consistent plugin.

The CPK UI plugin offers a visual interface to CPK. Its goal is to allow managing CPK plugins and creating new ones.

Dashboards
==========

The CPK UI is constituted by three dashboards: 

* The main dashboard, that we call "CPK UI", which lists the existing plugins and offers several global and plugin-specific options;

* the "View Plugin" dashboard, which lists the plugin info (i.e., the plugin metadata), its plugin elements and several global and element-specific options;

* the "New Element" dashboard, which allows the user to add new plugin elements.

CPK UI dashboard 
--------------


### Goal

The CPK UI dashboard must give user access to the existing CPK plugins. Mainly it consists on a list of existing plugins, a set of global options and a set of plugin-specific options.

### Description and actions

The dashboard contains a set of four *global options*:

* **New Plugin**: allows to create a new plugin. Opens the "View Plugin" dashboard (see below) with the plugin info all blank. The plugin info fields may then be edited via the "Edit" global option on this same "View Plugin" dashboard;

* **Import Plugin**: allows to import a remotely hosted plugin to the local CPK plugins folder. Opens a form to be filled with the plugin url/localization;

* **Refresh List**: updates the list of plugins;

* **Request Pentaho Services**: send email requesting Pentaho services/support.

The dasbhboard also contains a *table* listing the existing plugins, each with a small description, and a set of *plugin options* accessible to each item in the table:

* **View**: Open a new dashboard with the plugin info and editing options; 

* **Rate**: ??.
	
### Navigation

The **CPK UI** dashboard gives access to:

* the **View Plugin** dashboard, whenever the user chooses the "View" option, for a specific item on the plugins table or the "New Plugin" option;

* a **form** to be filled with the url/localization of the plugin to be imported, whenever the user chooses the "Import Plugin" option.

### Visual mockup

![alt text](https://github.com/webdetails/cpk/documentation/img/CPK-UI_handMadeMockups1.jpg "CPK-UI mockup")

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

The View Plugin dashboard must give full infomation about the selected plugin and allow the user to edit it by adding/deleting/changing plugin elements.

### Description, actions and visual mockup

The dashboard contains a set of *global options*:

* **Submit changes to author (email)**: sends an email to the plugin author with the new version attached;

* **Delete**: deletes the plugin (a popup asking for confirmation should appear);

* **Update**: ??;

* **Edit**: gives the user acceess to the plugin metadata (see below) by editing its fields;

* **Pack (zip)**: packs the plugin in a zip file;

* **Email**: sends email to a specific destination with the new version attached;

* **Market Place push**: submit the new version to the Market Place;

* **Feedback (email)**: sends email to pentaho/ctools/plugin-author with feedback;

* **Report a Bug (email)**: sends email to pentaho/ctools/plugin-author reporting a bug;

* **New Element**: allows to add a new element. Open a new dashboard with several import options;

* **Back to CPK plugins list**: returns to the **CPK UI** dashboard.

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
 

The dasbhboard also contains a *table* listing the plugin elements and a set of *elements options* accessible to each item in the table:

* **Delete**: deletes the specific table item; 

* **Duplicate**: duplicates the specific table item; 

* **Edit (dashboards only)**: opens the dashboard on the *Community Dashboard Editor* (CDE).

### Navigation

The **View Plugin** dashboard gives access to:

* the **New Element** dashboard, whenever the user chooses the "New Element" option, from the global options list;

* the **email** default application, whenever the user chooses the "Submit changes to author" option, the "Email" option, the "Feedback" option or the "Report a Bug" option;
 
* a **Save As** form for the user to set the location on which to save, whenever the user chooses the "Pack (zip)" option;

* the ***Community Dashboard Editor* (CDE)**, whenever the user chooses the "Edit" option, for a specific dashboard on the plugin elements table;

* the **CPK UI** dashboard, whenever the user chooses the "Back to CPK plugins list" option.

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

New Element dashboard
----------------------

### Goal
The New Element dashboard allows the user to add new elements (both Dashboards and Endpoints) to the plugin by creating new ones from scratch or importing elements from templates or other existing plugins.

### Description, actions and visual mockup

The dashboard contains a set of *options*:

* **Import from plugin**: allows to import a copy of an element from any other plugin. If chosen, the list of endepoints from all plugins will show up;

* **Import from template**: allows to import a copy from a set of templates organized in a hierarchical structure. If chosen, a file browsing window will show up, allowing the user to navigate over this templates structure. And example of such a structure can be:

	* Template

		* Dashboards

		* Endpoints (Kettle)

			* Basic Input

			* Advanced Options  


* **Back to plugin view**: returns to the **View Plugin** dashboard.

The dashboard will also contain either:

* a *list* with the elements from all plugins for the user to choose an item to import;

or

* a windows with a *file browser*, for the user to choose an item to import from several templates. 

### Navigation


The **View Plugin** dashboard gives access to:
 
* a **Browsing window** with the elements templates, whenever the user chooses the "Import from template" option;

* the **View Plugin** dashboard, whenever the user chooses the "Back to plugin view" option.


### Endpoints

The set of Endpoints for the **New Elements** dashboard are:

* Import element;
* Import from template;
* List elements from all plugins;
* List templates.

Endpoints
=========

These endpoints were mentioned in the previous section. Here, we have a "detailed" description of each one of them:

* listPlugins
	* Description:
	* Parameters: 
	* Output: 

* newPlugin
	* Description:
	* Parameters: 
	* Output: 

* refreshList
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
 	* Description:
	* Parameters: 
	* Output: 
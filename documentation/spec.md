<!-- 

Here is the template we should use. Actual implementation follows


Application
=============

In this section you should have the overall description of the application.


Dashboards
==========

This section list and describes the application main visual "landing points":
the application dashboards.

## Dashboard 1
-------------

### Goal

This subsection has a description of the goal of dashboard 1

### Mockup

A screenshot of the mockup in mind

### Actions 

This subsection has a more detailed description of dashboard, including a list
of actions allowed on this dashboard, along with a mockup to give a visual
insight.

### Navigation

Here should be the information regarding the dashboard navigation restrictions
(e.g. if there should be a link to a contextual help page or where/when the user
should navigate to dashboard 2).


### Endpoints

In this subsection you will find the list of kettle end points associated to
actions on the dashboard.


Endpoints
---------

This section describes the End Points (Kettle) in the application. These
endpoints were mentioned in the previous section, in connection to the
application dashboards. Here, we have a detailed description of each one of
them, including their logic, input parameters and output types.

* Endpoint 1
	* Description:	
	* Parameters: 
	* Output: 
* Endpoint 2
	* Description: 
	* Parameters: 
	* Output:  

-->


CPK
===

The Community Plugin Kick-starter (CPK) is a tool that allows you to create and
manage Business Intelligence applications based on the Pentaho-Ctools framework.
These applications (or Plugins) are basically a set of dashboards and Kettle
Endpoints organised in a way to accomplish the application's goal. These
Dashboards and Endpoints (implemented in Kettle) are the plugins building blocks
and are referred to as the plugin "Elements".  The CPK User Interface is itself
a CPK application and thus it follows the same planning roadmap as any other CPK
application. The present document consists on the planning of the CPK User
Interface. At the end it should be clear to the reader what are the
application's Dashboards and Kettle Endpoints, their goals, logic, actions and
how all these are wrapped up to form a consistent plugin.


The CPK UI plugin offers a visual interface to CPK. Its goal is to allow
managing CPK plugins and creating new ones.


Dashboards
==========

The CPK UI is made of two dashboards: 

* The main dashboard, that we call "CPK UI", which lists the existing plugins
  and offers several global and plugin-specific options;
* the "View Plugin" dashboard, which lists the plugin info, including the plugin
  metadata and its elements and offers some editing options.


CPK UI dashboard 
--------------


### Goal


The CPK UI dashboard must give user access to the existing CPK plugins. Mainly
it consists on a list of existing plugins, a set of global options and a set of
plugin-specific options.


### Mock-up

![CPK-UI Mockup](img/CPK_Dashboard1.png "CPK_UI Mockup")


### Actions


The dashboard contains a set of four *global options*:


* _New Plugin_: allows to create a new plugin. Opens the "View Plugin"
  dashboard (see below) with the plugin metadata all blank, automtically opened in edit mode;
* _Import Plugin_: allows to import a remotely hosted plugin to the local CPK
  plugins folder. Opens a form to be filled with the plugin url/localisation;
* _Refresh List_: updates the list of plugins;
* _Request Pentaho Services_: sends email requesting Pentaho services/support.


The dashboard also contains a *table* listing the existing plugins, each with a
small description, the corresponding version and a set of *plugin options*:


* _View_: Open a new dashboard with the plugin info and editing options; 
* _Rate_: ??.


### Navigation


The _CPK UI_ dashboard gives access to:


* the _View Plugin_ dashboard, whenever the user chooses the "View" option,
  for a specific item on the plugins table or the "New Plugin" option;
* a _form_ to be filled with the url/localisation of the plugin to be
  imported, whenever the user chooses the "Import Plugin" option;
* the _email_ default application, whenever the user chooses the "Request
  Pentaho Services" option;



### Endpoints

The set of Endpoints for the _CPK UI_ dashboard are:

* pluginsList;
* newPlugin;
* refreshList;
* importPlugin.	


View Plugin dashboard
---------------------

### Goal

The View Plugin dashboard must give full information about the selected plugin
and allow the user to edit it by adding/deleting/changing plugin elements.


### Mock-up

![View Plugin Mockup](img/CPK_Dashboard2.png "View Plugin Mockup")


### Actions

The dashboard contains a set of *global options*:

* _Submit changes to author (email)_: sends an email to the plugin author with
  the new version attached;
* _Delete_: deletes the plugin (a pop-up asking for confirmation should
  appear);
* _Update CPK libraries_: updates the CPK libraries in the plugin;
* _Edit_: gives the user access to the plugin metadata (see below) by editing
  its fields;
* _Pack (zip)_: packs the plugin in a zip file;
* _Email_: sends email to a specific destination with the new version
  attached;
* _Market Place push_: submit the new version to the Market Place;
* _Feedback (email)_: sends email to pentaho/ctools/plugin-author with
  feedback;
* _Report a Bug (email)_: sends email to pentaho/ctools/plugin-author
  reporting a bug;
* _New Element_: allows to add a new element. Opens two sets of adding options, one for new dashboards and other for new endpoints. Each set as the following:
	* _Templates_ a list of templates to choose from;
	* _Name_: a form to insert the name of the new element;
	* _Admin_: a checkbox to restrict the new element's accesibility to users of type Admin;
	* _New_: a clickable button to confirm the creation of the new element; 
* _Back to CPK plugins list_: returns to the _CPK UI_ dashboard.


The dashboard contains a *list* of the plugin metadata, with the following info: 

* _Name_;
* _Description_;
* _Author_:
	* Name,
	* Email; 
* _Company_:
	* Name,
	* Url;
* _Creation date_;
* _Version_;
* _CPK Version_.
 

The dashboard also contains a *table* listing the plugin elements and a set of
*elements options* accessible to each item in the table:

* _Delete_: deletes the specific table item; 
* _Duplicate_: duplicates the specific table item; 
* _Edit (dashboards only)_: opens the dashboard on the *Community Dashboard
  Editor* (CDE);
* _View Data Sources (dashboards only)_: opens the dashboard's cda file;
* _View Endpoint (kettle only)_: (will open new endpoint viewer)


### Navigation


The _View Plugin_ dashboard gives access to:

* the _email_ default application, whenever the user chooses the "Submit
  changes to author" option, the "Email" option, the "Feedback" option or the
  "Report a Bug" option;
* a _Save As_ form for the user to set the location on which to save, whenever
  the user chooses the "Pack (zip)" option;
* the _Community Dashboard Editor (CDE)_, whenever the user chooses the
  "Edit" option, for a specific dashboard on the plugin elements table;  
* the _Community Data Access (CDA)_, whenever the user chooses the "View Data Sources" option, for a specific dashboard on the plugin elements table;
* the endpoins viewer, whenever the user chooses the "View Endpoint" option, for a specific endpoint on the plugin elements table;
* the _CPK UI_ dashboard, whenever the user chooses the "Back to CPK plugins
  list" option.


### Endpoints

The set of Endpoints for the _View Plugin_ dashboard are:


* submitChangesToAuthor;
* deletePlugin;
* getPluginMetadata;
* updateMetadata;
* updateLib;
* packPlugin;
* sendAsEmail;
* deleteElement;
* duplicateElement;
* listElements;
* newElement.



Endpoints
=========


These endpoints were mentioned in the previous section. Here, we have a
"detailed" description of each one of them:


* pluginsList
	* Description: list CPK plugins locally available
	* Parameters: (none)
	* Output: table with four columns: name, id, description and version
* newPlugin
	* Description: create new plugin (a new plugin Id) which will be feed with  metadata inserted by users on a blank "view plugin" dashboard
	* Parameters: (none)
	* Output: (operation status)
* refreshList
	* Description: refresh list of plugins
	* Parameters: (none)
	* Output: (operation status)
* importPlugin
	* Description: copy plugin
	* Parameters: url/path and plugin Id of the plugin to be imported
	* Output: (operation status) 
* getPluginMetadata
	* Description: get Plugin Metadata to be shown in the "View plugin" dashboard
	* Parameters: plugin Id
	* Output: table with plugin's metadata
* submitChangesToAuthor
	* Description: pack plugin and open email default application with zip file already attached and author/pentaho/ctools email address already inserted
	* Parameters: plugin Id, 
	* Output: (operation status)
* deletePlugin
	* Description: delete selected plugin
	* Parameters: plugin Id
	* Output: (operation status)
* updateMetadata
	* Description: save metadata values inserted by user and merge with existing values (if any)
	* Parameters: plugin Id, table with metadata changed keys and corresponding new values
	* Output: (operation status)
* updateLib
	* Description: override the plugin's CPK libs with their current version
	* Parameters: plugin Id
	* Output: (operation status)
* listElements
	* Description: list the plugin elements (dashboards and endpoints)
	* Parameters: plugin Id
	* Output: table listing the plugin elements and corresponding info
* packPlugin
	* Description: create a zip file with the plugin current version
	* Parameters: plugin Id and url/path to save the pack
	* Output: (operation status)
* sendAsEmail
	* Description: pack plugin and open email default application with zip file already attached
	* Parameters: plugin Id
	* Output: (operation status)
* deleteElement
	* Description: delete element from plugin
	* Parameters: plugin Id, element Id
	* Output: (operation status)
* duplicateElement
	* Description: duplicate element on plugin
	* Parameters: plugin Id, element Id
	* Output:(operation status)
* newElement
	* Description: duplicate element template (can be blank template) and save it on the target plugin, with the new name and user type restrictions inserted  
	* Parameters: template Id, target plugin Id, name, Admin
	* Output: (operation status)
* listTemplates
 	* Description: lists elements templates (to feed selector)
	* Parameters: (none) 
	* Output: table with all available elements templates

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
insigh.

### Navigation

Here should be the information regarding the dashboard navigation restrictions
(eg. if there should be a link to a contextual help page or where/when the user
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
Endpoints organized in a way to accomplish the application's goal. These
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

The CPK UI is made of three main dashboards: 

* The main dashboard, that we call "CPK UI", which lists the existing plugins
  and offers several global and plugin-specific options;
* the "View Plugin" dashboard, which lists the plugin info (i.e., the plugin
  metadata), its plugin elements and several global and element-specific
  options;
* the "New Element" dashboard, which allows the user to add new plugin elements.


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
  dashboard (see below) with the plugin info all blank. The plugin info fields
  may then be edited via the "Edit" global option on this same "View Plugin"
  dashboard;
* _Import Plugin_: allows to import a remotely hosted plugin to the local CPK
  plugins folder. Opens a form to be filled with the plugin url/localization;
* _Refresh List_: updates the list of plugins;
* _Request Pentaho Services_: sends email requesting Pentaho services/support.


The dashboard also contains a *table* listing the existing plugins, each with a
small description, and a set of *plugin options* accessible to each item in the
table:


* _View_: Open a new dashboard with the plugin info and editing options; 
* _Rate_: ??.


### Navigation


The _CPK UI_ dashboard gives access to:


* the _View Plugin_ dashboard, whenever the user chooses the "View" option,
  for a specific item on the plugins table or the "New Plugin" option;
* a _form_ to be filled with the url/localization of the plugin to be
  imported, whenever the user chooses the "Import Plugin" option;
* the _email_ default application, whenever the user chooses the "Request
  Pentaho Services" option;



### Endpoints

The set of Endpoints for the _CPK UI_ dashboard are:

* listPlugins;
* newPlugin;
* refreshList;
* importPlugin;
* pluginDescription.
	


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
* _Update_: ??;
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
* _New Element_: allows to add a new element. Open a new dashboard with
  several import options;
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
  Editor* (CDE).


### Navigation


The _View Plugin_ dashboard gives access to:

* the _New Element_ dashboard, whenever the user chooses the "New Element"
  option, from the global options list;
* the _email_ default application, whenever the user chooses the "Submit
  changes to author" option, the "Email" option, the "Feedback" option or the
  "Report a Bug" option;
* a _Save As_ form for the user to set the location on which to save, whenever
  the user chooses the "Pack (zip)" option;
* the _Community Dashboard Editor (CDE)_, whenever the user chooses the
  "Edit" option, for a specific dashboard on the plugin elements table;
* the _CPK UI_ dashboard, whenever the user chooses the "Back to CPK plugins
  list" option.


### Endpoints

The set of Endpoints for the _View Plugin_ dashboard are:


* submitChangesToAuthor;
* deletePlugin;
* editMetadata;
* updateCPKlibs;
* listPluginElements;
* pack;
* sendAsEmail;
* deleteElement;
* duplicateElement.


New Element dashboard
----------------------

### Goal

The New Element dashboard allows the user to add new elements (both Dashboards
and Endpoints) to the plugin by creating new ones from scratch or importing
elements from templates or other existing plugins.


### Mock-up

![New Element mockup](img/CPK_Dashboard3.png "New Element Mockup")


### Actions


The dashboard contains a set of *options*:


* _Import from plugin_: allows to import a copy of an element from any other
  plugin. If chosen, the list of endpoints from all plugins will show up;
* _Import from template_: allows to import a copy from a set of templates
  organized in a hierarchical structure. If chosen, a file browsing window will
  show up, allowing the user to navigate over this templates structure. And
  example of such a structure can be:
	* Template
		* Dashboards
		* Endpoints (Kettle)
			* Basic Input
			* Advanced Options  
* _Back to plugin view_: returns to the _View Plugin_ dashboard.

The dashboard will also contain either:

* a *list* with the elements from all plugins for the user to choose an item to
  import;

or


* a windows with a *file browser*, for the user to choose an item to import from
  several templates. 


### Navigation


The _View Plugin_ dashboard gives access to:


* a _Browsing window_ with the elements templates, whenever the user chooses the
  "Import from template" option;
* the _View Plugin_ dashboard, whenever the user chooses the "Back to plugin
  view" option.


### Endpoints

The set of Endpoints for the _New Elements_ dashboard are:

* importElement;
* importFromTemplate;
* listElementsFromAllPlugins;
* listTemplates.


Endpoints
=========


These endpoints were mentioned in the previous section. Here, we have a
"detailed" description of each one of them:


* listPlugins
	* Description: identify all CPK plugins locally available
	* Parameters: (none)
	* Output: table with all plugins and respective small description
* newPlugin
	* Description: create new plugin with metadata inserted by users on a blank "view plugin" dashboard
	* Parameters: (none)
	* Output: (operation status)
* refreshList
	* Description: refresh list of plugins
	* Parameters: (none)
	* Output: (operation status)
* importPlugin
	* Description: copy plugin
	* Parameters: url/path of the plugin to be imported
	* Output: (operation status) 
* pluginDescription
	* Description: get plugin small description to add to each item on the plugin list 
	* Parameters: plugin Id
	* Output: plugin small description 
* submitChangesToAuthor
	* Description: pack plugin and open email default application with zip file already attached and author/pentaho/ctools email address already inserted
	* Parameters: plugin Id, 
	* Output: (operation status)
* deletePlugin
	* Description: delete selected plugin
	* Parameters: plugin Id
	* Output: (operation status)
* editMetadata
	* Description: save metadata values inserted by user 
	* Parameters: plugin Id, table with metadata changed keys and corresponding new values
	* Output: (operation status)
* updateCPKlibs
	* Description: override the plugin's CPK libs with the current version of the CPK libs
	* Parameters: plugin Id
	* Output: (operation status)
* listPluginElements
	* Description: list the plugin elements (dashboards and Endpoints), each with a small description
	* Parameters: plugin Id
	* Output: table listing the plugin elements and corresponding description
* pack
	* Description:
	* Parameters: 
	* Output: 
* sendAsEmail
	* Description:
	* Parameters: 
	* Output: 
* deleteElement
	* Description:
	* Parameters: 
	* Output: 
* duplicateElement
	* Description:
	* Parameters: 
	* Output:
* importElement
	* Description:
	* Parameters: 
	* Output: 
* importFromTemplate
	* Description:
	* Parameters: 
	* Output: 
* listElementFrom AllPlugins
	* Description:
	* Parameters: 
	* Output: 
* listTemplates
 	* Description:
	* Parameters: 
	* Output: 

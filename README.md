CPK
===

Community Plugin Kick-starter


## Motivation


[Pentaho](http://www.pentaho.com) is very well known for being a very good
Business Analytics software, but is in fact much more than that; Pentaho is a
great platform to build on top of. 


Using an easy analogy, I see Pentaho acting as an operating sytem where people
can build Application on top of


## Objective


The goal of CPK is to provide a simple and easy way to develop pentaho plugins
that behave like packaged applications, simplifying it's structure. 

The UI is built using [CDE](http://cde.webdetails.org), with a simple
methodology to create new dashboards / pages and a sitemap that provides simple
navigation and a default template

There are 3 options for doing server-side code:

1. [Kettle](http://kettle.pentaho.org) transformations
1. Javascript server side code execution
1. Java classes

The first two are recommended, since it's easier to register new endpoints just
by dropping code in a directory and no compilation is necessary.

With this approach not only we expect to make it easier and faster to develop
plugins, we also hope to lower down the specific technical requirements to build
them. The end goal is that business consultants are able to build new plugins,
not requiring specific java knowledge.


## Structure

This is the resulting plugin structure. Ideally, no compilation is necessary, so
everything except maybe the lib directory could be stored in a _VCS_ system.

This is the proposed stub configuration

_to be completed_


	CPK_Plugin
	|-- conf
	|-- dashboards
	|-- endpoints
	|-- lib
	`-- plugin.xml


## CPK administrative features


Besides providing the regular templating for creating new plugins, CPK can have
an administrative UI with the following features:


* List existing plugins
* Detect if the plugins are up to date with the latest version of CPK
* Allow the creation of new plugins
* Allow to change plugin metadata
* List and register new endpoints (UI and code)

Here's a list of stretch goals / nice to have

* Import UI from existing dashboards in solution
* Allow editing dashboards from this UI
* Submit marketplace metadata to *Pentaho*
* Generate distribution zip package


## Updates

As the CPK framework or any of it's dependencies gets improved, the plugins
themselves can't stay outdated. There will be a version information attached to
the _CPK plugin version_ so that it's possible to upgrade to the latest version.



## Dependencies

CPK will have as little code as possible, making it as simple as possible to
develop plugins. However, it will need a few dependencies:

* Pentaho
* [CPF](https://github.com/webdetails/cpf) - Community Plugin Framework, with
  the common set of code for the plugins
* [CDE](https://github.com/webdetails/cde) - Community Dashboard Editor
* [CDF](https://github.com/webdetails/cdf) - Community Dashboard Framework
* [CDA](https://github.com/webdetails/cda) - Community Data Access


## Link with Pentaho Marketplace

Once a plugin is developed, and the authors think it's in a state that can be
shared, CPK will be able to generate a packaged plugin and metadata information
so it can be integrated into Pentaho's marketplace. 

Pentaho will then be able to categorize / approve the plugin so that it becomes
available to other users through the marketplace


#How to use a CPK Plugin 

###CPK main concepts

_Elements_ are both Kettle (transformations and jobs) and Dashboards (CDE)

_Endpoints_ are kettle transformations and jobs.
 These accept external parameters and stepnames (How to specify these parameters and stepnames will be explained ahead)

_Dashboards_ are CDE format pages built on CDE that may have interactions or just simply show data
 Dashboards accept the parameter "mode" that you can use to specify between "edit" or "render"

_Commands_ can be called whether or not you have dashboards or endpoints on your CPK-Plugin (The list will be down bellow)

#####Note that the elements have unique names therefore there can only be one element called "Home" per instance!

###How to use an endpoint:

It's really simple, to use an endpoint you can just type this on your browser address bar:

    http://hostAdress/pentaho/content/pluginID/endpointNameLowerCase

As an example let's say we're working on a plugin called _"example"_.
Assuming you're using your local machine as a server the address to use is: 

    http://localhost:8080/pentaho/content/example

This plugin has an endpoint called "helloWorld" and to use it all you have to do is:

    http://localhost:8080/pentaho/content/example/helloworld


You can also specify parameters to this endpoint by typing: 

    http://localhost:8080/pentaho/content/example/helloworld?paramPARAMETER_HERE=parameterValue&paramSecondParameter=secondValue

If this endpoint has a parameter defined called "bold" and its possible values are "true" or "false" we can tell the plugin which value we want to set to it:

    http://localhost:8080/pentaho/content/example/helloworld?parambold=true

#####As you must have noticed the "param" prefix is always present, it means it is a custom parameter to be inserted onto your endpoint (It must always be present to disambiguate between endpoint parameter and general parameter).

Endpoints have a parameter called _"pentahoUsername"_ injected before their execution and a _"pentahoRoles"_ (as Comma Separated Value, CSV format) injected aswell.
 - This can be used on the endpoints to specify some kind of security on their execution.

There is also the concept of getting information out of a specific step of your transformation and job and this is where the "stepName" parameter comes in!

#####_How to use it? Really simple!_
You just need to type this into the address bar

    http://localhost:8080/pentaho/content/example/helloworld?stepName=yourCustomOutputStep

As before, if we have a stepName called "Output as JSON" the correct way to set this stepName is:

    http://localhost:8080/pentaho/content/example/helloworld?stepName=Output as JSON


_"stepName"_ provides a way to get the output we want out of a transformation with more than one output and the specific result of a job step that was executed.
 
*The "stepName" parameter only works on the endpoint you told CPK to run. Only Top-Level steps are caught*

#####Keep in mind that the default stepName is "OUTPUT"

_Using endpoints is easy!_

###How to use a dashboard:

A Dashboard is used like the endpoints are. The URL to call is basically the same, the only change is the name after the "example" field on the address bar!

    http://localhost:8080/pentaho/content/example/dashboardName

Here you have a very useful parameter that is: "mode".
It allows to change between "edit" and "render" mode on the fly! All you need to do is append "?mode=edit" to the URL like this: 

    http://localhost:8080/pentaho/content/example/dashboardName?mode=edit

After you're finished editing the dashboard just hit "back" on your browser and refresh the page.

_As you can see, using a dashboard on CPK is very easy!_

###CPK command list
#####_-The comands are case sensitive!_-

_status_ : Displays the status of the plugin and all it's endpoints

_reload_ : Reloads all the configurations, endpoints and dashboards, _also clears the Endpoints cache!_

_refresh_ : Does the same as _reload_ for now

_version_ : Returns the plugin version (Defined on the plugins "version.xml" file or through the Control Panel)

_getSitemapJson_ : Returns a [JSON](http://www.json.org/) with the plugins sitemap (Dashboards only!)

_getElementsList_ : Returns a [JSON](http://www.json.org/) with the whole list of elements present on the plugin (dashboards and kettle endpoints)

#####_As before, using the commands is really - really - simple!_
Assuming we're working on _CPK_ all we have to do is type:

    http://localhost/pentaho/content/example/status

_Following this logic, all you have to do to use the other commands is just replace "status" with any of the other commands listed above!_


## License

This project uses [MPLv2](http://www.mozilla.org/MPL/2.0/)

------



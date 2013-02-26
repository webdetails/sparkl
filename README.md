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


The goal of CKP is to provide a simple and easy way to develop pentaho plugins
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



## Registering plugins


## Updates


## Dependencies

CPK will have as little code as possible, making it as simple as possible to
develop plugins. However, it will need a few dependencies:

* Pentaho (*duh!*)
* [CPF](https://github.com/webdetails/cpf) - Community Plugin Framework, with
  the common set of code for the plugins
* [CDE](https://github.com/webdetails/cde) - Community Dashboard Editor
* [CDF](https://github.com/webdetails/cdf) - Community Dashboard Framework
* [CDA](https://github.com/webdetails/cda) - Community Data Access



## Link with Pentaho Marketplace

## License

This project uses [MPLv2](http://www.mozilla.org/MPL/2.0/)

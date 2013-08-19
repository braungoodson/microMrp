microMrp (prototype)
========

A small, open-source, manufacturing resource planning system for workgroups.

Usage
========

Create a MongoDB instance named 'microMrp' on '127.0.0.1:27017'.

<pre>
$ /path/to/mongodb/bin/mongo
MongoDB shell version: 2.4.5
connecting to: test
> use microMrp
switched to db microMrp
> exit
bye
</pre>

Then just run the microMrp software from the root microMrp directory.

<pre>
$ cd microMrp
$ node main.js
</pre>

Features
========

* Manufacturing Resource Managemt (MRP)
* RESTful API (RAPI)
* MongoDB Document Database (MDD)
* Angular.js Partner Portal (APP)
* Interactive MicroMRP Server Shell (IMSS)
* Open-Ended Client Development (OECD)

External Dependencies
========

* Node.js
* MongoDB

Packaged Dependencies
========

* mongodb
* mongoose
* express
* Angular.js

To-Do
========

* Implement portal.
* Add Example front-end.


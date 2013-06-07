# Bolt App

Initial development sponsored by The Steel Solutions Center.

The Steel Solutions Center is for people who need technical assistance, innovative solutions, or tools to make structural steel design even easier. Developed by [AISC](http://www.aisc.org) specifically for steel fabricators, structural engineers, architects, owners, developers and other professionals, the Steel Solutions Center is your number one source of information for structural steel.

Bolt App is built using standard web technologies for access on many popular devices.  It is built using open source technologies, including [jQuery](http://jquery.com/), [jQuery Mobile](http://jquerymobile.com/), [RequireJS](http://www.requirejs.org/), and [es5-shim](https://github.com/kriskowal/es5-shim).

Some icons by members of the [The Noun Project](http://thenounproject.com), including Parker Martin (factor[e] design initiative), James Keuning, and Mauro Fontanari.

## Copyright 2013 American Institute of Steel Construction (AISC)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this software except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## Developer Notes

The project will almost run from the bare directory - however same-origin policy on the data tables requires that the separated development files be run through a web server.

For production builds, this project uses [Grunt](http://gruntjs.com/) to handle packaging and minifying files.  The most notable requirement for Grunt is [Node.js](http://nodejs.org/).  The project includes a `package.json` solely for the Grunt modules needed by the project.  You should be able to `npm install` to get the required packages, and then run `grunt build` to populate the `dist` directory

Once dist is built, the files in dist should be runable directly from the filesystem, although a web server will be required to enable offline support.  Please note the (often hidden) `.htaccess` file, which will configure Apache to serve the cache manifest with correct mime-type.  Other servers will require similar configuration if they don't use .htaccess.

Note dist contains a [cache.manifest](https://en.wikipedia.org/wiki/The_cache_manifest_in_HTML5) file. This is regenerated on each build, but you still may need to take some care to ensure that your browser has loaded updated files once you've run from production build.

The *About* page within the application contains some high-level information about the libraries used in the application itself.

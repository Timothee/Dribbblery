Dribbblery
==========

Dribbble gallery with [Backbone.js](http://backbonejs.org). This was built for a
code challenge.

The code challenge was to build, you guessed it, a Dribbble gallery with
Backbone.js with a few specific implementation details (e.g. clicking on the
various tabs should not reload the items from Dribbble but *should* re-render
them).

It uses [Passeplat](https://github.com/Timothee/Passeplat) to proxy the requests
to the Dribbble API so that the requests come with [CORS headers](http://www.w3.org/TR/cors/).
(Dribbble doesn't send them, so it wouldn't work otherwise)

Live version [here](http://timothee.github.com/Dribbblery/). Since the proxy
is hosted on Heroku, it might take some time for the instance to wake up.
You might want to reload the page if it doesn't seem to work.

--

Code provided under the MIT license.
(c) 2013 Timothée Boucher

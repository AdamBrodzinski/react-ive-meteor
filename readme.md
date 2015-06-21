# React-ive Meteor
### http://react-ive.meteor.com

![](http://fat.gfycat.com/WindySentimentalHerculesbeetle.gif 'Feed Demo')

<br><br>

Building a realtime backend and clientside optimistic UI for React can be difficult. Meteor makes it easy to build an app with [optimistic UI updating][blogopp] and realtime data streaming (view updates as DB records change).


**TL;DR**

This repo aims to be a sandbox that developers can learn how to create React apps with a Meteor backend. We'll have several branches with different ways to architect/use the app (such as a full flux spec). 

Meteor and Flux/Relay overlap quite a bit so the master branch will be the most simple version that beginners can pickup and start running. 

The data fetching layer of this app is based on the Flux and Relay ideas by allowing child components to declare the data field shape they need (coming soon). This data is passed down through props.

The Meteor Development Group is working on making a deeper and more seamless integration with Meteor and React. Checkout the progress [Here][1]. Once this work is finished and released, this repo will be updated to use the official packages instead.


<br>
#### Benefits of using React with Meteor

- Automatic optimistic UI updates (latency compensation)
- Universal JS shared on client and server (isomorphic)
- Real time database updates (like Uber's realtime driver location)
- Hot code reloads
- Easier data fetching than Flux
- Mini-Mongo client data store (easy clientside querying)
- Build system for preprocessing Sass, Babel, etc...
- Clean server-side code with fibers (soon with promise ES7 async/await)
- Query based data subscriptions instead of REST (also API REST supported)
- Easy microservice implementations via DDP
- Modular, swap out any default components you wish



### Cons of using Meteor
- No official core SQL support yet (3rd party PostgreSQL and MySQL avail.)
- Limited server-side rendering (no first page html, but can send data if needed)
- No client-side file import system yet, uses packages, global namespaces and file load order instead


### Fallacies of Meteor
- Not secure - This has been resolved for quite a while... *try to modify someone else's post!*
- Not scalable - Many companies are using Meteor with large user bases
- Only supports Mongo - There's options just not official packages yet
- Meteor is only for realtime streams - works well with without realtime updates too!


These cons are on the core roadmap and will be resolved in the near future. However some of those could be blockers for your project.


<br><hr><br>


## Usage
- `curl https://install.meteor.com/ | sh` [more info](https://www.meteor.com/install)  
- `make dev` or `meter  --settings '.config/devel/settings.json'`


<br>
## Data

![](http://blonk.co.s3.amazonaws.com/img/reactive-meteor-data2.jpg)

Fetching data with Meteor is quite different than a traditional REST system. Instead of making requests to single resource endpoints, you can subscribe to one or more publications of data. If this data in the database changes, you'll receive the new data in the client (instantly when using Mongo's Oplog). Using the MeteorMixin, this new data is synced with your subscription/state which re-renders your views.

This new data is sent into a store called Mini-Mongo. It acts like an in memory Mongo database which turns out to be a really convenient way to access store data. Since this is in memory, ops are very fast (basically a key/value lookup). If you were using the PostgreSQL database you would use SQL to query the Mini-PostgreSQL store instead.


The whole data cycle looks like this:

- grandparent component renders children components
- children tell grandparent which data/fields they need
- grandparent subscribes to data all at one time
- server publishes data to client if authorized
- client accepts data and inserts into Mini-Mongo client store
- grandparent receives message that data they care about changed
- grandparent triggers re-render (via Meteor mixin)
- data flows from grandparent down to all children


New Meteor users can get tripped up in this process by sending too much data to the client, causing slowdown. This project uses a Flux/Realy type system to help prevent over publishing data. Each component specify what fields they need and their grandparent takes care of the actual query. This grandparent pushes down new data through their props. This makes testing very easy as the fetching only happens in one place. This data fetching system is a first draft so it may change some. It's also trying to stay simple by not trying to solve every edge case. We'll have a full flux/Relay branch for a more complex example of this.



## Views

The master branch of this repo (and live example) use a mixture of Meteor's Blaze (handlebars like syntax) templates and React templates. Blaze is ideal for content that has no state and very little helpers. These large pages (like the about example) would be cumbersome to use in JSX.

In this setup, the router renders 'page' templates which have the sole responsibility of handling static markup and rendering the topmost React components. These Blaze pages don't subscribe to data, that responsibility is for the topmost components.  [Example Code][blaze-parent-ex]

The rendering path looks something like this:

- route /feed , routes.js render static `client/pages/feed.html` template
- static `feed` template renders FeedList and CreatePost React components
- FeedList sets up data pub/sub and renders children
- CreatePost renders children
- view is ready


However if your app looks very *'app like'* (Spotify, Slack, etc...) and not *'page like'*, using 100% React views is a better approach. See the `full-react` branch (soon) to see how you can render React views in using the React-Router module.




<br>
## Meteor Methods

Meteor provides an RPC style method that can be called on the client or on the server (even other non servers with a DDP adapter). You simply write a method on the server and on the client you call `Meteor.call('multiply', 2, 5);`. On the server the call would directly return `10` because we have fibers. On the client we can't block so the last argument would be a callback with params `error` and `response`. You also have access to a few resources inside the method like `this.userId`. It will contain the caller's userId if they are authenticated. Meteor uses these methods under the hood for the `Authors.insert({name: 'foo'})` calls. However we're using our own model methods to bypass the hard to reason allow/deny rules.



Meteor provides an RPC style method that can be called on the client or on the server (even other non servers with a DDP adapter). You simply write a method on the server and on the client you call `Meteor.call('multiply', 2, 5);`. On the server the call would directly return `10` because we have fibers. On the client we can't block so the last argument would be a callback with params `error` and `response`. You also have access to a few resources inside the method like `this.userId`. It will contain the caller's userId if they are authenticated. Meteor uses these methods under the hood for the `Authors.insert({name: 'foo'})` calls. However we're using our own model methods to bypass the hard to reason allow/deny rules. The Meteor methods turn out to be pretty good at standing in for a Flux Dispatcher.



<br>
## Models

The implementation of data models used in this project is just one of many ways to do it. Meteor does not have an ORM or Model layer so you're up to rolling your own or using a package. There are a few nice model packages but they have lots of magic involved. For simplicity i'm using a pattern i've used in several production apps. However to keep code a bit smaller, the inheritance uses `__proto__` which is not supported in old IE. You would need a more verbose method to make this work with unsupported (old) browsers. These models also are not full featured like Mongoose or ActiveRecord, but again for simplicity sake these will work just fine.


<br>
## Load Order

Meteor doesn't currently have a file based module import system like Browserfy, Webpack, or ES6 modules (though we can import them and expose globally like [this example][modules]). However i've heard this is coming in the near future. Currently Meteor has a set of rules it uses for loading. Read the full rundown [here][docs-load]. `client/` folders are only sent to the client and `server` folders are only sent to the server. The `both` folder will be sent to both client and server.



<br>
## Code Generator

No one likes typing boilerplate. If this project's folder structure works for you, [Meteor Generate][mgen] can save a lot of time. I'm in the middle of converting my old MVC patterns with Blaze over to Component structured React. This should be on NPM soon but in the mean time keep an eye out on [this branch][mgen-branch]. It creates models, pages, routes, React components with Sass styles, and more.



<br>
## Security

In short, **trust nothing on the client**. Assume everything being passed from the client to server could be a malicious value. Meteor provides utilities to check all inputs to make sure they are the shape and type you expect. This prevents Mongo injections. If they're not the shape/type you expect, reject it and throw an error.
**remove the insecure package**. It automatically allows full access to insert/update/remove methods. This would be great for a throw away prototype or for learning the very basics but it's a security hazard.

The **autopublish** package should also be removed. This will send your *entire* serverside database to the client and load it into the Mini-Mongo store. Not only is this slow with large data sets but it's a security hazard.  
**Only send authorized data to the client**. It's up to you to verify if a user should be allowed to subscribe to a publication. They can't access it in Mini-Mongo unless you send it to them. You only want to send data down that they are allowed/supposed to use. 

[Meteor Security Talk][sec-vid]
[See Code Comments][pub-sec] 




<br>
## Additional Resources

If you'd like to learn how to build an entire production app using Meteor and React, i'm finishing a screencast series that feels like a pair programing session. We'll start from scratch and build a production ready MVP of a photo sharing social network site. 

Check it out here:  

### [react-meteor-tutorial.com](http://react-meteor-tutorial.com)

- TDD React Views Effortlessly in Meteor
- Scaling Production Meteor (no TODO apps here!)
- Serverside processing
- File uploads
- How to deploy with load balancing and elastic scaling
- Build for other mobile/desktop apps to connect to
- Explain Meteor's magic
- and more ...


We'll use techniques like TDD unit testing and acceptance testing to build a solid codebase. We'll talk about how to structure your app so it responds to change so it won't become brittle over time... something that other tutorials don't mention.

We'll even TDD our React views, something that was previously too slow to even consider using traditional view frameworks.

I've built several production apps that handle thousands of users a day. Learn some tips and tricks on making a production Meteor app that won't tip over with a few hundred concurrent users.

Meteor can be very magical out of the box. We'll turn off a lot of that and build things manually at first. You can always add in the magic if you'd like. At the end you'll have a solid understanding on how the system is working.


- Part 2 - React with Meteor Cordova iOS & Android Apps
- Part 3 - React Native iOS with Meteor Backend (Running Meteor in React Native JS)
- Part 4 - React OSX & Windows Desktop App using Electron


[1]: https://github.com/meteor/react-packages
[blaze-parent-ex]: https://github.com/AdamBrodzinski/react-ive-meteor/blob/master/client/components/Feed/FeedData.jsx
[pub-sec]: #
[mgen]: https://github.com/AdamBrodzinski/meteor-generate
[mgen-branch]: https://github.com/AdamBrodzinski/meteor-generate/tree/react
[modules]: #
[docs-load]: http://docs.meteor.com/#/full/structuringyourapp
[sec-vid]: https://vimeo.com/78294010
[blogopp]: http://info.meteor.com/blog/optimistic-ui-with-meteor-latency-compensation
[repo]: https://github.com/AdamBrodzinski/reactive-meteor

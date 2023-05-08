### Deployment

This repo contains 2 branches, one for an android virtual device and one for using this as a web app. 

I strongly reccomend to run this as an emulated android app in a virtual device, some features on web are slightly buggy

To do so, just run 

'''git checkout android

or alternatively

'''git checkout web

Once desired repo has been cloned ensure that the node packages are installed with 

'''npm install

This installs expo which allows you to run the following commands to spin up the app

'''expo start --android

or

'''expo start --web

The prerequisite of this app is to ensure the whatsthat node.js server is running
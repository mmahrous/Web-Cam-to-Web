# Web-Cam-to-Web
This project is using node.js 
I wrote this code I had a web camera and a Raspberry Pi 2, but I don't want to buy the Pi Camera module so I hacked the code form [Raspberry Pi, Camera and Node.js – Live Streaming with Websockets #IoT](http://thejackalofjavascript.com/rpi-live-streaming/) I wanted to create a Babby Monitor so here is it
### What you need:
1- Raspberry Pi.
2- Web Camera.
3- Rasspian prefaded the latest version.

### Action:
Get your pi ready by installing node js and for sure connect it to the internet, get the local IP.

And that's is clone the code in your home dir or where ever.
```
git clone https://github.com/mmahrous/Web-Cam-to-Web.git
```
```
cd Web-Cam-to-Web
```
RUN
```
node index.js
```
the server will start on port 8080
use your browser to navigate to http://[LOCAL_IP]:8080

That's it it works fine but for sure it has a delay, it get capture the image every 200 ms means 5 freams/second you can change the interval but test it to make sure it works without crashs. 

### To make the application run when the pi is restarted: 
I use pm2
```
npm install -g pm2
```
go to the dir
```
pm2 start index.js --name [but the name that you want]
```
to save the process
```
sudo pm2 save
sudo pm2 startup
```
that's it when ever you restart the pi the application will run automatically :)
Hop you like it forlk it and change it to what suit you.

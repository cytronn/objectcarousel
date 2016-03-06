Here's my Jquery Object carousel work


TECH USED : 

HTML5
CSS3
jquery
annyang.js (voice managing)
touch-swipe.js (swipe devices)


FEATURES : 

- You can create as much carousel as you want, just re-use the html code, and change the background-image urls
- The carousels are fully customizable. 
- When you create a new instance of Carousel in the script.js index, you pass an object as argument, defining : 
	- elt : string The DOM element attached to the object created
	- pagination : boolean ON / OFF pagination. Pagination circles are clickable to navigate. 
	- speed : number seconds between each slide ( 0 means no automatic sliding)
	- transition_timing : number seconds of the transition between the slides
	- arrows : boolean allows the navigation using the arrows interface 
	- ratio : number You can set an image ratio (best between 0.5 and 1). Just set the width you want to the .carousel in CSS.

- The carousels will auto-resize on window.resize(), to fit the page anytime.
- Autofocus system will set a focus on every carousel that is entirely displayed in the page. The autofocus allows : 
	- Voice control, just get in a quiet room, and say "previous" or "next"
	- Keyboard control, with your left and right keys


- Fullscreen visualisation is activable by clicking the icon in the description of some pictures. To exit, just click the close icon, click the 	  layer or press esc.


- Sliding will stop on container hover
- The carousels will autoloop
- When on mobile, swiping left or right will make the images slide
- You can drag and drop the images to make them slide


DIFFICULTIES : 

I had a hard time trying to make the loop animation softer. Also, setting the autofocus was kind of difficult, and it could be ameliorated.


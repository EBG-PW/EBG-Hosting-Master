# EBG-Hosting-Master

### @ API Routes:  
All API routes are available under /api/v1  
  
Regtoken:  
| Methode | Path  | Permissions | Authentication| Parameters |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| POST | /regtoken/newtoken  | Admin  | Token | CoinsPerWeek |
| GET | /regtoken/getall  | Admin  | Token | - |
| GET | /regtoken/getprices | Everyone | None | - |
| GET | /regtoken/calprices | Everyone | None | CPU, MEM, DISK, Backup |

Apitoken:  
| Methode | Path  | Permissions | Authentication| Parameters |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| POST | /apitoken/newtoken  | Admin  | Token | Permission |
| POST | /apitoken/deltoken  | Admin  | Token | Token |
| GET | /apitoken/getall  | Admin  | Token | - |


### Template used:  
  
Hyperspace by HTML5 UP
html5up.net | @ajlkn
Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)


I'd had the blueprint for this particular design in the drawer for some time, but with all the
other interesting and in some cases, so semi-secret projects I've been working on, it took me a moment. 
It took me a while to actually design and code it. Fortunately, things relaxed
Relaxed enough for me to finally get around to it, and so I'm happy to introduce Hyperspace:
a fun, blocky, one-page design with lots of color, a bit of animation, and an additional "generic" page template
(because even single-page sites usually need one or two inner pages). 

I hope you like it :)

#### Demo images* courtesy of Unsplash, a radtastic collection of CC0 (public domain) images
you can use them for pretty much whatever.

(* = not included)

AJ
aj@lkn.io | @ajlkn


### Credits:

	Demo Images:
		Unsplash (unsplash.com)

	Icons:
		Font Awesome (fontawesome.io)

	Other:
		jQuery (jquery.com)
		Scrollex (github.com/ajlkn/jquery.scrollex)
		Responsive Tools (github.com/ajlkn/responsive-tools)

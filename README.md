API Routes:  
All API routes are avaible under /api/v1  
  
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


Template used:  
  
Hyperspace by HTML5 UP
html5up.net | @ajlkn
Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)


So I've had the wireframe for this particular design kicking around for some time, but with all
the other interesting (and in some cases, semi-secret) projects I've been working on it took me
a little while to get to actually designing and coding it. Fortunately, things have eased up
enough for me to finaly get around to it, so I'm happy to introduce Hyperspace: a fun, blocky,
one-page design with a lot of color, a bit of animation, and an additional "generic" page template
(because hey, even one-page sites usually need an interior page or two). Hope you dig it :)

Demo images* courtesy of Unsplash, a radtastic collection of CC0 (public domain) images
you can use for pretty much whatever.

(* = not included)

AJ
aj@lkn.io | @ajlkn


Credits:

	Demo Images:
		Unsplash (unsplash.com)

	Icons:
		Font Awesome (fontawesome.io)

	Other:
		jQuery (jquery.com)
		Scrollex (github.com/ajlkn/jquery.scrollex)
		Responsive Tools (github.com/ajlkn/responsive-tools)
# Image Masher!

Image compression tool using imagemin & gulp. Skip Photoshop altogether!

## Mash Instructions

0. `git clone https://github.com/zackcreach/image-masher.git`
1. `cd image-masher`
2. `npm install`
3. `npm run drag` (this creates an input folder and opens it for drag/drop)
4. Throw your images (jpeg, png, svg, gif) into the input folder
5. `npm start` to mash!


Enjoy your new, tiny, ready-to-upload image files!

Once uploaded/relocated, run `gulp clean-output` and/or `gulp clean-input` to remove working files respectively.


_Image quality/compression settings (heavily commented for clarity) can be found in gulp/tasks/compress.js_

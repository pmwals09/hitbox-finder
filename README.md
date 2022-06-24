# Hitbox Finder

A basic tool to load an image, highlight several box positions on that image, and output a JSON object describing the image and the boxes.
Hacked together in an afternoon to facilitate generating configuration objects for a work webapp that involves placing hotspots/hitboxes/touchpoints on top of an image.
Finding each point and keeping track of the math to place these in a responsive manner sounds like the worst, hopefully this helps.
Uses a canvas and vanilla JS.

Opportunities for future improvements:
- [ ] Provide the ability to edit/update a box once created
- [ ] Switch from clicking to dragging
- [ ] Provide the ability to configure several images at once

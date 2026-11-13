/*
  Photo list for the gallery.

  THIS FILE IS MADE AUTOMATICALLY from the photos in the images/ folders
  (see tools/build_gallery.py). To add a photo, just put it in the right
  folder - you do not need to edit this file.

  You can still change the "alt" text of a photo here (a short description
  for screen readers). It is kept the next time the list is rebuilt.
*/

const CATEGORIES = {
  gates: { name: { en: 'Gate doors', am: 'የግቢ በሮች' }, single: { en: 'Gate door', am: 'የግቢ በር' } },
  doors: { name: { en: 'Doors and windows', am: 'በሮች እና መስኮቶች' }, single: { en: 'Door and window', am: 'በር እና መስኮት' } },
  handrails: { name: { en: 'Handrails', am: 'የደረጃ እጀታዎች' }, single: { en: 'Handrail', am: 'የደረጃ እጀታ' } },
  custom: { name: { en: 'Tables and beds', am: 'ጠረጴዛ እና አልጋ' }, single: { en: 'Custom furniture', am: 'ልዩ የብረት ስራ' } }
};

const PHOTOS = [
  // ---- Gate doors  (folder: images/gates) ----
  { category: 'gates', file: 'images/gates/gate-01.jpg', w: 750, h: 562, alt: 'Black steel gate beside a white house' },
  { category: 'gates', file: 'images/gates/gate-02.jpg', w: 474, h: 474, alt: 'Dark gate with a cut-out pattern' },
  { category: 'gates', file: 'images/gates/gate-03.jpg', w: 735, h: 1307, alt: 'Tall double door with patterned panels' },
  { category: 'gates', file: 'images/gates/gate-04.jpg', w: 992, h: 1000, alt: 'Black gate with a geometric centre panel' },
  { category: 'gates', file: 'images/gates/gate-05.jpg', w: 948, h: 1280, alt: 'Double gate with gold trim and patterned panels' },
  { category: 'gates', file: 'images/gates/gate-06.jpg', w: 1184, h: 2560, alt: 'Small dark steel door' },
  { category: 'gates', file: 'images/gates/gate-07.jpg', w: 1184, h: 2560, alt: 'Small dark steel door with a decorative top' },
  { category: 'gates', file: 'images/gates/gate-08.jpg', w: 591, h: 1280, alt: 'Dark gate with a silver strip' },
  { category: 'gates', file: 'images/gates/gate-09.webp', w: 1500, h: 1500, alt: 'Grey ribbed gate with gold handles' },

  // ---- Doors and windows  (folder: images/door-windows) ----
  { category: 'doors', file: 'images/door-windows/door-window-01.jpg', w: 500, h: 281, alt: 'Window grills stacked outside the workshop' },
  { category: 'doors', file: 'images/door-windows/door-window-02.jpg', w: 1280, h: 720, alt: 'Entrance with steel doors and window grills' },

  // ---- Handrails  (folder: images/handrails) ----
  { category: 'handrails', file: 'images/handrails/handrail-01.jpg', w: 564, h: 846, alt: 'Black staircase railing with a wooden stair' },
  { category: 'handrails', file: 'images/handrails/handrail-02.jpg', w: 735, h: 543, alt: 'Black railing with rectangle pattern on a staircase' },
  { category: 'handrails', file: 'images/handrails/handrail-03.jpg', w: 1709, h: 2560, alt: 'Staircase railing with crossed bars' },
  { category: 'handrails', file: 'images/handrails/handrail-04.jpg', w: 759, h: 500, alt: 'Balcony railing with decorative bars' },
  { category: 'handrails', file: 'images/handrails/handrail-05.jpg', w: 474, h: 632, alt: 'Black handrail along a staircase' },
  { category: 'handrails', file: 'images/handrails/handrail-06.webp', w: 750, h: 750, alt: 'Curved bar railing on a wooden deck' },
  { category: 'handrails', file: 'images/handrails/handrail-07.jpg', w: 236, h: 314, alt: 'Steel handrails on outdoor steps' },
  { category: 'handrails', file: 'images/handrails/handrail-08.webp', w: 474, h: 343, alt: 'Black steel outdoor staircase' },

  // ---- Tables and beds  (folder: images/customs) ----
  { category: 'custom', file: 'images/customs/custom-01.jpg', w: 1280, h: 960, alt: 'Gold steel nest tables with patterned tops' },
  { category: 'custom', file: 'images/customs/custom-02.jpg', w: 1280, h: 960, alt: 'Close-up of a nest table top and gold frame' },
  { category: 'custom', file: 'images/customs/custom-03.jpg', w: 960, h: 1280, alt: 'Two round tables with gold frames' },
  { category: 'custom', file: 'images/customs/custom-04.jpg', w: 1280, h: 1007, alt: 'Set of three nest tables on a paved yard' },
];

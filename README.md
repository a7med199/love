# Ahmed & Menna — Our Little Story

Mobile-first romantic scrapbook website.

## Run
Open `index.html` in a browser, or use VS Code Live Server. No npm install required.

## Music
Your uploaded MP3 is included at `music/our-song.mp3`. It starts when the visitor taps **Open our story** (browsers block audible autoplay before user interaction in many cases). The top music control and the player toggle play/pause.

## Photos
The gallery upload button previews selected images for the current visit only. To publish permanent photos, put image files in a `photos` folder and replace each placeholder in `index.html` with an `<img src="photos/your-photo.jpg" alt="...">` inside `.photo-placeholder`.

## Customize
Edit the letter, timeline, captions and closing message in `index.html`. The start date is in `script.js` as `new Date(2026, 7, 25)` (months are zero-based).

## Assets (new)
- `assets/envelope.png` — burgundy envelope with gold wax seal (hero). Tapping it opens the story and starts the music.
- `assets/paper-top.png`, `paper-mid.png`, `paper-bottom.png` — the torn-paper letter, sliced so it stretches to fit the text.
- `assets/music-frame.png` — the music-player frame.

## Her photo in the music frame
Put her picture at `photos/menna.jpg` (square or portrait works best — it is cropped to fill). Until then the frame shows an "ADD HER PHOTO" placeholder; tapping it lets you preview a photo from your device.

## Counter
Live days / hours / mins / secs since 25 Aug 2026. Change `START_DATE` at the top of `script.js` to adjust.

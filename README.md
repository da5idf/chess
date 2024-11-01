# Custom Chess App with AI Bot

This chess app, built with create-react-app.

## Notes

### Why not use the DnD API?

I didn't use the DnD API because of limitations around what the 'drag image' looks like. In particular, I was not able to find a good solution for making the image appear with opacity 1 and directly under the client cursor. You can manipulate the drag image using the DataTranser.setDragImage method, but the image parameter must be visible. So trying to render a PNG with no data doesn't work. And passing in a 1px x 1px almost transparent image just feels like a hack that I didn't want to explore.

Aside from the design considerations above, it appears that Chess.com does not use the DnD API either. With that in mind, I thought it would be worth going that route as well.

### React.memo

Without the DnD API, I had to rely on Mouse positions for most of the UI behaviors: dragging a piece, highlighting the square you are hovering over etc. This requires a `window` `'mousemove'` event listener. We need this listener on the `window` because dragging a piece off it's parent component breaks the `onMouseEnd` event.

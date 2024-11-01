# Custom Chess App with AI Bot

This chess app, built with create-react-app.

## Notes

### Why not use the DnD API?

I didn't use the DnD API because of limitations around what the 'drag image' looks like. In particular, I was not able to find a good solution for making the image appear with opacity 1 and directly under the client cursor. You can manipulate the drag image using the DataTranser.setDragImage method, but the image parameter must be visible. So trying to render a PNG with no data doesn't work. And passing in a 1px x 1px almost transparent image just feels like a hack that I didn't want to explore.

Aside from the design considerations above, it appears that Chess.com does not use the DnD API either. With that in mind, I thought it would be worth going that route as well.

### React.memo

Without the DnD API, I had to rely on Mouse positions for most of the UI behaviors: dragging a piece, highlighting the square you are hovering over etc. This requires a `window` `'mousemove'` event listener. We need this listener on the `window` because dragging a piece off it's parent component breaks the `onMouseEnd` event.

### Pieces are absolute

I played with various options for how to create the dragged piece effect. My first pass included a `DraggedPiece` component, which subscribed to the `useMousePosition` hook. Whenver a piece was being dragged, I displayed this `DraggedPiece`, which was absolutely positioned, with `top` and `left` positions set to the x and y coordinates from the hook i.e. under the client cursor. I thought this might be a good approach to reduce state coupling between the dragged piece and the pieces themselves. But this had a few issues

- Visibility of the original piece

  If you don't use state/redux to track visibility of the original piece, you're left with regular DOM manipulation. So I had to manually disappear the original piece `onMouseDown` (in the `Piece` component) and reappear the piece `onMouseUp` (in the `DraggedPiece` component).

- Image rendering of the original piece

  There are two options here-- using `background-image` as a css property, or rendering an `img` inside a parent `div`. Using background image falls into the same trap as the visibility issue. If I'm not using state/redux to set this property, I have to use manual DOM manipulation again. This is also true for the child `img` but this runs into another issue related to the `user-select` css property. When dragging the `DraggedPiece` running your cursor over the "actual" pieces on the board would trigger the browser to highlight them. Setting `user-select = 'none'` fixes the issue, but isn't super clean.

- Caused a lot of issues with cursor css properties

  When dragging the piece, getting the correct cursor appearance -- grab / grabbing / default was pretty challenging. And again, I had to resort to manual DOM manipulation for this as well.

So all told, I was shooting myself in the foot by using this implementation and being forced to use a lot of direct DOM manipulation. In the end, I am using React, so this felt backwards.

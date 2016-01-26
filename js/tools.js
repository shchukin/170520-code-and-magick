'use strict';

var NOTIFICATION_FONT = 16;
var NOTIFICATION_LINE = 20;
var NOTIFICATION_FAMILY = 'PT Mono';
var NOTIFICATION_COLOR = '#000000';

var NOTIFICATION_WIDTH = 500;
var NOTIFICATION_HEIGHT = 200;
var NOTIFICATION_BACKGROUND = '#FFFFFF';

var SHADOW_SIZE = 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';


function drawBubble(ctx) {
  ctx.fillStyle = SHADOW_COLOR;
  ctx.fillRect(
    ( (ctx.canvas.width - NOTIFICATION_WIDTH) / 2 ) + SHADOW_SIZE,
    ( (ctx.canvas.height - NOTIFICATION_HEIGHT) / 2 ) + SHADOW_SIZE,
    NOTIFICATION_WIDTH,
    NOTIFICATION_HEIGHT
  );

  ctx.fillStyle = NOTIFICATION_BACKGROUND;
  ctx.fillRect(
    (ctx.canvas.width - NOTIFICATION_WIDTH) / 2,
    (ctx.canvas.height - NOTIFICATION_HEIGHT) / 2,
    NOTIFICATION_WIDTH,
    NOTIFICATION_HEIGHT
  );
}


function drawAlignedTextInContainer(ctx, containerX, containerY, containerWidth, containerHeight, content, lineHeight) {

  var lineQuantity = Math.min(content.length, Math.floor( containerHeight / lineHeight) );

  var textWidth = containerWidth;

  var textHeight = lineQuantity * lineHeight;

  var textX = containerX;

  var textY;

  if ( containerHeight - textHeight > 0 ) {                     // if container height is enough to fit all lines
    textY = containerY + (containerHeight - textHeight) / 2;
  } else {                                                        // else just start from top
    textY = containerY;
  }

  var textShift = lineHeight - Math.round(lineHeight / 4);      // shift text down to avoid http://prntscr.com/9u2qqn

  for ( var line = 0; (line < lineQuantity); line++ ) {
    ctx.fillText(content[line], textX + (textWidth / 2), textY + textShift + (line * lineHeight) );
  }

}


function drawNotification(ctx, message) {

  drawBubble(ctx);

  ctx.font = NOTIFICATION_FONT + 'px' + ' ' + NOTIFICATION_FAMILY;
  ctx.fillStyle = NOTIFICATION_COLOR;
  ctx.textAlign = 'center';

  if ( typeof (message) === 'number' ) {  // in case of number
    message = [message.toString()];
  }

  if ( typeof (message) === 'string' ) {  // in case of single string
    message = message.split('\n');
  }

  drawAlignedTextInContainer(
    ctx,
    (ctx.canvas.width - NOTIFICATION_WIDTH) / 2,
    (ctx.canvas.height - NOTIFICATION_HEIGHT) / 2,
    NOTIFICATION_WIDTH,
    NOTIFICATION_HEIGHT,
    message,
    NOTIFICATION_LINE
  );

}

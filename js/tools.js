'use strict';

function drawText(ctx, containerX, containerY, containerWidth, containerHeight, content) {

  var lineHeight = 20;
  var lineQuantity = Math.min(content.length, Math.floor( containerHeight / lineHeight) );

  var textWidth = containerWidth;

  var textHeight = lineQuantity * lineHeight;

  var textX = containerX;

  var textY;

  if( containerHeight - textHeight > 0 ) {                     // if container height is enough to fit all lines
    textY = containerY + (containerHeight - textHeight) / 2;
  }
  else {                                                       // else just start from top
    textY = containerY;
  }

  var textShift = lineHeight - Math.round(lineHeight/4);       // shift text down to avoid http://prntscr.com/9u2qqn

  for(var line = 0; (line < lineQuantity) && (1) ; line++) {
    ctx.fillText(content[line], textX + (textWidth/2), textY + textShift + (line * lineHeight) );
  }


}
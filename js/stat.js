'use strict';

var USER_NAME = 'Вы';
var HEADING_TEXT = ['Ура вы победили!', 'Список результатов:'];
var FONT = '16px PT Mono';
var TEXT_BASE_LINE = 'hanging';
var COLOR_TEXT = '#000';
var COLOR_BACKGROUND = '#fff';
var USER_COLOR = 'rgba(255, 0, 0, 1)';
var COLOR_SHADOW = 'rgba(0, 0, 0, 0.7)';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 50;
var BAR_WIDTH = 40;
var MARGIN_X = 150;
var MARGIN_Y = 90;
var MAX_BAR_HEIGHT = 150;
var MARGIN_TEXT = 10;
var MARGIN_TIME = 20;
var MARGIN_WINDOW_X = 100;
var MARGIN_WINDOW_Y = 10;
var STEP_INDENT = 10;
var HEADING_Y = 30;
var HEADING_MARGIN = 20;
var MIN_RGB_ALFA = 0.1;

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var random = function () {
  return MIN_RGB_ALFA + Math.random();
};

var headerDrawing = function (ctx, textList) {
  ctx.fillStyle = COLOR_TEXT;
  ctx.font = FONT;
  ctx.textBaseline = TEXT_BASE_LINE;
  for (var i = 0; i < textList.length; i++) {
    ctx.fillText(textList[i], MARGIN_X, HEADING_Y + HEADING_MARGIN * i);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, MARGIN_WINDOW_X + STEP_INDENT, MARGIN_WINDOW_Y + STEP_INDENT, COLOR_SHADOW);
  renderCloud(ctx, MARGIN_WINDOW_X, MARGIN_WINDOW_Y, COLOR_BACKGROUND);
  headerDrawing(ctx, HEADING_TEXT);

  for (var i = 0; i < names.length; i++) {
    var saturation = random();
    var barX = MARGIN_X + (BAR_WIDTH + GAP) * i;
    var barColor = USER_NAME === names[i] ? USER_COLOR : 'rgba(0, 0, 255, ' + saturation + ')';
    var maxTime = getMaxElement(times);
    var barHeight = (MAX_BAR_HEIGHT * times[i]) / maxTime;
    var barY = MAX_BAR_HEIGHT - barHeight + MARGIN_Y;
    ctx.fillStyle = barColor;
    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
    ctx.fillStyle = COLOR_TEXT;
    ctx.fillText(names[i], barX, MARGIN_Y + MAX_BAR_HEIGHT + MARGIN_TEXT);

    ctx.fillText(Math.floor(times[i]), barX, barY - MARGIN_TIME);
  }
};

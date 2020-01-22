'use strict';

var USER_NAME = 'Вы';
var FONT = '16px PT Mono';
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

var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, MARGIN_WINDOW_X + STEP_INDENT, MARGIN_WINDOW_Y + STEP_INDENT, COLOR_SHADOW);
  renderCloud(ctx, MARGIN_WINDOW_X, MARGIN_WINDOW_Y, COLOR_BACKGROUND);

  ctx.fillStyle = COLOR_TEXT;
  ctx.font = FONT;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', MARGIN_X, MARGIN_WINDOW_Y + MARGIN_TIME);
  ctx.fillText('Список результатов:', MARGIN_X, MARGIN_WINDOW_Y + BAR_WIDTH);

  for (var i = 0; i < names.length; i++) {
    var saturation = randomInteger(0, 100);
    var barX = MARGIN_X + (BAR_WIDTH + GAP) * i;
    var barColor = USER_NAME === names[i] ? USER_COLOR : 'hsl(244, ' + saturation + '%, 31%)';
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

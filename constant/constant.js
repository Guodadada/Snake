/**
 * constant
 */

// 控制区高度
const CONTROL_HEIGHT = 170;
// 屏幕宽度/高度
const SCREEN_WIDTH = wx.getSystemInfoSync().windowWidth;
const SCREEN_HEIGHT = wx.getSystemInfoSync().windowHeight;
// 格子列数
const BOX_COLUMNS = 10;
// 格子宽度
const BOX_WIDTH = SCREEN_WIDTH / BOX_COLUMNS;
// 行数
const BOX_ROWS = Math.floor((SCREEN_HEIGHT - CONTROL_HEIGHT) / BOX_WIDTH);

// 画布的高度
const CTX_HEIGHT = BOX_WIDTH * BOX_ROWS;


// 初始化蛇的长度
const SNAKE_LENGHT = 4;

// 移动方向
const DirectionUp = 'up';
const DirectionDown = 'down';
const DirectionLeft = 'left';
const DirectionRight = 'right';

// 类型
const BlockTypeEmpty = -1;
const BlockTypeDefault = 0;
const BlockTypeSnake = 1;
const BlockTypeFood = 2;
const BlockTypeStone = 3;

module.exports = {
  CONTROL_HEIGHT,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  BOX_COLUMNS,
  BOX_ROWS,
  BOX_WIDTH,
  SNAKE_LENGHT,
  DirectionUp,
  DirectionDown,
  DirectionLeft,
  DirectionRight,
  BlockTypeEmpty,
  BlockTypeDefault,
  BlockTypeSnake,
  BlockTypeFood,
  BlockTypeStone,
  CTX_HEIGHT
}
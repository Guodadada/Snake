const {
  BOX_WIDTH,
  BOX_ROWS,
  BOX_COLUMNS,
  SNAKE_LENGHT,
  CTX_HEIGHT
} = require('../../constant/constant.js');
const {
  DirectionUp,
  DirectionDown,
  DirectionLeft,
  DirectionRight,
  DirectionNon
} = require('../../constant/constant.js');

const {
  BlockTypeEmpty,
  BlockTypeDefault,
  BlockTypeSnake,
  BlockTypeFood,
  BlockTypeStone
} = require('../../constant/constant.js');

const {
  point
} = require('../../model/point.js');
const maskBlock = '../../source/images/maskBlock.png';
const greenBlock = '../../source/images/greenBlock.png';
const grayBlock = '../../source/images/grayBlock.png';
// 蛇画布
const ctxSnake = wx.createCanvasContext('snakeCanvas');
// 地图画布
const ctxMap = wx.createCanvasContext('snakeMap');
// 蛇
let snake = [];
// 蛇头初始参数
let snakeHead = {
  x: Math.floor(Math.random() * BOX_COLUMNS),
  y: 0,
};
// 方向
let Direction = DirectionDown;

// 游戏状态
let gameStatus = 0; // 0初始/1进行中/2失败

//   减慢动画
let perform = 0;
// 蛇移动的速度, 越大越慢
var speedLevel = 40;

Page({
  data: {
    ctxHeight: CTX_HEIGHT + 'px'
  },

  onReady: function() {
    // 初始化游戏
    this.initGame();
    // 游戏
    this.beginGame();

    console.log('---->', CTX_HEIGHT);
  },

  beginGame() {
    const self = this;
    function beginDraw() {
      if (++perform % speedLevel === 0) {
        // 判断移动
        let p0 = snake[0];
        let aimP = point.create(p0.x, p0.y);
        self.moveSnake(aimP);
        // 判断下一步方块的类型
        const pointType = self.poinType(aimP);
        if (pointType === BlockTypeEmpty) {
          return;
        };
        // 修改 snake
        self.changeSnakes(aimP);
      }
      // 画蛇
      self.drawSnake();

      // 循环执行动画绘制
      requestAnimationFrame(beginDraw);
    }
    beginDraw();
  },

  initGame() {
    // 地图
    this.drawMap();
    // 初始化蛇
    this.initSnake();
  },

  // 判断下一步 point 类型
  poinType(point) {
    if (point.y >= 0 && point.y < BOX_ROWS) {
      if (point.x >= 0 && point.x < BOX_COLUMNS) {
        // todo 更细节的区分类型
        return BlockTypeDefault;
      }
    }
    return BlockTypeEmpty;
  },

  // 移动
  moveSnake(aimP) {
    switch (Direction) {
      case DirectionLeft:
        aimP.x--;
        break;
      case DirectionRight:
        aimP.x++;
        break;
      case DirectionUp:
        aimP.y--;
        break;
      case DirectionDown:
        aimP.y++;
        break;
      default:
        console.error('未知方向');
    }
    return aimP;
  },

  // 修改 snake
  changeSnakes(aimP) {
    for (let i = SNAKE_LENGHT - 1; i >= 0; i--) {
      let lastP;
      if (i === 0) {
        lastP = aimP;
      } else {
        lastP = snake[i - 1];
      }
      console.log(lastP);
      snake[i].x = lastP.x;
      snake[i].y = lastP.y;
    }
  },

  // 画蛇
  drawSnake() {
    for (let i = 0; i < snake.length; i++) {
      let block = snake[i];
      ctxSnake.drawImage(i === 0 ? greenBlock : grayBlock,
        block.x * BOX_WIDTH, block.y * BOX_WIDTH, BOX_WIDTH, BOX_WIDTH);
    }
    ctxSnake.draw();
  },

  // 初始化蛇的数组
  initSnake() {
    let p = point.create(Math.floor(Math.random() * BOX_COLUMNS), 0);
    snake.push(p);
    for (let i = 0; i < SNAKE_LENGHT; i++) {
      let ap = point.create(p.x, p.y - 1);
      snake.push(ap);
      p = ap;
    }
  },

  // 绘制背景
  drawMap() {
    for (let i = 0; i < BOX_ROWS; i++) {
      for (let j = 0; j < BOX_COLUMNS; j++) {
        ctxMap.drawImage(maskBlock, j * BOX_WIDTH, i * BOX_WIDTH, BOX_WIDTH, BOX_WIDTH);
      }
    }
    ctxMap.draw()
  }
})
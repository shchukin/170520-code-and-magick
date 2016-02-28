/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(5);
	__webpack_require__(6);

	__webpack_require__(7);
	__webpack_require__(9);


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	  ctx.textBaseline = 'top';
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

	  for ( var line = 0; line < lineQuantity; line++ ) {
	    ctx.fillText(content[line], textX + (textWidth / 2), textY + (line * lineHeight) );
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

	var cloudsElement = document.querySelector('.header-clouds');
	var demoElement = document.querySelector('.demo');

	var cloudsHeight = cloudsElement.getBoundingClientRect().height;
	var demoHeight = demoElement.getBoundingClientRect().height;

	var cloudsMovementTimeout;

	cloudsElement.style.backgroundPosition = cloudsElement.getBoundingClientRect().top + 'px center';

	window.addEventListener('scroll', function() {
	  clearTimeout(cloudsMovementTimeout);
	  cloudsMovementTimeout = setTimeout(function() {

	    if (demoElement.getBoundingClientRect().top + demoHeight < 0) {
	      game.setGameStatus(window.Game.Verdict.PAUSE);
	    } else {
	      game.setGameStatus(window.Game.Verdict.CONTINUE);
	    }

	  }, 100);

	  if ( Math.abs( cloudsElement.getBoundingClientRect().top ) < cloudsHeight ) {
	    cloudsElement.style.backgroundPosition = cloudsElement.getBoundingClientRect().top + 'px center';
	  }

	});


	/**
	 * @const
	 * @type {number}
	 */
	var HEIGHT = 300;

	/**
	 * @const
	 * @type {number}
	 */
	var WIDTH = 700;

	/**
	 * ID уровней.
	 * @enum {number}
	 */
	var Level = {
	  'INTRO': 0,
	  'MOVE_LEFT': 1,
	  'MOVE_RIGHT': 2,
	  'LEVITATE': 3,
	  'HIT_THE_MARK': 4
	};

	/**
	 * Порядок прохождения уровней.
	 * @type {Array.<Level>}
	 */
	var LevelSequence = [
	  Level.INTRO
	];

	/**
	 * Начальный уровень.
	 * @type {Level}
	 */
	var INITIAL_LEVEL = LevelSequence[0];

	/**
	 * Допустимые виды объектов на карте.
	 * @enum {number}
	 */
	var ObjectType = {
	  'ME': 0,
	  'FIREBALL': 1
	};

	/**
	 * Допустимые состояния объектов.
	 * @enum {number}
	 */
	var ObjectState = {
	  'OK': 0,
	  'DISPOSED': 1
	};

	/**
	 * Коды направлений.
	 * @enum {number}
	 */
	var Direction = {
	  NULL: 0,
	  LEFT: 1,
	  RIGHT: 2,
	  UP: 4,
	  DOWN: 8
	};

	/**
	 * Правила перерисовки объектов в зависимости от состояния игры.
	 * @type {Object.<ObjectType, function(Object, Object, number): Object>}
	 */
	var ObjectsBehaviour = {};

	/**
	 * Обновление движения мага. Движение мага зависит от нажатых в данный момент
	 * стрелок. Маг может двигаться одновременно по горизонтали и по вертикали.
	 * На движение мага влияет его пересечение с препятствиями.
	 * @param {Object} object
	 * @param {Object} state
	 * @param {number} timeframe
	 */
	ObjectsBehaviour[ObjectType.ME] = function(object, state, timeframe) {
	  // Пока зажата стрелка вверх, маг сначала поднимается, а потом левитирует
	  // в воздухе на определенной высоте.
	  // NB! Сложность заключается в том, что поведение описано в координатах
	  // канваса, а не координатах, относительно нижней границы игры.
	  if (state.keysPressed.UP && object.y > 0) {
	    object.direction = object.direction & ~Direction.DOWN;
	    object.direction = object.direction | Direction.UP;
	    object.y -= object.speed * timeframe * 2;

	    if (object.y < 0) {
	      object.y = 0;
	    }
	  }

	  // Если стрелка вверх не зажата, а маг находится в воздухе, он плавно
	  // опускается на землю.
	  if (!state.keysPressed.UP) {
	    if (object.y < HEIGHT - object.height) {
	      object.direction = object.direction & ~Direction.UP;
	      object.direction = object.direction | Direction.DOWN;
	      object.y += object.speed * timeframe / 3;
	    } else {
	      object.Direction = object.direction & ~Direction.DOWN;
	    }
	  }

	  // Если зажата стрелка влево, маг перемещается влево.
	  if (state.keysPressed.LEFT) {
	    object.direction = object.direction & ~Direction.RIGHT;
	    object.direction = object.direction | Direction.LEFT;
	    object.x -= object.speed * timeframe;
	  }

	  // Если зажата стрелка вправо, маг перемещается вправо.
	  if (state.keysPressed.RIGHT) {
	    object.direction = object.direction & ~Direction.LEFT;
	    object.direction = object.direction | Direction.RIGHT;
	    object.x += object.speed * timeframe;
	  }

	  // Ограничения по перемещению по полю. Маг не может выйти за пределы поля.
	  if (object.y < 0) {
	    object.y = 0;
	    object.Direction = object.direction & ~Direction.DOWN;
	    object.Direction = object.direction & ~Direction.UP;
	  }

	  if (object.y > HEIGHT - object.height) {
	    object.y = HEIGHT - object.height;
	    object.Direction = object.direction & ~Direction.DOWN;
	    object.Direction = object.direction & ~Direction.UP;
	  }

	  if (object.x < 0) {
	    object.x = 0;
	  }

	  if (object.x > WIDTH - object.width) {
	    object.x = WIDTH - object.width;
	  }
	};

	/**
	 * Обновление движения файрбола. Файрбол выпускается в определенном направлении
	 * и после этого неуправляемо движется по прямой в заданном направлении. Если
	 * он пролетает весь экран насквозь, он исчезает.
	 * @param {Object} object
	 * @param {Object} state
	 * @param {number} timeframe
	 */
	ObjectsBehaviour[ObjectType.FIREBALL] = function(object, state, timeframe) {
	  if (object.direction & Direction.LEFT) {
	    object.x -= object.speed * timeframe;
	  }

	  if (object.direction & Direction.RIGHT) {
	    object.x += object.speed * timeframe;
	  }

	  if (object.x < 0 || object.x > WIDTH) {
	    object.state = ObjectState.DISPOSED;
	  }
	};

	/**
	 * ID возможных ответов функций, проверяющих успех прохождения уровня.
	 * CONTINUE говорит о том, что раунд не закончен и игру нужно продолжать,
	 * WIN о том, что раунд выигран, FAIL — о поражении. PAUSE о том, что игру
	 * нужно прервать.
	 * @enum {number}
	 */
	var Verdict = {
	  'CONTINUE': 0,
	  'WIN': 1,
	  'FAIL': 2,
	  'PAUSE': 3,
	  'INTRO': 4
	};

	/**
	 * Правила завершения уровня. Ключами служат ID уровней, значениями функции
	 * принимающие на вход состояние уровня и возвращающие true, если раунд
	 * можно завершать или false если нет.
	 * @type {Object.<Level, function(Object):boolean>}
	 */
	var LevelsRules = {};

	/**
	 * Уровень считается пройденным, если был выпущен файлболл и он улетел
	 * за экран.
	 * @param {Object} state
	 * @return {Verdict}
	 */
	LevelsRules[Level.INTRO] = function(state) {
	  var fireballs = state.garbage.filter(function(object) {
	    return object.type === ObjectType.FIREBALL;
	  });

	  return fireballs.length ? Verdict.WIN : Verdict.CONTINUE;
	};

	/**
	 * Начальные условия для уровней.
	 * @enum {Object.<Level, function>}
	 */
	var LevelsInitialize = {};

	/**
	 * Первый уровень.
	 * @param {Object} state
	 * @return {Object}
	 */
	LevelsInitialize[Level.INTRO] = function(state) {
	  state.objects.push(
	    // Установка персонажа в начальное положение. Он стоит в крайнем левом
	    // углу экрана, глядя вправо. Скорость перемещения персонажа на этом
	    // уровне равна 2px за кадр.
	    {
	      direction: Direction.RIGHT,
	      height: 84,
	      speed: 2,
	      sprite: 'img/wizard.gif',
	      spriteReversed: 'img/wizard-reversed.gif',
	      state: ObjectState.OK,
	      type: ObjectType.ME,
	      width: 61,
	      x: WIDTH / 3,
	      y: HEIGHT - 100
	    }
	  );

	  return state;
	};

	/**
	 * Конструктор объекта Game. Создает canvas, добавляет обработчики событий
	 * и показывает приветственный экран.
	 * @param {Element} container
	 * @constructor
	 */
	var Game = function(container) {
	  this.container = container;
	  this.canvas = document.createElement('canvas');
	  this.canvas.width = container.clientWidth;
	  this.canvas.height = container.clientHeight;
	  this.container.appendChild(this.canvas);

	  this.ctx = this.canvas.getContext('2d');

	  this._onKeyDown = this._onKeyDown.bind(this);
	  this._onKeyUp = this._onKeyUp.bind(this);
	  this._pauseListener = this._pauseListener.bind(this);
	};

	Game.prototype = {
	  /**
	   * Текущий уровень игры.
	   * @type {Level}
	   */
	  level: INITIAL_LEVEL,

	  /**
	   * Состояние игры. Описывает местоположение всех объектов на игровой карте
	   * и время проведенное на уровне и в игре.
	   * @return {Object}
	   */
	  getInitialState: function() {
	    return {
	      // Статус игры. Если CONTINUE, то игра продолжается.
	      currentStatus: Verdict.CONTINUE,

	      // Объекты, удаленные на последнем кадре.
	      garbage: [],

	      // Время с момента отрисовки предыдущего кадра.
	      lastUpdated: null,

	      // Состояние нажатых клавиш.
	      keysPressed: {
	        ESC: false,
	        LEFT: false,
	        RIGHT: false,
	        SPACE: false,
	        UP: false
	      },

	      // Время начала прохождения уровня.
	      levelStartTime: null,

	      // Все объекты на карте.
	      objects: [],

	      // Время начала прохождения игры.
	      startTime: null
	    };
	  },

	  /**
	   * Начальные проверки и запуск текущего уровня.
	   * @param {Level=} level
	   * @param {boolean=} restart
	   */
	  initializeLevelAndStart: function(level, restart) {
	    level = typeof level === 'undefined' ? this.level : level;
	    restart = typeof restart === 'undefined' ? true : restart;

	    if (restart || !this.state) {
	      // При перезапуске уровня, происходит полная перезапись состояния
	      // игры из изначального состояния.
	      this.state = this.getInitialState();
	      this.state = LevelsInitialize[this.level](this.state);
	    } else {
	      // При продолжении уровня состояние сохраняется, кроме записи о том,
	      // что состояние уровня изменилось с паузы на продолжение игры.
	      this.state.currentStatus = Verdict.CONTINUE;
	    }

	    // Запись времени начала игры и времени начала уровня.
	    this.state.levelStartTime = Date.now();
	    if (!this.state.startTime) {
	      this.state.startTime = this.state.levelStartTime;
	    }

	    this._preloadImagesForLevel(function() {
	      // Предварительная отрисовка игрового экрана.
	      this.render();

	      // Установка обработчиков событий.
	      this._initializeGameListeners();

	      // Запуск игрового цикла.
	      this.update();
	    }.bind(this));
	  },

	  /**
	   * Временная остановка игры.
	   * @param {Verdict=} verdict
	   */
	  pauseLevel: function(verdict) {
	    if (verdict) {
	      this.state.currentStatus = verdict;
	    }

	    this.state.keysPressed.ESC = false;
	    this.state.lastUpdated = null;

	    this._removeGameListeners();
	    window.addEventListener('keydown', this._pauseListener);

	    this._drawPauseScreen();
	  },

	  /**
	   * Обработчик событий клавиатуры во время паузы.
	   * @param {KeyboardsEvent} evt
	   * @private
	   * @private
	   */
	  _pauseListener: function(evt) {
	    if (evt.keyCode === 32) {
	      evt.preventDefault();
	      var needToRestartTheGame = this.state.currentStatus === Verdict.WIN ||
	          this.state.currentStatus === Verdict.FAIL;
	      this.initializeLevelAndStart(this.level, needToRestartTheGame);

	      window.removeEventListener('keydown', this._pauseListener);
	    }
	  },

	  /**
	   * Отрисовка экрана паузы.
	   */
	  _drawPauseScreen: function() {
	    switch (this.state.currentStatus) {
	      case Verdict.WIN:
	        drawNotification(this.ctx, 'You are victorious!\n[Space] to start again');
	        break;
	      case Verdict.FAIL:
	        drawNotification(this.ctx, 'You are loser!\n[Space] to try again');
	        break;
	      case Verdict.PAUSE:
	        drawNotification(this.ctx, 'Game paused!\n[Space] to continue');
	        break;
	      case Verdict.INTRO:
	        drawNotification(this.ctx, 'Welcome!\n[Space] to start');
	        break;
	    }
	  },

	  /**
	   * Предзагрузка необходимых изображений для уровня.
	   * @param {function} callback
	   * @private
	   */
	  _preloadImagesForLevel: function(callback) {
	    if (typeof this._imagesArePreloaded === 'undefined') {
	      this._imagesArePreloaded = [];
	    }

	    if (this._imagesArePreloaded[this.level]) {
	      callback();
	      return;
	    }

	    var levelImages = [];
	    this.state.objects.forEach(function(object) {
	      levelImages.push(object.sprite);

	      if (object.spriteReversed) {
	        levelImages.push(object.spriteReversed);
	      }
	    });

	    var i = levelImages.length;
	    var imagesToGo = levelImages.length;

	    while (i-- > 0) {
	      var image = new Image();
	      image.src = levelImages[i];
	      image.onload = function() {
	        if (--imagesToGo === 0) {
	          this._imagesArePreloaded[this.level] = true;
	          callback();
	        }
	      }.bind(this);
	    }
	  },

	  /**
	   * Обновление статуса объектов на экране. Добавляет объекты, которые должны
	   * появиться, выполняет проверку поведения всех объектов и удаляет те, которые
	   * должны исчезнуть.
	   * @param {number} delta Время, прошеднее с отрисовки прошлого кадра.
	   */
	  updateObjects: function(delta) {
	    // Персонаж.
	    var me = this.state.objects.filter(function(object) {
	      return object.type === ObjectType.ME;
	    })[0];

	    // Добавляет на карту файрбол по нажатию на Shift.
	    if (this.state.keysPressed.SHIFT) {
	      this.state.objects.push({
	        direction: me.direction,
	        height: 24,
	        speed: 5,
	        sprite: 'img/fireball.gif',
	        type: ObjectType.FIREBALL,
	        width: 24,
	        x: me.direction & Direction.RIGHT ? me.x + me.width : me.x - 24,
	        y: me.y + me.height / 2
	      });

	      this.state.keysPressed.SHIFT = false;
	    }

	    this.state.garbage = [];

	    // Убирает в garbage не используемые на карте объекты.
	    var remainingObjects = this.state.objects.filter(function(object) {
	      ObjectsBehaviour[object.type](object, this.state, delta);

	      if (object.state === ObjectState.DISPOSED) {
	        this.state.garbage.push(object);
	        return false;
	      }

	      return true;
	    }, this);

	    this.state.objects = remainingObjects;
	  },

	  /**
	   * Проверка статуса текущего уровня.
	   */
	  checkStatus: function() {
	    // Нет нужны запускать проверку, нужно ли останавливать уровень, если
	    // заранее известно, что да.
	    if (this.state.currentStatus !== Verdict.CONTINUE) {
	      return;
	    }

	    if (!this.commonRules) {
	      /**
	       * Проверки, не зависящие от уровня, но влияющие на его состояние.
	       * @type {Array.<functions(Object):Verdict>}
	       */
	      this.commonRules = [
	        /**
	         * Если персонаж мертв, игра прекращается.
	         * @param {Object} state
	         * @return {Verdict}
	         */
	        function checkDeath(state) {
	          var me = state.objects.filter(function(object) {
	            return object.type === ObjectType.ME;
	          })[0];

	          return me.state === ObjectState.DISPOSED ?
	              Verdict.FAIL :
	              Verdict.CONTINUE;
	        },

	        /**
	         * Если нажата клавиша Esc игра ставится на паузу.
	         * @param {Object} state
	         * @return {Verdict}
	         */
	        function checkKeys(state) {
	          return state.keysPressed.ESC ? Verdict.PAUSE : Verdict.CONTINUE;
	        },

	        /**
	         * Игра прекращается если игрок продолжает играть в нее два часа подряд.
	         * @param {Object} state
	         * @return {Verdict}
	         */
	        function checkTime(state) {
	          return Date.now() - state.startTime > 3 * 60 * 1000 ?
	              Verdict.FAIL :
	              Verdict.CONTINUE;
	        }
	      ];
	    }

	    // Проверка всех правил влияющих на уровень. Запускаем цикл проверок
	    // по всем универсальным проверкам и проверкам конкретного уровня.
	    // Цикл продолжается до тех пор, пока какая-либо из проверок не вернет
	    // любое другое состояние кроме CONTINUE или пока не пройдут все
	    // проверки. После этого состояние сохраняется.
	    var allChecks = this.commonRules.concat(LevelsRules[this.level]);
	    var currentCheck = Verdict.CONTINUE;
	    var currentRule;

	    while (currentCheck === Verdict.CONTINUE && allChecks.length) {
	      currentRule = allChecks.shift();
	      currentCheck = currentRule(this.state);
	    }

	    this.state.currentStatus = currentCheck;
	  },

	  /**
	   * Принудительная установка состояния игры. Используется для изменения
	   * состояния игры от внешних условий, например, когда необходимо остановить
	   * игру, если она находится вне области видимости и установить вводный
	   * экран.
	   * @param {Verdict} status
	   */
	  setGameStatus: function(status) {
	    if (this.state.currentStatus !== status) {
	      this.state.currentStatus = status;
	    }
	  },

	  /**
	   * Отрисовка всех объектов на экране.
	   */
	  render: function() {
	    // Удаление всех отрисованных на странице элементов.
	    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);

	    // Выставление всех элементов, оставшихся в this.state.objects согласно
	    // их координатам и направлению.
	    this.state.objects.forEach(function(object) {
	      if (object.sprite) {
	        var image = new Image(object.width, object.height);
	        image.src = (object.spriteReversed && object.direction & Direction.LEFT) ?
	            object.spriteReversed :
	            object.sprite;
	        this.ctx.drawImage(image, object.x, object.y, object.width, object.height);
	      }
	    }, this);
	  },

	  /**
	   * Основной игровой цикл. Сначала проверяет состояние всех объектов игры
	   * и обновляет их согласно правилам их поведения, а затем запускает
	   * проверку текущего раунда. Рекурсивно продолжается до тех пор, пока
	   * проверка не вернет состояние FAIL, WIN или PAUSE.
	   */
	  update: function() {
	    if (!this.state.lastUpdated) {
	      this.state.lastUpdated = Date.now();
	    }

	    var delta = (Date.now() - this.state.lastUpdated) / 10;
	    this.updateObjects(delta);
	    this.checkStatus();

	    switch (this.state.currentStatus) {
	      case Verdict.CONTINUE:
	        this.state.lastUpdated = Date.now();
	        this.render();
	        requestAnimationFrame(function() {
	          this.update();
	        }.bind(this));
	        break;

	      case Verdict.WIN:
	      case Verdict.FAIL:
	      case Verdict.PAUSE:
	      case Verdict.INTRO:
	      default:
	        this.pauseLevel();
	        break;
	    }
	  },

	  /**
	   * @param {KeyboardEvent} evt [description]
	   * @private
	   */
	  _onKeyDown: function(evt) {
	    switch (evt.keyCode) {
	      case 37:
	        this.state.keysPressed.LEFT = true;
	        break;
	      case 39:
	        this.state.keysPressed.RIGHT = true;
	        break;
	      case 38:
	        this.state.keysPressed.UP = true;
	        break;
	      case 27:
	        this.state.keysPressed.ESC = true;
	        break;
	    }

	    if (evt.shiftKey) {
	      this.state.keysPressed.SHIFT = true;
	    }
	  },

	  /**
	   * @param {KeyboardEvent} evt [description]
	   * @private
	   */
	  _onKeyUp: function(evt) {
	    switch (evt.keyCode) {
	      case 37:
	        this.state.keysPressed.LEFT = false;
	        break;
	      case 39:
	        this.state.keysPressed.RIGHT = false;
	        break;
	      case 38:
	        this.state.keysPressed.UP = false;
	        break;
	      case 27:
	        this.state.keysPressed.ESC = false;
	        break;
	    }

	    if (evt.shiftKey) {
	      this.state.keysPressed.SHIFT = false;
	    }
	  },

	  /** @private */
	  _initializeGameListeners: function() {
	    window.addEventListener('keydown', this._onKeyDown);
	    window.addEventListener('keyup', this._onKeyUp);
	  },

	  /** @private */
	  _removeGameListeners: function() {
	    window.removeEventListener('keydown', this._onKeyDown);
	    window.removeEventListener('keyup', this._onKeyUp);
	  }
	};

	window.Game = Game;
	window.Game.Verdict = Verdict;

	var game = new Game(document.querySelector('.demo'));
	game.initializeLevelAndStart();
	game.setGameStatus(window.Game.Verdict.INTRO);


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';


	var formContainer = document.querySelector('.overlay-container');
	var formOpenButton = document.querySelector('.reviews-controls-new');
	var formCloseButton = document.querySelector('.review-form-close');

	formOpenButton.onclick = function(evt) {
	  evt.preventDefault();
	  formContainer.classList.remove('invisible');
	};

	formCloseButton.onclick = function(evt) {
	  evt.preventDefault();
	  formContainer.classList.add('invisible');
	};




	var LOWEST_POSITIVE_GRADE = 3;

	/* Form elements */
	var formElement = document.querySelector('.review-form');
	var nameElement = formElement.querySelector('#review-name');
	var textElement = formElement.querySelector('#review-text');
	var markElements = formElement.querySelectorAll('[name="review-mark"]');
	var submitElement = formElement.querySelector('.review-submit');

	/* Form notification labels elements */
	var nameNotifyElement = formElement.querySelector('.review-fields-name');
	var textNotifyElement = formElement.querySelector('.review-fields-text');
	var notifyContainerElement = formElement.querySelector('.review-fields');

	/* Form state */
	var markPositive;
	var nameValidity;
	var textValidity;

	/* Helpers */
	var i;


	function changeMarkPositive() {
	  markPositive = formElement.querySelector('[name="review-mark"]:checked').value >= LOWEST_POSITIVE_GRADE;
	}

	function validateName() {
	  nameValidity = !!nameElement.value;
	}

	function validateText() {
	  textValidity = markPositive || textElement.value;
	}

	function setValidationHelpers() {

	  if ( nameValidity ) {
	    nameNotifyElement.style.display = 'none';
	  } else {
	    nameNotifyElement.style.display = 'inline';
	  }

	  if ( textValidity ) {
	    textNotifyElement.style.display = 'none';
	  } else {
	    textNotifyElement.style.display = 'inline';
	  }

	  if ( nameValidity && textValidity ) {
	    notifyContainerElement.style.display = 'none';
	    submitElement.disabled = false;
	  } else {
	    notifyContainerElement.style.display = 'inline-block';
	    submitElement.disabled = true;
	  }

	}

	changeMarkPositive();
	validateName();
	validateText();
	setValidationHelpers();

	nameElement.oninput = function() {
	  validateName();
	  setValidationHelpers();
	};
	textElement.oninput = function() {
	  validateText();
	  setValidationHelpers();
	};

	function onMarkChange() {
	  changeMarkPositive();
	  validateText();
	  setValidationHelpers();
	}

	for (i = 0; i < markElements.length; i++ ) {
	  markElements[i].onchange = onMarkChange;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var docCookies = __webpack_require__(4);


	var BIRTH_MONTH = 10;
	var BIRTH_DAY = 27;

	var formElement = document.querySelector('.review-form');
	var nameElement = formElement.querySelector('#review-name');
	var markElements = formElement.querySelectorAll('[name="review-mark"]');

	var markCookie = docCookies.getItem('mark');
	var nameCookie = docCookies.getItem('name');


	/* Get cookies */

	if ( markCookie ) {
	  for ( var i = 0; i < markElements.length; i++ ) {
	    markElements[i].checked = (i + 1 === +markCookie);
	  }
	}

	if ( nameCookie ) {
	  nameElement.value = nameCookie;
	}


	/* Set cookies */

	formElement.onsubmit = function(event) {
	  event.preventDefault();

	  var currentYear = new Date().getFullYear();
	  var birthdayThisYear = new Date(currentYear, BIRTH_MONTH - 1, BIRTH_DAY).getTime();
	  var currentDate = Date.now();

	  var cookiesExpire = currentDate > birthdayThisYear ? currentDate - birthdayThisYear : currentDate - birthdayThisYear + (1000 * 60 * 60 * 24 * 365);

	  markCookie = formElement.querySelector('[name="review-mark"]:checked').value;
	  nameCookie = formElement.querySelector('#review-name').value;

	  docCookies.setItem('mark', markCookie, cookiesExpire);
	  docCookies.setItem('name', nameCookie, cookiesExpire);

	  formElement.submit();
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * @fileoverview Библиотека для удобной работы с cookie.
	 */

	var docCookies = {
	  /**
	   * Возвращает значение cookie с переданным ключом sKey.
	   * @param {string} sKey
	   * @return {string}
	   */
	  getItem: function (sKey) {
	    if (!sKey) { return null; }
	    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	  },

	  /**
	   * Устанавливает cookie с названием sKey и значением sValue. Остальные параметры
	   * необязательны и используются для более точного задания параметров cookie:
	   * срок жизни cookie, домен и путь. bSecure указывает что cookie можно передавать
	   * только по безопасному соединению.
	   * @param {string} sKey
	   * @param {string} sValue
	   * @param {number|Date|string=} vEnd Срок жизни cookie. Может передаваться
	   *     как дата, строка или число.
	   * @param {string=} sPath
	   * @param {string=} sDomain
	   * @param {boolean=} bSecure
	   */
	  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
	    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
	    var sExpires = "";
	    if (vEnd) {
	      switch (vEnd.constructor) {
	        case Number:
	          sExpires = !isFinite(vEnd) ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + (vEnd / 1000);
	          break;
	        case String:
	          sExpires = "; expires=" + vEnd;
	          break;
	        case Date:
	          sExpires = "; expires=" + vEnd.toUTCString();
	          break;
	      }
	    }
	    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
	    return true;
	  },

	  /**
	   * Удаляет cookie по переданному ключу. sPath и sDomain необязательные параметры.
	   * @param {string} sKey
	   * @param {string} sPath
	   * @param {string} sDomain
	   * @return {boolean} Ключ, успешно ли произошло удаление. Равен false, если cookie
	   *     с таким названием нет.
	   */
	  removeItem: function (sKey, sPath, sDomain) {
	    if (!this.hasItem(sKey)) { return false; }
	    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
	    return true;
	  },

	  /**
	   * Проверяет, действительно ли существует cookie с переданным названием.
	   * @param {string} sKey
	   * @return {boolean}
	   */
	  hasItem: function (sKey) {
	    if (!sKey) { return false; }
	    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	  },

	  /**
	   * Возвращает все ключи, установленных cookie.
	   * @return {Array.<string>}
	   */
	  keys: function () {
	    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
	    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
	    return aKeys;
	  }
	};

	module.exports = docCookies;


/***/ },
/* 5 */
/***/ function(module, exports) {

	function getMessage(a,b){

	  var sum = 0;
	  var length = 0;
	  var i;
	  var minLength;

	  
	  if( typeof(a) === 'boolean') {
	    if(a) {
	      return 'Я попал в ' + b;
	    } else {
	      return 'Я никуда не попал';
	    }
	  }


	  if( typeof(a) === 'number' ) {
	    return 'Я прыгнул на ' + (a * 100) + ' сантиметров';
	  }


	  if( Array.isArray(a) ) {

	    if( Array.isArray(b) ) {

	      for( i = 0, minLength = Math.max(a.length, b.length); i < minLength; i++ ) {
	        length += a[i] * b[i];
	      }

	      return 'Я прошёл ' + length + ' метров';

	    } else {

	      sum = a.reduce(function(previousValue, currentValue){
	        return previousValue + currentValue;
	      });

	      return 'Я прошёл ' + sum + ' шагов';
	    }

	  }

	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(ParentClass, ChildClass) {
	  var TempConstructor = function() {};
	  TempConstructor.prototype = ParentClass.prototype;
	  ChildClass.prototype = new TempConstructor();
	  ChildClass.prototype.constructor = ChildClass;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Review = __webpack_require__(8);

	/* Constants */

	var REVIEW_RELEVANCE_TIME_IN_DAYS = 14;
	var REVIEW_LOWEST_POSITIVE_GRADE = 3;
	var REVIEWS_PAGE_SIZE = 3;
	var XHR_MAX_LOADING_TIME = 10000;


	/* DOM elements */

	var reviewsListElement = document.querySelector('.reviews-list');
	var filtersElement = document.querySelector('.reviews-filter');
	var moreElement = document.querySelector('.reviews-controls-more');


	/* Data */

	var reviews = null;
	var reviewsFiltered = null;


	/* Filtering module */

	var filters = {
	  'reviews-all': function(data) {
	    return data;
	  },
	  'reviews-recent': function(data) {
	    var dateA;
	    var dateB;
	    var reviewDate;
	    var reviewRelevanceExpireDate = new Date();
	    reviewRelevanceExpireDate.setDate(reviewRelevanceExpireDate.getDate() - REVIEW_RELEVANCE_TIME_IN_DAYS);

	    return data.filter(function(element) {
	      reviewDate = new Date(element.date);
	      return reviewDate > reviewRelevanceExpireDate;
	    }).sort(function(a, b) {
	      dateB = new Date(b.date);
	      dateA = new Date(a.date);
	      return dateB - dateA;
	    });
	  },
	  'reviews-good': function(data) {
	    return data.filter(function(element) {
	      return element.rating >= REVIEW_LOWEST_POSITIVE_GRADE;
	    }).sort(function(a, b) {
	      return b.rating - a.rating;
	    });
	  },
	  'reviews-bad': function(data) {
	    return data.filter(function(element) {
	      return element.rating < REVIEW_LOWEST_POSITIVE_GRADE;
	    }).sort(function(a, b) {
	      return a.rating - b.rating;
	    });
	  },
	  'reviews-popular': function(data) {
	    var filteredData = data.slice(0);
	    return filteredData.sort(function(a, b) {
	      return b.review_usefulness - a.review_usefulness;
	    });
	  }
	};


	/* Application states */
	var filterActive = localStorage.getItem('filterActive') ? localStorage.getItem('filterActive') : filtersElement.querySelector('input[type="radio"]:checked').id;
	var reviewsCurrentPage = 0;


	/* Functions */

	function applyFilter(id) {
	  filterActive = id;
	  reviewsFiltered = filters[id](reviews);
	  renderReviews(reviewsFiltered, reviewsCurrentPage = 0, true);
	  localStorage.setItem('filterActive', id);
	  filtersElement.querySelector('#' + filterActive).checked = true; // in case it was changed from somewhere else and radio button was not clicked (eg. local storage init)
	}

	function initFilters() {
	  filtersElement.addEventListener('click', function(event) {
	    var clickedItem = event.target;
	    if ( clickedItem.type === 'radio' && clickedItem.id !== filterActive ) {
	      applyFilter(clickedItem.id);
	    }
	  });
	}


	function isMoreReviewToShow() {
	  return reviewsCurrentPage + 1 < Math.ceil(reviewsFiltered.length / REVIEWS_PAGE_SIZE);
	}

	function initMoreButton() {
	  moreElement.addEventListener('click', function() {
	    if ( isMoreReviewToShow() ) {
	      renderReviews(reviewsFiltered, ++reviewsCurrentPage, false);
	    }
	  });
	}

	function disableMoreButton() {
	  if ( isMoreReviewToShow() && moreElement.className.indexOf('invisible') > -1 ) {
	    moreElement.className = moreElement.className.replace('invisible', '').replace(/\s+/g, ' ').trim();
	  }
	  if ( !isMoreReviewToShow() && moreElement.className.indexOf('invisible') === -1 ) {
	    moreElement.className += ' invisible';
	  }
	}


	function renderReviews(data, pageNumber, replace) {

	  var reviewValue = document.createDocumentFragment();

	  var from = pageNumber * REVIEWS_PAGE_SIZE;
	  var to = from + REVIEWS_PAGE_SIZE;
	  var pageOfData = data.slice(from, to);

	  pageOfData.forEach(function(item) {
	    var reviewElement = new Review(item);
	    reviewElement.render(reviewValue);
	  });

	  if (replace) {
	    reviewsListElement.innerHTML = '';
	  }

	  reviewsListElement.appendChild(reviewValue);

	  disableMoreButton();

	}


	function getReviews() {

	  var xhr = new XMLHttpRequest();

	  filtersElement.className += ' invisible';
	  reviewsListElement.className += ' reviews-list-loading';

	  xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
	  xhr.timeout = XHR_MAX_LOADING_TIME;

	  xhr.onload = function(event) {
	    reviewsListElement.className = reviewsListElement.className.replace('reviews-list-loading', '').replace(/\s+/g, ' ').trim();
	    filtersElement.className = filtersElement.className.replace('invisible', '').replace(/\s+/g, ' ').trim();
	    reviews = JSON.parse( event.target.response );
	    applyFilter(filterActive);
	  };

	  xhr.onerror = function() {
	    reviewsListElement.className = reviewsListElement.className.replace('reviews-list-loading', '').replace(/\s+/g, ' ').trim();
	    reviewsListElement.className += ' reviews-load-failure';
	  };

	  xhr.ontimeout = function() {
	    reviewsListElement.className = reviewsListElement.className.replace('reviews-list-loading', '').replace(/\s+/g, ' ').trim();
	    reviewsListElement.className += ' reviews-load-failure';
	  };

	  xhr.send();

	}

	getReviews();
	initFilters();
	initMoreButton();


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	function Review(data) {
	  this._data = data;
	  this._element = '';
	  this.createElement();
	}

	Review.prototype.AVATAR_MAX_LOADING_TIME = 10000;
	Review.prototype.REVIEW_AUTHOR_AVATAR_SIZE = 124;

	Review.prototype.reviewTemplate = document.querySelector('#review-template');

	Review.prototype.convertGradeValueToWord = function( grade ) {
	  var grades = [null, 'one', 'two', 'three', 'four', 'five'];
	  return grades[grade];
	};

	Review.prototype.createElement = function() {
	  this._element = ( 'content' in this.reviewTemplate ) ? ( this.reviewTemplate.content.children[0].cloneNode(true) ) : ( this.reviewTemplate.childNodes[0].cloneNode(true) );

	  var avatarElement = this._element.querySelector('.review-author');
	  var ratingElement = this._element.querySelector('.review-rating');
	  var descriptionElement = this._element.querySelector('.review-text');

	  var avatarValue = new Image();
	  var ratingValue;
	  var descriptionValue;

	  var avatarLoadTimeout;


	  avatarValue.onload = function() {
	    clearTimeout(avatarLoadTimeout);
	    avatarValue.width = this.REVIEW_AUTHOR_AVATAR_SIZE;
	    avatarValue.height = this.REVIEW_AUTHOR_AVATAR_SIZE;
	    avatarValue.alt = this._data.author.name;
	    avatarValue.title = this._data.author.name;
	    avatarValue.className = avatarElement.className;
	    this._element.replaceChild(avatarValue, avatarElement);
	  }.bind(this);

	  avatarValue.onerror = function() {
	    this._element.className += ' review-load-failure';
	  }.bind(this);

	  avatarLoadTimeout = setTimeout(function() {
	    avatarValue.src = '';
	    this._element.className += ' review-load-failure';
	  }.bind(this), this.AVATAR_MAX_LOADING_TIME);

	  avatarValue.src = this._data.author.picture;

	  ratingValue = this.convertGradeValueToWord(this._data.rating);
	  ratingElement.className += this._data.rating >= 2 ? ' review-rating-' + ratingValue : '';

	  descriptionValue = this._data.description;
	  descriptionElement.textContent = descriptionValue;

	};

	Review.prototype.render = function(element) {
	  element.appendChild(this._element);
	};


	module.exports = Review;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Photo = __webpack_require__(10);
	var Gallery = __webpack_require__(11);


	var theaterElements = document.querySelectorAll('.photogallery-image');

	var theaterData = [].map.call(theaterElements, function(item) {
	  return new Photo(item.querySelector('img').getAttribute('src'));
	});

	var theaterGallery = new Gallery();

	theaterGallery.setPictures(theaterData);

	[].forEach.call(theaterElements, function(element) {
	  element.addEventListener('click', function() {
	    theaterGallery.show( [].indexOf.call(theaterElements, this) );
	  });
	});










/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	function Photo(url) {
	  this.element = document.createElement('img');
	  this.element.src = url;
	}

	Photo.prototype.renderElement = function(location) {
	  location.appendChild(this.element);
	};

	Photo.prototype.removeElement = function() {
	  if (this.element.parentNode) {
	    this.element.parentNode.removeChild(this.element);
	  }
	};

	module.exports = Photo;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keyCode = __webpack_require__(12);

	var Gallery = function() {
	  this._element = document.querySelector('.overlay-gallery');
	  this._stageElement = this._element.querySelector('.overlay-gallery-preview');
	  this._numberCurrentElement = this._element.querySelector('.preview-number-current');
	  this._numberTotalElement = this._element.querySelector('.preview-number-total');
	  this._closeButtonElement = this._element.querySelector('.overlay-gallery-close');
	  this._arrowButtonElements = this._element.querySelectorAll('.overlay-gallery-control');

	  this._current = 0;
	  this._photos = [];

	  this._onCloseClick = this._onCloseClick.bind(this);
	  this._onArrowClick = this._onArrowClick.bind(this);
	  this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);

	};

	Gallery.prototype.show = function(startFrom) {

	  /* Show gallery */
	  this._element.className = this._element.className.replace('invisible', '').replace(/\s+/g, ' ').trim();

	  /* Close button add event */
	  this._closeButtonElement.addEventListener('click', this._onCloseClick);

	  /* Arrow buttons add event */
	  [].forEach.call(this._arrowButtonElements, function(arrow) {
	    arrow.addEventListener('click', this._onArrowClick);
	  }.bind(this));

	  /* Keyboard */
	  document.addEventListener('keydown', this._onDocumentKeyDown);

	  this.choosePicture(startFrom);
	};

	Gallery.prototype.hide = function() {

	  /* Hide gallery */
	  this._element.className += ' invisible';

	  /* Close button remove event */
	  this._closeButtonElement.removeEventListener('click', this._onCloseClick);

	  /* Arrow buttons remove event */
	  [].forEach.call(this._arrowButtonElements, function(arrow) {
	    arrow.removeEventListener('click', this._onArrowClick);
	  }.bind(this));

	  /* Keyboard */
	  document.removeEventListener('keydown', this._onDocumentKeyDown);
	};


	Gallery.prototype._onCloseClick = function() {
	  this.hide();
	};

	Gallery.prototype._onArrowClick = function(event) {
	  if ( event.target.className.indexOf('overlay-gallery-control-left') > -1 ) {
	    this.choosePicture( this._prevIndex() );
	  } else if ( event.target.className.indexOf('overlay-gallery-control-right') > -1 ) {
	    this.choosePicture( this._nextIndex() );
	  }
	};

	Gallery.prototype._onDocumentKeyDown = function(event) {
	  switch (event.keyCode) {
	    case keyCode.Escape:
	      this.hide();
	      break;
	    case keyCode.ArrowLeft:
	      this.choosePicture( this._prevIndex() );
	      break;
	    case keyCode.ArrowRight:
	      this.choosePicture( this._nextIndex() );
	      break;
	  }
	};

	Gallery.prototype._prevIndex = function() {
	  return ( this._current === 0 ) ? ( this._photos.length - 1 ) : ( this._current - 1 );
	};

	Gallery.prototype._nextIndex = function() {
	  return ( this._current === this._photos.length - 1 ) ? ( 0 ) : ( this._current + 1 );
	};

	Gallery.prototype.setPictures = function(photos) {
	  this._photos = photos;
	  this._numberTotalElement.innerHTML = photos.length;
	};

	Gallery.prototype.choosePicture = function(index) {
	  this._photos[this._current].removeElement();
	  this._photos[index].renderElement( this._stageElement );
	  this._numberCurrentElement.innerHTML = index + 1;
	  this._current = index;
	};

	module.exports = Gallery;


/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  Escape: 27,
	  ArrowLeft: 37,
	  ArrowRight: 39
	};


/***/ }
/******/ ]);
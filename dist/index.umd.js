(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["index"] = factory(require("vue"));
	else
		root["index"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__8bbf__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1516":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  "use strict";

  if (!Array.from) {
    Array.from = function (object) {
      return [].slice.call(object);
    };
  }

  function buildAttribute(object, propName, value) {
    if (value == undefined) {
      return object;
    }
    object = object == null ? {} : object;
    object[propName] = value;
    return object;
  }

  function buildDraggable(Sortable) {
    function removeNode(node) {
      node.parentElement.removeChild(node);
    }

    function insertNodeAt(fatherNode, node, position) {
      var refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
      fatherNode.insertBefore(node, refNode);
    }

    function computeVmIndex(vnodes, element) {
      return vnodes.map(function (elt) {
        return elt.elm;
      }).indexOf(element);
    }

    function _computeIndexes(slots, children, isTransition) {
      if (!slots) {
        return [];
      }

      var elmFromNodes = slots.map(function (elt) {
        return elt.elm;
      });
      var rawIndexes = [].concat(_toConsumableArray(children)).map(function (elt) {
        return elmFromNodes.indexOf(elt);
      });
      return isTransition ? rawIndexes.filter(function (ind) {
        return ind !== -1;
      }) : rawIndexes;
    }

    function emit(evtName, evtData) {
      var _this = this;

      this.$nextTick(function () {
        return _this.$emit(evtName.toLowerCase(), evtData);
      });
    }

    function delegateAndEmit(evtName) {
      var _this2 = this;

      return function (evtData) {
        if (_this2.realList !== null) {
          _this2['onDrag' + evtName](evtData);
        }
        emit.call(_this2, evtName, evtData);
      };
    }

    var eventsListened = ['Start', 'Add', 'Remove', 'Update', 'End'];
    var eventsToEmit = ['Choose', 'Sort', 'Filter', 'Clone'];
    var readonlyProperties = ['Move'].concat(eventsListened, eventsToEmit).map(function (evt) {
      return 'on' + evt;
    });
    var draggingElement = null;

    var props = {
      options: Object,
      list: {
        type: Array,
        required: false,
        default: null
      },
      value: {
        type: Array,
        required: false,
        default: null
      },
      noTransitionOnDrag: {
        type: Boolean,
        default: false
      },
      clone: {
        type: Function,
        default: function _default(original) {
          return original;
        }
      },
      element: {
        type: String,
        default: 'div'
      },
      move: {
        type: Function,
        default: null
      },
      componentData: {
        type: Object,
        required: false,
        default: null
      }
    };

    var draggableComponent = {
      name: 'draggable',

      props: props,

      data: function data() {
        return {
          transitionMode: false,
          noneFunctionalComponentMode: false,
          init: false
        };
      },
      render: function render(h) {
        var slots = this.$slots.default;
        if (slots && slots.length === 1) {
          var child = slots[0];
          if (child.componentOptions && child.componentOptions.tag === "transition-group") {
            this.transitionMode = true;
          }
        }
        var children = slots;
        var footer = this.$slots.footer;

        if (footer) {
          children = slots ? [].concat(_toConsumableArray(slots), _toConsumableArray(footer)) : [].concat(_toConsumableArray(footer));
        }
        var attributes = null;
        var update = function update(name, value) {
          attributes = buildAttribute(attributes, name, value);
        };
        update('attrs', this.$attrs);
        if (this.componentData) {
          var _componentData = this.componentData,
              on = _componentData.on,
              _props = _componentData.props;

          update('on', on);
          update('props', _props);
        }
        return h(this.element, attributes, children);
      },
      mounted: function mounted() {
        var _this3 = this;

        this.noneFunctionalComponentMode = this.element.toLowerCase() !== this.$el.nodeName.toLowerCase();
        if (this.noneFunctionalComponentMode && this.transitionMode) {
          throw new Error('Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: ' + this.element);
        }
        var optionsAdded = {};
        eventsListened.forEach(function (elt) {
          optionsAdded['on' + elt] = delegateAndEmit.call(_this3, elt);
        });

        eventsToEmit.forEach(function (elt) {
          optionsAdded['on' + elt] = emit.bind(_this3, elt);
        });

        var options = _extends({}, this.options, optionsAdded, { onMove: function onMove(evt, originalEvent) {
            return _this3.onDragMove(evt, originalEvent);
          } });
        !('draggable' in options) && (options.draggable = '>*');
        this._sortable = new Sortable(this.rootContainer, options);
        this.computeIndexes();
      },
      beforeDestroy: function beforeDestroy() {
        this._sortable.destroy();
      },


      computed: {
        rootContainer: function rootContainer() {
          return this.transitionMode ? this.$el.children[0] : this.$el;
        },
        isCloning: function isCloning() {
          return !!this.options && !!this.options.group && this.options.group.pull === 'clone';
        },
        realList: function realList() {
          return !!this.list ? this.list : this.value;
        }
      },

      watch: {
        options: {
          handler: function handler(newOptionValue) {
            for (var property in newOptionValue) {
              if (readonlyProperties.indexOf(property) == -1) {
                this._sortable.option(property, newOptionValue[property]);
              }
            }
          },

          deep: true
        },

        realList: function realList() {
          this.computeIndexes();
        }
      },

      methods: {
        getChildrenNodes: function getChildrenNodes() {
          if (!this.init) {
            this.noneFunctionalComponentMode = this.noneFunctionalComponentMode && this.$children.length == 1;
            this.init = true;
          }

          if (this.noneFunctionalComponentMode) {
            return this.$children[0].$slots.default;
          }
          var rawNodes = this.$slots.default;
          return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
        },
        computeIndexes: function computeIndexes() {
          var _this4 = this;

          this.$nextTick(function () {
            _this4.visibleIndexes = _computeIndexes(_this4.getChildrenNodes(), _this4.rootContainer.children, _this4.transitionMode);
          });
        },
        getUnderlyingVm: function getUnderlyingVm(htmlElt) {
          var index = computeVmIndex(this.getChildrenNodes() || [], htmlElt);
          if (index === -1) {
            //Edge case during move callback: related element might be
            //an element different from collection
            return null;
          }
          var element = this.realList[index];
          return { index: index, element: element };
        },
        getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(_ref) {
          var __vue__ = _ref.__vue__;

          if (!__vue__ || !__vue__.$options || __vue__.$options._componentTag !== "transition-group") {
            return __vue__;
          }
          return __vue__.$parent;
        },
        emitChanges: function emitChanges(evt) {
          var _this5 = this;

          this.$nextTick(function () {
            _this5.$emit('change', evt);
          });
        },
        alterList: function alterList(onList) {
          if (!!this.list) {
            onList(this.list);
          } else {
            var newList = [].concat(_toConsumableArray(this.value));
            onList(newList);
            this.$emit('input', newList);
          }
        },
        spliceList: function spliceList() {
          var _arguments = arguments;

          var spliceList = function spliceList(list) {
            return list.splice.apply(list, _arguments);
          };
          this.alterList(spliceList);
        },
        updatePosition: function updatePosition(oldIndex, newIndex) {
          var updatePosition = function updatePosition(list) {
            return list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
          };
          this.alterList(updatePosition);
        },
        getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref2) {
          var to = _ref2.to,
              related = _ref2.related;

          var component = this.getUnderlyingPotencialDraggableComponent(to);
          if (!component) {
            return { component: component };
          }
          var list = component.realList;
          var context = { list: list, component: component };
          if (to !== related && list && component.getUnderlyingVm) {
            var destination = component.getUnderlyingVm(related);
            if (destination) {
              return _extends(destination, context);
            }
          }

          return context;
        },
        getVmIndex: function getVmIndex(domIndex) {
          var indexes = this.visibleIndexes;
          var numberIndexes = indexes.length;
          return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
        },
        getComponent: function getComponent() {
          return this.$slots.default[0].componentInstance;
        },
        resetTransitionData: function resetTransitionData(index) {
          if (!this.noTransitionOnDrag || !this.transitionMode) {
            return;
          }
          var nodes = this.getChildrenNodes();
          nodes[index].data = null;
          var transitionContainer = this.getComponent();
          transitionContainer.children = [];
          transitionContainer.kept = undefined;
        },
        onDragStart: function onDragStart(evt) {
          this.context = this.getUnderlyingVm(evt.item);
          evt.item._underlying_vm_ = this.clone(this.context.element);
          draggingElement = evt.item;
        },
        onDragAdd: function onDragAdd(evt) {
          var element = evt.item._underlying_vm_;
          if (element === undefined) {
            return;
          }
          removeNode(evt.item);
          var newIndex = this.getVmIndex(evt.newIndex);
          this.spliceList(newIndex, 0, element);
          this.computeIndexes();
          var added = { element: element, newIndex: newIndex };
          this.emitChanges({ added: added });
        },
        onDragRemove: function onDragRemove(evt) {
          insertNodeAt(this.rootContainer, evt.item, evt.oldIndex);
          if (this.isCloning) {
            removeNode(evt.clone);
            return;
          }
          var oldIndex = this.context.index;
          this.spliceList(oldIndex, 1);
          var removed = { element: this.context.element, oldIndex: oldIndex };
          this.resetTransitionData(oldIndex);
          this.emitChanges({ removed: removed });
        },
        onDragUpdate: function onDragUpdate(evt) {
          removeNode(evt.item);
          insertNodeAt(evt.from, evt.item, evt.oldIndex);
          var oldIndex = this.context.index;
          var newIndex = this.getVmIndex(evt.newIndex);
          this.updatePosition(oldIndex, newIndex);
          var moved = { element: this.context.element, oldIndex: oldIndex, newIndex: newIndex };
          this.emitChanges({ moved: moved });
        },
        computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
          if (!relatedContext.element) {
            return 0;
          }
          var domChildren = [].concat(_toConsumableArray(evt.to.children)).filter(function (el) {
            return el.style['display'] !== 'none';
          });
          var currentDOMIndex = domChildren.indexOf(evt.related);
          var currentIndex = relatedContext.component.getVmIndex(currentDOMIndex);
          var draggedInList = domChildren.indexOf(draggingElement) != -1;
          return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
        },
        onDragMove: function onDragMove(evt, originalEvent) {
          var onMove = this.move;
          if (!onMove || !this.realList) {
            return true;
          }

          var relatedContext = this.getRelatedContextFromMoveEvent(evt);
          var draggedContext = this.context;
          var futureIndex = this.computeFutureIndex(relatedContext, evt);
          _extends(draggedContext, { futureIndex: futureIndex });
          _extends(evt, { relatedContext: relatedContext, draggedContext: draggedContext });
          return onMove(evt, originalEvent);
        },
        onDragEnd: function onDragEnd(evt) {
          this.computeIndexes();
          draggingElement = null;
        }
      }
    };
    return draggableComponent;
  }

  if (true) {
    var Sortable = __webpack_require__("53fe");
    module.exports = buildDraggable(Sortable);
  } else { var draggable; }
})();

/***/ }),

/***/ "1991":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("9b43");
var invoke = __webpack_require__("31f4");
var html = __webpack_require__("fab2");
var cel = __webpack_require__("230e");
var global = __webpack_require__("7726");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("2d95")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "1eb2":
/***/ (function(module, exports, __webpack_require__) {

// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}


/***/ }),

/***/ "1fa8":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("cb7c");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "27ee":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("23c6");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var Iterators = __webpack_require__("84f2");
module.exports = __webpack_require__("8378").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "314e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Container_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b325");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Container_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Container_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Container_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "31f4":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "33a4":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("84f2");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4a59":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("9b43");
var call = __webpack_require__("1fa8");
var isArrayIter = __webpack_require__("33a4");
var anObject = __webpack_require__("cb7c");
var toLength = __webpack_require__("9def");
var getIterFn = __webpack_require__("27ee");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "53fe":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */

(function sortableModule(factory) {
	"use strict";

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else {}
})(function sortableFactory() {
	"use strict";

	if (typeof window === "undefined" || !window.document) {
		return function sortableError() {
			throw new Error("Sortable.js requires a window with a document");
		};
	}

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,
		lastDownEl,

		scrollEl,
		scrollParentEl,
		scrollCustomFn,

		lastEl,
		lastCSS,
		lastParentCSS,

		oldIndex,
		newIndex,

		activeGroup,
		putSortable,

		autoScroll = {},

		tapEvt,
		touchEvt,

		moved,

		/** @const */
		R_SPACE = /\s+/g,
		R_FLOAT = /left|right|inline/,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,
		setTimeout = win.setTimeout,

		$ = win.jQuery || win.Zepto,
		Polymer = win.Polymer,

		captureMode = false,
		passiveMode = false,

		supportDraggable = ('draggable' in document.createElement('div')),
		supportCssPointerEvents = (function (el) {
			// false when IE11
			if (!!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i)) {
				return false;
			}
			el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,

		abs = Math.abs,
		min = Math.min,

		savedInputChecked = [],
		touchDragOverListeners = [],

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (rootEl && options.scroll) {
				var _this = rootEl[expando],
					el,
					rect,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winWidth = window.innerWidth,
					winHeight = window.innerHeight,

					vx,
					vy,

					scrollOffsetX,
					scrollOffsetY
				;

				// Delect scrollEl
				if (scrollParentEl !== rootEl) {
					scrollEl = options.scroll;
					scrollParentEl = rootEl;
					scrollCustomFn = options.scrollFn;

					if (scrollEl === true) {
						scrollEl = rootEl;

						do {
							if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
								(scrollEl.offsetHeight < scrollEl.scrollHeight)
							) {
								break;
							}
							/* jshint boss:true */
						} while (scrollEl = scrollEl.parentNode);
					}
				}

				if (scrollEl) {
					el = scrollEl;
					rect = scrollEl.getBoundingClientRect();
					vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
					vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
				}


				if (!(vx || vy)) {
					vx = (winWidth - x <= sens) - (x <= sens);
					vy = (winHeight - y <= sens) - (y <= sens);

					/* jshint expr:true */
					(vx || vy) && (el = win);
				}


				if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
					autoScroll.el = el;
					autoScroll.vx = vx;
					autoScroll.vy = vy;

					clearInterval(autoScroll.pid);

					if (el) {
						autoScroll.pid = setInterval(function () {
							scrollOffsetY = vy ? vy * speed : 0;
							scrollOffsetX = vx ? vx * speed : 0;

							if ('function' === typeof(scrollCustomFn)) {
								return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
							}

							if (el === win) {
								win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
							} else {
								el.scrollTop += scrollOffsetY;
								el.scrollLeft += scrollOffsetX;
							}
						}, 24);
					}
				}
			}
		}, 30),

		_prepareGroup = function (options) {
			function toFn(value, pull) {
				if (value === void 0 || value === true) {
					value = group.name;
				}

				if (typeof value === 'function') {
					return value;
				} else {
					return function (to, from) {
						var fromGroup = from.options.group.name;

						return pull
							? value
							: value && (value.join
								? value.indexOf(fromGroup) > -1
								: (fromGroup == value)
							);
					};
				}
			}

			var group = {};
			var originalGroup = options.group;

			if (!originalGroup || typeof originalGroup != 'object') {
				originalGroup = {name: originalGroup};
			}

			group.name = originalGroup.name;
			group.checkPull = toFn(originalGroup.pull, true);
			group.checkPut = toFn(originalGroup.put);
			group.revertClone = originalGroup.revertClone;

			options.group = group;
		}
	;

	// Detect support a passive mode
	try {
		window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
			get: function () {
				// `false`, because everything starts to work incorrectly and instead of d'n'd,
				// begins the page has scrolled.
				passiveMode = false;
				captureMode = {
					capture: false,
					passive: passiveMode
				};
			}
		}));
	} catch (err) {}

	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;

		// Default options
		var defaults = {
			group: Math.random(),
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			dragClass: 'sortable-drag',
			ignore: 'a, img',
			filter: null,
			preventOnFilter: true,
			animation: 0,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false,
			fallbackTolerance: 0,
			fallbackOffset: {x: 0, y: 0},
			supportPointer: Sortable.supportPointer !== false
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		// Bind events
		_on(el, 'mousedown', this._onTapStart);
		_on(el, 'touchstart', this._onTapStart);
		options.supportPointer && _on(el, 'pointerdown', this._onTapStart);

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		touchDragOverListeners.push(this._onDragOver);

		// Restore sorting
		options.store && this.sort(options.store.get(this));
	}


	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_onTapStart: function (/** Event|TouchEvent */evt) {
			var _this = this,
				el = this.el,
				options = this.options,
				preventOnFilter = options.preventOnFilter,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0]) || target,
				filter = options.filter,
				startIndex;

			_saveInputCheckedState(el);


			// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
			if (dragEl) {
				return;
			}

			if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
				return; // only left button or enabled
			}

			// cancel dnd if original target is content editable
			if (originalTarget.isContentEditable) {
				return;
			}

			target = _closest(target, options.draggable, el);

			if (!target) {
				return;
			}

			if (lastDownEl === target) {
				// Ignoring duplicate `down`
				return;
			}

			// Get the index of the dragged element within its parent
			startIndex = _index(target, options.draggable);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, el, startIndex);
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, el, startIndex);
						return true;
					}
				});

				if (filter) {
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}

			if (options.handle && !_closest(originalTarget, options.handle, el)) {
				return;
			}

			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target, startIndex);
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				tapEvt = evt;

				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				lastDownEl = target;
				activeGroup = options.group;
				oldIndex = startIndex;

				this._lastX = (touch || evt).clientX;
				this._lastY = (touch || evt).clientY;

				dragEl.style['will-change'] = 'all';

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDrag();

					// Make the element draggable
					dragEl.draggable = _this.nativeDraggable;

					// Chosen item
					_toggleClass(dragEl, options.chosenClass, true);

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(evt, touch);

					// Drag start event
					_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, rootEl, oldIndex);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);
				_on(ownerDocument, 'selectstart', _this);
				options.supportPointer && _on(ownerDocument, 'pointercancel', _this._onDrop);

				if (options.delay) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
					options.supportPointer && _on(ownerDocument, 'pointermove', _this._disableDelayedDrag);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}


			}
		},

		_disableDelayedDrag: function () {
			var ownerDocument = this.el.ownerDocument;

			clearTimeout(this._dragStartTimer);
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
			_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
			_off(ownerDocument, 'pointermove', this._disableDelayedDrag);
		},

		_triggerDragStart: function (/** Event */evt, /** Touch */touch) {
			touch = touch || (evt.pointerType == 'touch' ? evt : null);

			if (touch) {
				// Touch device support
				tapEvt = {
					target: dragEl,
					clientX: touch.clientX,
					clientY: touch.clientY
				};

				this._onDragStart(tapEvt, 'touch');
			}
			else if (!this.nativeDraggable) {
				this._onDragStart(tapEvt, true);
			}
			else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					// Timeout neccessary for IE9
					_nextTick(function () {
						document.selection.empty();
					});
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		_dragStarted: function () {
			if (rootEl && dragEl) {
				var options = this.options;

				// Apply effect
				_toggleClass(dragEl, options.ghostClass, true);
				_toggleClass(dragEl, options.dragClass, false);

				Sortable.active = this;

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, rootEl, oldIndex);
			} else {
				this._nulling();
			}
		},

		_emulateDragOver: function () {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
					return;
				}

				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', 'none');
				}

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
				var parent = target;
				var i = touchDragOverListeners.length;

				if (target && target.shadowRoot) {
					target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
					parent = target;
				}

				if (parent) {
					do {
						if (parent[expando]) {
							while (i--) {
								touchDragOverListeners[i]({
									clientX: touchEvt.clientX,
									clientY: touchEvt.clientY,
									target: target,
									rootEl: parent
								});
							}

							break;
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', '');
				}
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt) {
			if (tapEvt) {
				var	options = this.options,
					fallbackTolerance = options.fallbackTolerance,
					fallbackOffset = options.fallbackOffset,
					touch = evt.touches ? evt.touches[0] : evt,
					dx = (touch.clientX - tapEvt.clientX) + fallbackOffset.x,
					dy = (touch.clientY - tapEvt.clientY) + fallbackOffset.y,
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active) {
					if (fallbackTolerance &&
						min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
					) {
						return;
					}

					this._dragStarted();
				}

				// as well as creating the ghost element on the document body
				this._appendGhost();

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.preventDefault();
			}
		},

		_appendGhost: function () {
			if (!ghostEl) {
				var rect = dragEl.getBoundingClientRect(),
					css = _css(dragEl),
					options = this.options,
					ghostRect;

				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);
				_toggleClass(ghostEl, options.dragClass, true);

				_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', 'fixed');
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

				// Fixing dimensions.
				ghostRect = ghostEl.getBoundingClientRect();
				_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
				_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
			var _this = this;
			var dataTransfer = evt.dataTransfer;
			var options = _this.options;

			_this._offUpEvents();

			if (activeGroup.checkPull(_this, _this, dragEl, evt)) {
				cloneEl = _clone(dragEl);

				cloneEl.draggable = false;
				cloneEl.style['will-change'] = '';

				_css(cloneEl, 'display', 'none');
				_toggleClass(cloneEl, _this.options.chosenClass, false);

				// #1143: IFrame support workaround
				_this._cloneId = _nextTick(function () {
					rootEl.insertBefore(cloneEl, dragEl);
					_dispatchEvent(_this, rootEl, 'clone', dragEl);
				});
			}

			_toggleClass(dragEl, options.dragClass, true);

			if (useFallback) {
				if (useFallback === 'touch') {
					// Bind touch events
					_on(document, 'touchmove', _this._onTouchMove);
					_on(document, 'touchend', _this._onDrop);
					_on(document, 'touchcancel', _this._onDrop);

					if (options.supportPointer) {
						_on(document, 'pointermove', _this._onTouchMove);
						_on(document, 'pointerup', _this._onDrop);
					}
				} else {
					// Old brwoser
					_on(document, 'mousemove', _this._onTouchMove);
					_on(document, 'mouseup', _this._onDrop);
				}

				_this._loopId = setInterval(_this._emulateDragOver, 50);
			}
			else {
				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(_this, dataTransfer, dragEl);
				}

				_on(document, 'drop', _this);

				// #1143: Бывает элемент с IFrame внутри блокирует `drop`,
				// поэтому если вызвался `mouseover`, значит надо отменять весь d'n'd.
				// Breaking Chrome 62+
				// _on(document, 'mouseover', _this);

				_this._dragStartId = _nextTick(_this._dragStarted);
			}
		},

		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target,
				dragRect,
				targetRect,
				revert,
				options = this.options,
				group = options.group,
				activeSortable = Sortable.active,
				isOwner = (activeGroup === group),
				isMovingBetweenSortable = false,
				canSort = options.sort;

			if (evt.preventDefault !== void 0) {
				evt.preventDefault();
				!options.dragoverBubble && evt.stopPropagation();
			}

			if (dragEl.animated) {
				return;
			}

			moved = true;

			if (activeSortable && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: (
						putSortable === this ||
						(
							(activeSortable.lastPullMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
							group.checkPut(this, activeSortable, dragEl, evt)
						)
					)
				) &&
				(evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
			) {
				// Smart auto-scrolling
				_autoScroll(evt, options, this.el);

				if (_silent) {
					return;
				}

				target = _closest(evt.target, options.draggable, el);
				dragRect = dragEl.getBoundingClientRect();

				if (putSortable !== this) {
					putSortable = this;
					isMovingBetweenSortable = true;
				}

				if (revert) {
					_cloneHide(activeSortable, true);
					parentEl = rootEl; // actualization

					if (cloneEl || nextEl) {
						rootEl.insertBefore(dragEl, cloneEl || nextEl);
					}
					else if (!canSort) {
						rootEl.appendChild(dragEl);
					}

					return;
				}


				if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
					(el === evt.target) && (_ghostIsLast(el, evt))
				) {
					//assign target only if condition is true
					if (el.children.length !== 0 && el.children[0] !== ghostEl && el === evt.target) {
						target = el.lastElementChild;
					}

					if (target) {
						if (target.animated) {
							return;
						}

						targetRect = target.getBoundingClientRect();
					}

					_cloneHide(activeSortable, isOwner);

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt) !== false) {
						if (!dragEl.contains(el)) {
							el.appendChild(dragEl);
							parentEl = el; // actualization
						}

						this._animate(dragRect, dragEl);
						target && this._animate(targetRect, target);
					}
				}
				else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
					if (lastEl !== target) {
						lastEl = target;
						lastCSS = _css(target);
						lastParentCSS = _css(target.parentNode);
					}

					targetRect = target.getBoundingClientRect();

					var width = targetRect.right - targetRect.left,
						height = targetRect.bottom - targetRect.top,
						floating = R_FLOAT.test(lastCSS.cssFloat + lastCSS.display)
							|| (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
						isWide = (target.offsetWidth > dragEl.offsetWidth),
						isLong = (target.offsetHeight > dragEl.offsetHeight),
						halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
						nextSibling = target.nextElementSibling,
						after = false
					;

					if (floating) {
						var elTop = dragEl.offsetTop,
							tgTop = target.offsetTop;

						if (elTop === tgTop) {
							after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
						}
						else if (target.previousElementSibling === dragEl || dragEl.previousElementSibling === target) {
							after = (evt.clientY - targetRect.top) / height > 0.5;
						} else {
							after = tgTop > elTop;
						}
						} else if (!isMovingBetweenSortable) {
						after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
					}

					var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

					if (moveVector !== false) {
						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}

						_silent = true;
						setTimeout(_unsilent, 30);

						_cloneHide(activeSortable, isOwner);

						if (!dragEl.contains(el)) {
							if (after && !nextSibling) {
								el.appendChild(dragEl);
							} else {
								target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
							}
						}

						parentEl = dragEl.parentNode; // actualization

						this._animate(dragRect, dragEl);
						this._animate(targetRect, target);
					}
				}
			}
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = target.getBoundingClientRect();

				if (prevRect.nodeType === 1) {
					prevRect = prevRect.getBoundingClientRect();
				}

				_css(target, 'transition', 'none');
				_css(target, 'transform', 'translate3d('
					+ (prevRect.left - currentRect.left) + 'px,'
					+ (prevRect.top - currentRect.top) + 'px,0)'
				);

				target.offsetWidth; // repaint

				_css(target, 'transition', 'all ' + ms + 'ms');
				_css(target, 'transform', 'translate3d(0,0,0)');

				clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(document, 'touchmove', this._onTouchMove);
			_off(document, 'pointermove', this._onTouchMove);
			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'pointerup', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
			_off(ownerDocument, 'pointercancel', this._onDrop);
			_off(ownerDocument, 'selectstart', this);
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;

			clearInterval(this._loopId);
			clearInterval(autoScroll.pid);
			clearTimeout(this._dragStartTimer);

			_cancelNextTick(this._cloneId);
			_cancelNextTick(this._dragStartId);

			// Unbind events
			_off(document, 'mouseover', this);
			_off(document, 'mousemove', this._onTouchMove);

			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

				if (rootEl === parentEl || Sortable.active.lastPullMode !== 'clone') {
					// Remove clone
					cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
				}

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class's
					_toggleClass(dragEl, this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					_dispatchEvent(this, rootEl, 'unchoose', dragEl, parentEl, rootEl, oldIndex);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
						}
					}
					else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, parentEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							}
						}
					}

					if (Sortable.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
						}

						_dispatchEvent(this, rootEl, 'end', dragEl, parentEl, rootEl, oldIndex, newIndex);

						// Save sorting
						this.save();
					}
				}

			}

			this._nulling();
		},

		_nulling: function() {
			rootEl =
			dragEl =
			parentEl =
			ghostEl =
			nextEl =
			cloneEl =
			lastDownEl =

			scrollEl =
			scrollParentEl =

			tapEvt =
			touchEvt =

			moved =
			newIndex =

			lastEl =
			lastCSS =

			putSortable =
			activeGroup =
			Sortable.active = null;

			savedInputChecked.forEach(function (el) {
				el.checked = true;
			});
			savedInputChecked.length = 0;
		},

		handleEvent: function (/**Event*/evt) {
			switch (evt.type) {
				case 'drop':
				case 'dragend':
					this._onDrop(evt);
					break;

				case 'dragover':
				case 'dragenter':
					if (dragEl) {
						this._onDragOver(evt);
						_globalDragOver(evt);
					}
					break;

				case 'mouseover':
					this._onDrop(evt);
					break;

				case 'selectstart':
					evt.preventDefault();
					break;
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);
			_off(el, 'pointerdown', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}

			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

			this._onDrop();

			this.el = el = null;
		}
	};


	function _cloneHide(sortable, state) {
		if (sortable.lastPullMode !== 'clone') {
			state = true;
		}

		if (cloneEl && (cloneEl.state !== state)) {
			_css(cloneEl, 'display', state ? 'none' : '');

			if (!state) {
				if (cloneEl.state) {
					if (sortable.options.group.revertClone) {
						rootEl.insertBefore(cloneEl, nextEl);
						sortable._animate(dragEl, cloneEl);
					} else {
						rootEl.insertBefore(cloneEl, dragEl);
					}
				}
			}

			cloneEl.state = state;
		}
	}


	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
		if (el) {
			ctx = ctx || document;

			do {
				if ((selector === '>*' && el.parentNode === ctx) || _matches(el, selector)) {
					return el;
				}
				/* jshint boss:true */
			} while (el = _getParentOrHost(el));
		}

		return null;
	}


	function _getParentOrHost(el) {
		var parent = el.host;

		return (parent && parent.nodeType) ? parent : el.parentNode;
	}


	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, captureMode);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, captureMode);
	}


	function _toggleClass(el, name, state) {
		if (el) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style)) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(sortable, rootEl, name, targetEl, toEl, fromEl, startIndex, newIndex) {
		sortable = (sortable || rootEl[expando]);

		var evt = document.createEvent('Event'),
			options = sortable.options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

		evt.initEvent(name, true, true);

		evt.to = toEl || rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		rootEl.dispatchEvent(evt);

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;

		evt = document.createEvent('Event');
		evt.initEvent('move', true, true);

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || toEl.getBoundingClientRect();
		evt.willInsertAfter = willInsertAfter;

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt, originalEvt);
		}

		return retVal;
	}


	function _disableDraggable(el) {
		el.draggable = false;
	}


	function _unsilent() {
		_silent = false;
	}


	/** @returns {HTMLElement|false} */
	function _ghostIsLast(el, evt) {
		var lastEl = el.lastElementChild,
			rect = lastEl.getBoundingClientRect();

		// 5 — min delta
		// abs — нельзя добавлять, а то глюки при наведении сверху
		return (evt.clientY - (rect.top + rect.height) > 5) ||
			(evt.clientX - (rect.left + rect.width) > 5);
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && (selector === '>*' || _matches(el, selector))) {
				index++;
			}
		}

		return index;
	}

	function _matches(/**HTMLElement*/el, /**String*/selector) {
		if (el) {
			selector = selector.split('.');

			var tag = selector.shift().toUpperCase(),
				re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

			return (
				(tag === '' || el.nodeName.toUpperCase() == tag) &&
				(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
			);
		}

		return false;
	}

	function _throttle(callback, ms) {
		var args, _this;

		return function () {
			if (args === void 0) {
				args = arguments;
				_this = this;

				setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					args = void 0;
				}, ms);
			}
		};
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}

	function _clone(el) {
		if (Polymer && Polymer.dom) {
			return Polymer.dom(el).cloneNode(true);
		}
		else if ($) {
			return $(el).clone(true)[0];
		}
		else {
			return el.cloneNode(true);
		}
	}

	function _saveInputCheckedState(root) {
		var inputs = root.getElementsByTagName('input');
		var idx = inputs.length;

		while (idx--) {
			var el = inputs[idx];
			el.checked && savedInputChecked.push(el);
		}
	}

	function _nextTick(fn) {
		return setTimeout(fn, 0);
	}

	function _cancelNextTick(id) {
		return clearTimeout(id);
	}

	// Fixed #973:
	_on(document, 'touchmove', function (evt) {
		if (Sortable.active) {
			evt.preventDefault();
		}
	});

	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		clone: _clone,
		index: _index,
		nextTick: _nextTick,
		cancelNextTick: _cancelNextTick
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.7.0';
	return Sortable;
});


/***/ }),

/***/ "551c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var global = __webpack_require__("7726");
var ctx = __webpack_require__("9b43");
var classof = __webpack_require__("23c6");
var $export = __webpack_require__("5ca1");
var isObject = __webpack_require__("d3f4");
var aFunction = __webpack_require__("d8e8");
var anInstance = __webpack_require__("f605");
var forOf = __webpack_require__("4a59");
var speciesConstructor = __webpack_require__("ebd6");
var task = __webpack_require__("1991").set;
var microtask = __webpack_require__("8079")();
var newPromiseCapabilityModule = __webpack_require__("a5b8");
var perform = __webpack_require__("9c80");
var userAgent = __webpack_require__("a25f");
var promiseResolve = __webpack_require__("bcaa");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("2b4c")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("dcbc")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("7f20")($Promise, PROMISE);
__webpack_require__("7a56")(PROMISE);
Wrapper = __webpack_require__("8378")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("5cc5")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5b5f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5cc5":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("2b4c")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7a56":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var dP = __webpack_require__("86cc");
var DESCRIPTORS = __webpack_require__("9e1e");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8079":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var macrotask = __webpack_require__("1991").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("2d95")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9c80":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "9ea2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7f7f");
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ac6a");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cadf");
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("456d");
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("1516");
/* harmony import */ var vuedraggable__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vuedraggable__WEBPACK_IMPORTED_MODULE_4__);




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    Draggable: vuedraggable__WEBPACK_IMPORTED_MODULE_4___default.a
  },
  props: ['data'],
  data: function data() {
    return {
      validator: {
        type: null,
        required: null,
        pattern: null,
        range: null,
        length: null
      }
    };
  },
  computed: {
    show: function show() {
      if (this.data && Object.keys(this.data).length > 0) {
        return true;
      }

      return false;
    }
  },
  methods: {
    handleOptionsRemove: function handleOptionsRemove(index) {
      if (this.data.type === 'grid') {
        this.data.columns.splice(index, 1);
      } else {
        this.data.options.options.splice(index, 1);
      }
    },
    handleAddOption: function handleAddOption() {
      if (this.data.options.showLabel) {
        this.data.options.options.push({
          value: '新选项',
          label: '新选项'
        });
      } else {
        this.data.options.options.push({
          value: '新选项'
        });
      }
    },
    handleAddColumn: function handleAddColumn() {
      this.data.columns.push({
        span: '',
        list: []
      });
    },
    generateRule: function generateRule() {
      var _this = this;

      this.data.rules = [];
      Object.keys(this.validator).forEach(function (key) {
        if (_this.validator[key]) {
          _this.data.rules.push(_this.validator[key]);
        }
      });
    },
    handleSelectMuliple: function handleSelectMuliple(value) {
      if (value) {
        if (this.data.options.defaultValue) {
          this.data.options.defaultValue = [this.data.options.defaultValue];
        } else {
          this.data.options.defaultValue = [];
        }
      } else {
        if (this.data.options.defaultValue.length > 0) {
          this.data.options.defaultValue = this.data.options.defaultValue[0];
        } else {
          this.data.options.defaultValue = '';
        }
      }
    }
  },
  watch: {
    'data.options.isRange': function dataOptionsIsRange(val) {
      console.log('range,', val);

      if (typeof val !== 'undefined') {
        if (val) {
          this.data.options.defaultValue = null;
        } else {
          if (Object.keys(this.data.options).indexOf('defaultValue') >= 0) this.data.options.defaultValue = '';
        }
      }
    },
    'data.options.required': function dataOptionsRequired(val) {
      var _this2 = this;

      if (val) {
        this.validator.required = {
          required: true,
          message: "".concat(this.data.name, "\u5FC5\u987B\u586B\u5199")
        };
      } else {
        this.validator.required = null;
      }

      this.$nextTick(function () {
        _this2.generateRule();
      });
    },
    'data.options.dataType': function dataOptionsDataType(val) {
      if (!this.show) {
        return false;
      }

      if (val) {
        this.validator.type = {
          type: val,
          message: this.data.name + '格式不正确'
        };
      } else {
        this.validator.type = null;
      }

      this.generateRule();
    },
    'data.options.pattern': function dataOptionsPattern(val) {
      if (!this.show) {
        return false;
      }

      if (val) {
        this.validator.pattern = {
          pattern: eval(val),
          message: this.data.name + '格式不匹配'
        };
      } else {
        this.validator.pattern = null;
      }

      this.generateRule();
    }
  }
});

/***/ }),

/***/ "a25f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "a374":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "a5b8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("d8e8");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "b325":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "bcaa":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var isObject = __webpack_require__("d3f4");
var newPromiseCapability = __webpack_require__("a5b8");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d7cd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CusDialog_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5b5f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CusDialog_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CusDialog_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CusDialog_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "dcbc":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("2aba");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "df9a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_css_loader_index_js_ref_6_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_lib_index_js_ref_6_oneOf_1_2_cache_loader_dist_cjs_js_ref_0_0_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a374");
/* harmony import */ var _mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_css_loader_index_js_ref_6_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_lib_index_js_ref_6_oneOf_1_2_cache_loader_dist_cjs_js_ref_0_0_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_css_loader_index_js_ref_6_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_lib_index_js_ref_6_oneOf_1_2_cache_loader_dist_cjs_js_ref_0_0_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_css_loader_index_js_ref_6_oneOf_1_1_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_lib_index_js_ref_6_oneOf_1_2_cache_loader_dist_cjs_js_ref_0_0_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "ebd6":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("cb7c");
var aFunction = __webpack_require__("d8e8");
var SPECIES = __webpack_require__("2b4c")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "f5df":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f605":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
var setPublicPath = __webpack_require__("1eb2");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: ./node_modules/normalize.css/normalize.css
var normalize = __webpack_require__("f5df");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/vue-awesome/components/Icon.vue?vue&type=script&lang=js&
function Iconvue_type_script_lang_js_assign(obj, ...sources) {
  sources.forEach(source => {
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        obj[key] = source[key];
      }
    }
  });
  return obj;
}

let icons = {};
/* harmony default export */ var Iconvue_type_script_lang_js_ = ({
  name: 'fa-icon',

  render(h) {
    let options = {
      class: this.klass,
      style: this.style,
      attrs: {
        role: this.label ? 'img' : 'presentation',
        'aria-label': this.label || null,
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        viewBox: this.box
      }
    };

    if (this.raw) {
      options.domProps = {
        innerHTML: this.raw
      };
    }

    return h('svg', options, this.raw && this.icon ? null : this.$slots.default || [...this.icon.paths.map((path, i) => h('path', {
      attrs: path,
      key: `path-${i}`
    })), ...this.icon.polygons.map((polygon, i) => h('polygon', {
      attrs: polygon,
      key: `polygon-${i}`
    }))]);
  },

  props: {
    name: {
      type: String,

      validator(val) {
        if (val && !(val in icons)) {
          console.warn(`Invalid prop: prop "name" is referring to an unregistered icon "${val}".` + `\nPlease make sure you have imported this icon before using it.`);
          return false;
        }

        return true;
      }

    },
    scale: [Number, String],
    spin: Boolean,
    inverse: Boolean,
    pulse: Boolean,
    flip: {
      validator(val) {
        return val === 'horizontal' || val === 'vertical';
      }

    },
    label: String
  },

  data() {
    return {
      x: false,
      y: false,
      childrenWidth: 0,
      childrenHeight: 0,
      outerScale: 1
    };
  },

  computed: {
    normalizedScale() {
      let scale = this.scale;
      scale = typeof scale === 'undefined' ? 1 : Number(scale);

      if (isNaN(scale) || scale <= 0) {
        console.warn(`Invalid prop: prop "scale" should be a number over 0.`, this);
        return this.outerScale;
      }

      return scale * this.outerScale;
    },

    klass() {
      return {
        'fa-icon': true,
        'fa-spin': this.spin,
        'fa-flip-horizontal': this.flip === 'horizontal',
        'fa-flip-vertical': this.flip === 'vertical',
        'fa-inverse': this.inverse,
        'fa-pulse': this.pulse,
        [this.$options.name]: true
      };
    },

    icon() {
      if (this.name) {
        return icons[this.name];
      }

      return null;
    },

    box() {
      if (this.icon) {
        return `0 0 ${this.icon.width} ${this.icon.height}`;
      }

      return `0 0 ${this.width} ${this.height}`;
    },

    ratio() {
      if (!this.icon) {
        return 1;
      }

      let {
        width,
        height
      } = this.icon;
      return Math.max(width, height) / 16;
    },

    width() {
      return this.childrenWidth || this.icon && this.icon.width / this.ratio * this.normalizedScale || 0;
    },

    height() {
      return this.childrenHeight || this.icon && this.icon.height / this.ratio * this.normalizedScale || 0;
    },

    style() {
      if (this.normalizedScale === 1) {
        return false;
      }

      return {
        fontSize: this.normalizedScale + 'em'
      };
    },

    raw() {
      // generate unique id for each icon's SVG element with ID
      if (!this.icon || !this.icon.raw) {
        return null;
      }

      let raw = this.icon.raw;
      let ids = {};
      raw = raw.replace(/\s(?:xml:)?id=(["']?)([^"')\s]+)\1/g, (match, quote, id) => {
        let uniqueId = getId();
        ids[id] = uniqueId;
        return ` id="${uniqueId}"`;
      });
      raw = raw.replace(/#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g, (match, rawId, _, pointerId) => {
        let id = rawId || pointerId;

        if (!id || !ids[id]) {
          return match;
        }

        return `#${ids[id]}`;
      });
      return raw;
    }

  },

  mounted() {
    if (!this.name && this.$children.length === 0) {
      console.warn(`Invalid prop: prop "name" is required.`);
      return;
    }

    if (this.icon) {
      return;
    }

    let width = 0;
    let height = 0;
    this.$children.forEach(child => {
      child.outerScale = this.normalizedScale;
      width = Math.max(width, child.width);
      height = Math.max(height, child.height);
    });
    this.childrenWidth = width;
    this.childrenHeight = height;
    this.$children.forEach(child => {
      child.x = (width - child.width) / 2;
      child.y = (height - child.height) / 2;
    });
  },

  register(data) {
    for (let name in data) {
      let icon = data[name];
      let {
        paths = [],
        d,
        polygons = [],
        points
      } = icon;

      if (d) {
        paths.push({
          d
        });
      }

      if (points) {
        polygons.push({
          points
        });
      }

      icons[name] = Iconvue_type_script_lang_js_assign({}, icon, {
        paths,
        polygons
      });
    }
  },

  icons
});
let cursor = 0xd4937;

function getId() {
  return `fa-${(cursor++).toString(16)}`;
}
// CONCATENATED MODULE: ./node_modules/vue-awesome/components/Icon.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Iconvue_type_script_lang_js_ = (Iconvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-awesome/components/Icon.vue?vue&type=style&index=0&lang=css&
var Iconvue_type_style_index_0_lang_css_ = __webpack_require__("df9a");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./node_modules/vue-awesome/components/Icon.vue
var render, staticRenderFns





/* normalize component */

var component = normalizeComponent(
  components_Iconvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "Icon.vue"
/* harmony default export */ var Icon = (component.exports);
// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/keyboard.js


Icon.register({"regular/keyboard":{"width":576,"height":512,"paths":[{"d":"M528 64H48C21.5 64 0 85.5 0 112V400C0 426.5 21.5 448 48 448H528C554.5 448 576 426.5 576 400V112C576 85.5 554.5 64 528 64zM536 400C536 404.4 532.4 408 528 408H48C43.6 408 40 404.4 40 400V112C40 107.6 43.6 104 48 104H528C532.4 104 536 107.6 536 112V400zM170 270V242C170 235.4 164.6 230 158 230H130C123.4 230 118 235.4 118 242V270C118 276.6 123.4 282 130 282H158C164.6 282 170 276.6 170 270zM266 270V242C266 235.4 260.6 230 254 230H226C219.4 230 214 235.4 214 242V270C214 276.6 219.4 282 226 282H254C260.6 282 266 276.6 266 270zM362 270V242C362 235.4 356.6 230 350 230H322C315.4 230 310 235.4 310 242V270C310 276.6 315.4 282 322 282H350C356.6 282 362 276.6 362 270zM458 270V242C458 235.4 452.6 230 446 230H418C411.4 230 406 235.4 406 242V270C406 276.6 411.4 282 418 282H446C452.6 282 458 276.6 458 270zM122 352V324C122 317.4 116.6 312 110 312H82C75.4 312 70 317.4 70 324V352C70 358.6 75.4 364 82 364H110C116.6 364 122 358.6 122 352zM506 352V324C506 317.4 500.6 312 494 312H466C459.4 312 454 317.4 454 324V352C454 358.6 459.4 364 466 364H494C500.6 364 506 358.6 506 352zM122 188V160C122 153.4 116.6 148 110 148H82C75.4 148 70 153.4 70 160V188C70 194.6 75.4 200 82 200H110C116.6 200 122 194.6 122 188zM218 188V160C218 153.4 212.6 148 206 148H178C171.4 148 166 153.4 166 160V188C166 194.6 171.4 200 178 200H206C212.6 200 218 194.6 218 188zM314 188V160C314 153.4 308.6 148 302 148H274C267.4 148 262 153.4 262 160V188C262 194.6 267.4 200 274 200H302C308.6 200 314 194.6 314 188zM410 188V160C410 153.4 404.6 148 398 148H370C363.4 148 358 153.4 358 160V188C358 194.6 363.4 200 370 200H398C404.6 200 410 194.6 410 188zM506 188V160C506 153.4 500.6 148 494 148H466C459.4 148 454 153.4 454 160V188C454 194.6 459.4 200 466 200H494C500.6 200 506 194.6 506 188zM408 346V330C408 323.4 402.6 318 396 318H180C173.4 318 168 323.4 168 330V346C168 352.6 173.4 358 180 358H396C402.6 358 408 352.6 408 346z"}]}})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/trash-alt.js


Icon.register({"regular/trash-alt":{"width":448,"height":512,"paths":[{"d":"M192 188V404C192 410.6 186.6 416 180 416H156C149.4 416 144 410.6 144 404V188C144 181.4 149.4 176 156 176H180C186.6 176 192 181.4 192 188zM292 176H268C261.4 176 256 181.4 256 188V404C256 410.6 261.4 416 268 416H292C298.6 416 304 410.6 304 404V188C304 181.4 298.6 176 292 176zM424 80C437.3 80 448 90.7 448 104V116C448 122.6 442.6 128 436 128H416V464C416 490.5 394.5 512 368 512H80C53.5 512 32 490.5 32 464V128H12C5.4 128 0 122.6 0 116V104C0 90.7 10.7 80 24 80H98.4L132.4 23.3A48-48 0 0 0 173.6 0H274.4A48-48 0 0 0 315.6 23.3L349.6 80H424zM154.4 80H293.6L276.2 50.9A6-6 0 0 1 271 48H177A6-6 0 0 1 171.8 50.9L154.4 80zM368 128H80V458A6-6 0 0 1 86 464H362A6-6 0 0 1 368 458V128z"}]}})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/clone.js


Icon.register({"regular/clone":{"width":512,"height":512,"paths":[{"d":"M464 0H144C117.5 0 96 21.5 96 48V96H48C21.5 96 0 117.5 0 144V464C0 490.5 21.5 512 48 512H368C394.5 512 416 490.5 416 464V416H464C490.5 416 512 394.5 512 368V48C512 21.5 490.5 0 464 0zM362 464H54A6-6 0 0 0 48 458V150A6-6 0 0 0 54 144H96V368C96 394.5 117.5 416 144 416H368V458A6-6 0 0 0 362 464zM458 368H150A6-6 0 0 0 144 362V54A6-6 0 0 0 150 48H458A6-6 0 0 0 464 54V362A6-6 0 0 0 458 368z"}]}})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/dot-circle.js


Icon.register({"regular/dot-circle":{"width":512,"height":512,"paths":[{"d":"M256 56C366.5 56 456 145.5 456 256 456 366.5 366.5 456 256 456 145.5 456 56 366.5 56 256 56 145.5 145.5 56 256 56M256 8C119 8 8 119 8 256S119 504 256 504 504 393 504 256 393 8 256 8zM256 176C211.8 176 176 211.8 176 256S211.8 336 256 336 336 300.2 336 256 300.2 176 256 176z"}]}})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/check-square.js


Icon.register({"regular/check-square":{"width":448,"height":512,"paths":[{"d":"M400 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H400C426.5 480 448 458.5 448 432V80C448 53.5 426.5 32 400 32zM400 432H48V80H400V432zM364.1 190.3L191.5 361.5C186.8 366.1 179.2 366.1 174.6 361.4L83.8 269.9C79.1 265.2 79.2 257.6 83.9 252.9L106.6 230.4C111.3 225.7 118.9 225.8 123.6 230.5L183.3 290.7 324.7 150.5C329.4 145.9 337 145.9 341.7 150.6L364.2 173.3C368.9 178 368.8 185.6 364.1 190.3z"}]}})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/bars.js


Icon.register({"bars":{"width":448,"height":512,"paths":[{"d":"M16 132H432C440.8 132 448 124.8 448 116V76C448 67.2 440.8 60 432 60H16C7.2 60 0 67.2 0 76V116C0 124.8 7.2 132 16 132zM16 292H432C440.8 292 448 284.8 448 276V236C448 227.2 440.8 220 432 220H16C7.2 220 0 227.2 0 236V276C0 284.8 7.2 292 16 292zM16 452H432C440.8 452 448 444.8 448 436V396C448 387.2 440.8 380 432 380H16C7.2 380 0 387.2 0 396V436C0 444.8 7.2 452 16 452z"}]}})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/calendar-alt.js


Icon.register({"regular/calendar-alt":{"width":448,"height":512,"paths":[{"d":"M148 288H108C101.4 288 96 282.6 96 276V236C96 229.4 101.4 224 108 224H148C154.6 224 160 229.4 160 236V276C160 282.6 154.6 288 148 288zM256 276V236C256 229.4 250.6 224 244 224H204C197.4 224 192 229.4 192 236V276C192 282.6 197.4 288 204 288H244C250.6 288 256 282.6 256 276zM352 276V236C352 229.4 346.6 224 340 224H300C293.4 224 288 229.4 288 236V276C288 282.6 293.4 288 300 288H340C346.6 288 352 282.6 352 276zM256 372V332C256 325.4 250.6 320 244 320H204C197.4 320 192 325.4 192 332V372C192 378.6 197.4 384 204 384H244C250.6 384 256 378.6 256 372zM160 372V332C160 325.4 154.6 320 148 320H108C101.4 320 96 325.4 96 332V372C96 378.6 101.4 384 108 384H148C154.6 384 160 378.6 160 372zM352 372V332C352 325.4 346.6 320 340 320H300C293.4 320 288 325.4 288 332V372C288 378.6 293.4 384 300 384H340C346.6 384 352 378.6 352 372zM448 112V464C448 490.5 426.5 512 400 512H48C21.5 512 0 490.5 0 464V112C0 85.5 21.5 64 48 64H96V12C96 5.4 101.4 0 108 0H148C154.6 0 160 5.4 160 12V64H288V12C288 5.4 293.4 0 300 0H340C346.6 0 352 5.4 352 12V64H400C426.5 64 448 85.5 448 112zM400 458V160H48V458C48 461.3 50.7 464 54 464H394C397.3 464 400 461.3 400 458z"}]}})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/clock.js


Icon.register({"regular/clock":{"width":512,"height":512,"paths":[{"d":"M256 8C119 8 8 119 8 256S119 504 256 504 504 393 504 256 393 8 256 8zM256 456C145.5 456 56 366.5 56 256S145.5 56 256 56 456 145.5 456 256 366.5 456 256 456zM317.8 351.6L232.9 289.9C229.8 287.6 228 284 228 280.2V116C228 109.4 233.4 104 240 104H272C278.6 104 284 109.4 284 116V257.7L350.8 306.3C356.2 310.2 357.3 317.7 353.4 323.1L334.6 349C330.7 354.3 323.2 355.5 317.8 351.6z"}]}})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/th.js


Icon.register({"th":{"width":512,"height":512,"paths":[{"d":"M149.3 56V136C149.3 149.3 138.6 160 125.3 160H24C10.7 160 0 149.3 0 136V56C0 42.7 10.7 32 24 32H125.3C138.6 32 149.3 42.7 149.3 56zM330.7 296V216C330.7 202.7 319.9 192 306.7 192H205.3C192.1 192 181.3 202.7 181.3 216V296C181.3 309.3 192.1 320 205.3 320H306.7C319.9 320 330.7 309.3 330.7 296zM362.7 56V136C362.7 149.3 373.4 160 386.7 160H488C501.3 160 512 149.3 512 136V56C512 42.7 501.3 32 488 32H386.7C373.4 32 362.7 42.7 362.7 56zM330.7 136V56C330.7 42.7 319.9 32 306.7 32H205.3C192.1 32 181.3 42.7 181.3 56V136C181.3 149.3 192.1 160 205.3 160H306.7C319.9 160 330.7 149.3 330.7 136zM125.3 192H24C10.7 192 0 202.7 0 216V296C0 309.3 10.7 320 24 320H125.3C138.6 320 149.3 309.3 149.3 296V216C149.3 202.7 138.6 192 125.3 192zM0 376V456C0 469.3 10.7 480 24 480H125.3C138.6 480 149.3 469.3 149.3 456V376C149.3 362.7 138.6 352 125.3 352H24C10.7 352 0 362.7 0 376zM386.7 320H488C501.3 320 512 309.3 512 296V216C512 202.7 501.3 192 488 192H386.7C373.4 192 362.7 202.7 362.7 216V296C362.7 309.3 373.4 320 386.7 320zM386.7 480H488C501.3 480 512 469.3 512 456V376C512 362.7 501.3 352 488 352H386.7C373.4 352 362.7 362.7 362.7 376V456C362.7 469.3 373.4 480 386.7 480zM181.3 376V456C181.3 469.3 192.1 480 205.3 480H306.7C319.9 480 330.7 469.3 330.7 456V376C330.7 362.7 319.9 352 306.7 352H205.3C192.1 352 181.3 362.7 181.3 376z"}]}})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/sort-numeric-up.js


Icon.register({"sort-numeric-up":{"width":448,"height":512,"paths":[{"d":"M308.8 113.8L289.4 93C284.8 88.2 285.1 80.6 289.9 76L333.4 35.3A12-12 0 0 0 341.6 32.1H373.2C379.8 32.1 385.2 37.4 385.2 44.1V171.1H410.8C417.4 171.1 422.8 176.5 422.8 183.1V212.1C422.8 218.7 417.4 224.1 410.8 224.1H301.6C295 224.1 289.6 218.7 289.6 212.1V183.1C289.6 176.5 295 171.1 301.6 171.1H327.1V113.2C319.8 119.8 312.9 118.1 308.8 113.8zM278.2 352.4C278.2 319.7 302.1 285 346.3 285 384.6 285 425.8 313.9 425.8 377.2 425.8 428.5 393.5 483 333.8 483 315.9 483 303.2 479.4 295.2 476.2 289.4 473.9 286.4 467.5 288.3 461.5L297.5 432C299.6 425.5 306.6 422.1 313 424.3 326 428.9 340.9 429.6 351.1 420.2 312.4 425.3 278.2 394.8 278.2 352.4zM370.5 371.7C370.5 349.4 355.2 335.2 344.7 335.2 336 335.2 331.5 343.2 331.5 351 331.5 356.7 333.3 375.2 356.7 375.2 366.7 375.2 370.1 373 370.4 372.5 370.4 372.4 370.5 372.2 370.5 371.7zM16 144H64V464C64 472.8 71.2 480 80 480H112C120.8 480 128 472.8 128 464V144H176C190.2 144 197.4 126.8 187.3 116.7L107.3 36.7C101.1 30.4 90.9 30.4 84.7 36.7L4.7 116.7C-5.3 126.7 1.8 144 16 144z"}]}})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/star.js


Icon.register({"regular/star":{"width":576,"height":512,"paths":[{"d":"M528.1 171.5L382 150.2 316.7 17.8C305-5.8 271.1-6.1 259.3 17.8L194 150.2 47.9 171.5C21.7 175.3 11.2 207.6 30.2 226.1L135.9 329.1 110.9 474.6C106.4 500.9 134.1 520.6 157.3 508.3L288 439.6 418.7 508.3C441.9 520.5 469.6 500.9 465.1 474.6L440.1 329.1 545.8 226.1C564.8 207.6 554.3 175.3 528.1 171.5zM388.6 312.3L412.3 450.7 288 385.4 163.7 450.7 187.4 312.3 86.8 214.3 225.8 194.1 288 68.1 350.2 194.1 489.2 214.3 388.6 312.3z"}]}})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/palette.js


Icon.register({"palette":{"width":512,"height":512,"paths":[{"d":"M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4-31.8 390.4 136.9 529.8 264 510.1 305.2 503.7 325.4 455.5 306.5 418.4 283.4 373 316.4 320 367.4 320H447.1C482.9 320 511.9 290.4 512 254.7 511.5 97.1 368.1-26.9 204.3 5zM96 320C78.3 320 64 305.7 64 288S78.3 256 96 256 128 270.3 128 288 113.7 320 96 320zM128 192C110.3 192 96 177.7 96 160S110.3 128 128 128 160 142.3 160 160 145.7 192 128 192zM256 128C238.3 128 224 113.7 224 96S238.3 64 256 64 288 78.3 288 96 273.7 128 256 128zM384 192C366.3 192 352 177.7 352 160S366.3 128 384 128 416 142.3 416 160 401.7 192 384 192z"}]}})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/regular/caret-square-down.js


Icon.register({"regular/caret-square-down":{"width":448,"height":512,"paths":[{"d":"M125.1 208H322.9C333.6 208 339 221 331.4 228.5L232.5 326.8C227.8 331.5 220.3 331.5 215.6 326.8L116.7 228.5C109 221 114.4 208 125.1 208zM448 80V432C448 458.5 426.5 480 400 480H48C21.5 480 0 458.5 0 432V80C0 53.5 21.5 32 48 32H400C426.5 32 448 53.5 448 80zM400 426V86C400 82.7 397.3 80 394 80H54C50.7 80 48 82.7 48 86V426C48 429.3 50.7 432 54 432H394C397.3 432 400 429.3 400 426z"}]}})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/toggle-off.js


Icon.register({"toggle-off":{"width":576,"height":512,"paths":[{"d":"M384 64H192C86 64 0 150 0 256S86 448 192 448H384C490 448 576 362 576 256S490 64 384 64zM64 256C64 185.3 121.2 128 192 128 262.7 128 320 185.2 320 256 320 326.7 262.8 384 192 384 121.3 384 64 326.8 64 256zM384 384H335.1C400.3 311.1 400.3 200.9 335.1 128H384C454.7 128 512 185.2 512 256 512 326.7 454.8 384 384 384z"}]}})

// CONCATENATED MODULE: ./node_modules/vue-awesome/icons/sliders-h.js


Icon.register({"sliders-h":{"width":512,"height":512,"paths":[{"d":"M496 384H160V368C160 359.2 152.8 352 144 352H112C103.2 352 96 359.2 96 368V384H16C7.2 384 0 391.2 0 400V432C0 440.8 7.2 448 16 448H96V464C96 472.8 103.2 480 112 480H144C152.8 480 160 472.8 160 464V448H496C504.8 448 512 440.8 512 432V400C512 391.2 504.8 384 496 384zM496 224H416V208C416 199.2 408.8 192 400 192H368C359.2 192 352 199.2 352 208V224H16C7.2 224 0 231.2 0 240V272C0 280.8 7.2 288 16 288H352V304C352 312.8 359.2 320 368 320H400C408.8 320 416 312.8 416 304V288H496C504.8 288 512 280.8 512 272V240C512 231.2 504.8 224 496 224zM496 64H288V48C288 39.2 280.8 32 272 32H240C231.2 32 224 39.2 224 48V64H16C7.2 64 0 71.2 0 80V112C0 120.8 7.2 128 16 128H224V144C224 152.8 231.2 160 240 160H272C280.8 160 288 152.8 288 144V128H496C504.8 128 512 120.8 512 112V80C512 71.2 504.8 64 496 64z"}]}})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3a86e180-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Container.vue?vue&type=template&id=6215ae9d&
var Containervue_type_template_id_6215ae9d_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-container',[_c('el-aside',{staticStyle:{"wdith":"250px"}},[_c('div',{staticClass:"components-list"},[_c('div',{staticClass:"widget-cate"},[_vm._v("基础字段")]),_c('draggable',{attrs:{"element":"ul","list":_vm.basicComponents,"options":{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'},"move":_vm.handleMove},on:{"end":_vm.handleMoveEnd,"start":_vm.handleMoveStart}},_vm._l((_vm.basicComponents),function(item,index){return _c('li',{key:index,staticClass:"form-edit-widget-label"},[_c('a',[_c('icon',{staticClass:"icon",attrs:{"name":item.icon}}),_c('span',[_vm._v(_vm._s(item.name))])],1)])})),_c('div',{staticClass:"widget-cate"},[_vm._v("布局字段")]),_c('draggable',{attrs:{"element":"ul","list":_vm.layoutComponents,"options":{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'},"move":_vm.handleMove},on:{"end":_vm.handleMoveEnd,"start":_vm.handleMoveStart}},_vm._l((_vm.layoutComponents),function(item,index){return _c('li',{key:index,staticClass:"form-edit-widget-label data-grid"},[_c('a',[_c('icon',{staticClass:"icon",attrs:{"name":item.icon}}),_c('span',[_vm._v(_vm._s(item.name))])],1)])}))],1)]),_c('el-container',{staticClass:"center-container",attrs:{"direction":"vertical"}},[_c('el-header',{staticClass:"btn-bar",staticStyle:{"height":"45px"}},[_c('el-button',{attrs:{"type":"text","size":"medium","icon":"el-icon-view"},on:{"click":_vm.handlePreview}},[_vm._v("预览")])],1),_c('el-main',[_c('widget-form',{ref:"widgetForm",attrs:{"data":_vm.widgetForm,"select":_vm.widgetFormSelect},on:{"update:select":function($event){_vm.widgetFormSelect=$event}}})],1)],1),_c('el-aside',{staticClass:"widget-config-container"},[_c('el-container',[_c('el-header',{attrs:{"height":"45px"}},[_c('div',{staticClass:"config-tab",class:{active: _vm.configTab=='widget'},on:{"click":function($event){_vm.handleConfigSelect('widget')}}},[_vm._v("字段属性")]),_c('div',{staticClass:"config-tab",class:{active: _vm.configTab=='form'},on:{"click":function($event){_vm.handleConfigSelect('form')}}},[_vm._v("表单属性")])]),_c('el-main',{staticClass:"config-content"},[_c('widget-config',{directives:[{name:"show",rawName:"v-show",value:(_vm.configTab=='widget'),expression:"configTab=='widget'"}],attrs:{"data":_vm.widgetFormSelect}}),_c('form-config',{directives:[{name:"show",rawName:"v-show",value:(_vm.configTab=='form'),expression:"configTab=='form'"}],attrs:{"data":_vm.widgetForm.config}})],1)],1)],1),_c('cus-dialog',{ref:"widgetPreview",attrs:{"visible":_vm.previewVisible,"width":"1000px"},on:{"on-close":function($event){_vm.previewVisible = false},"on-submit":_vm.handleTest}},[_c('generate-form',{ref:"generateForm",attrs:{"data":_vm.widgetForm}})],1)],1)}
var Containervue_type_template_id_6215ae9d_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Container.vue?vue&type=template&id=6215ae9d&

// EXTERNAL MODULE: ./node_modules/vuedraggable/dist/vuedraggable.js
var vuedraggable = __webpack_require__("1516");
var vuedraggable_default = /*#__PURE__*/__webpack_require__.n(vuedraggable);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3a86e180-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WidgetConfig.vue?vue&type=template&id=00323108&
var WidgetConfigvue_type_template_id_00323108_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.show)?_c('div',[_c('el-form',{attrs:{"label-position":"top"}},[(_vm.data.type!='grid')?_c('el-form-item',{attrs:{"label":"标题"}},[_c('el-input',{model:{value:(_vm.data.name),callback:function ($$v) {_vm.$set(_vm.data, "name", $$v)},expression:"data.name"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('width')>=0)?_c('el-form-item',{attrs:{"label":"宽度"}},[_c('el-input',{model:{value:(_vm.data.options.width),callback:function ($$v) {_vm.$set(_vm.data.options, "width", $$v)},expression:"data.options.width"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('placeholder')>=0 && (_vm.data.type!='time' || _vm.data.type!='date'))?_c('el-form-item',{attrs:{"label":"占位内容"}},[_c('el-input',{model:{value:(_vm.data.options.placeholder),callback:function ($$v) {_vm.$set(_vm.data.options, "placeholder", $$v)},expression:"data.options.placeholder"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('inline')>=0)?_c('el-form-item',{attrs:{"label":"布局方式"}},[_c('el-radio-group',{model:{value:(_vm.data.options.inline),callback:function ($$v) {_vm.$set(_vm.data.options, "inline", $$v)},expression:"data.options.inline"}},[_c('el-radio-button',{attrs:{"label":false}},[_vm._v("块级")]),_c('el-radio-button',{attrs:{"label":true}},[_vm._v("行内")])],1)],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('showInput')>=0)?_c('el-form-item',{attrs:{"label":"显示输入框"}},[_c('el-switch',{model:{value:(_vm.data.options.showInput),callback:function ($$v) {_vm.$set(_vm.data.options, "showInput", $$v)},expression:"data.options.showInput"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('min')>=0)?_c('el-form-item',{attrs:{"label":"最小值"}},[_c('el-input-number',{attrs:{"min":0,"max":100,"step":1},model:{value:(_vm.data.options.min),callback:function ($$v) {_vm.$set(_vm.data.options, "min", $$v)},expression:"data.options.min"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('max')>=0)?_c('el-form-item',{attrs:{"label":"最小值"}},[_c('el-input-number',{attrs:{"min":0,"max":100,"step":1},model:{value:(_vm.data.options.max),callback:function ($$v) {_vm.$set(_vm.data.options, "max", $$v)},expression:"data.options.max"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('step')>=0)?_c('el-form-item',{attrs:{"label":"步长"}},[_c('el-input-number',{attrs:{"min":0,"max":100,"step":1},model:{value:(_vm.data.options.step),callback:function ($$v) {_vm.$set(_vm.data.options, "step", $$v)},expression:"data.options.step"}})],1):_vm._e(),(_vm.data.type=='select')?_c('el-form-item',{attrs:{"label":"是否多选"}},[_c('el-switch',{on:{"change":_vm.handleSelectMuliple},model:{value:(_vm.data.options.multiple),callback:function ($$v) {_vm.$set(_vm.data.options, "multiple", $$v)},expression:"data.options.multiple"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('allowHalf')>=0)?_c('el-form-item',{attrs:{"label":"允许半选"}},[_c('el-switch',{model:{value:(_vm.data.options.allowHalf),callback:function ($$v) {_vm.$set(_vm.data.options, "allowHalf", $$v)},expression:"data.options.allowHalf"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('showAlpha')>=0)?_c('el-form-item',{attrs:{"label":"支持透明度选择"}},[_c('el-switch',{model:{value:(_vm.data.options.showAlpha),callback:function ($$v) {_vm.$set(_vm.data.options, "showAlpha", $$v)},expression:"data.options.showAlpha"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('showLabel')>=0)?_c('el-form-item',{attrs:{"label":"是否显示标签"}},[_c('el-switch',{model:{value:(_vm.data.options.showLabel),callback:function ($$v) {_vm.$set(_vm.data.options, "showLabel", $$v)},expression:"data.options.showLabel"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('options')>=0)?_c('el-form-item',{attrs:{"label":"选项"}},[(_vm.data.type=='radio' || (_vm.data.type=='select'&&!_vm.data.options.multiple))?[_c('el-radio-group',{model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}},[_c('draggable',{attrs:{"element":"ul","list":_vm.data.options.options,"options":{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}}},_vm._l((_vm.data.options.options),function(item,index){return _c('li',{key:index},[_c('el-radio',{staticStyle:{"margin-right":"5px"},attrs:{"label":item.value}},[_c('el-input',{style:({'width': _vm.data.options.showLabel? '90px': '190px' }),attrs:{"size":"mini"},model:{value:(item.value),callback:function ($$v) {_vm.$set(item, "value", $$v)},expression:"item.value"}}),(_vm.data.options.showLabel)?_c('el-input',{staticStyle:{"width":"100px"},attrs:{"size":"mini"},model:{value:(item.label),callback:function ($$v) {_vm.$set(item, "label", $$v)},expression:"item.label"}}):_vm._e()],1),_c('i',{staticClass:"drag-item",staticStyle:{"font-size":"16px","margin":"0 5px","cursor":"move"}},[_c('icon',{attrs:{"name":"bars"}})],1),_c('el-button',{staticStyle:{"padding":"4px","margin-left":"5px"},attrs:{"circle":"","plain":"","type":"danger","size":"mini","icon":"el-icon-minus"},on:{"click":function($event){_vm.handleOptionsRemove(index)}}})],1)}))],1)]:_vm._e(),(_vm.data.type=='checkbox' || (_vm.data.type=='select' && _vm.data.options.multiple))?[_c('el-checkbox-group',{model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}},[_c('draggable',{attrs:{"element":"ul","list":_vm.data.options.options,"options":{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}}},_vm._l((_vm.data.options.options),function(item,index){return _c('li',{key:index},[_c('el-checkbox',{staticStyle:{"margin-right":"5px"},attrs:{"label":item.value}},[_c('el-input',{style:({'width': _vm.data.options.showLabel? '90px': '190px' }),attrs:{"size":"mini"},model:{value:(item.value),callback:function ($$v) {_vm.$set(item, "value", $$v)},expression:"item.value"}}),(_vm.data.options.showLabel)?_c('el-input',{staticStyle:{"width":"100px"},attrs:{"size":"mini"},model:{value:(item.label),callback:function ($$v) {_vm.$set(item, "label", $$v)},expression:"item.label"}}):_vm._e()],1),_c('i',{staticClass:"drag-item",staticStyle:{"font-size":"16px","margin":"0 5px","cursor":"move"}},[_c('icon',{attrs:{"name":"bars"}})],1),_c('el-button',{staticStyle:{"padding":"4px","margin-left":"5px"},attrs:{"circle":"","plain":"","type":"danger","size":"mini","icon":"el-icon-minus"},on:{"click":function($event){_vm.handleOptionsRemove(index)}}})],1)}))],1)]:_vm._e(),_c('div',{staticStyle:{"margin-left":"22px"}},[_c('el-button',{attrs:{"type":"text"},on:{"click":_vm.handleAddOption}},[_vm._v("添加选项")])],1)],2):_vm._e(),(Object.keys(_vm.data.options).indexOf('defaultValue')>=0 && (_vm.data.type == 'textarea' || _vm.data.type == 'input' || _vm.data.type=='rate' || _vm.data.type=='color' || _vm.data.type=='switch'))?_c('el-form-item',{attrs:{"label":"默认值"}},[(_vm.data.type=='textarea')?_c('el-input',{attrs:{"type":"textarea","rows":5},model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}}):_vm._e(),(_vm.data.type=='input')?_c('el-input',{model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}}):_vm._e(),(_vm.data.type == 'rate')?_c('el-rate',{attrs:{"allow-half":_vm.data.options.allowHalf},model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}}):_vm._e(),(_vm.data.type == 'color')?_c('el-color-picker',{attrs:{"show-alpha":_vm.data.options.showAlpha},model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}}):_vm._e(),(_vm.data.type=='switch')?_c('el-switch',{model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}}):_vm._e()],1):_vm._e(),(_vm.data.type == 'time' || _vm.data.type == 'date')?[(_vm.data.type == 'date')?_c('el-form-item',{attrs:{"label":"显示类型"}},[_c('el-select',{model:{value:(_vm.data.options.type),callback:function ($$v) {_vm.$set(_vm.data.options, "type", $$v)},expression:"data.options.type"}},[_c('el-option',{attrs:{"value":"year"}}),_c('el-option',{attrs:{"value":"month"}}),_c('el-option',{attrs:{"value":"date"}}),_c('el-option',{attrs:{"value":"dates"}}),_c('el-option',{attrs:{"value":"datetime"}}),_c('el-option',{attrs:{"value":"datetimerange"}}),_c('el-option',{attrs:{"value":"daterange"}})],1)],1):_vm._e(),(_vm.data.type == 'time')?_c('el-form-item',{attrs:{"label":"是否为范围选择"}},[_c('el-switch',{model:{value:(_vm.data.options.isRange),callback:function ($$v) {_vm.$set(_vm.data.options, "isRange", $$v)},expression:"data.options.isRange"}})],1):_vm._e(),(_vm.data.type == 'date')?_c('el-form-item',{attrs:{"label":"是否获取时间戳"}},[_c('el-switch',{model:{value:(_vm.data.options.timestamp),callback:function ($$v) {_vm.$set(_vm.data.options, "timestamp", $$v)},expression:"data.options.timestamp"}})],1):_vm._e(),((!_vm.data.options.isRange && _vm.data.type == 'time') || (_vm.data.type != 'time' && _vm.data.options.type != 'datetimerange' && _vm.data.options.type != 'daterange'))?_c('el-form-item',{attrs:{"label":"占位内容"}},[_c('el-input',{model:{value:(_vm.data.options.placeholder),callback:function ($$v) {_vm.$set(_vm.data.options, "placeholder", $$v)},expression:"data.options.placeholder"}})],1):_vm._e(),((_vm.data.options.isRange) || _vm.data.options.type=='datetimerange' || _vm.data.options.type=='daterange')?_c('el-form-item',{attrs:{"label":"开始时间占位内容"}},[_c('el-input',{model:{value:(_vm.data.options.startPlaceholder),callback:function ($$v) {_vm.$set(_vm.data.options, "startPlaceholder", $$v)},expression:"data.options.startPlaceholder"}})],1):_vm._e(),(_vm.data.options.isRange || _vm.data.options.type=='datetimerange' || _vm.data.options.type=='daterange')?_c('el-form-item',{attrs:{"label":"结束时间占位内容"}},[_c('el-input',{model:{value:(_vm.data.options.endPlaceholder),callback:function ($$v) {_vm.$set(_vm.data.options, "endPlaceholder", $$v)},expression:"data.options.endPlaceholder"}})],1):_vm._e(),_c('el-form-item',{attrs:{"label":"格式"}},[_c('el-input',{model:{value:(_vm.data.options.format),callback:function ($$v) {_vm.$set(_vm.data.options, "format", $$v)},expression:"data.options.format"}})],1),(_vm.data.type=='time' && Object.keys(_vm.data.options).indexOf('isRange')>=0)?_c('el-form-item',{attrs:{"label":"默认值"}},[(!_vm.data.options.isRange)?_c('el-time-picker',{key:"1",staticStyle:{"width":"100%"},attrs:{"arrowControl":_vm.data.options.arrowControl,"value-format":_vm.data.options.format},model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}}):_vm._e(),(_vm.data.options.isRange)?_c('el-time-picker',{key:"2",staticStyle:{"width":"100%"},attrs:{"is-range":"","arrowControl":_vm.data.options.arrowControl,"value-format":_vm.data.options.format},model:{value:(_vm.data.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.data.options, "defaultValue", $$v)},expression:"data.options.defaultValue"}}):_vm._e()],1):_vm._e()]:_vm._e(),(_vm.data.type == 'grid')?[_c('el-form-item',{attrs:{"label":"栅格间隔"}},[_c('el-input',{attrs:{"type":"number"},model:{value:(_vm.data.options.gutter),callback:function ($$v) {_vm.$set(_vm.data.options, "gutter", _vm._n($$v))},expression:"data.options.gutter"}})],1),_c('el-form-item',{attrs:{"label":"列配置项"}},[_c('draggable',{attrs:{"element":"ul","list":_vm.data.columns,"options":{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}}},_vm._l((_vm.data.columns),function(item,index){return _c('li',{key:index},[_c('i',{staticClass:"drag-item",staticStyle:{"font-size":"16px","margin":"0 5px","cursor":"move"}},[_c('icon',{attrs:{"name":"bars"}})],1),_c('el-input',{staticStyle:{"width":"100px"},attrs:{"placeholder":"栅格值","size":"mini","type":"number"},model:{value:(item.span),callback:function ($$v) {_vm.$set(item, "span", _vm._n($$v))},expression:"item.span"}}),_c('el-button',{staticStyle:{"padding":"4px","margin-left":"5px"},attrs:{"circle":"","plain":"","type":"danger","size":"mini","icon":"el-icon-minus"},on:{"click":function($event){_vm.handleOptionsRemove(index)}}})],1)})),_c('div',{staticStyle:{"margin-left":"22px"}},[_c('el-button',{attrs:{"type":"text"},on:{"click":_vm.handleAddColumn}},[_vm._v("添加列")])],1)],1),_c('el-form-item',{attrs:{"label":"水平排列方式"}},[_c('el-select',{model:{value:(_vm.data.options.justify),callback:function ($$v) {_vm.$set(_vm.data.options, "justify", $$v)},expression:"data.options.justify"}},[_c('el-option',{attrs:{"value":"start","label":"左对齐"}}),_c('el-option',{attrs:{"value":"end","label":"右对齐"}}),_c('el-option',{attrs:{"value":"center","label":"居中"}}),_c('el-option',{attrs:{"value":"space-around","label":"两侧间隔相等"}}),_c('el-option',{attrs:{"value":"space-between","label":"两端对齐"}})],1)],1),_c('el-form-item',{attrs:{"label":"垂直排列方式"}},[_c('el-select',{model:{value:(_vm.data.options.align),callback:function ($$v) {_vm.$set(_vm.data.options, "align", $$v)},expression:"data.options.align"}},[_c('el-option',{attrs:{"value":"top","label":"顶部对齐"}}),_c('el-option',{attrs:{"value":"middle","label":"居中"}}),_c('el-option',{attrs:{"value":"bottom","label":"底部对齐"}})],1)],1)]:_vm._e(),(_vm.data.type != 'grid')?[_c('el-form-item',{attrs:{"label":"操作属性"}},[(Object.keys(_vm.data.options).indexOf('readonly')>=0)?_c('el-checkbox',{model:{value:(_vm.data.options.readonly),callback:function ($$v) {_vm.$set(_vm.data.options, "readonly", $$v)},expression:"data.options.readonly"}},[_vm._v("完全只读")]):_vm._e(),(Object.keys(_vm.data.options).indexOf('disabled')>=0)?_c('el-checkbox',{model:{value:(_vm.data.options.disabled),callback:function ($$v) {_vm.$set(_vm.data.options, "disabled", $$v)},expression:"data.options.disabled"}},[_vm._v("禁用\t")]):_vm._e(),(Object.keys(_vm.data.options).indexOf('editable')>=0)?_c('el-checkbox',{model:{value:(_vm.data.options.editable),callback:function ($$v) {_vm.$set(_vm.data.options, "editable", $$v)},expression:"data.options.editable"}},[_vm._v("文本框可输入")]):_vm._e(),(Object.keys(_vm.data.options).indexOf('clearable')>=0)?_c('el-checkbox',{model:{value:(_vm.data.options.clearable),callback:function ($$v) {_vm.$set(_vm.data.options, "clearable", $$v)},expression:"data.options.clearable"}},[_vm._v("显示清除按钮")]):_vm._e(),(Object.keys(_vm.data.options).indexOf('arrowControl')>=0)?_c('el-checkbox',{model:{value:(_vm.data.options.arrowControl),callback:function ($$v) {_vm.$set(_vm.data.options, "arrowControl", $$v)},expression:"data.options.arrowControl"}},[_vm._v("使用箭头进行时间选择")]):_vm._e()],1),_c('el-form-item',{attrs:{"label":"数据绑定键值"}},[_c('el-input',{model:{value:(_vm.data.model),callback:function ($$v) {_vm.$set(_vm.data, "model", $$v)},expression:"data.model"}})],1),_c('el-form-item',{attrs:{"label":"校验"}},[_c('div',[_c('el-checkbox',{model:{value:(_vm.data.options.required),callback:function ($$v) {_vm.$set(_vm.data.options, "required", $$v)},expression:"data.options.required"}},[_vm._v("必填")])],1),(Object.keys(_vm.data.options).indexOf('dataType')>=0)?_c('el-select',{attrs:{"size":"mini"},model:{value:(_vm.data.options.dataType),callback:function ($$v) {_vm.$set(_vm.data.options, "dataType", $$v)},expression:"data.options.dataType"}},[_c('el-option',{attrs:{"value":"string","label":"字符串"}}),_c('el-option',{attrs:{"value":"number","label":"数字"}}),_c('el-option',{attrs:{"value":"boolean","label":"布尔值"}}),_c('el-option',{attrs:{"value":"integer","label":"整数"}}),_c('el-option',{attrs:{"value":"float","label":"浮点数"}}),_c('el-option',{attrs:{"value":"url","label":"URL地址"}}),_c('el-option',{attrs:{"value":"email","label":"邮箱地址"}}),_c('el-option',{attrs:{"value":"hex","label":"十六进制"}})],1):_vm._e(),(Object.keys(_vm.data.options).indexOf('pattern')>=0)?_c('div',[_c('el-input',{staticStyle:{"width":"240px"},attrs:{"size":"mini","placeholder":"填写正则表达式"},model:{value:(_vm.data.options.pattern),callback:function ($$v) {_vm.$set(_vm.data.options, "pattern", $$v)},expression:"data.options.pattern"}})],1):_vm._e()],1)]:_vm._e()],2)],1):_vm._e()}
var WidgetConfigvue_type_template_id_00323108_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/WidgetConfig.vue?vue&type=template&id=00323108&

// EXTERNAL MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WidgetConfig.vue?vue&type=script&lang=js&
var WidgetConfigvue_type_script_lang_js_ = __webpack_require__("9ea2");

// CONCATENATED MODULE: ./src/components/WidgetConfig.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_WidgetConfigvue_type_script_lang_js_ = (WidgetConfigvue_type_script_lang_js_["a" /* default */]); 
// CONCATENATED MODULE: ./src/components/WidgetConfig.vue





/* normalize component */

var WidgetConfig_component = normalizeComponent(
  components_WidgetConfigvue_type_script_lang_js_,
  WidgetConfigvue_type_template_id_00323108_render,
  WidgetConfigvue_type_template_id_00323108_staticRenderFns,
  false,
  null,
  null,
  null
  
)

WidgetConfig_component.options.__file = "WidgetConfig.vue"
/* harmony default export */ var WidgetConfig = (WidgetConfig_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3a86e180-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FormConfig.vue?vue&type=template&id=415bb660&
var FormConfigvue_type_template_id_415bb660_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-config-container"},[_c('el-form',{attrs:{"label-position":"top"}},[_c('el-form-item',{attrs:{"label":"标签对齐方式"}},[_c('el-radio-group',{model:{value:(_vm.data.labelPosition),callback:function ($$v) {_vm.$set(_vm.data, "labelPosition", $$v)},expression:"data.labelPosition"}},[_c('el-radio-button',{attrs:{"label":"left"}},[_vm._v("左对齐")]),_c('el-radio-button',{attrs:{"label":"right"}},[_vm._v("右对齐")]),_c('el-radio-button',{attrs:{"label":"top"}},[_vm._v("顶部对齐")])],1)],1),_c('el-form-item',{attrs:{"label":"表单字段宽度"}},[_c('el-input-number',{attrs:{"min":0,"max":200,"step":10},model:{value:(_vm.data.labelWidth),callback:function ($$v) {_vm.$set(_vm.data, "labelWidth", $$v)},expression:"data.labelWidth"}})],1)],1)],1)}
var FormConfigvue_type_template_id_415bb660_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FormConfig.vue?vue&type=template&id=415bb660&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FormConfig.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var FormConfigvue_type_script_lang_js_ = ({
  props: ['data']
});
// CONCATENATED MODULE: ./src/components/FormConfig.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FormConfigvue_type_script_lang_js_ = (FormConfigvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/FormConfig.vue





/* normalize component */

var FormConfig_component = normalizeComponent(
  components_FormConfigvue_type_script_lang_js_,
  FormConfigvue_type_template_id_415bb660_render,
  FormConfigvue_type_template_id_415bb660_staticRenderFns,
  false,
  null,
  null,
  null
  
)

FormConfig_component.options.__file = "FormConfig.vue"
/* harmony default export */ var FormConfig = (FormConfig_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3a86e180-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WidgetForm.vue?vue&type=template&id=2ed70e82&
var WidgetFormvue_type_template_id_2ed70e82_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"widget-form-container"},[_c('el-form',{attrs:{"label-position":_vm.data.config.labelPosition,"label-width":_vm.data.config.labelWidth + 'px'}},[_c('draggable',{staticClass:"widget-form-list",attrs:{"options":{group:'people', ghostClass: 'ghost'}},on:{"end":_vm.handleMoveEnd,"add":_vm.handleWidgetAdd},model:{value:(_vm.data.list),callback:function ($$v) {_vm.$set(_vm.data, "list", $$v)},expression:"data.list"}},[_vm._l((_vm.data.list),function(element,index){return [(element.type == 'grid')?[(element && element.key)?_c('div',{key:element.key,staticClass:"widget-grid-container data-grid",staticStyle:{"position":"relative"}},[_c('el-row',{staticClass:"widget-grid ",class:{active: _vm.selectWidget.key == element.key},attrs:{"type":"flex","gutter":element.options.gutter ? element.options.gutter : 0,"justify":element.options.justify,"align":element.options.align},nativeOn:{"click":function($event){_vm.handleSelectWidget(index)}}},_vm._l((element.columns),function(col,colIndex){return _c('el-col',{key:colIndex,attrs:{"span":col.span ? col.span : 0}},[_c('div',{staticStyle:{"border":"1px dashed #999"}},[_c('draggable',{staticClass:"widget-form-list",staticStyle:{"padding-bottom":"50px"},attrs:{"filter":"widget-grid-container","options":{group:'people', ghostClass: 'ghost'}},on:{"end":_vm.handleMoveEnd,"add":function($event){_vm.handleWidgetColAdd($event, element, colIndex)}},model:{value:(col.list),callback:function ($$v) {_vm.$set(col, "list", $$v)},expression:"col.list"}},_vm._l((col.list),function(el,i){return (el.key)?_c('widget-form-item',{key:el.key,attrs:{"element":el,"select":_vm.selectWidget,"index":i,"data":col},on:{"update:select":function($event){_vm.selectWidget=$event}}}):_vm._e()}))],1)])})),(_vm.selectWidget.key == element.key)?_c('el-button',{staticClass:"widget-action-delete",staticStyle:{"bottom":"-20px"},attrs:{"title":"删除","circle":"","plain":"","type":"danger"},on:{"click":function($event){$event.stopPropagation();_vm.handleWidgetDelete(index)}}},[_c('icon',{staticStyle:{"width":"12px","height":"12px"},attrs:{"name":"regular/trash-alt"}})],1):_vm._e()],1):_vm._e()]:[(element && element.key)?_c('widget-form-item',{key:element.key,attrs:{"element":element,"select":_vm.selectWidget,"index":index,"data":_vm.data},on:{"update:select":function($event){_vm.selectWidget=$event}}}):_vm._e()]]})],2)],1)],1)}
var WidgetFormvue_type_template_id_2ed70e82_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/WidgetForm.vue?vue&type=template&id=2ed70e82&

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/objectSpread.js

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3a86e180-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WidgetFormItem.vue?vue&type=template&id=99c1e762&
var WidgetFormItemvue_type_template_id_99c1e762_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.element && _vm.element.key)?_c('el-form-item',{staticClass:"widget-view ",class:{active: _vm.selectWidget.key == _vm.element.key, 'is_req': _vm.element.options.required},attrs:{"label":_vm.element.name},nativeOn:{"click":function($event){_vm.handleSelectWidget(_vm.index)}}},[(_vm.element.type == 'input')?[_c('el-input',{style:({width: _vm.element.options.width}),attrs:{"placeholder":_vm.element.options.placeholder},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type == 'textarea')?[_c('el-input',{style:({width: _vm.element.options.width}),attrs:{"type":"textarea","rows":5,"placeholder":_vm.element.options.placeholder},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type == 'number')?[_c('el-input-number',{style:({width: _vm.element.options.width}),attrs:{"disabled":_vm.element.options.disabled,"controls-position":_vm.element.options.controlsPosition},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type == 'radio')?[_c('el-radio-group',{style:({width: _vm.element.options.width}),model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}},_vm._l((_vm.element.options.options),function(item,index){return _c('el-radio',{key:item.value + index,style:({display: _vm.element.options.inline ? 'inline-block' : 'block'}),attrs:{"label":item.value}},[_vm._v("\n            "+_vm._s(_vm.element.options.showLabel ? item.label : item.value)+"\n          ")])}))]:_vm._e(),(_vm.element.type == 'checkbox')?[_c('el-checkbox-group',{style:({width: _vm.element.options.width}),model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}},_vm._l((_vm.element.options.options),function(item,index){return _c('el-checkbox',{key:item.value + index,style:({display: _vm.element.options.inline ? 'inline-block' : 'block'}),attrs:{"label":item.value}},[_vm._v("\n            "+_vm._s(_vm.element.options.showLabel ? item.label : item.value)+"\n          ")])}))]:_vm._e(),(_vm.element.type == 'time')?[_c('el-time-picker',{style:({width: _vm.element.options.width}),attrs:{"is-range":_vm.element.options.isRange,"placeholder":_vm.element.options.placeholder,"start-placeholder":_vm.element.options.startPlaceholder,"end-placeholder":_vm.element.options.endPlaceholder,"readonly":_vm.element.options.readonly,"disabled":_vm.element.options.disabled,"editable":_vm.element.options.editable,"clearable":_vm.element.options.clearable,"arrowControl":_vm.element.options.arrowControl},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type == 'date')?[_c('el-date-picker',{style:({width: _vm.element.options.width}),attrs:{"type":_vm.element.options.type,"is-range":_vm.element.options.isRange,"placeholder":_vm.element.options.placeholder,"start-placeholder":_vm.element.options.startPlaceholder,"end-placeholder":_vm.element.options.endPlaceholder,"readonly":_vm.element.options.readonly,"disabled":_vm.element.options.disabled,"editable":_vm.element.options.editable,"clearable":_vm.element.options.clearable},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type == 'rate')?[_c('el-rate',{attrs:{"max":_vm.element.options.max,"disabled":_vm.element.options.disabled,"allow-half":_vm.element.options.allowHalf},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type == 'color')?[_c('el-color-picker',{attrs:{"disabled":_vm.element.options.disabled,"show-alpha":_vm.element.options.showAlpha},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type == 'select')?[_c('el-select',{style:({width: _vm.element.options.width}),attrs:{"disabled":_vm.element.options.disabled,"multiple":_vm.element.options.multiple,"clearable":_vm.element.options.clearable,"placeholder":_vm.element.options.placeholder},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}},_vm._l((_vm.element.options.options),function(item){return _c('el-option',{key:item.value,attrs:{"value":item.value,"label":_vm.element.options.showLabel?item.label:item.value}})}))]:_vm._e(),(_vm.element.type=='switch')?[_c('el-switch',{attrs:{"disabled":_vm.element.options.disabled},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.element.type=='slider')?[_c('el-slider',{style:({width: _vm.element.options.width}),attrs:{"min":_vm.element.options.min,"max":_vm.element.options.max,"disabled":_vm.element.options.disabled,"step":_vm.element.options.step,"show-input":_vm.element.options.showInput,"range":_vm.element.options.range},model:{value:(_vm.element.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.element.options, "defaultValue", $$v)},expression:"element.options.defaultValue"}})]:_vm._e(),(_vm.selectWidget.key == _vm.element.key)?_c('el-button',{staticClass:"widget-action-delete",attrs:{"title":"删除","circle":"","plain":"","type":"danger"},on:{"click":function($event){$event.stopPropagation();_vm.handleWidgetDelete(_vm.index)}}},[_c('icon',{staticStyle:{"width":"12px","height":"12px"},attrs:{"name":"regular/trash-alt"}})],1):_vm._e(),(_vm.selectWidget.key == _vm.element.key)?_c('el-button',{staticClass:"widget-action-clone",attrs:{"title":"复制","circle":"","plain":"","type":"primary"},on:{"click":function($event){$event.stopPropagation();_vm.handleWidgetClone(_vm.index)}}},[_c('icon',{staticStyle:{"width":"12px","height":"12px"},attrs:{"name":"regular/clone"}})],1):_vm._e()],2):_vm._e()}
var WidgetFormItemvue_type_template_id_99c1e762_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/WidgetFormItem.vue?vue&type=template&id=99c1e762&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WidgetFormItem.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var WidgetFormItemvue_type_script_lang_js_ = ({
  props: ['element', 'select', 'index', 'data'],
  data: function data() {
    return {
      selectWidget: this.select
    };
  },
  methods: {
    handleSelectWidget: function handleSelectWidget(index) {
      console.log(index, '#####');
      this.selectWidget = this.data.list[index];
    },
    handleWidgetDelete: function handleWidgetDelete(index) {
      var _this = this;

      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {};
        } else {
          this.selectWidget = this.data.list[index - 1];
        }
      } else {
        this.selectWidget = this.data.list[index + 1];
      }

      this.$nextTick(function () {
        _this.data.list.splice(index, 1);
      });
    },
    handleWidgetClone: function handleWidgetClone(index) {
      var _this2 = this;

      var cloneData = _objectSpread({}, this.data.list[index], {
        options: _objectSpread({}, this.data.list[index].options),
        key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      });

      if (this.data.list[index].type === 'radio' || this.data.list[index].type === 'checkbox') {
        cloneData = _objectSpread({}, cloneData, {
          options: _objectSpread({}, cloneData.options, {
            options: cloneData.options.options.map(function (item) {
              return _objectSpread({}, item);
            })
          })
        });
      }

      this.data.list.splice(index, 0, cloneData);
      this.$nextTick(function () {
        _this2.selectWidget = _this2.data.list[index + 1];
      });
    }
  },
  watch: {
    select: function select(val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler: function handler(val) {
        this.$emit('update:select', val);
      },
      deep: true
    }
  }
});
// CONCATENATED MODULE: ./src/components/WidgetFormItem.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_WidgetFormItemvue_type_script_lang_js_ = (WidgetFormItemvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/WidgetFormItem.vue





/* normalize component */

var WidgetFormItem_component = normalizeComponent(
  components_WidgetFormItemvue_type_script_lang_js_,
  WidgetFormItemvue_type_template_id_99c1e762_render,
  WidgetFormItemvue_type_template_id_99c1e762_staticRenderFns,
  false,
  null,
  null,
  null
  
)

WidgetFormItem_component.options.__file = "WidgetFormItem.vue"
/* harmony default export */ var WidgetFormItem = (WidgetFormItem_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WidgetForm.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var WidgetFormvue_type_script_lang_js_ = ({
  components: {
    Draggable: vuedraggable_default.a,
    WidgetFormItem: WidgetFormItem
  },
  props: ['data', 'select'],
  data: function data() {
    return {
      selectWidget: this.select
    };
  },
  methods: {
    handleMoveEnd: function handleMoveEnd(_ref) {
      var newIndex = _ref.newIndex,
          oldIndex = _ref.oldIndex;
      console.log('index', newIndex, oldIndex);
    },
    handleSelectWidget: function handleSelectWidget(index) {
      console.log(index, '#####');
      this.selectWidget = this.data.list[index];
    },
    handleWidgetAdd: function handleWidgetAdd(evt) {
      console.log('add', evt);
      console.log('end', evt);
      var newIndex = evt.newIndex;
      var to = evt.to;
      console.log(to); //为拖拽到容器的元素添加唯一 key

      var key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);
      this.$set(this.data.list, newIndex, _objectSpread({}, this.data.list[newIndex], {
        options: _objectSpread({}, this.data.list[newIndex].options),
        key: key,
        // 绑定键值
        model: this.data.list[newIndex].type + '_' + key,
        rules: []
      }));

      if (this.data.list[newIndex].type === 'radio' || this.data.list[newIndex].type === 'checkbox') {
        this.$set(this.data.list, newIndex, _objectSpread({}, this.data.list[newIndex], {
          options: _objectSpread({}, this.data.list[newIndex].options, {
            options: this.data.list[newIndex].options.options.map(function (item) {
              return _objectSpread({}, item);
            })
          })
        }));
      }

      if (this.data.list[newIndex].type === 'grid') {
        this.$set(this.data.list, newIndex, _objectSpread({}, this.data.list[newIndex], {
          columns: this.data.list[newIndex].columns.map(function (item) {
            return _objectSpread({}, item);
          })
        }));
      }

      this.selectWidget = this.data.list[newIndex];
    },
    handleWidgetColAdd: function handleWidgetColAdd($event, row, colIndex) {
      console.log('coladd', $event, row, colIndex);
      var newIndex = $event.newIndex;
      var oldIndex = $event.oldIndex;
      var item = $event.item; // 防止布局元素的嵌套拖拽

      if (item.className.indexOf('data-grid') >= 0) {
        // 如果是列表中拖拽的元素需要还原到原来位置
        item.tagName === 'DIV' && this.data.list.splice(oldIndex, 0, row.columns[colIndex].list[newIndex]);
        row.columns[colIndex].list.splice(newIndex, 1);
        return false;
      }

      console.log('from', item);
      var key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);
      this.$set(row.columns[colIndex].list, newIndex, _objectSpread({}, row.columns[colIndex].list[newIndex], {
        options: _objectSpread({}, row.columns[colIndex].list[newIndex].options),
        key: key,
        // 绑定键值
        model: row.columns[colIndex].list[newIndex].type + '_' + key,
        rules: []
      }));

      if (row.columns[colIndex].list[newIndex].type === 'radio' || row.columns[colIndex].list[newIndex].type === 'checkbox') {
        this.$set(row.columns[colIndex].list, newIndex, _objectSpread({}, row.columns[colIndex].list[newIndex], {
          options: _objectSpread({}, row.columns[colIndex].list[newIndex].options, {
            options: row.columns[colIndex].list[newIndex].options.options.map(function (item) {
              return _objectSpread({}, item);
            })
          })
        }));
      }

      this.selectWidget = row.columns[colIndex].list[newIndex];
    },
    handleWidgetDelete: function handleWidgetDelete(index) {
      var _this = this;

      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {};
        } else {
          this.selectWidget = this.data.list[index - 1];
        }
      } else {
        this.selectWidget = this.data.list[index + 1];
      }

      this.$nextTick(function () {
        _this.data.list.splice(index, 1);
      });
    }
  },
  watch: {
    select: function select(val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler: function handler(val) {
        this.$emit('update:select', val);
      },
      deep: true
    }
  }
});
// CONCATENATED MODULE: ./src/components/WidgetForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_WidgetFormvue_type_script_lang_js_ = (WidgetFormvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/WidgetForm.vue





/* normalize component */

var WidgetForm_component = normalizeComponent(
  components_WidgetFormvue_type_script_lang_js_,
  WidgetFormvue_type_template_id_2ed70e82_render,
  WidgetFormvue_type_template_id_2ed70e82_staticRenderFns,
  false,
  null,
  null,
  null
  
)

WidgetForm_component.options.__file = "WidgetForm.vue"
/* harmony default export */ var WidgetForm = (WidgetForm_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3a86e180-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CusDialog.vue?vue&type=template&id=07bf4014&
var CusDialogvue_type_template_id_07bf4014_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-dialog',{ref:"elDialog",staticClass:"cus-dialog-container",attrs:{"title":_vm.title,"visible":_vm.dialogVisible,"close-on-click-modal":false,"center":"","width":_vm.width,"id":_vm.id},on:{"update:visible":function($event){_vm.dialogVisible=$event}}},[(_vm.show)?_c('span',[_vm._t("default")],2):_vm._e(),(_vm.action)?_c('span',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],staticClass:"dialog-footer",attrs:{"slot":"footer","element-loading-text":_vm.loadingText},slot:"footer"},[_vm._t("action",[_c('el-button',{on:{"click":_vm.close}},[_vm._v("取消")]),_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.submit}},[_vm._v("确 定")])])],2):_vm._e()])}
var CusDialogvue_type_template_id_07bf4014_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CusDialog.vue?vue&type=template&id=07bf4014&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CusDialog.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var CusDialogvue_type_script_lang_js_ = ({
  props: {
    visible: Boolean,
    loadingText: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '600px'
    },
    form: {
      type: Boolean,
      default: true
    },
    action: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    show: function show() {
      if (this.form) {
        return this.showForm;
      } else {
        return true;
      }
    }
  },
  data: function data() {
    return {
      loading: false,
      dialogVisible: this.visible,
      id: 'dialog_' + new Date().getTime(),
      showForm: false
    };
  },
  methods: {
    close: function close() {
      this.dialogVisible = false;
    },
    submit: function submit() {
      this.loading = true;
      this.$emit('on-submit');
    },
    end: function end() {
      this.loading = false;
    }
  },
  mounted: function mounted() {
    console.log(this.$refs.elDialog);
  },
  watch: {
    dialogVisible: function dialogVisible(val) {
      var _this = this;

      if (!val) {
        this.loading = false;
        this.$emit('on-close');
        setTimeout(function () {
          _this.showForm = false;
        }, 300);
      } else {
        this.showForm = true;
      }
    },
    visible: function visible(val) {
      this.dialogVisible = val;
    }
  }
});
// CONCATENATED MODULE: ./src/components/CusDialog.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CusDialogvue_type_script_lang_js_ = (CusDialogvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/CusDialog.vue?vue&type=style&index=0&lang=scss&
var CusDialogvue_type_style_index_0_lang_scss_ = __webpack_require__("d7cd");

// CONCATENATED MODULE: ./src/components/CusDialog.vue






/* normalize component */

var CusDialog_component = normalizeComponent(
  components_CusDialogvue_type_script_lang_js_,
  CusDialogvue_type_template_id_07bf4014_render,
  CusDialogvue_type_template_id_07bf4014_staticRenderFns,
  false,
  null,
  null,
  null
  
)

CusDialog_component.options.__file = "CusDialog.vue"
/* harmony default export */ var CusDialog = (CusDialog_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3a86e180-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GenerateForm.vue?vue&type=template&id=185904c5&
var GenerateFormvue_type_template_id_185904c5_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-form',{ref:"generateForm",attrs:{"model":_vm.models,"rules":_vm.rules,"label-position":_vm.data.config.labelPosition,"label-width":_vm.data.config.labelWidth + 'px'}},[_vm._l((_vm.data.list),function(item){return [(item.type == 'grid')?[_c('el-row',{key:item.key,attrs:{"type":"flex","gutter":item.options.gutter ? item.options.gutter : 0,"justify":item.options.justify,"align":item.options.align}},_vm._l((item.columns),function(col,colIndex){return _c('el-col',{key:colIndex,attrs:{"span":col.span}},_vm._l((col.list),function(citem){return _c('genetate-form-item',{key:citem.key,attrs:{"models":_vm.models,"rules":_vm.rules,"widget":citem},on:{"update:models":function($event){_vm.models=$event}}})}))}))]:[_c('genetate-form-item',{key:item.key,attrs:{"models":_vm.models,"rules":_vm.rules,"widget":item},on:{"update:models":function($event){_vm.models=$event}}})]]})],2)],1)}
var GenerateFormvue_type_template_id_185904c5_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/GenerateForm.vue?vue&type=template&id=185904c5&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.promise.js
var es6_promise = __webpack_require__("551c");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/arrayWithoutHoles.js
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/iterableToArray.js
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/toConsumableArray.js



function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3a86e180-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GenerateFormItem.vue?vue&type=template&id=a6849a3c&
var GenerateFormItemvue_type_template_id_a6849a3c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-form-item',{attrs:{"label":_vm.widget.name,"prop":_vm.widget.model}},[(_vm.widget.type == 'input')?[(_vm.widget.options.dataType == 'number' || _vm.widget.options.dataType == 'integer' || _vm.widget.options.dataType == 'float')?_c('el-input',{style:({width: _vm.widget.options.width}),attrs:{"type":_vm.widget.options.dataType,"placeholder":_vm.widget.options.placeholder},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=_vm._n($$v)},expression:"dataModel"}}):_c('el-input',{style:({width: _vm.widget.options.width}),attrs:{"type":_vm.widget.options.dataType,"placeholder":_vm.widget.options.placeholder},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type == 'textarea')?[_c('el-input',{style:({width: _vm.widget.options.width}),attrs:{"type":"textarea","rows":5,"placeholder":_vm.widget.options.placeholder},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type == 'number')?[_c('el-input-number',{style:({width: _vm.widget.options.width}),attrs:{"step":_vm.widget.options.step,"controls-position":"right"},model:{value:(_vm.widget.options.defaultValue),callback:function ($$v) {_vm.$set(_vm.widget.options, "defaultValue", $$v)},expression:"widget.options.defaultValue"}})]:_vm._e(),(_vm.widget.type == 'radio')?[_c('el-radio-group',{style:({width: _vm.widget.options.width}),model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}},_vm._l((_vm.widget.options.options),function(item,index){return _c('el-radio',{key:index,style:({display: _vm.widget.options.inline ? 'inline-block' : 'block'}),attrs:{"label":item.value}},[_vm._v("\n        "+_vm._s(_vm.widget.options.showLabel ? item.label : item.value)+"\n      ")])}))]:_vm._e(),(_vm.widget.type == 'checkbox')?[_c('el-checkbox-group',{style:({width: _vm.widget.options.width}),model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}},_vm._l((_vm.widget.options.options),function(item,index){return _c('el-checkbox',{key:index,style:({display: _vm.widget.options.inline ? 'inline-block' : 'block'}),attrs:{"label":item.value}},[_vm._v("\n        "+_vm._s(_vm.widget.options.showLabel ? item.label : item.value)+"\n      ")])}))]:_vm._e(),(_vm.widget.type == 'time')?[_c('el-time-picker',{style:({width: _vm.widget.options.width}),attrs:{"is-range":_vm.widget.options.isRange,"placeholder":_vm.widget.options.placeholder,"start-placeholder":_vm.widget.options.startPlaceholder,"end-placeholder":_vm.widget.options.endPlaceholder,"readonly":_vm.widget.options.readonly,"disabled":_vm.widget.options.disabled,"editable":_vm.widget.options.editable,"clearable":_vm.widget.options.clearable,"arrowControl":_vm.widget.options.arrowControl,"value-format":_vm.widget.options.format},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type=='date')?[_c('el-date-picker',{style:({width: _vm.widget.options.width}),attrs:{"type":_vm.widget.options.type,"placeholder":_vm.widget.options.placeholder,"start-placeholder":_vm.widget.options.startPlaceholder,"end-placeholder":_vm.widget.options.endPlaceholder,"readonly":_vm.widget.options.readonly,"disabled":_vm.widget.options.disabled,"editable":_vm.widget.options.editable,"clearable":_vm.widget.options.clearable,"value-format":_vm.widget.options.timestamp ? 'timestamp' : _vm.widget.options.format,"format":_vm.widget.options.format},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type =='rate')?[_c('el-rate',{attrs:{"max":_vm.widget.options.max,"disabled":_vm.widget.options.disabled,"allow-half":_vm.widget.options.allowHalf},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type == 'color')?[_c('el-color-picker',{attrs:{"disabled":_vm.widget.options.disabled,"show-alpha":_vm.widget.options.showAlpha},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type == 'select')?[_c('el-select',{style:({width: _vm.widget.options.width}),attrs:{"disabled":_vm.widget.options.disabled,"multiple":_vm.widget.options.multiple,"clearable":_vm.widget.options.clearable,"placeholder":_vm.widget.options.placeholder},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}},_vm._l((_vm.widget.options.options),function(item){return _c('el-option',{key:item.value,attrs:{"value":item.value,"label":_vm.widget.options.showLabel?item.label:item.value}})}))]:_vm._e(),(_vm.widget.type=='switch')?[_c('el-switch',{attrs:{"disabled":_vm.widget.options.disabled},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e(),(_vm.widget.type=='slider')?[_c('el-slider',{style:({width: _vm.widget.options.width}),attrs:{"min":_vm.widget.options.min,"max":_vm.widget.options.max,"disabled":_vm.widget.options.disabled,"step":_vm.widget.options.step,"show-input":_vm.widget.options.showInput,"range":_vm.widget.options.range},model:{value:(_vm.dataModel),callback:function ($$v) {_vm.dataModel=$$v},expression:"dataModel"}})]:_vm._e()],2)}
var GenerateFormItemvue_type_template_id_a6849a3c_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/GenerateFormItem.vue?vue&type=template&id=a6849a3c&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GenerateFormItem.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var GenerateFormItemvue_type_script_lang_js_ = ({
  props: ['widget', 'models', 'rules'],
  data: function data() {
    return {
      dataModel: this.models[this.widget.model]
    };
  },
  watch: {
    dataModel: {
      deep: true,
      handler: function handler(val) {
        this.models[this.widget.model] = val;
        this.$emit('update:models', _objectSpread({}, this.models, _defineProperty({}, this.widget.model, val)));
      }
    },
    models: {
      deep: true,
      handler: function handler(val) {
        this.dataModel = val[this.widget.model];
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/GenerateFormItem.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_GenerateFormItemvue_type_script_lang_js_ = (GenerateFormItemvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/GenerateFormItem.vue





/* normalize component */

var GenerateFormItem_component = normalizeComponent(
  components_GenerateFormItemvue_type_script_lang_js_,
  GenerateFormItemvue_type_template_id_a6849a3c_render,
  GenerateFormItemvue_type_template_id_a6849a3c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

GenerateFormItem_component.options.__file = "GenerateFormItem.vue"
/* harmony default export */ var GenerateFormItem = (GenerateFormItem_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GenerateForm.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var GenerateFormvue_type_script_lang_js_ = ({
  name: 'GenerateForm',
  components: {
    GenetateFormItem: GenerateFormItem
  },
  props: ['data'],
  data: function data() {
    return {
      models: {},
      rules: {}
    };
  },
  created: function created() {
    console.log('generate', this.data);
    this.generateModle(this.data.list);
  },
  methods: {
    generateModle: function generateModle(genList) {
      var _this = this;

      for (var i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach(function (item) {
            _this.generateModle(item.list);
          });
        } else {
          this.models[genList[i].model] = genList[i].options.defaultValue;

          if (this.rules[genList[i].model]) {
            this.rules[genList[i].model] = _toConsumableArray(this.rules[genList[i].model]).concat(_toConsumableArray(genList[i].rules));
          } else {
            this.rules[genList[i].model] = _toConsumableArray(genList[i].rules);
          }
        }
      }
    },
    getData: function getData() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.$refs.generateForm.validate(function (valid) {
          if (valid) {
            resolve(_this2.models);
          } else {
            reject(new Error('表单数据校验失败').message);
          }
        });
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/GenerateForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_GenerateFormvue_type_script_lang_js_ = (GenerateFormvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/GenerateForm.vue





/* normalize component */

var GenerateForm_component = normalizeComponent(
  components_GenerateFormvue_type_script_lang_js_,
  GenerateFormvue_type_template_id_185904c5_render,
  GenerateFormvue_type_template_id_185904c5_staticRenderFns,
  false,
  null,
  null,
  null
  
)

GenerateForm_component.options.__file = "GenerateForm.vue"
/* harmony default export */ var GenerateForm = (GenerateForm_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Container.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ var Containervue_type_script_lang_js_ = ({
  name: 'MarkingForm',
  components: {
    Draggable: vuedraggable_default.a,
    WidgetConfig: WidgetConfig,
    FormConfig: FormConfig,
    WidgetForm: WidgetForm,
    CusDialog: CusDialog,
    GenerateForm: GenerateForm
  },
  data: function data() {
    return {
      basicComponents: [{
        type: 'input',
        name: '单行文本',
        icon: 'regular/keyboard',
        options: {
          width: '100%',
          defaultValue: '',
          required: false,
          dataType: 'string',
          pattern: '',
          placeholder: ''
        }
      }, {
        type: 'textarea',
        name: '多行文本',
        icon: 'regular/keyboard',
        options: {
          width: '100%',
          defaultValue: '',
          required: false,
          pattern: '',
          placeholder: ''
        }
      }, {
        type: 'number',
        name: '计数器',
        icon: 'sort-numeric-up',
        options: {
          width: '',
          required: false,
          defaultValue: 0,
          min: '',
          max: '',
          step: 1,
          disabled: false,
          controlsPosition: ''
        }
      }, {
        type: 'radio',
        name: '单选框组',
        icon: 'regular/dot-circle',
        options: {
          inline: false,
          defaultValue: '',
          showLabel: false,
          options: [{
            value: '选项1',
            label: '选项1'
          }, {
            value: '选项2',
            label: '选项2'
          }, {
            value: '选项3',
            label: '选项3'
          }],
          required: false,
          width: ''
        }
      }, {
        type: 'checkbox',
        name: '多选框组',
        icon: 'regular/check-square',
        options: {
          inline: false,
          defaultValue: [],
          showLabel: false,
          options: [{
            value: '选项1'
          }, {
            value: '选项2'
          }, {
            value: '选项3'
          }],
          required: false,
          width: ''
        }
      }, {
        type: 'time',
        name: '时间选择器',
        icon: 'regular/clock',
        options: {
          defaultValue: '21:19:56',
          readonly: false,
          disabled: false,
          editable: true,
          clearable: true,
          placeholder: '',
          startPlaceholder: '',
          endPlaceholder: '',
          isRange: false,
          arrowControl: true,
          format: 'HH:mm:ss',
          required: false,
          width: ''
        }
      }, {
        type: 'date',
        name: '日期选择器',
        icon: 'regular/calendar-alt',
        options: {
          defaultValue: '',
          readonly: false,
          disabled: false,
          editable: true,
          clearable: true,
          placeholder: '',
          startPlaceholder: '',
          endPlaceholder: '',
          type: 'date',
          format: 'yyyy-MM-dd',
          timestamp: false,
          required: false,
          width: ''
        }
      }, {
        type: 'rate',
        name: '评分',
        icon: 'regular/star',
        options: {
          defaultValue: null,
          max: 5,
          disabled: false,
          allowHalf: false,
          required: false
        }
      }, {
        type: 'color',
        name: '颜色选择器',
        icon: 'palette',
        options: {
          defaultValue: '',
          disabled: false,
          showAlpha: false,
          required: false
        }
      }, {
        type: 'select',
        name: '下拉选择框',
        icon: 'regular/caret-square-down',
        options: {
          defaultValue: '',
          multiple: false,
          disabled: false,
          clearable: false,
          placeholder: '',
          required: false,
          showLabel: false,
          width: '',
          options: [{
            value: '下拉框1'
          }, {
            value: '下拉框2'
          }, {
            value: '下拉框3'
          }]
        }
      }, {
        type: 'switch',
        name: '开关',
        icon: 'toggle-off',
        options: {
          defaultValue: false,
          required: false,
          disabled: false
        }
      }, {
        type: 'slider',
        name: '滑块',
        icon: 'sliders-h',
        options: {
          defaultValue: 0,
          disabled: false,
          required: false,
          min: 0,
          max: 100,
          step: 1,
          showInput: false,
          range: false,
          width: ''
        }
      }],
      layoutComponents: [{
        type: 'grid',
        name: '栅格布局',
        icon: 'th',
        columns: [{
          span: 12,
          list: []
        }, {
          span: 12,
          list: []
        }],
        options: {
          gutter: 0,
          justify: 'start',
          align: 'top'
        }
      }],
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'top'
        }
      },
      configTab: 'widget',
      widgetFormSelect: null,
      previewVisible: false
    };
  },
  methods: {
    handleConfigSelect: function handleConfigSelect(value) {
      this.configTab = value;
    },
    handleMoveEnd: function handleMoveEnd(evt) {
      console.log('end', evt);
    },
    handleMoveStart: function handleMoveStart(_ref) {
      var oldIndex = _ref.oldIndex;
      console.log('start', oldIndex, this.basicComponents);
    },
    handleMove: function handleMove() {
      return true;
    },
    handlePreview: function handlePreview() {
      this.previewVisible = true;
    },
    handleTest: function handleTest() {
      var _this = this;

      this.$refs.generateForm.getData().then(function (data) {
        console.log('form', data);

        _this.$refs.widgetPreview.end();
      }).catch(function (e) {
        console.log(e);

        _this.$refs.widgetPreview.end();
      });
    }
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function handler(val) {
        console.log('######', val);
        console.log(this.$refs.widgetForm);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/Container.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Containervue_type_script_lang_js_ = (Containervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Container.vue?vue&type=style&index=0&lang=scss&
var Containervue_type_style_index_0_lang_scss_ = __webpack_require__("314e");

// CONCATENATED MODULE: ./src/components/Container.vue






/* normalize component */

var Container_component = normalizeComponent(
  components_Containervue_type_script_lang_js_,
  Containervue_type_template_id_6215ae9d_render,
  Containervue_type_template_id_6215ae9d_staticRenderFns,
  false,
  null,
  null,
  null
  
)

Container_component.options.__file = "Container.vue"
/* harmony default export */ var Container = (Container_component.exports);
// CONCATENATED MODULE: ./src/index.js






















external_commonjs_vue_commonjs2_vue_root_Vue_default.a.component('icon', Icon);

Container.install = function (Vue) {
  Vue.component(Container.name, Container);
};

GenerateForm.install = function (Vue) {
  Vue.component(GenerateForm.name, GenerateForm);
};

var components = [Container, GenerateForm];

var install = function install(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  components.forEach(function (component) {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}


/* harmony default export */ var src = ({
  install: install,
  MakingForm: Container,
  GenerateForm: GenerateForm
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport MakingForm */__webpack_require__.d(__webpack_exports__, "MakingForm", function() { return Container; });
/* concated harmony reexport GenerateForm */__webpack_require__.d(__webpack_exports__, "GenerateForm", function() { return GenerateForm; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src);



/***/ })

/******/ });
});
//# sourceMappingURL=index.umd.js.map
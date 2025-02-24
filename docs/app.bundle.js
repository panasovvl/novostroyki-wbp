/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var css_normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! css/normalize.css */ "./src/css/normalize.css");
/* harmony import */ var inputmask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inputmask */ "./node_modules/inputmask/dist/inputmask.js");
/* harmony import */ var inputmask__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inputmask__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var simplebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! simplebar */ "./node_modules/simplebar/dist/index.mjs");
/* harmony import */ var simplebar_dist_simplebar_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! simplebar/dist/simplebar.css */ "./node_modules/simplebar/dist/simplebar.css");
/* harmony import */ var resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! resize-observer-polyfill */ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.mjs");
/* harmony import */ var swiper_modules__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! swiper/modules */ "./node_modules/swiper/modules/index.mjs");
/* harmony import */ var swiper_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! swiper/css */ "./node_modules/swiper/swiper.css");
/* harmony import */ var swiper_css_navigation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! swiper/css/navigation */ "./node_modules/swiper/modules/navigation.css");
/* harmony import */ var swiper_css_pagination__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! swiper/css/pagination */ "./node_modules/swiper/modules/pagination.css");
/* harmony import */ var accordion_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! accordion-js */ "./node_modules/accordion-js/dist/accordion.min.js");
/* harmony import */ var accordion_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(accordion_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var accordion_js_dist_accordion_min_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! accordion-js/dist/accordion.min.css */ "./node_modules/accordion-js/dist/accordion.min.css");
/* harmony import */ var css_style_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! css/style.scss */ "./src/css/style.scss");
// Vendors






window.ResizeObserver = resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_4__["default"];


// import Swiper and modules styles






// Project


const _$ = (q, elm) => (elm ? elm : document).querySelector(q);
const _$$ = (q, elm) => (elm ? elm : document).querySelectorAll(q);

/* Hamburger menu */

_$(".m-header__burger").addEventListener("click", evt => {
  _$(".m-header__box").classList.add("m-header__box_trans");
  _$(".m-header__box").classList.add("open");
  document.body.style.overflow = 'hidden';
});
_$(".m-header__burger-close").addEventListener("click", evt => {
  _$(".m-header__box").classList.remove("open");
  _$(".m-header__box").scrollTop = 0;
  document.body.style.overflow = '';
});
document.addEventListener("click", evt => {
  if (_$(".m-header__box").classList.contains("open") && !_$(".m-header__box").contains(evt.target) && !_$(".m-header__burger").contains(evt.target)) {
    _$(".m-header__box").classList.remove("open");
    document.body.style.overflow = '';
  }
});
const ham_res = getComputedStyle(document.documentElement).getPropertyValue("--ham-res");
const ham_mql = window.matchMedia(`(max-width: ${ham_res}px)`);
ham_mql.addEventListener("change", evt => {
  _$(".m-header__box").classList.remove("m-header__box_trans");
  _$(".m-header__box").classList.remove("open");
  _$(".m-header__box").scrollTop = 0;
  document.body.style.overflow = '';
});

/* Drop Search */
function init_dropsearch(drop, list_cb, cb) {
  const simpleBar = new simplebar__WEBPACK_IMPORTED_MODULE_2__["default"](_$(".dropsearch__list ul", drop));
  _$("input", drop).addEventListener("focus", evt => {
    update_list();
    _$(".dropsearch__list", drop).style.display = "block";
    _$(".dropsearch__list", drop).offsetHeight;
    drop.classList.add("drop_open");
    _$("input", drop).select();
  });
  _$("ul", drop).addEventListener("transitionend", evt => {
    if (!drop.classList.contains("drop_open")) _$(".dropsearch__list", drop).style.display = "none";
  });
  document.addEventListener("click", evt => {
    if (drop.classList.contains("drop_open") && (!_$(".dropsearch__field", drop).contains(evt.target) && !_$(".dropsearch__list", drop).contains(evt.target) || _$(".dropsearch__icon", drop) == evt.target)) {
      drop.classList.remove("drop_open");
      evt.preventDefault();
    }
  });
  function item_click(evt) {
    const item = evt.currentTarget;
    _$("input", drop).value = item.getAttribute("data-label");
    //    _$('.drop__clear', drop).style.visibility = 'inherit';
    drop.classList.remove("drop_open");
    cb(item.getAttribute("data-value"));
  }
  _$(".dropsearch__clear", drop).addEventListener("click", evt => {
    _$("input", drop).value = "";
    _$("input", drop).focus();
    update_list();
  });
  _$("input", drop).addEventListener("keyup", update_list);
  async function update_list() {
    const text = _$("input", drop).value.trim();
    const list = await list_cb(text);
    const cont = simpleBar.getContentElement();
    cont.innerHTML = "";
    list.forEach(el => {
      if (el.label.toLowerCase().startsWith(text.toLowerCase())) {
        const li = document.createElement("li");
        li.className = "dropsearch__item";
        li.setAttribute("data-value", el.value);
        li.setAttribute("data-label", el.label);
        let t = '<span class="dropsearch__item_start">' + el.label.substr(0, text.length) + "</span>";
        t += el.label.substr(text.length);
        li.innerHTML = t;
        li.addEventListener("click", item_click);
        cont.appendChild(li);
      }
    });
    if (cont.innerHTML == "") {
      const p = document.createElement("p");
      p.className = "dropsearch__empty";
      cont.appendChild(p);
    }
    //    _$('.drop__clear', drop).style.visibility = text.length > 0 ? 'inherit' : '';
  }
}
/* Drop */
function init_drop(drop) {
  _$("button", drop).addEventListener("click", evt => {
    if (!drop.classList.contains("drop_open")) {
      _$(".drop__box", drop).style.display = "inherit";
      _$(".drop__box", drop).offsetHeight;
      drop.classList.add("drop_open");
      evt.openning = true;
      // evt.stopPropagation();
    }
  });
  _$(".drop__inner", drop).addEventListener("transitionend", evt => {
    if (!drop.classList.contains("drop_open")) _$(".drop__box", drop).style.display = "none";
  });
  document.addEventListener("click", evt => {
    if (drop.classList.contains("drop_open") && (!drop.contains(evt.target) || _$(".drop__icon", drop) == evt.target && !evt.openning)) {
      drop.classList.remove("drop_open");
      // evt.preventDefault();
    }
  });
}

/* Обработка фильтров */
let city = null;
let district = null;
init_dropsearch(_$(".m-filter__city"), async text => {
  const resp = await fetch("data/cities.json?c=" + encodeURIComponent(text));
  return await resp.json();
}, c => {
  city = c;
  console.log("Выбран город ", city);
});
init_dropsearch(_$(".m-filter__distr"), async text => {
  const resp = await fetch("data/districts.json?c=" + encodeURIComponent(city) + "&d=" + encodeURIComponent(text));
  return await resp.json();
}, d => {
  district = d;
  console.log("Выбран район ", district);
});
init_drop(_$(".m-filter__rooms"));
_$(".m-filter__rooms").addEventListener("change", evt => {
  if (evt.target.value == "studio") console.log("Студия", evt.target.checked);else console.log("Комнат", evt.target.value);
});
_$(".m-filter__type-grp").addEventListener("change", evt => {
  console.log("Тип недвижимости", evt.target.value);
});
init_drop(_$(".m-filter__price"));

/* Input */
const imask = inputmask__WEBPACK_IMPORTED_MODULE_1___default()({
  alias: "integer",
  min: 0,
  allowMinus: false,
  showMaskOnHover: true,
  rightAlign: false,
  numericInput: true
});
imask.mask(_$(".m-filter__price input[name=price-from]"));
imask.mask(_$(".m-filter__price input[name=price-to]"));
init_drop(_$(".m-filter__area"));
imask.mask(_$(".m-filter__area input[name=area-from]"));
imask.mask(_$(".m-filter__area input[name=area-to]"));
function change_dropsearch_placeholder() {
  let ph = _$(".m-filter__city input").getAttribute(ham_mql.matches ? "data-ph-mobile" : "data-ph");
  _$(".m-filter__city input").setAttribute("placeholder", ph);
  ph = _$(".m-filter__distr input").getAttribute(ham_mql.matches ? "data-ph-mobile" : "data-ph");
  _$(".m-filter__distr input").setAttribute("placeholder", ph);
}
change_dropsearch_placeholder();

/* Mobile filters */

_$(".m-filter__mobile-search").addEventListener("click", evt => {
  _$(".m-filter__group").classList.add("m-filter__group_trans");
  _$(".m-filter__group").classList.add("open");
  document.body.style.overflow = 'hidden';
});
_$(".m-filter__mobile-close").addEventListener("click", evt => {
  _$(".m-filter__group").classList.remove("open");
  _$(".m-filter__group").scrollTop = 0;
  document.body.style.overflow = '';
});
document.addEventListener("click", evt => {
  if (_$(".m-filter__group").classList.contains('open') && !_$(".m-filter__group").contains(evt.target) && !_$(".m-filter__mobile-search").contains(evt.target)) {
    _$(".m-filter__group").classList.remove("open");
    document.body.style.overflow = '';
  }
});
ham_mql.addEventListener("change", evt => {
  _$(".m-filter__group").classList.remove("m-filter__group_trans");
  _$(".m-filter__group").classList.remove("open");
  _$(".m-filter__group").scrollTop = 0;
  document.body.style.overflow = '';
  change_dropsearch_placeholder();
});

/* Popular */
const swiper = new swiper__WEBPACK_IMPORTED_MODULE_5__["default"](".m-popular__swiper", {
  loop: true,
  slidesPerView: 1.1,
  spaceBetween: 8,
  breakpoints: {
    [ham_res]: {
      slidesPerView: 2,
      spaceBetween: 24
    },
    1100: {
      slidesPerView: 3,
      spaceBetween: 25
    }
  },
  centeredSlides: true,
  modules: [swiper_modules__WEBPACK_IMPORTED_MODULE_6__.Navigation, swiper_modules__WEBPACK_IMPORTED_MODULE_6__.Pagination],
  // If we need pagination
  pagination: {
    el: ".swiper-pagination"
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});

/* Services */
let serv_ac = null;
function update_accord() {
  if (ham_mql.matches) {
    if (!serv_ac) serv_ac = new (accordion_js__WEBPACK_IMPORTED_MODULE_10___default())(".m-serv__accord", {});else {
      serv_ac.attachEvents();
      serv_ac.closeAll();
    }
  } else {
    if (serv_ac) {
      serv_ac.detachEvents();
      serv_ac.openAll();
    }
  }
}
update_accord();
ham_mql.addEventListener('change', update_accord);

/* Consult */
const tel_mask = inputmask__WEBPACK_IMPORTED_MODULE_1___default()({
  mask: "+7 999 999 99 99",
  showMaskOnHover: true
});
tel_mask.mask(_$(".m-consult__tel"));

/***/ }),

/***/ "./src/css/style.scss":
/*!****************************!*\
  !*** ./src/css/style.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/css/normalize.css":
/*!*******************************!*\
  !*** ./src/css/normalize.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwebpack_test1"] = self["webpackChunkwebpack_test1"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./src/js/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.bundle.js.map
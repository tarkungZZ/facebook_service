"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/components/dashboard-layout.js":
/*!********************************************!*\
  !*** ./src/components/dashboard-layout.js ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DashboardLayout\": function() { return /* binding */ DashboardLayout; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/index.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/styles */ \"./node_modules/@mui/material/styles/index.js\");\n/* harmony import */ var _dashboard_navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard-navbar */ \"./src/components/dashboard-navbar.js\");\n/* harmony import */ var _dashboard_sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard-sidebar */ \"./src/components/dashboard-sidebar.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\n\n\nfunction _defineProperty(obj, key, value) {\n    if (key in obj) {\n        Object.defineProperty(obj, key, {\n            value: value,\n            enumerable: true,\n            configurable: true,\n            writable: true\n        });\n    } else {\n        obj[key] = value;\n    }\n    return obj;\n}\nvar _this = undefined;\nvar _s = $RefreshSig$();\nvar DashboardLayoutRoot = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_4__.styled)('div')(function(param) {\n    var theme = param.theme;\n    return _defineProperty({\n        display: 'flex',\n        flex: '1 1 auto',\n        maxWidth: '100%',\n        paddingTop: 64\n    }, theme.breakpoints.up('lg'), {\n        paddingLeft: 280\n    });\n});\n_c = DashboardLayoutRoot;\nvar DashboardLayout = function(props) {\n    _s();\n    var children = props.children;\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true), isSidebarOpen = ref[0], setSidebarOpen = ref[1];\n    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DashboardLayoutRoot, {\n                __source: {\n                    fileName: \"C:\\\\Users\\\\arm_1\\\\Desktop\\\\facebook_service\\\\src\\\\components\\\\dashboard-layout.js\",\n                    lineNumber: 23,\n                    columnNumber: 7\n                },\n                __self: _this,\n                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_5__.Box, {\n                    sx: {\n                        display: 'flex',\n                        flex: '1 1 auto',\n                        flexDirection: 'column',\n                        width: '100%'\n                    },\n                    __source: {\n                        fileName: \"C:\\\\Users\\\\arm_1\\\\Desktop\\\\facebook_service\\\\src\\\\components\\\\dashboard-layout.js\",\n                        lineNumber: 24,\n                        columnNumber: 9\n                    },\n                    __self: _this,\n                    children: children\n                })\n            }),\n            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_dashboard_navbar__WEBPACK_IMPORTED_MODULE_2__.DashboardNavbar, {\n                onSidebarOpen: function() {\n                    return setSidebarOpen(true);\n                },\n                __source: {\n                    fileName: \"C:\\\\Users\\\\arm_1\\\\Desktop\\\\facebook_service\\\\src\\\\components\\\\dashboard-layout.js\",\n                    lineNumber: 35,\n                    columnNumber: 7\n                },\n                __self: _this\n            })\n        ]\n    }));\n};\n_s(DashboardLayout, \"6J2wAdZ2kjF0faG/fj33ZXGxstA=\");\n_c1 = DashboardLayout;\nvar _c, _c1;\n$RefreshReg$(_c, \"DashboardLayoutRoot\");\n$RefreshReg$(_c1, \"DashboardLayout\");\n\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9kYXNoYm9hcmQtbGF5b3V0LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQWdDO0FBQ0c7QUFDVTtBQUNPO0FBQ0U7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFdEQsR0FBSyxDQUFDSyxtQkFBbUIsR0FBR0gsNERBQU0sQ0FBQyxDQUFLLE1BQUUsUUFBUTtRQUFMSSxLQUFLLFNBQUxBLEtBQUs7SUFBTyxNQUN2REM7UUFBQUEsT0FBTyxFQUFFLENBQU07UUFDZkMsSUFBSSxFQUFFLENBQVU7UUFDaEJDLFFBQVEsRUFBRSxDQUFNO1FBQ2hCQyxVQUFVLEVBQUUsRUFBRTtPQUNiSixLQUFLLENBQUNLLFdBQVcsQ0FBQ0MsRUFBRSxDQUFDLENBQUksTUFBSSxDQUFDO1FBQzdCQyxXQUFXLEVBQUUsR0FBRztJQUNsQixDQUFDOztLQVBHUixtQkFBbUI7QUFVbEIsR0FBSyxDQUFDUyxlQUFlLEdBQUcsUUFBUSxDQUFQQyxLQUFLLEVBQUssQ0FBQzs7SUFDekMsR0FBSyxDQUFHQyxRQUFRLEdBQUtELEtBQUssQ0FBbEJDLFFBQVE7SUFDaEIsR0FBSyxDQUFtQ2hCLEdBQWMsR0FBZEEsK0NBQVEsQ0FBQyxJQUFJLEdBQTlDaUIsYUFBYSxHQUFvQmpCLEdBQWMsS0FBaENrQixjQUFjLEdBQUlsQixHQUFjO0lBRXRELE1BQU07O2lGQUVESyxtQkFBbUI7Ozs7Ozs7K0ZBQ2pCSiw4Q0FBRztvQkFDRmtCLEVBQUUsRUFBRSxDQUFDO3dCQUNIWixPQUFPLEVBQUUsQ0FBTTt3QkFDZkMsSUFBSSxFQUFFLENBQVU7d0JBQ2hCWSxhQUFhLEVBQUUsQ0FBUTt3QkFDdkJDLEtBQUssRUFBRSxDQUFNO29CQUNmLENBQUM7Ozs7Ozs7OEJBRUFMLFFBQVE7OztpRkFHWmIsOERBQWU7Z0JBQUNtQixhQUFhLEVBQUUsUUFBUTtvQkFBRkosTUFBTSxDQUFOQSxjQUFjLENBQUMsSUFBSTs7Ozs7Ozs7Ozs7QUFPL0QsQ0FBQztHQXpCWUosZUFBZTtNQUFmQSxlQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL2Rhc2hib2FyZC1sYXlvdXQuanM/MTZlMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94IH0gZnJvbSAnQG11aS9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IHN0eWxlZCB9IGZyb20gJ0BtdWkvbWF0ZXJpYWwvc3R5bGVzJztcclxuaW1wb3J0IHsgRGFzaGJvYXJkTmF2YmFyIH0gZnJvbSAnLi9kYXNoYm9hcmQtbmF2YmFyJztcclxuaW1wb3J0IHsgRGFzaGJvYXJkU2lkZWJhciB9IGZyb20gJy4vZGFzaGJvYXJkLXNpZGViYXInO1xyXG5cclxuY29uc3QgRGFzaGJvYXJkTGF5b3V0Um9vdCA9IHN0eWxlZCgnZGl2JykoKHsgdGhlbWUgfSkgPT4gKHtcclxuICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgZmxleDogJzEgMSBhdXRvJyxcclxuICBtYXhXaWR0aDogJzEwMCUnLFxyXG4gIHBhZGRpbmdUb3A6IDY0LFxyXG4gIFt0aGVtZS5icmVha3BvaW50cy51cCgnbGcnKV06IHtcclxuICAgIHBhZGRpbmdMZWZ0OiAyODBcclxuICB9XHJcbn0pKTtcclxuXHJcbmV4cG9ydCBjb25zdCBEYXNoYm9hcmRMYXlvdXQgPSAocHJvcHMpID0+IHtcclxuICBjb25zdCB7IGNoaWxkcmVuIH0gPSBwcm9wcztcclxuICBjb25zdCBbaXNTaWRlYmFyT3Blbiwgc2V0U2lkZWJhck9wZW5dID0gdXNlU3RhdGUodHJ1ZSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8RGFzaGJvYXJkTGF5b3V0Um9vdD5cclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICBzeD17e1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgIGZsZXg6ICcxIDEgYXV0bycsXHJcbiAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L0JveD5cclxuICAgICAgPC9EYXNoYm9hcmRMYXlvdXRSb290PlxyXG4gICAgICA8RGFzaGJvYXJkTmF2YmFyIG9uU2lkZWJhck9wZW49eygpID0+IHNldFNpZGViYXJPcGVuKHRydWUpfSAvPlxyXG4gICAgICB7LyogPERhc2hib2FyZFNpZGViYXJcclxuICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRTaWRlYmFyT3BlbihmYWxzZSl9XHJcbiAgICAgICAgb3Blbj17aXNTaWRlYmFyT3Blbn1cclxuICAgICAgLz4gKi99XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJCb3giLCJzdHlsZWQiLCJEYXNoYm9hcmROYXZiYXIiLCJEYXNoYm9hcmRTaWRlYmFyIiwiRGFzaGJvYXJkTGF5b3V0Um9vdCIsInRoZW1lIiwiZGlzcGxheSIsImZsZXgiLCJtYXhXaWR0aCIsInBhZGRpbmdUb3AiLCJicmVha3BvaW50cyIsInVwIiwicGFkZGluZ0xlZnQiLCJEYXNoYm9hcmRMYXlvdXQiLCJwcm9wcyIsImNoaWxkcmVuIiwiaXNTaWRlYmFyT3BlbiIsInNldFNpZGViYXJPcGVuIiwic3giLCJmbGV4RGlyZWN0aW9uIiwid2lkdGgiLCJvblNpZGViYXJPcGVuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/dashboard-layout.js\n");

/***/ })

});
"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("src/middleware",{

/***/ "(middleware)/./src/middleware.ts":
/*!***************************!*\
  !*** ./src/middleware.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\n//このファイルはapp直下ではなく、src直下に置く必要がある。\nconst middleware = (request)=>{\n    console.log(\"MIDDLE WARE\");\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n};\nconst config = {\n    matcher: [\n        \"/\",\n        \"/task\"\n    ] //ミドルウェアを通過させたいパスを配列で指定\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL21pZGRsZXdhcmUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXdEO0FBRXhELGlDQUFpQztBQUMxQixNQUFNQyxhQUFhLENBQUNDO0lBQ3ZCQyxRQUFRQyxHQUFHLENBQUM7SUFDWixPQUFPSixxREFBWUEsQ0FBQ0ssSUFBSTtBQUM1QixFQUFDO0FBRU0sTUFBTUMsU0FBUTtJQUNqQkMsU0FBUztRQUFDO1FBQUk7S0FBUSxDQUFDLHVCQUF1QjtBQUNsRCxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9taWRkbGV3YXJlLnRzP2QxOTkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuXG4vL+OBk+OBruODleOCoeOCpOODq+OBr2FwcOebtOS4i+OBp+OBr+OBquOBj+OAgXNyY+ebtOS4i+OBq+e9ruOBj+W/heimgeOBjOOBguOCi+OAglxuZXhwb3J0IGNvbnN0IG1pZGRsZXdhcmUgPSAocmVxdWVzdDogTmV4dFJlcXVlc3QpID0+e1xuICAgIGNvbnNvbGUubG9nKFwiTUlERExFIFdBUkVcIik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5uZXh0KCk7XG59XG5cbmV4cG9ydCBjb25zdCBjb25maWcgPXtcbiAgICBtYXRjaGVyOiBbJy8nLCcvdGFzayddIC8v44Of44OJ44Or44Km44Kn44Ki44KS6YCa6YGO44GV44Gb44Gf44GE44OR44K544KS6YWN5YiX44Gn5oyH5a6aXG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIm1pZGRsZXdhcmUiLCJyZXF1ZXN0IiwiY29uc29sZSIsImxvZyIsIm5leHQiLCJjb25maWciLCJtYXRjaGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(middleware)/./src/middleware.ts\n");

/***/ })

});
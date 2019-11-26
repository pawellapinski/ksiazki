(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/borrow/create.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/borrow/create.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixin_search_book_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../mixin/search/book.js */ "./resources/js/components/mixin/search/book.js");
/* harmony import */ var _mixin_search_user_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../mixin/search/user.js */ "./resources/js/components/mixin/search/user.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [_mixin_search_book_js__WEBPACK_IMPORTED_MODULE_0__["default"], _mixin_search_user_js__WEBPACK_IMPORTED_MODULE_1__["default"]],
  data: function data() {
    return {
      form: {
        book_id: '',
        user_id: '',
        date_issued: '',
        date_due_for_return: ''
      },
      errors: {},
      loading: false,
      disabled: false
    };
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    if (to.params.id) {
      axios.get("/api/borrows/".concat(to.params.id)).then(function (response) {
        next(function (vm) {
          return vm.setData(response.data);
        });
      }).catch(function (error) {
        if (error.response.statusText) {
          next(function (vm) {
            return vm.$message({
              type: 'error',
              message: error.response.statusText
            });
          });
        }
      });
    } else {
      next();
    }
  },
  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
    var vm = this;

    if (to.params.id) {
      vm.errors = {};
      axios.get("/api/borrows/".concat(to.params.id)).then(function (response) {
        vm.setData(response.data);
        next();
      }).catch(function (error) {
        if (error.response.statusText) {
          vm.$message({
            type: 'error',
            message: error.response.statusText
          });
        }
      });
    } else {
      next();
    }
  },
  methods: {
    setData: function setData(response) {
      var vm = this;
      vm.books = [];
      vm.users = [];
      vm.books = [{
        value: response.book.id,
        label: response.book.title
      }];
      vm.users = [{
        value: response.user.id,
        label: response.user.name
      }];
      vm.form = response;
      vm.form.book_id = response.book.id;
      vm.form.user_id = response.user.id;
    },
    onCancel: function onCancel() {
      this.$router.push({
        name: 'view-borrow'
      });
    },
    onSubmit: function onSubmit() {
      var vm = this;
      this.$refs.form.validate(function (valid) {
        if (valid) {
          vm.disabled = true;
          vm.errors = {};
          var id = vm.$route.params.id;
          axios[id ? 'put' : 'post']("/api/borrows".concat(id ? "/".concat(id) : ''), vm.form).then(function () {
            vm.disabled = false;
            vm.errors = {};
            vm.$message({
              type: 'success',
              message: 'Borrow has been created'
            });
          }).catch(function (error) {
            vm.disabled = false;

            if (error.response.data.errors && error.response.data.message) {
              vm.errors = error.response.data.errors;
              vm.$message({
                message: error.response.data.message,
                type: 'error'
              });
            }
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/borrow/create.vue?vue&type=template&id=18bb29ca&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/borrow/create.vue?vue&type=template&id=18bb29ca& ***!
  \****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "el-row",
        [
          _c(
            "el-col",
            { attrs: { span: 24 } },
            [
              _c(
                "el-card",
                { attrs: { shadow: "never" } },
                [
                  _c("div", { attrs: { slot: "header" }, slot: "header" }, [
                    _c("span", [
                      _vm._v(
                        _vm._s(_vm.$route.params.id ? "Edytuj" : "Utwórz") +
                          " Wypożyczenie"
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "el-form",
                    {
                      ref: "form",
                      attrs: { model: _vm.form, "label-width": "120px" },
                      nativeOn: {
                        submit: function($event) {
                          $event.preventDefault()
                          return _vm.onSubmit($event)
                        }
                      }
                    },
                    [
                      _c(
                        "el-form-item",
                        { attrs: { prop: "book_id", label: "Ksiazka" } },
                        [
                          _c(
                            "el-select",
                            {
                              attrs: {
                                filterable: "",
                                remote: "",
                                "reserve-keyword": "",
                                placeholder: "Please enter a keyword",
                                "remote-method": _vm.search_book,
                                "reserve-keyword": "",
                                loading: _vm.loading
                              },
                              model: {
                                value: _vm.form.book_id,
                                callback: function($$v) {
                                  _vm.$set(_vm.form, "book_id", $$v)
                                },
                                expression: "form.book_id"
                              }
                            },
                            _vm._l(_vm.books, function(item) {
                              return _c("el-option", {
                                key: item.value,
                                attrs: { label: item.label, value: item.value }
                              })
                            }),
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { prop: "user_id", label: "Uzywtkownik" } },
                        [
                          _c(
                            "el-select",
                            {
                              attrs: {
                                filterable: "",
                                remote: "",
                                "reserve-keyword": "",
                                placeholder: "Please enter a keyword",
                                "remote-method": _vm.search_user,
                                loading: _vm.loading
                              },
                              model: {
                                value: _vm.form.user_id,
                                callback: function($$v) {
                                  _vm.$set(_vm.form, "user_id", $$v)
                                },
                                expression: "form.user_id"
                              }
                            },
                            _vm._l(_vm.users, function(item) {
                              return _c("el-option", {
                                key: item.value,
                                attrs: { label: item.label, value: item.value }
                              })
                            }),
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        {
                          attrs: {
                            prop: "date_issued",
                            label: "Data wypożyczenia"
                          }
                        },
                        [
                          _c("el-date-picker", {
                            attrs: { type: "date", placeholder: "Pick a day" },
                            model: {
                              value: _vm.form.date_issued,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "date_issued", $$v)
                              },
                              expression: "form.date_issued"
                            }
                          }),
                          _vm._v(" "),
                          _vm._l(_vm.errors.date_issued, function(error) {
                            return _vm.errors.date_issued
                              ? _c(
                                  "div",
                                  { staticClass: "el-form-item__error" },
                                  [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(error) +
                                        "\n                            "
                                    )
                                  ]
                                )
                              : _vm._e()
                          })
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        {
                          attrs: {
                            prop: "date_due_for_return",
                            label: "termin zwrotu"
                          }
                        },
                        [
                          _c("el-date-picker", {
                            attrs: { type: "date", placeholder: "Pick a day" },
                            model: {
                              value: _vm.form.date_due_for_return,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "date_due_for_return", $$v)
                              },
                              expression: "form.date_due_for_return"
                            }
                          }),
                          _vm._v(" "),
                          _vm._l(_vm.errors.date_due_for_return, function(
                            error
                          ) {
                            return _vm.errors.date_due_for_return
                              ? _c(
                                  "div",
                                  { staticClass: "el-form-item__error" },
                                  [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(error) +
                                        "\n                            "
                                    )
                                  ]
                                )
                              : _vm._e()
                          })
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        [
                          _c(
                            "el-button",
                            {
                              attrs: {
                                disabled: _vm.disabled,
                                type: "primary"
                              },
                              on: {
                                click: function($event) {
                                  _vm.onSubmit("form")
                                }
                              }
                            },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.$route.params.id ? "Edytuj" : "Stwórz"
                                ) +
                                  " Wypożyczenie\n                            "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c("el-button", { on: { click: _vm.onCancel } }, [
                            _vm._v("Analuj")
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/borrow/create.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/borrow/create.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _create_vue_vue_type_template_id_18bb29ca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create.vue?vue&type=template&id=18bb29ca& */ "./resources/js/components/borrow/create.vue?vue&type=template&id=18bb29ca&");
/* harmony import */ var _create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create.vue?vue&type=script&lang=js& */ "./resources/js/components/borrow/create.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _create_vue_vue_type_template_id_18bb29ca___WEBPACK_IMPORTED_MODULE_0__["render"],
  _create_vue_vue_type_template_id_18bb29ca___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/borrow/create.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/borrow/create.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/borrow/create.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./create.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/borrow/create.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/borrow/create.vue?vue&type=template&id=18bb29ca&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/borrow/create.vue?vue&type=template&id=18bb29ca& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_vue_vue_type_template_id_18bb29ca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./create.vue?vue&type=template&id=18bb29ca& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/borrow/create.vue?vue&type=template&id=18bb29ca&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_vue_vue_type_template_id_18bb29ca___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_vue_vue_type_template_id_18bb29ca___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/mixin/search/book.js":
/*!******************************************************!*\
  !*** ./resources/js/components/mixin/search/book.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      books: []
    };
  },
  methods: {
    search_book: function search_book(query) {
      var vm = this;

      if (query !== '') {
        vm.onSearchAuthor(query, vm);
      } else {
        vm.loading = false;
        vm.books = [];
      }
    },
    onSearchAuthor: _.debounce(function (query, vm) {
      vm.loading = true;
      axios.get('/api/books/search?search=' + query).then(function (q) {
        vm.loading = false;
        vm.books = q.data.data.map(function (item) {
          return {
            value: item.id,
            label: item.title
          };
        });
      }).catch(function () {
        vm.loading = false;
      });
    }, 350)
  }
});

/***/ }),

/***/ "./resources/js/components/mixin/search/user.js":
/*!******************************************************!*\
  !*** ./resources/js/components/mixin/search/user.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      users: []
    };
  },
  methods: {
    search_user: function search_user(query) {
      var vm = this;

      if (query !== '') {
        vm.onSearchUser(query, vm);
      } else {
        vm.loading = false;
        vm.users = [];
      }
    },
    onSearchUser: _.debounce(function (query, vm) {
      vm.loading = true;
      axios.get('/api/users/search?search=' + query).then(function (q) {
        vm.loading = false;
        vm.users = q.data.data.map(function (item) {
          return {
            value: item.id,
            label: item.name
          };
        });
      }).catch(function () {
        vm.loading = false;
      });
    }, 350)
  }
});

/***/ })

}]);
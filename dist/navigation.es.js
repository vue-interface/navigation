function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
function appendClass(vnode, str) {
  vnode.data.staticClass = `${vnode.data.staticClass && vnode.data.staticClass.replace(str, "") || ""} ${str}`.trim();
}
function wrap(wrapper, fn) {
  return (e) => {
    if (typeof fn === "function") {
      fn(e);
    }
    if (!e.cancelBubble) {
      wrapper(e);
    }
  };
}
function listener(vnode, key) {
  return vnode.data.on[key] || vnode.componentOptions && vnode.componentOptions.listeners && vnode.componentOptions.listeners[key];
}
function prepare(vnode) {
  vnode.data = Object.assign({ staticClass: void 0 }, vnode.data);
  if (!vnode.data.attrs) {
    vnode.data.attrs = {};
  }
  if (!vnode.data.on) {
    vnode.data.on = {};
  }
  return vnode;
}
function is(value) {
  return value === "" || !!value;
}
function disable(vnode) {
  vnode.data.attrs.disabled = void 0;
  Object.assign(vnode.data.attrs, {
    "aria-disabled": true,
    tabindex: -1
  });
  appendClass(vnode, "disabled");
  return vnode;
}
function link(vnode) {
  prepare(vnode);
  appendClass(vnode, "nav-link");
  if (is(vnode.data.attrs.disabled)) {
    disable(vnode);
  }
  if (is(vnode.data.attrs.active)) {
    appendClass(vnode, "active");
  }
  return vnode;
}
const __vue2_script$1 = {
  functional: true,
  render(h, context) {
    return context.children.filter((vnode) => !!vnode.tag).map((vnode, i) => {
      vnode = prepare(vnode);
      vnode.data.on.click = wrap((e) => {
        context.parent.$emit("click-item", e, vnode);
      }, listener(vnode, "click"));
      if (vnode.componentOptions && vnode.componentOptions.tag === "btn-dropdown") {
        vnode.data.attrs.nav = true;
        vnode.data.attrs.href = vnode.data.attrs.href || "#";
        return h("div", {
          class: {
            "nav-item": true
          }
        }, [vnode]);
      }
      if (vnode.tag === "div") {
        appendClass(vnode, "nav-item");
        vnode.children.filter((vnode2) => !vnode2.text).map((child) => link(child));
        return vnode;
      }
      return h("div", {
        class: {
          "nav-item": true
        }
      }, [link(vnode)]);
    });
  }
};
let __vue2_render, __vue2_staticRenderFns;
const __cssModules$1 = {};
var __component__$1 = /* @__PURE__ */ normalizeComponent(__vue2_script$1, __vue2_render, __vue2_staticRenderFns, false, __vue2_injectStyles$1, null, null, null);
function __vue2_injectStyles$1(context) {
  for (let o in __cssModules$1) {
    this[o] = __cssModules$1[o];
  }
}
var NavigationItems = /* @__PURE__ */ function() {
  return __component__$1.exports;
}();
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("nav", { staticClass: "nav", class: _vm.classes, attrs: { "aria-label": "nav" } }, [_c("navigation-items", [_vm._t("default")], 2)], 1);
};
var staticRenderFns = [];
const __vue2_script = {
  name: "Navigation",
  components: {
    NavigationItems
  },
  props: {
    fill: Boolean,
    justified: Boolean,
    pills: Boolean,
    tabs: Boolean
  },
  computed: {
    classes() {
      return {
        "nav-fill": this.fill,
        "nav-justified": this.justified,
        "nav-pills": this.pills,
        "nav-tabs": this.tabs && !this.pills
      };
    }
  }
};
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var Navigation = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export { Navigation, NavigationItems };

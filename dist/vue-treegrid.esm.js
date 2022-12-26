/*
 * jQuery treegrid Plugin 0.3.0
 * https://github.com/maxazan/jquery-treegrid
 *
 * Copyright 2013, Pomazan Max
 * Licensed under the MIT licenses.
 */
(function ($) {
  var methods = {
    /**
     * Initialize tree
     *
     * @param {Object} options
     * @returns {Object[]}
     */
    initTree: function (options) {
      var settings = $.extend({}, this.treegrid.defaults, options);
      return this.each(function () {
        var $this = $(this);
        $this.treegrid("setTreeContainer", $(this));
        $this.treegrid("setSettings", settings);
        settings.getRootNodes
          .apply(this, [$(this)])
          .treegrid("initNode", settings);
        $this.treegrid("getRootNodes").treegrid("render");
      });
    },
    /**
     * Initialize node
     *
     * @param {Object} settings
     * @returns {Object[]}
     */
    initNode: function (settings) {
      return this.each(function () {
        var $this = $(this);
        $this.treegrid(
          "setTreeContainer",
          settings.getTreeGridContainer.apply(this)
        );
        $this.treegrid("getChildNodes").treegrid("initNode", settings);
        $this
          .treegrid("initExpander")
          .treegrid("initIndent")
          .treegrid("initEvents")
          .treegrid("initState")
          .treegrid("initChangeEvent")
          .treegrid("initSettingsEvents");
      });
    },
    initChangeEvent: function () {
      var $this = $(this);
      //Save state on change
      $this.on("change", function () {
        var $this = $(this);
        if ($this.treegrid("getSetting", "saveState")) {
          $this.treegrid("saveState");
        }
      });
      return $this;
    },
    /**
     * Initialize node events
     *
     * @returns {Node}
     */
    initEvents: function () {
      var $this = $(this);
      //Default behavior on collapse
      $this.on("collapse", function () {
        var $this = $(this);
        $this.removeClass("treegrid-expanded");
        $this.addClass("treegrid-collapsed");
      });
      //Default behavior on expand
      $this.on("expand", function () {
        var $this = $(this);
        $this.removeClass("treegrid-collapsed");
        $this.addClass("treegrid-expanded");
      });

      return $this;
    },
    /**
     * Initialize events from settings
     *
     * @returns {Node}
     */
    initSettingsEvents: function () {
      var $this = $(this);
      //Save state on change
      $this.on("change", function () {
        var $this = $(this);
        if (typeof $this.treegrid("getSetting", "onChange") === "function") {
          $this.treegrid("getSetting", "onChange").apply($this);
        }
      });
      //Default behavior on collapse
      $this.on("collapse", function () {
        var $this = $(this);
        if (typeof $this.treegrid("getSetting", "onCollapse") === "function") {
          $this.treegrid("getSetting", "onCollapse").apply($this);
        }
      });
      //Default behavior on expand
      $this.on("expand", function () {
        var $this = $(this);
        if (typeof $this.treegrid("getSetting", "onExpand") === "function") {
          $this.treegrid("getSetting", "onExpand").apply($this);
        }
      });

      return $this;
    },
    /**
     * Initialize expander for node
     *
     * @returns {Node}
     */
    initExpander: function () {
      var $this = $(this);
      var cell = $this
        .find("td")
        .get($this.treegrid("getSetting", "treeColumn"));
      var tpl = $this.treegrid("getSetting", "expanderTemplate");
      var expander = $this.treegrid("getSetting", "getExpander").apply(this);
      if (expander) {
        expander.remove();
      }
      $(tpl)
        .prependTo(cell)
        .click(function () {
          $($(this).closest("tr")).treegrid("toggle");
        });
      return $this;
    },
    /**
     * Initialize indent for node
     *
     * @returns {Node}
     */
    initIndent: function () {
      var $this = $(this);
      $this.find(".treegrid-indent").remove();
      var tpl = $this.treegrid("getSetting", "indentTemplate");
      var expander = $this.find(".treegrid-expander");
      var depth = $this.treegrid("getDepth");
      for (var i = 0; i < depth; i++) {
        $(tpl).insertBefore(expander);
      }
      return $this;
    },
    /**
     * Initialise state of node
     *
     * @returns {Node}
     */
    initState: function () {
      var $this = $(this);
      if (
        $this.treegrid("getSetting", "saveState") &&
        !$this.treegrid("isFirstInit")
      ) {
        $this.treegrid("restoreState");
      } else {
        if ($this.treegrid("getSetting", "initialState") === "expanded") {
          $this.treegrid("expand");
        } else {
          $this.treegrid("collapse");
        }
      }
      return $this;
    },
    /**
     * Return true if this tree was never been initialised
     *
     * @returns {Boolean}
     */
    isFirstInit: function () {
      var tree = $(this).treegrid("getTreeContainer");
      if (tree.data("first_init") === undefined) {
        tree.data(
          "first_init",
          $.cookie(tree.treegrid("getSetting", "saveStateName")) === undefined
        );
      }
      return tree.data("first_init");
    },
    /**
     * Save state of current node
     *
     * @returns {Node}
     */
    saveState: function () {
      var $this = $(this);
      if ($this.treegrid("getSetting", "saveStateMethod") === "cookie") {
        var stateArrayString =
          $.cookie($this.treegrid("getSetting", "saveStateName")) || "";
        var stateArray =
          stateArrayString === "" ? [] : stateArrayString.split(",");
        var nodeId = $this.treegrid("getNodeId");

        if ($this.treegrid("isExpanded")) {
          if ($.inArray(nodeId, stateArray) === -1) {
            stateArray.push(nodeId);
          }
        } else if ($this.treegrid("isCollapsed")) {
          if ($.inArray(nodeId, stateArray) !== -1) {
            stateArray.splice($.inArray(nodeId, stateArray), 1);
          }
        }
        $.cookie(
          $this.treegrid("getSetting", "saveStateName"),
          stateArray.join(",")
        );
      }
      return $this;
    },
    /**
     * Restore state of current node.
     *
     * @returns {Node}
     */
    restoreState: function () {
      var $this = $(this);
      if ($this.treegrid("getSetting", "saveStateMethod") === "cookie") {
        var stateArray = $.cookie(
          $this.treegrid("getSetting", "saveStateName")
        ).split(",");
        if ($.inArray($this.treegrid("getNodeId"), stateArray) !== -1) {
          $this.treegrid("expand");
        } else {
          $this.treegrid("collapse");
        }
      }
      return $this;
    },
    /**
     * Method return setting by name
     *
     * @param {type} name
     * @returns {unresolved}
     */
    getSetting: function (name) {
      if (!$(this).treegrid("getTreeContainer")) {
        return null;
      }
      return $(this).treegrid("getTreeContainer").data("settings")[name];
    },
    /**
     * Set setting by name
     *
     * @param {type} name
     * @param {type} value
     *
     * @returns {Node}
     */
    setSetting: function (name, value) {
      var $this = $(this);
      if (!$this.treegrid("getTreeContainer")) {
        return $this;
      }
      $this.treegrid("getTreeContainer").data("settings")[name] = value;
      return $this;
    },
    /**
     * Add new settings
     *
     * @param {Object} settings
     */
    setSettings: function (settings) {
      $(this).treegrid("getTreeContainer").data("settings", settings);
    },
    /**
     * Return tree container
     *
     * @returns {HtmlElement}
     */
    getTreeContainer: function () {
      return $(this).data("treegrid");
    },
    /**
     * Set tree container
     *
     * @param {HtmlE;ement} container
     */
    setTreeContainer: function (container) {
      return $(this).data("treegrid", container);
    },
    /**
     * Method return all root nodes of tree.
     *
     * Start init all child nodes from it.
     *
     * @returns {Array}
     */
    getRootNodes: function () {
      return $(this)
        .treegrid("getSetting", "getRootNodes")
        .apply(this, [$(this).treegrid("getTreeContainer")]);
    },
    /**
     * Method return all nodes of tree.
     *
     * @returns {Array}
     */
    getAllNodes: function () {
      return $(this)
        .treegrid("getSetting", "getAllNodes")
        .apply(this, [$(this).treegrid("getTreeContainer")]);
    },
    /**
     * Mthod return true if element is Node
     *
     * @returns {String}
     */
    isNode: function () {
      return $(this).treegrid("getNodeId") !== null;
    },
    /**
     * Mthod return id of node
     *
     * @returns {String}
     */
    getNodeId: function () {
      if ($(this).treegrid("getSetting", "getNodeId") === null) {
        return null;
      } else {
        return $(this).treegrid("getSetting", "getNodeId").apply(this);
      }
    },
    /**
     * Method return parent id of node or null if root node
     *
     * @returns {String}
     */
    getParentNodeId: function () {
      return $(this).treegrid("getSetting", "getParentNodeId").apply(this);
    },
    /**
     * Method return parent node or null if root node
     *
     * @returns {Object[]}
     */
    getParentNode: function () {
      if ($(this).treegrid("getParentNodeId") === null) {
        return null;
      } else {
        return $(this)
          .treegrid("getSetting", "getNodeById")
          .apply(this, [
            $(this).treegrid("getParentNodeId"),
            $(this).treegrid("getTreeContainer") ]);
      }
    },
    /**
     * Method return array of child nodes or null if node is leaf
     *
     * @returns {Object[]}
     */
    getChildNodes: function () {
      return $(this)
        .treegrid("getSetting", "getChildNodes")
        .apply(this, [
          $(this).treegrid("getNodeId"),
          $(this).treegrid("getTreeContainer") ]);
    },
    /**
     * Method return depth of tree.
     *
     * This method is needs for calculate indent
     *
     * @returns {Number}
     */
    getDepth: function () {
      if ($(this).treegrid("getParentNode") === null) {
        return 0;
      }
      return $(this).treegrid("getParentNode").treegrid("getDepth") + 1;
    },
    /**
     * Method return true if node is root
     *
     * @returns {Boolean}
     */
    isRoot: function () {
      return $(this).treegrid("getDepth") === 0;
    },
    /**
     * Method return true if node has no child nodes
     *
     * @returns {Boolean}
     */
    isLeaf: function () {
      return $(this).treegrid("getChildNodes").length === 0;
    },
    /**
     * Method return true if node last in branch
     *
     * @returns {Boolean}
     */
    isLast: function () {
      if ($(this).treegrid("isNode")) {
        var parentNode = $(this).treegrid("getParentNode");
        if (parentNode === null) {
          if (
            $(this).treegrid("getNodeId") ===
            $(this).treegrid("getRootNodes").last().treegrid("getNodeId")
          ) {
            return true;
          }
        } else {
          if (
            $(this).treegrid("getNodeId") ===
            parentNode.treegrid("getChildNodes").last().treegrid("getNodeId")
          ) {
            return true;
          }
        }
      }
      return false;
    },
    /**
     * Method return true if node first in branch
     *
     * @returns {Boolean}
     */
    isFirst: function () {
      if ($(this).treegrid("isNode")) {
        var parentNode = $(this).treegrid("getParentNode");
        if (parentNode === null) {
          if (
            $(this).treegrid("getNodeId") ===
            $(this).treegrid("getRootNodes").first().treegrid("getNodeId")
          ) {
            return true;
          }
        } else {
          if (
            $(this).treegrid("getNodeId") ===
            parentNode.treegrid("getChildNodes").first().treegrid("getNodeId")
          ) {
            return true;
          }
        }
      }
      return false;
    },
    /**
     * Return true if node expanded
     *
     * @returns {Boolean}
     */
    isExpanded: function () {
      return $(this).hasClass("treegrid-expanded");
    },
    /**
     * Return true if node collapsed
     *
     * @returns {Boolean}
     */
    isCollapsed: function () {
      return $(this).hasClass("treegrid-collapsed");
    },
    /**
     * Return true if at least one of parent node is collapsed
     *
     * @returns {Boolean}
     */
    isOneOfParentsCollapsed: function () {
      var $this = $(this);
      if ($this.treegrid("isRoot")) {
        return false;
      } else {
        if ($this.treegrid("getParentNode").treegrid("isCollapsed")) {
          return true;
        } else {
          return $this
            .treegrid("getParentNode")
            .treegrid("isOneOfParentsCollapsed");
        }
      }
    },
    /**
     * Expand node
     *
     * @returns {Node}
     */
    expand: function () {
      if (!this.treegrid("isLeaf") && !this.treegrid("isExpanded")) {
        this.trigger("expand");

        this.treegrid("renderExpander");
        this.treegrid("getChildNodes").treegrid("show");

        this.trigger("change");
        return this;
      }
      return this;
    },
    /**
     * Show subtree
     *
     * @returns {Node}
     */
    show: function () {
      return $(this).each(function () {
        var $this = $(this);
        if (
          !$this.treegrid("getSetting", "filter") ||
          $this.treegrid("isMarkedMatched")
        ) {
          $this.show();
          if ($this.treegrid("isExpanded")) {
            $this.treegrid("getChildNodes").treegrid("show");
          }
        }
      });
    },
    /**
     * Expand all nodes
     *
     * @returns {Node}
     */
    expandAll: function () {
      var $this = $(this);
      $this.treegrid("getRootNodes").treegrid("expandRecursive");
      return $this;
    },
    /**
     * Expand current node and all child nodes begin from current
     *
     * @returns {Node}
     */
    expandRecursive: function () {
      return $(this).each(function () {
        var $this = $(this);
        $this.treegrid("expand");
        if (!$this.treegrid("isLeaf")) {
          $this.treegrid("getChildNodes").treegrid("expandRecursive");
        }
      });
    },
    /**
     * Collapse node
     *
     * @returns {Node}
     */
    collapse: function () {
      return $(this).each(function () {
        var $this = $(this);
        if (!$this.treegrid("isLeaf") && !$this.treegrid("isCollapsed")) {
          $this.trigger("collapse");

          $this.treegrid("renderExpander");
          $this.treegrid("getChildNodes").treegrid("hide");

          $this.trigger("change");
        }
      });
    },
    /**
     * Hide subtree
     *
     * @returns {Node}
     */
    hide: function () {
      return $(this).each(function () {
        var $this = $(this);
        $this.hide();
        if ($this.treegrid("isExpanded")) {
          $this.treegrid("getChildNodes").treegrid("hide");
        }
      });
    },
    /**
     * Collapse all nodes
     *
     * @returns {Node}
     */
    collapseAll: function () {
      var $this = $(this);
      $this.treegrid("getRootNodes").treegrid("collapseRecursive");
      return $this;
    },
    /**
     * Collapse current node and all child nodes begin from current
     *
     * @returns {Node}
     */
    collapseRecursive: function () {
      return $(this).each(function () {
        var $this = $(this);
        $this.treegrid("collapse");
        if (!$this.treegrid("isLeaf")) {
          $this.treegrid("getChildNodes").treegrid("collapseRecursive");
        }
      });
    },
    /**
     * Expand if collapsed, Collapse if expanded
     *
     * @returns {Node}
     */
    toggle: function () {
      var $this = $(this);
      if ($this.treegrid("isExpanded")) {
        $this.treegrid("collapse");
      } else {
        $this.treegrid("expand");
      }
      return $this;
    },
    /**
     * Rendering node
     *
     * @returns {Node}
     */
    render: function () {
      return $(this).each(function () {
        var $this = $(this);
        //if parent colapsed we hidden
        if ($this.treegrid("isOneOfParentsCollapsed")) {
          $this.hide();
        } else {
          if (
            !$this.treegrid("getSetting", "filter") ||
            $this.treegrid("isMarkedMatched")
          ) {
            $this.show();
          }
        }
        if (!$this.treegrid("isLeaf")) {
          $this.treegrid("renderExpander");
          $this.treegrid("getChildNodes").treegrid("render");
        }
      });
    },
    /**
     * Rendering expander depends on node state
     *
     * @returns {Node}
     */
    renderExpander: function () {
      return $(this).each(function () {
        var $this = $(this);
        var expander = $this.treegrid("getSetting", "getExpander").apply(this);
        if (expander) {
          if (!$this.treegrid("isCollapsed")) {
            expander.removeClass(
              $this.treegrid("getSetting", "expanderCollapsedClass")
            );
            expander.addClass(
              $this.treegrid("getSetting", "expanderExpandedClass")
            );
          } else {
            expander.removeClass(
              $this.treegrid("getSetting", "expanderExpandedClass")
            );
            expander.addClass(
              $this.treegrid("getSetting", "expanderCollapsedClass")
            );
          }
        } else {
          $this.treegrid("initExpander");
          $this.treegrid("renderExpander");
        }
      });
    },

    /**
     * Filter tree by string.
     * Show only branches that have nodes that match the search string.
     *
     * @returns {Node}
     */
    filterAll: function (filterString) {
      var $this = $(this);
      $this
        .treegrid("setSetting", "filter", filterString)
        .treegrid("getRootNodes")
        .treegrid("filterRecursive", filterString, false);
      return $this;
    },
    /**
     * Filter subtrees by string.
     * Show only branches that have nodes that match the search string.
     *
     * @returns {Boolean}
     */
    filterRecursive: function (filterString, parentMatched) {
      var matched = false;
      $(this).each(function () {
        var $this = $(this);

        var thisMatched =
          parentMatched || $this.treegrid("isMatched", filterString);
        if (!$this.treegrid("isLeaf")) {
          thisMatched =
            $this
              .treegrid("getChildNodes")
              .treegrid("filterRecursive", filterString, thisMatched) ||
            thisMatched;
        }

        if (thisMatched) {
          $this.treegrid("markMatched");
          if (!$this.treegrid("isOneOfParentsCollapsed")) {
            $this.show();
          }
        } else {
          $this.treegrid("unmarkMatched");
          $this.hide();
        }
        matched = matched || thisMatched;
      });
      return matched;
    },
    /**
     * Return true if the node matches the search string
     *
     * @returns {Boolean}
     */
    isMatched: function (searchString) {
      if (!searchString) {
        return true;
      }
      var $this = $(this);
      var cell = $this
        .find("td")
        .get($this.treegrid("getSetting", "treeColumn"));
      return (
        $(cell).filter(":contains('" + searchString.replace(/'/g, "\\'") + "')")
          .length > 0
      );
    },
    /**
     * Mark node as matched to the filter
     *
     * @returns {Boolean}
     */
    markMatched: function () {
      var $this = $(this);
      $this.addClass("treegrid-matched");
    },
    /**
     * Is node marked as matched to the filter
     *
     * @returns {Boolean}
     */
    isMarkedMatched: function () {
      var $this = $(this);
      return $this.hasClass("treegrid-matched");
    },
    /**
     * Mark node as not matched to the filter
     *
     * @returns {Boolean}
     */
    unmarkMatched: function () {
      var $this = $(this);
      $this.removeClass("treegrid-matched");
    },
  };
  $.fn.treegrid = function (method) {
    if (methods[method]) {
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === "object" || !method) {
      return methods.initTree.apply(this, arguments);
    } else {
      $.error(
        "Method with name " + method + " does not exists for jQuery.treegrid"
      );
    }
  };
  /**
   *  Plugin's default options
   */
  $.fn.treegrid.defaults = {
    initialState: "expanded",
    saveState: false,
    saveStateMethod: "cookie",
    saveStateName: "tree-grid-state",
    expanderTemplate: '<span class="treegrid-expander"></span>',
    indentTemplate: '<span class="treegrid-indent"></span>',
    expanderExpandedClass: "treegrid-expander-expanded",
    expanderCollapsedClass: "treegrid-expander-collapsed",
    treeColumn: 0,
    filter: null,
    getExpander: function () {
      return $(this).find(".treegrid-expander");
    },
    getNodeId: function () {
      var template = /treegrid-([A-Za-z0-9_-]+)/;
      if (template.test($(this).attr("class"))) {
        return template.exec($(this).attr("class"))[1];
      }
      return null;
    },
    getParentNodeId: function () {
      var template = /treegrid-parent-([A-Za-z0-9_-]+)/;
      if (template.test($(this).attr("class"))) {
        return template.exec($(this).attr("class"))[1];
      }
      return null;
    },
    getNodeById: function (id, treegridContainer) {
      var templateClass = "treegrid-" + id;
      return treegridContainer.find("tr." + templateClass);
    },
    getChildNodes: function (id, treegridContainer) {
      var templateClass = "treegrid-parent-" + id;
      return treegridContainer.find("tr." + templateClass);
    },
    getTreeGridContainer: function () {
      return $(this).closest("table");
    },
    getRootNodes: function (treegridContainer) {
      var result = $.grep(treegridContainer.find("tr"), function (element) {
        var classNames = $(element).attr("class");
        var templateClass = /treegrid-([A-Za-z0-9_-]+)/;
        var templateParentClass = /treegrid-parent-([A-Za-z0-9_-]+)/;
        return (
          templateClass.test(classNames) &&
          !templateParentClass.test(classNames)
        );
      });
      return $(result);
    },
    getAllNodes: function (treegridContainer) {
      var result = $.grep(treegridContainer.find("tr"), function (element) {
        var classNames = $(element).attr("class");
        var templateClass = /treegrid-([A-Za-z0-9_-]+)/;
        return templateClass.test(classNames);
      });
      return $(result);
    },
    //Events
    onCollapse: null,
    onExpand: null,
    onChange: null,
  };
})(jQuery);

//
var script = {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      default: {},
    },
  },
  created: function created() {
    $(document).ready(function () {
      $(".tree").treegrid(this.options);
    });
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("table", { staticClass: "table table-bordered tree" }, [
    _c(
      "thead",
      _vm._l(_vm.columns, function (item, index) {
        return _c("th", { key: index }, [
          _vm._v("\n      " + _vm._s(item.name) + "\n    ") ])
      }),
      0
    ),
    _vm._v(" "),
    _c(
      "tbody",
      _vm._l(_vm.rows, function (item, index) {
        return _c(
          "tr",
          {
            key: index,
            class:
              "treegrid-" +
              item.id +
              " " +
              (item.parent_id ? "treegrid-parent-" + item.parent_id : ""),
          },
          _vm._l(_vm.columns, function (column, index) {
            return _c(
              "td",
              { key: index },
              [
                _vm._t(
                  column.field,
                  function () {
                    return [_vm._v(_vm._s(item.name))]
                  },
                  _vm._d({}, [column.field, item.name])
                ) ],
              2
            )
          }),
          0
        )
      }),
      0
    ) ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-bf68b538_0", { source: "\n@import \"./assets/css/jquery.treegrid.css\";\r\n", map: {"version":3,"sources":["D:\\Documents\\3C\\treegrid-component\\src\\vue-treegrid.vue"],"names":[],"mappings":";AAmDA,0CAAA","file":"vue-treegrid.vue","sourcesContent":["<template>\r\n  <table class=\"table table-bordered tree\">\r\n    <thead>\r\n      <th v-for=\"(item, index) in columns\" :key=\"index\">\r\n        {{ item.name }}\r\n      </th>\r\n    </thead>\r\n    <tbody>\r\n      <tr\r\n        v-for=\"(item, index) in rows\"\r\n        :key=\"index\"\r\n        :class=\"`treegrid-${item.id} ${\r\n          item.parent_id ? `treegrid-parent-${item.parent_id}` : ''\r\n        }`\"\r\n      >\r\n        <td v-for=\"(column, index) in columns\" :key=\"index\">\r\n          <slot :name=\"column.field\" v-bind:[column.field]=\"item.name\">{{\r\n            item.name\r\n          }}</slot>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</template>\r\n\r\n<script>\r\nimport \"./assets/js/jquery.treegrid\";\r\nexport default {\r\n  props: {\r\n    columns: {\r\n      type: Array,\r\n      required: true,\r\n    },\r\n    rows: {\r\n      type: Array,\r\n      required: true,\r\n    },\r\n    options: {\r\n      type: Object,\r\n      default: {},\r\n    },\r\n  },\r\n  created() {\r\n    $(document).ready(function () {\r\n      $(\".tree\").treegrid(this.options);\r\n    });\r\n  },\r\n};\r\n</script>\r\n\r\n<style>\r\n@import \"./assets/css/jquery.treegrid.css\";\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

// Declare install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.component("treegrid", __vue_component__);
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default __vue_component__;
export { install };

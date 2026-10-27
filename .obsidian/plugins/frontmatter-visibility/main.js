var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => FrontmatterVisibilityPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian6 = require("obsidian");

// src/confirm-reset-modal.ts
var import_obsidian = require("obsidian");
var ConfirmResetModal = class extends import_obsidian.Modal {
  constructor(app, overrideCount, onConfirm) {
    super(app);
    this.overrideCount = overrideCount;
    this.onConfirm = onConfirm;
  }
  onOpen() {
    this.setTitle("Reset note overrides?");
    this.contentEl.createEl("p", {
      text: `This will remove ${this.overrideCount.toString()} saved note ${this.overrideCount === 1 ? "override" : "overrides"}. Notes will use the vault default.`
    });
    new import_obsidian.Setting(this.contentEl).addButton(
      (button) => button.setButtonText("Cancel").onClick(() => this.close())
    ).addButton(
      (button) => button.setButtonText("Reset overrides").setDestructive().setCta().onClick(async () => {
        button.setDisabled(true);
        await this.onConfirm();
        this.close();
      })
    );
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/editor-extension.ts
var import_state = require("@codemirror/state");
var import_view = require("@codemirror/view");
var import_obsidian3 = require("obsidian");

// src/frontmatter.ts
var import_obsidian2 = require("obsidian");
function getValidFrontmatterInfo(content) {
  const info = (0, import_obsidian2.getFrontMatterInfo)(content);
  if (!info.exists || info.contentStart <= 0) {
    return null;
  }
  try {
    const parsed = (0, import_obsidian2.parseYaml)(info.frontmatter);
    if (parsed !== null && (typeof parsed !== "object" || Array.isArray(parsed))) {
      return null;
    }
  } catch (e) {
    return null;
  }
  return info;
}
function hasValidLeadingFrontmatter(content) {
  return getValidFrontmatterInfo(content) !== null;
}

// src/editor-extension.ts
var DEFAULT_PRESENTATION = {
  mode: "shown",
  showHeader: false
};
var setFrontmatterPresentation = import_state.StateEffect.define();
function createFrontmatterEditorExtension(actions) {
  const presentationField = createPresentationField(actions);
  return [
    presentationField,
    import_view.ViewPlugin.fromClass(
      class {
        constructor(view) {
          this.view = view;
          var _a;
          (_a = actions.onMount) == null ? void 0 : _a.call(actions, view);
        }
        destroy() {
          var _a;
          (_a = actions.onDestroy) == null ? void 0 : _a.call(actions, this.view);
        }
      }
    )
  ];
}
function createPresentationField(actions) {
  return import_state.StateField.define({
    create: () => ({
      presentation: DEFAULT_PRESENTATION,
      decorations: import_view.Decoration.none
    }),
    update: (value, transaction) => {
      const presentation = readPresentation(value.presentation, transaction);
      if (!transaction.docChanged && presentation === value.presentation) {
        return value;
      }
      return {
        presentation,
        decorations: buildDecorations(
          transaction.state,
          presentation,
          (view) => actions.onToggleCollapsed(view)
        )
      };
    },
    provide: (field) => import_view.EditorView.decorations.from(field, (value) => value.decorations)
  });
}
function readPresentation(current, transaction) {
  let presentation = current;
  for (const effect of transaction.effects) {
    if (effect.is(setFrontmatterPresentation)) {
      presentation = effect.value;
    }
  }
  return presentation;
}
function buildDecorations(state, presentation, onToggleCollapsed) {
  const info = getValidFrontmatterInfo(state.doc.toString());
  if (!info) {
    return import_view.Decoration.none;
  }
  if (presentation.mode === "shown") {
    return presentation.showHeader ? import_view.Decoration.set([
      import_view.Decoration.widget({
        block: true,
        side: -1,
        widget: new FrontmatterHeaderWidget(true, onToggleCollapsed)
      }).range(0)
    ]) : import_view.Decoration.none;
  }
  const widget = presentation.mode === "collapsed" && presentation.showHeader ? new FrontmatterHeaderWidget(false, onToggleCollapsed) : void 0;
  return import_view.Decoration.set([
    import_view.Decoration.replace({
      block: true,
      inclusive: true,
      widget
    }).range(0, info.contentStart)
  ]);
}
var FrontmatterHeaderWidget = class extends import_view.WidgetType {
  constructor(expanded, onToggleCollapsed) {
    super();
    this.expanded = expanded;
    this.onToggleCollapsed = onToggleCollapsed;
  }
  eq(other) {
    return this.expanded === other.expanded && this.onToggleCollapsed === other.onToggleCollapsed;
  }
  toDOM(view) {
    const button = view.dom.ownerDocument.createElement("button");
    const action = this.expanded ? "Collapse" : "Expand";
    button.type = "button";
    button.className = "frontmatter-visibility-header";
    button.setAttribute("aria-expanded", this.expanded ? "true" : "false");
    button.setAttribute("aria-label", `${action} YAML`);
    button.title = `${action} YAML`;
    const label = view.dom.ownerDocument.createElement("span");
    label.className = "frontmatter-visibility-header-label";
    label.textContent = "YAML";
    button.append(label);
    const control = view.dom.ownerDocument.createElement("span");
    control.className = "frontmatter-visibility-header-control";
    const actionLabel = view.dom.ownerDocument.createElement("span");
    actionLabel.className = "frontmatter-visibility-header-action";
    actionLabel.textContent = action;
    control.append(actionLabel);
    const icon = view.dom.ownerDocument.createElement("span");
    icon.className = "frontmatter-visibility-header-icon";
    icon.setAttribute("aria-hidden", "true");
    (0, import_obsidian3.setIcon)(icon, this.expanded ? "chevron-down" : "chevron-right");
    control.append(icon);
    button.append(control);
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.onToggleCollapsed(view);
    });
    return button;
  }
  ignoreEvent() {
    return true;
  }
};

// src/frontmatter-validity-cache.ts
var FrontmatterValidityCache = class {
  constructor(readContent, onResolved) {
    this.readContent = readContent;
    this.onResolved = onResolved;
    __publicField(this, "values", /* @__PURE__ */ new Map());
    __publicField(this, "pending", /* @__PURE__ */ new Map());
  }
  peek(path) {
    return this.values.get(path);
  }
  resolve(file) {
    var _a;
    const path = file.path;
    if (this.values.has(path)) {
      return Promise.resolve((_a = this.values.get(path)) != null ? _a : false);
    }
    const existing = this.pending.get(path);
    if (existing) {
      return existing;
    }
    const pending = Promise.resolve().then(() => this.readContent(file)).then(hasValidLeadingFrontmatter).catch(() => false).then((valid) => {
      if (this.pending.get(path) === pending) {
        this.pending.delete(path);
        this.values.set(path, valid);
        this.onResolved(path, valid);
      }
      return valid;
    });
    this.pending.set(path, pending);
    return pending;
  }
  invalidate(path) {
    this.values.delete(path);
    this.pending.delete(path);
  }
  movePath(oldPath, newPath) {
    if (oldPath === newPath) {
      return;
    }
    const moved = [];
    for (const [path, valid] of this.values) {
      if (matchesPath(path, oldPath)) {
        this.values.delete(path);
        moved.push([`${newPath}${path.slice(oldPath.length)}`, valid]);
      }
    }
    for (const [path, valid] of moved) {
      this.values.set(path, valid);
    }
    this.removePending(oldPath);
  }
  deletePath(path) {
    for (const candidate of this.values.keys()) {
      if (matchesPath(candidate, path)) {
        this.values.delete(candidate);
      }
    }
    this.removePending(path);
  }
  removePending(path) {
    for (const candidate of this.pending.keys()) {
      if (matchesPath(candidate, path)) {
        this.pending.delete(candidate);
      }
    }
  }
};
function matchesPath(candidate, path) {
  return candidate === path || candidate.startsWith(`${path}/`);
}

// src/rendered-view-controller.ts
var import_obsidian4 = require("obsidian");
var HIDDEN_CLASS = "frontmatter-visibility-is-hidden";
var COLLAPSED_CLASS = "frontmatter-visibility-is-collapsed";
var HEADER_CLASS = "frontmatter-visibility-header";
var RENDERED_HEADER_CLASS = "frontmatter-visibility-rendered-header";
var RenderedViewController = class {
  constructor(onToggleCollapsed, onNativePropertiesChange) {
    this.onToggleCollapsed = onToggleCollapsed;
    this.onNativePropertiesChange = onNativePropertiesChange;
  }
  attach(container, getPresentation) {
    var _a, _b;
    let active = true;
    let refreshQueued = false;
    let hasNativeProperties = this.hasNativeProperties(container);
    const refresh = () => {
      if (!active || refreshQueued) {
        return;
      }
      refreshQueued = true;
      queueMicrotask(() => {
        refreshQueued = false;
        if (!active) {
          return;
        }
        const nextHasNativeProperties = this.hasNativeProperties(container);
        if (nextHasNativeProperties !== hasNativeProperties) {
          hasNativeProperties = nextHasNativeProperties;
          if (this.onNativePropertiesChange) {
            this.onNativePropertiesChange();
            return;
          }
        }
        this.refresh(container, getPresentation());
      });
    };
    this.refresh(container, getPresentation());
    const Observer = (_b = (_a = container.ownerDocument.defaultView) == null ? void 0 : _a.MutationObserver) != null ? _b : MutationObserver;
    const observer = new Observer(refresh);
    observer.observe(container, { childList: true, subtree: true });
    return () => {
      active = false;
      observer.disconnect();
      this.cleanup(container);
    };
  }
  refresh(container, presentation) {
    var _a, _b;
    if (!isMarkdownContainer(container)) {
      return;
    }
    const hidden = presentation.hasFrontmatter && presentation.mode === "hidden";
    const collapsed = presentation.hasFrontmatter && presentation.mode === "collapsed";
    container.classList.toggle(HIDDEN_CLASS, hidden);
    container.classList.toggle(COLLAPSED_CLASS, collapsed);
    if (!presentation.hasFrontmatter || hidden) {
      (_a = this.findHeader(container)) == null ? void 0 : _a.remove();
      return;
    }
    const metadata = container.querySelector(".metadata-container");
    if (!metadata) {
      (_b = this.findHeader(container)) == null ? void 0 : _b.remove();
      return;
    }
    this.ensureHeader(container, metadata, presentation);
  }
  cleanup(container) {
    var _a;
    container.classList.remove(HIDDEN_CLASS, COLLAPSED_CLASS);
    (_a = this.findHeader(container)) == null ? void 0 : _a.remove();
  }
  ensureHeader(container, metadata, presentation) {
    let header = this.findHeader(container);
    if ((header == null ? void 0 : header.dataset.path) !== presentation.path) {
      header == null ? void 0 : header.remove();
      header = this.createHeader(presentation.path, container.ownerDocument);
      metadata.before(header);
    } else if (header.nextElementSibling !== metadata) {
      metadata.before(header);
    }
    this.updateHeader(header, presentation.mode === "shown");
  }
  findHeader(container) {
    return container.querySelector(`.${RENDERED_HEADER_CLASS}`);
  }
  hasNativeProperties(container) {
    return container.querySelector(".metadata-container") !== null;
  }
  createHeader(path, ownerDocument) {
    const button = ownerDocument.createElement("button");
    button.type = "button";
    button.className = `${HEADER_CLASS} ${RENDERED_HEADER_CLASS}`;
    button.dataset.path = path;
    const label = ownerDocument.createElement("span");
    label.className = "frontmatter-visibility-header-label";
    label.textContent = "YAML";
    button.append(label);
    const control = ownerDocument.createElement("span");
    control.className = "frontmatter-visibility-header-control";
    const action = ownerDocument.createElement("span");
    action.className = "frontmatter-visibility-header-action";
    control.append(action);
    const icon = ownerDocument.createElement("span");
    icon.className = "frontmatter-visibility-header-icon";
    icon.setAttribute("aria-hidden", "true");
    control.append(icon);
    button.append(control);
    button.addEventListener("click", () => {
      const currentPath = button.dataset.path;
      if (currentPath) {
        this.onToggleCollapsed(currentPath);
      }
    });
    return button;
  }
  updateHeader(header, expanded) {
    const expandedValue = expanded ? "true" : "false";
    if (header.dataset.expanded === expandedValue) {
      return;
    }
    header.dataset.expanded = expandedValue;
    header.setAttribute("aria-expanded", expandedValue);
    const action = expanded ? "Collapse" : "Expand";
    header.setAttribute("aria-label", `${action} YAML`);
    header.title = `${action} YAML`;
    const actionLabel = header.querySelector(
      ".frontmatter-visibility-header-action"
    );
    if (actionLabel) {
      actionLabel.textContent = action;
    }
    const icon = header.querySelector(
      ".frontmatter-visibility-header-icon"
    );
    if (icon) {
      (0, import_obsidian4.setIcon)(icon, expanded ? "chevron-down" : "chevron-right");
    }
  }
};
function isMarkdownContainer(container) {
  return container.dataset.type === "markdown" || container.matches(".workspace-leaf-content[data-type='markdown']") || container.closest(".workspace-leaf-content[data-type='markdown']") !== null;
}

// src/ribbon-control.ts
function enableRibbonKeyboardActivation(element, activate) {
  element.setAttribute("role", "button");
  const handleKeydown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    if (element.getAttribute("aria-disabled") !== "true") {
      activate();
    }
  };
  element.addEventListener("keydown", handleKeydown);
  return () => element.removeEventListener("keydown", handleKeydown);
}

// src/settings-tab.ts
var import_obsidian5 = require("obsidian");
var MODE_LABELS = {
  shown: "Shown",
  collapsed: "Collapsed",
  hidden: "Hidden"
};
var FrontmatterVisibilitySettingTab = class extends import_obsidian5.PluginSettingTab {
  constructor(app, visibilityPlugin) {
    super(app, visibilityPlugin);
    this.visibilityPlugin = visibilityPlugin;
  }
  getSettingDefinitions() {
    const overrideCount = Object.keys(
      this.visibilityPlugin.store.data.fileOverrides
    ).length;
    return [
      {
        type: "group",
        heading: "Display",
        items: [
          {
            name: "Vault default",
            desc: "The default YAML presentation for files without a saved state.",
            control: {
              type: "dropdown",
              key: "vaultMode",
              options: MODE_LABELS
            }
          }
        ]
      },
      {
        type: "group",
        heading: "Saved file states",
        items: [
          {
            name: "Reset saved file states",
            desc: `${overrideCount.toString()} saved file ${overrideCount === 1 ? "state" : "states"}. This keeps the vault default.`,
            disabled: overrideCount === 0,
            action: () => {
              this.visibilityPlugin.openResetModal(() => this.update());
            }
          }
        ]
      },
      {
        name: "Shown mode follows Obsidian",
        desc: createFragment((fragment) => {
          fragment.append(
            "If YAML stays invisible, set Settings \u2192 Editor \u2192 Properties in document to Visible or Source. "
          );
          fragment.createEl("a", {
            text: "Read the properties documentation",
            href: "https://obsidian.md/help/properties"
          });
        })
      }
    ];
  }
  getControlValue(key) {
    return key === "vaultMode" ? this.visibilityPlugin.store.data.vault.mode : void 0;
  }
  async setControlValue(key, value) {
    if (key === "vaultMode" && isFrontmatterMode(value)) {
      await this.visibilityPlugin.controller.setVaultMode(value);
    }
    this.update();
  }
};
function isFrontmatterMode(value) {
  return value === "shown" || value === "collapsed" || value === "hidden";
}

// src/model.ts
var DEFAULT_DATA = {
  schemaVersion: 2,
  vault: { mode: "shown", lastVisible: "shown" },
  fileOverrides: {}
};
var FRONTMATTER_MODES = /* @__PURE__ */ new Set([
  "shown",
  "collapsed",
  "hidden"
]);
var VISIBLE_MODES = /* @__PURE__ */ new Set(["shown", "collapsed"]);
function toggleHidden(preference) {
  if (preference.mode === "hidden") {
    return {
      mode: preference.lastVisible,
      lastVisible: preference.lastVisible
    };
  }
  return {
    mode: "hidden",
    lastVisible: preference.mode
  };
}
function toggleCollapsed(preference) {
  if (preference.mode === "collapsed") {
    return { mode: "shown", lastVisible: "shown" };
  }
  return { mode: "collapsed", lastVisible: "collapsed" };
}
function resolvePreference(data, path) {
  var _a;
  return (_a = data.fileOverrides[path]) != null ? _a : data.vault;
}
function moveFileOverride(data, oldPath, newPath) {
  if (oldPath === newPath) {
    return data;
  }
  const fileOverrides = { ...data.fileOverrides };
  const moved = [];
  for (const [path, preference] of Object.entries(data.fileOverrides)) {
    if (path === oldPath || path.startsWith(`${oldPath}/`)) {
      delete fileOverrides[path];
      moved.push([`${newPath}${path.slice(oldPath.length)}`, preference]);
    }
  }
  if (moved.length === 0) {
    return data;
  }
  for (const [path, preference] of moved) {
    fileOverrides[path] = preference;
  }
  return { ...data, fileOverrides };
}
function deleteFileOverride(data, path) {
  const matches = Object.keys(data.fileOverrides).filter(
    (candidate) => candidate === path || candidate.startsWith(`${path}/`)
  );
  if (matches.length === 0) {
    return data;
  }
  const fileOverrides = { ...data.fileOverrides };
  for (const match of matches) {
    delete fileOverrides[match];
  }
  return { ...data, fileOverrides };
}
function normalizePluginData(value) {
  var _a;
  const raw = isRecord(value) ? value : {};
  const vault = (_a = normalizeOverride(raw.vault)) != null ? _a : { ...DEFAULT_DATA.vault };
  const fileOverrides = {};
  if (isRecord(raw.fileOverrides)) {
    for (const [path, candidate] of Object.entries(raw.fileOverrides)) {
      const normalized = normalizeOverride(candidate);
      if (normalized) {
        fileOverrides[path] = normalized;
      }
    }
  }
  return {
    schemaVersion: 2,
    vault,
    fileOverrides
  };
}
function normalizeOverride(value) {
  if (!isRecord(value) || !isFrontmatterMode2(value.mode) || !isVisibleMode(value.lastVisible)) {
    return null;
  }
  return { mode: value.mode, lastVisible: value.lastVisible };
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isFrontmatterMode2(value) {
  return typeof value === "string" && FRONTMATTER_MODES.has(value);
}
function isVisibleMode(value) {
  return typeof value === "string" && VISIBLE_MODES.has(value);
}

// src/state-store.ts
var StateStore = class {
  constructor(adapter) {
    this.adapter = adapter;
    __publicField(this, "currentData", cloneData(DEFAULT_DATA));
    __publicField(this, "listeners", /* @__PURE__ */ new Set());
    __publicField(this, "saveQueue", Promise.resolve());
  }
  get data() {
    return this.currentData;
  }
  async load() {
    this.currentData = normalizePluginData(await this.adapter.load());
  }
  resolve(path) {
    return resolvePreference(this.currentData, path);
  }
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  setVaultPreference(preference) {
    return this.commit({ ...this.currentData, vault: { ...preference } });
  }
  setVaultPreferenceAndReset(preference) {
    return this.commit({
      ...this.currentData,
      vault: { ...preference },
      fileOverrides: {}
    });
  }
  setFilePreference(path, preference) {
    return this.commit({
      ...this.currentData,
      fileOverrides: {
        ...this.currentData.fileOverrides,
        [path]: { ...preference }
      }
    });
  }
  clearFilePreference(path) {
    return this.commit(deleteFileOverride(this.currentData, path));
  }
  resetFilePreferences() {
    if (Object.keys(this.currentData.fileOverrides).length === 0) {
      return this.saveQueue;
    }
    return this.commit({ ...this.currentData, fileOverrides: {} });
  }
  moveFile(oldPath, newPath) {
    return this.commit(moveFileOverride(this.currentData, oldPath, newPath));
  }
  deleteFile(path) {
    return this.commit(deleteFileOverride(this.currentData, path));
  }
  commit(nextData) {
    if (nextData === this.currentData) {
      return this.saveQueue;
    }
    this.currentData = nextData;
    for (const listener of this.listeners) {
      listener(this.currentData);
    }
    const snapshot = cloneData(nextData);
    const save = () => this.adapter.save(snapshot);
    this.saveQueue = this.saveQueue.then(save, save);
    return this.saveQueue;
  }
};
function cloneData(data) {
  return {
    schemaVersion: 2,
    vault: { ...data.vault },
    fileOverrides: Object.fromEntries(
      Object.entries(data.fileOverrides).map(([path, preference]) => [
        path,
        { ...preference }
      ])
    )
  };
}

// src/visibility-controller.ts
var COMMAND_DEFINITIONS = [
  { id: "hide-all-frontmatter", name: "Hide all" },
  { id: "show-all-frontmatter", name: "Show all" },
  { id: "collapse-all-frontmatter", name: "Collapse all" },
  { id: "expand-all-frontmatter", name: "Expand all" },
  {
    id: "toggle-current-collapsed",
    name: "Collapse/expand this file"
  },
  {
    id: "toggle-current-hidden",
    name: "Hide/show this file"
  }
];
var COMMAND_IDS = COMMAND_DEFINITIONS.map((command) => command.id);
var VisibilityController = class {
  constructor(store) {
    this.store = store;
  }
  toggleCurrentHidden(path) {
    return this.setCurrentPreference(path, toggleHidden(this.store.resolve(path)));
  }
  toggleCurrentCollapsed(path) {
    return this.setCurrentPreference(
      path,
      toggleCollapsed(this.store.resolve(path))
    );
  }
  hideAll() {
    return this.store.setVaultPreferenceAndReset({
      mode: "hidden",
      lastVisible: "shown"
    });
  }
  showAll() {
    return this.store.setVaultPreferenceAndReset({
      mode: "shown",
      lastVisible: "shown"
    });
  }
  collapseAll() {
    return this.store.setVaultPreferenceAndReset({
      mode: "collapsed",
      lastVisible: "collapsed"
    });
  }
  expandAll() {
    return this.store.setVaultPreferenceAndReset({
      mode: "shown",
      lastVisible: "shown"
    });
  }
  setVaultMode(mode) {
    return this.store.setVaultPreference(
      preferenceForMode(mode, this.store.data.vault)
    );
  }
  clearCurrentOverride(path) {
    return this.store.clearFilePreference(path);
  }
  resetAllOverrides() {
    return this.store.resetFilePreferences();
  }
  expand(path) {
    return this.setCurrentPreference(path, {
      mode: "shown",
      lastVisible: "shown"
    });
  }
  collapse(path) {
    return this.setCurrentPreference(path, {
      mode: "collapsed",
      lastVisible: "collapsed"
    });
  }
  setCurrentPreference(path, preference) {
    return preferencesEqual(preference, this.store.data.vault) ? this.store.clearFilePreference(path) : this.store.setFilePreference(path, preference);
  }
};
function preferenceForMode(mode, current) {
  if (mode === "hidden") {
    return {
      mode,
      lastVisible: current.mode === "hidden" ? current.lastVisible : current.mode
    };
  }
  return { mode, lastVisible: mode };
}
function preferencesEqual(left, right) {
  return left.mode === right.mode && left.lastVisible === right.lastVisible;
}

// src/view-presentation.ts
function editorPresentationForView(mode, hasNativeProperties) {
  return {
    mode,
    showHeader: !hasNativeProperties
  };
}
function ribbonPresentation(hasFrontmatter, mode) {
  if (!hasFrontmatter) {
    return {
      icon: "file-x",
      label: "No YAML in this file",
      disabled: true,
      dimmed: true
    };
  }
  if (mode === "hidden") {
    return {
      icon: "eye",
      label: "Show YAML",
      disabled: false,
      dimmed: false
    };
  }
  return {
    icon: "eye-off",
    label: "Hide YAML",
    disabled: false,
    dimmed: false
  };
}

// src/main.ts
var FrontmatterVisibilityPlugin = class extends import_obsidian6.Plugin {
  constructor() {
    super(...arguments);
    __publicField(this, "store");
    __publicField(this, "controller");
    __publicField(this, "renderedController");
    __publicField(this, "validityCache");
    __publicField(this, "editorViews", /* @__PURE__ */ new Set());
    __publicField(this, "editorPaths", /* @__PURE__ */ new WeakMap());
    __publicField(this, "renderedDisposers", /* @__PURE__ */ new Map());
    __publicField(this, "ribbonHideEl");
    __publicField(this, "refreshQueued", false);
    __publicField(this, "isLoaded", false);
  }
  async onload() {
    this.store = new StateStore({
      load: () => this.loadData(),
      save: (data) => this.saveData(data)
    });
    await this.store.load();
    this.controller = new VisibilityController(this.store);
    this.validityCache = new FrontmatterValidityCache(
      (file) => this.app.vault.cachedRead(file),
      () => this.queueRefresh()
    );
    this.renderedController = new RenderedViewController((path) => {
      void this.controller.toggleCurrentCollapsed(path);
    }, () => this.queueRefresh());
    this.isLoaded = true;
    this.registerEditorExtension(
      createFrontmatterEditorExtension({
        onToggleCollapsed: (view) => this.toggleCollapsedFromEditor(view),
        onMount: (view) => {
          this.editorViews.add(view);
          this.queueRefresh();
        },
        onDestroy: (view) => {
          this.editorViews.delete(view);
          this.editorPaths.delete(view);
        }
      })
    );
    const activateRibbon = () => {
      void this.runRibbonAction();
    };
    this.ribbonHideEl = this.addRibbonIcon(
      "eye-off",
      "Hide YAML",
      activateRibbon
    );
    this.register(
      enableRibbonKeyboardActivation(this.ribbonHideEl, activateRibbon)
    );
    this.addSettingTab(new FrontmatterVisibilitySettingTab(this.app, this));
    this.registerCommands();
    const unsubscribe = this.store.subscribe(() => this.queueRefresh());
    this.register(unsubscribe);
    this.registerEvent(this.app.workspace.on("layout-change", () => this.queueRefresh()));
    this.registerEvent(
      this.app.workspace.on("active-leaf-change", () => this.queueRefresh())
    );
    this.registerEvent(this.app.workspace.on("file-open", () => this.queueRefresh()));
    this.registerEvent(
      this.app.metadataCache.on("changed", (file) => {
        this.validityCache.invalidate(file.path);
        this.queueRefresh();
      })
    );
    this.registerEvent(
      this.app.vault.on("rename", (file, oldPath) => {
        this.validityCache.movePath(oldPath, file.path);
        void this.store.moveFile(oldPath, file.path);
      })
    );
    this.registerEvent(
      this.app.vault.on("delete", (file) => {
        this.validityCache.deletePath(file.path);
        void this.store.deleteFile(file.path);
      })
    );
    this.register(() => this.disposeRenderedViews());
    this.app.workspace.onLayoutReady(() => this.queueRefresh());
  }
  onunload() {
    this.isLoaded = false;
    this.editorViews.clear();
    this.disposeRenderedViews();
  }
  openResetModal(afterReset) {
    const overrideCount = Object.keys(this.store.data.fileOverrides).length;
    if (overrideCount === 0) {
      new import_obsidian6.Notice("There are no saved file states.");
      return;
    }
    new ConfirmResetModal(this.app, overrideCount, async () => {
      await this.controller.resetAllOverrides();
      afterReset == null ? void 0 : afterReset();
    }).open();
  }
  registerCommands() {
    for (const command of COMMAND_DEFINITIONS) {
      this.addCommand({
        ...command,
        callback: () => this.runCommand(command.id)
      });
    }
  }
  runCommand(id) {
    switch (id) {
      case "hide-all-frontmatter":
        void this.controller.hideAll();
        break;
      case "show-all-frontmatter":
        void this.controller.showAll();
        break;
      case "collapse-all-frontmatter":
        void this.controller.collapseAll();
        break;
      case "expand-all-frontmatter":
        void this.controller.expandAll();
        break;
      case "toggle-current-collapsed":
        void this.runCurrentFileAction(
          (path) => this.controller.toggleCurrentCollapsed(path)
        );
        break;
      case "toggle-current-hidden":
        void this.runCurrentFileAction(
          (path) => this.controller.toggleCurrentHidden(path)
        );
        break;
    }
  }
  async runCurrentFileAction(action) {
    const file = this.activeMarkdownFile();
    if (!file) {
      new import_obsidian6.Notice("Open a Markdown note first.");
      return;
    }
    if (!await this.validityCache.resolve(file)) {
      new import_obsidian6.Notice("The current note has no valid YAML frontmatter.");
      return;
    }
    await action(file.path);
  }
  async runRibbonAction() {
    const file = this.activeMarkdownFile();
    if (!file || !await this.validityCache.resolve(file)) {
      return;
    }
    await this.controller.toggleCurrentHidden(file.path);
  }
  activeMarkdownFile() {
    const file = this.app.workspace.getActiveFile();
    return file instanceof import_obsidian6.TFile && file.extension === "md" ? file : null;
  }
  toggleCollapsedFromEditor(view) {
    const path = this.editorPaths.get(view);
    if (path) {
      void this.controller.toggleCurrentCollapsed(path);
    }
  }
  queueRefresh() {
    if (!this.isLoaded || this.refreshQueued) {
      return;
    }
    this.refreshQueued = true;
    queueMicrotask(() => {
      this.refreshQueued = false;
      if (this.isLoaded) {
        this.refreshAll();
      }
    });
  }
  refreshAll() {
    const activeContainers = /* @__PURE__ */ new Set();
    this.app.workspace.iterateAllLeaves((leaf) => {
      if (!(leaf.view instanceof import_obsidian6.MarkdownView)) {
        return;
      }
      const view = leaf.view;
      const file = view.file;
      if (!file) {
        return;
      }
      const container = view.containerEl;
      const presentation = this.presentationForView(view);
      const hasNativeProperties = container.querySelector(".metadata-container") !== null;
      for (const editorView of this.editorViews) {
        if (!container.contains(editorView.dom)) {
          continue;
        }
        this.editorPaths.set(editorView, file.path);
        editorView.dispatch({
          effects: setFrontmatterPresentation.of(
            editorPresentationForView(
              presentation.mode,
              hasNativeProperties
            )
          )
        });
      }
      activeContainers.add(container);
      if (!this.renderedDisposers.has(container)) {
        this.renderedDisposers.set(
          container,
          this.renderedController.attach(
            container,
            () => this.presentationForView(view)
          )
        );
      }
      this.renderedController.refresh(container, presentation);
    });
    for (const [container, dispose] of this.renderedDisposers) {
      if (!activeContainers.has(container)) {
        dispose();
        this.renderedDisposers.delete(container);
      }
    }
    this.refreshRibbon();
  }
  presentationForView(view) {
    const file = view.file;
    if (!file) {
      return { path: "", mode: "shown", hasFrontmatter: false };
    }
    const validity = this.validityCache.peek(file.path);
    if (validity === void 0) {
      void this.validityCache.resolve(file);
    }
    return {
      path: file.path,
      mode: this.store.resolve(file.path).mode,
      hasFrontmatter: validity === true
    };
  }
  refreshRibbon() {
    const activeFile = this.activeMarkdownFile();
    const validity = activeFile ? this.validityCache.peek(activeFile.path) : void 0;
    if (activeFile && validity === void 0) {
      void this.validityCache.resolve(activeFile);
    }
    const mode = activeFile ? this.store.resolve(activeFile.path).mode : "shown";
    const presentation = ribbonPresentation(validity === true, mode);
    (0, import_obsidian6.setIcon)(this.ribbonHideEl, presentation.icon);
    this.ribbonHideEl.toggleClass(
      "frontmatter-visibility-ribbon-no-yaml",
      presentation.dimmed
    );
    this.ribbonHideEl.setAttribute(
      "aria-disabled",
      presentation.disabled ? "true" : "false"
    );
    this.ribbonHideEl.setAttribute("aria-label", presentation.label);
    this.ribbonHideEl.setAttribute("title", presentation.label);
    this.ribbonHideEl.tabIndex = presentation.disabled ? -1 : 0;
    this.ribbonHideEl.setAttribute("data-tooltip-position", "right");
  }
  disposeRenderedViews() {
    for (const dispose of this.renderedDisposers.values()) {
      dispose();
    }
    this.renderedDisposers.clear();
  }
};

/* nosourcemap */
var globals = {
  modules: {},
  current_file: {},
  menu_bar: new Map([
    ['File', [
      'new_file',
      'open_file',
      'save_file',
      'save_as',
      'save_copy',
      null,
      'keyboard_shortcuts',
    ]],
    ['Edit', [
      'undo',
      'redo',
      'copy',
      'cut',
      'paste_center',
      'paste_in_place',
      'delete',
      'select_all',
    ]],
    ['Timeline', [
      'extend_keyframe',
      'shorten_keyframe',
      'new_keyframe',
      'merge_keyframes',
      'new_blank_keyframe',
      'simple_tween',
      'motion_tween',
      'shape_tween',
      null,
      'play',
      'previous_frame',
      'next_frame',
      'previous_keyframe',
      'next_keyframe',
      'first_frame',
      'last_frame',
      'onion_skin',
    ]],
    ['Component', [
      'new_component',
      'convert_to_component',
      'swap_component',
      'match_component',
    ]],
    ['Publish', [
      'preview_animation',
      'publish_animation',
    ]],
  ]),
  commands: {
    new_file: {
      menu_path: ['File', 'New'],
      keyboard_shortcuts: ['Ctrl+N'],
    },
    open_file: {
      menu_path: ['File', 'Open'],
      keyboard_shortcuts: ['Ctrl+O'],
    },
    save_file: {
      menu_path: ['File', 'Save'],
      keyboard_shortcuts: ['Ctrl+S'],
    },
    save_as: {
      menu_path: ['File', 'Save As'],
      keyboard_shortcuts: ['Ctrl+Shift+S'],
    },
    save_copy: {
      menu_path: ['File', 'Save Copy'],
      keyboard_shortcuts: ['Ctrl+Alt+S'],
    },
    keyboard_shortcuts: {
      menu_path: ['File', 'Keyboard Shortcuts'],
      keyboard_shortcuts: ['Ctrl+/'],
    },
    undo: {
      menu_path: ['Edit', 'Undo'],
      keyboard_shortcuts: ['Ctrl+Z'],
    },
    redo: {
      menu_path: ['Edit', 'Redo'],
      keyboard_shortcuts: ['Ctrl+Y', 'Ctrl+Shift+Z'],
    },
    copy: {
      menu_path: ['Edit', 'Copy'],
      keyboard_shortcuts: ['Ctrl+C'],
    },
    cut: {
      menu_path: ['Edit', 'Cut'],
      keyboard_shortcuts: ['Ctrl+X'],
    },
    paste_center: {
      menu_path: ['Edit', 'Paste in Center'],
      keyboard_shortcuts: ['Ctrl+V'],
    },
    paste_in_place: {
      menu_path: ['Edit', 'Paste in Place'],
      keyboard_shortcuts: ['Ctrl+Shift+V'],
    },
    delete: {
      menu_path: ['Edit', 'Delete'],
      keyboard_shortcuts: ['Backspace', 'Del'],
    },
    select_all: {
      menu_path: ['Edit', 'Select All'],
      keyboard_shortcuts: ['Ctrl+A'],
    },
    extend_keyframe: {
      menu_path: ['Timeline', 'Extend Keyframe'],
      keyboard_shortcuts: [],
    },
    shorten_keyframe: {
      menu_path: ['Timeline', 'Shorten Keyframe'],
      keyboard_shortcuts: [],
    },
    new_keyframe: {
      menu_path: ['Timeline', 'New Keyframe'],
      keyboard_shortcuts: [],
    },
    merge_keyframes: {
      menu_path: ['Timeline', 'Merge Keyframes'],
      keyboard_shortcuts: [],
    },
    new_blank_keyframe: {
      menu_path: ['Timeline', 'New Blank Keyframe'],
      keyboard_shortcuts: [],
    },
    simple_tween: {
      menu_path: ['Timeline', 'Simple Tween'],
      keyboard_shortcuts: [],
    },
    motion_tween: {
      menu_path: ['Timeline', 'Motion Tween'],
      keyboard_shortcuts: [],
    },
    shape_tween: {
      menu_path: ['Timeline', 'Shape Tween'],
      keyboard_shortcuts: [],
    },
    play: {
      menu_path: ['Timeline', 'Play'],
      keyboard_shortcuts: ['Enter'],
    },
    previous_frame: {
      menu_path: ['Timeline', 'Previous Frame'],
      keyboard_shortcuts: [','],
    },
    next_frame: {
      menu_path: ['Timeline', 'Next Frame'],
      keyboard_shortcuts: ['.'],
    },
    previous_keyframe: {
      menu_path: ['Timeline', 'Previous Keyframe'],
      keyboard_shortcuts: ['Alt+,'],
    },
    next_keyframe: {
      menu_path: ['Timeline', 'Next Keyframe'],
      keyboard_shortcuts: ['Alt+.'],
    },
    first_frame: {
      menu_path: ['Timeline', 'First Frame'],
      keyboard_shortcuts: ['Shift+,'],
    },
    last_frame: {
      menu_path: ['Timeline', 'Last Frame'],
      keyboard_shortcuts: ['Shift+.'],
    },
    onion_skin: {
      menu_path: ['Timeline', 'Toggle Onion Skin'],
      keyboard_shortcuts: [],
    },
    new_component: {
      menu_path: ['Component', 'New'],
      keyboard_shortcuts: [],
    },
    convert_to_component: {
      menu_path: ['Component', 'Convert to Component'],
      keyboard_shortcuts: [],
    },
    swap_component: {
      menu_path: ['Component', 'Swap'],
      keyboard_shortcuts: [],
    },
    match_component: {
      menu_path: ['Component', 'Match'],
      keyboard_shortcuts: [],
    },
    preview_animation: {
      menu_path: ['Publish', 'Preview Animation'],
      keyboard_shortcuts: ['Ctrl+Enter'],
    },
    publish_animation: {
      menu_path: ['Publish', 'Publish Animation'],
      keyboard_shortcuts: ['Ctrl+Shift+Enter'],
    },
    go_to_menu_bar: {
      menu_path: ['Navigation', 'Go to Menu Bar'],
      keyboard_shortcuts: ['Alt+M'],
      hidden: true,
    },
    go_to_toolbar: {
      menu_path: ['Navigation', 'Go to Toolbar'],
      keyboard_shortcuts: ['Alt+B'],
      hidden: true,
    },
    go_to_canvas: {
      menu_path: ['Navigation', 'Go to Canvas'],
      keyboard_shortcuts: ['Alt+C'],
      hidden: true,
    },
    go_to_timeline: {
      menu_path: ['Navigation', 'Go to Timeline'],
      keyboard_shortcuts: ['Alt+T'],
      hidden: true,
    },
    go_to_properties: {
      menu_path: ['Navigation', 'Go to Properties'],
      keyboard_shortcuts: ['Alt+P'],
      hidden: true,
    },
    go_to_asset_library: {
      menu_path: ['Navigation', 'Go to Asset Library'],
      keyboard_shortcuts: ['Alt+L'],
      hidden: true,
    },
    toggle_browser_controls: {
      menu_path: ['Navigation', 'Toggle Browser Controls'],
      keyboard_shortcuts: ['Alt+Esc'],
      hidden: true,
    },
  },
}

export {globals}

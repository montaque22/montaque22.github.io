export const mailbox = [
  {
    id: "a5ae0f5c3b892476",
    type: "group",
    z: "f234ab59c6dd2886",
    name: "Update Mailbox State",
    style: {
      fill: "#ffffff",
      label: true,
      color: "#001f60",
    },
    nodes: [
      "31170b8c0d27c48b",
      "0dacc50a27218536",
      "13a8dc6b7e1c6f43",
      "8f183d786b58a3fd",
      "a5ab43c95743446e",
      "65ea0eb187d13a50",
      "344522826f25bf6c",
      "151a311eed9d7fc3",
      "7d542cb041245f7f",
      "42e9bf8b84e7cdfb",
      "b78e28f159408f3e",
      "f64afe39cfa2d768",
      "5ae4c8d589ccec59",
      "36864305fa0a13a5",
      "a62445c62eeef535",
      "b5da0575dd117135",
    ],
    x: 74,
    y: 999,
    w: 1572,
    h: 342,
  },
  {
    id: "656499388a4aa37d",
    type: "subflow",
    name: "Telegram Facade",
    info: "",
    category: "",
    in: [
      {
        x: 80,
        y: 40,
        wires: [
          {
            id: "44693c7b4594740b",
          },
        ],
      },
    ],
    out: [
      {
        x: 940,
        y: 140,
        wires: [
          {
            id: "c3da1d823169d296",
            port: 0,
          },
        ],
      },
    ],
    env: [
      {
        name: "Method",
        type: "str",
        value: "sendMessage",
        ui: {
          type: "select",
          opts: {
            opts: [
              {
                l: {
                  "en-US": "Send Message",
                },
                v: "sendMessage",
              },
              {
                l: {
                  "en-US": "Edit Message",
                },
                v: "editMessage",
              },
              {
                l: {
                  "en-US": "Typing Status",
                },
                v: "typing",
              },
            ],
          },
        },
      },
      {
        name: "Message key",
        type: "str",
        value: "",
        ui: {
          type: "input",
          opts: {
            types: ["str"],
          },
        },
      },
      {
        name: "Use message key as prompt",
        type: "bool",
        value: "false",
        ui: {
          type: "checkbox",
        },
      },
      {
        name: "Inline_Keyboard key",
        type: "str",
        value: "",
        ui: {
          type: "input",
          opts: {
            types: ["str", "json"],
          },
        },
      },
      {
        name: "Use inline_keyboard as value",
        type: "bool",
        value: "false",
        ui: {
          type: "checkbox",
        },
      },
      {
        name: "Keyboard key",
        type: "str",
        value: "",
      },
      {
        name: "Use keyboard key as value",
        type: "bool",
        value: "false",
        ui: {
          type: "checkbox",
        },
      },
      {
        name: "debounce",
        type: "num",
        value: "",
        ui: {
          type: "input",
          opts: {
            types: ["num"],
          },
        },
      },
    ],
    meta: {},
    color: "#DDAA99",
  },
  {
    id: "c71f58691e6b25ac",
    type: "function",
    z: "656499388a4aa37d",
    name: "Normalize Data",
    func: 'const useMessageKeyAsPrompt = env.get("Use message key as prompt");\nconst useKeyboardKeyAsValue = env.get("Use keyboard key as value");\nconst useInlineKeyboardKeyAsValue = env.get("Use inline_keyboard as value");\nlet message = sugar.Object.get(msg, env.get("Message key"))\nlet inline_keyboard = sugar.Object.get(msg, env.get("Inline_Keyboard key")) || []\nlet keyboard = sugar.Object.get(msg, env.get("Keyboard key")) || []\nconst payload = {\n    method: env.get("Method"),\n    body: { \n        chat_id: Number(global.get("GROUP_CHAT_ID")),\n        }\n    \n}\nlet reply_markup = {}\n\nmsg.telegram = {message, keyboard, inline_keyboard}\n\nif (useMessageKeyAsPrompt) {\n    message = env.get("Message key")\n    msg.telegram.message = env.get("Message key")\n}\n\nif (useKeyboardKeyAsValue) {\n    keyboard = env.get("Keyboard key") || []\n    msg.telegram.keyboard = env.get("Keyboard key") || []\n}\n\nif (useInlineKeyboardKeyAsValue) {\n    inline_keyboard = env.get("Inline_Keyboard key") || []\n    msg.telegram.inline_keyboard = env.get("Inline_Keyboard key") || []\n}\nif(inline_keyboard.length){\n    // inline_keyboard = createReplyKeyboard(inline_keyboard)\n    msg.telegram.inline_keyboard = inline_keyboard\n    delete msg.telegram.keyboard\n    reply_markup = {\n        keyboard:[],\n        inline_keyboard\n    }\n}\n\nif (keyboard.length) {\n    // keyboard = createReplyKeyboard(keyboard)\n    msg.telegram.keyboard = keyboard\n    delete msg.telegram.inline_keyboard\n    reply_markup = {\n        one_time_keyboard: true,\n        resize_keyboard: true,\n        keyboard: keyboard,\n    }\n}\n\nif(!keyboard.length && ! inline_keyboard.length){\n    delete msg.telegram.inline_keyboard\n    delete msg.telegram.keyboard\n    // payload.response.speech.plain.speech\n}\n\n\n\n\nif (["sendMessage", "editMessage"].includes(env.get("Method"))) {\n    payload.body.text = message;\n    payload.body.parse_mode = "html",\n    msg.telegram.parse_mode = "html"\n        payload.body.reply_markup = reply_markup\n}else{\n    payload.body.action = env.get("Method");\n    payload.method = "sendChatAction"\n} \n\nif (env.get("Method") === "editMessage") {\n    payload.body.message_id = global.get("message_id");\n    msg.telegram.message_id = global.get("message_id");\n}\n\nmsg.data = payload\n\nreturn msg;\n\n\nfunction createReplyKeyboard(buttons = []){\n    const keyboard = []\n    \n    buttons.forEach(button => {\n        if(typeof button === "string"){\n            const commands = []\n            button.split(",").forEach(item => {\n                const [text ="", callback_data =""] = item.split(":")\n\n               commands.push({ text: text.trim(), callback_data: callback_data?.trim() })\n            })\n    keyboard.push(commands)\n           \n        }else if(Array.isArray(button)){\n           const keyboardInputs = button.reduce((agg, item) => {\n                const buttons = item.split(",");\n                const commands = [];\n\n                buttons.forEach(item => {\n                    const [text = "", callback_data = ""] = item.split(":")\n                    \n                    commands.push({ text: text.trim(), callback_data: callback_data.trim() })\n                })\n                agg.push(commands)\n                \n                return agg\n            },[]);\n\n            keyboard.push(keyboardInputs)\n        }\n    })\n\n    return keyboard\n}',
    outputs: 1,
    timeout: "",
    noerr: 0,
    initialize: "",
    finalize: "",
    libs: [
      {
        var: "sugar",
        module: "sugar",
      },
    ],
    x: 260,
    y: 80,
    wires: [["09ece744e725aa5a"]],
  },
  {
    id: "c3da1d823169d296",
    type: "change",
    z: "656499388a4aa37d",
    name: "Clean up",
    rules: [
      {
        t: "set",
        p: "payload",
        pt: "msg",
        to: "cache",
        tot: "msg",
        dc: true,
      },
      {
        t: "delete",
        p: "cache",
        pt: "msg",
      },
      {
        t: "delete",
        p: "data",
        pt: "msg",
      },
      {
        t: "delete",
        p: "telegram",
        pt: "msg",
      },
    ],
    action: "",
    property: "",
    from: "",
    to: "",
    reg: false,
    x: 780,
    y: 140,
    wires: [[]],
  },
  {
    id: "44693c7b4594740b",
    type: "change",
    z: "656499388a4aa37d",
    name: "Cache Payload",
    rules: [
      {
        t: "set",
        p: "cache",
        pt: "msg",
        to: "payload",
        tot: "msg",
        dc: true,
      },
    ],
    action: "",
    property: "",
    from: "",
    to: "",
    reg: false,
    x: 260,
    y: 40,
    wires: [["c71f58691e6b25ac"]],
  },
  {
    id: "43c30b643c3df338",
    type: "ha-api",
    z: "656499388a4aa37d",
    d: true,
    name: "Send Thinking Status",
    server: "228d3d53.df8e02",
    version: 1,
    debugenabled: false,
    protocol: "http",
    method: "post",
    path: "https://api.telegram.org/bot{{global.TELEGRAM}}/{{data.method}}",
    data: "msg.data.body",
    dataType: "jsonata",
    responseType: "json",
    outputProperties: [
      {
        property: "payload",
        propertyType: "msg",
        value: "",
        valueType: "results",
      },
    ],
    x: 280,
    y: 220,
    wires: [[]],
  },
  {
    id: "64aba95844f48d22",
    type: "api-call-service",
    z: "656499388a4aa37d",
    name: "Send Message",
    server: "228d3d53.df8e02",
    version: 5,
    debugenabled: false,
    domain: "telegram_bot",
    service: "send_message",
    areaId: [],
    deviceId: [],
    entityId: [],
    data: "msg.telegram",
    dataType: "jsonata",
    mergeContext: "",
    mustacheAltTags: false,
    outputProperties: [],
    queue: "none",
    x: 560,
    y: 100,
    wires: [["c3da1d823169d296"]],
  },
  {
    id: "09ece744e725aa5a",
    type: "switch",
    z: "656499388a4aa37d",
    name: "",
    property: "Method",
    propertyType: "env",
    rules: [
      {
        t: "eq",
        v: "sendMessage",
        vt: "str",
      },
      {
        t: "eq",
        v: "editMessage",
        vt: "str",
      },
      {
        t: "eq",
        v: "typing",
        vt: "str",
      },
    ],
    checkall: "false",
    repair: false,
    outputs: 3,
    x: 290,
    y: 140,
    wires: [["64aba95844f48d22"], ["b2cea0faea5a9a9d"], []],
  },
  {
    id: "b2cea0faea5a9a9d",
    type: "api-call-service",
    z: "656499388a4aa37d",
    name: "Edit Message",
    server: "228d3d53.df8e02",
    version: 5,
    debugenabled: false,
    domain: "telegram_bot",
    service: "edit_message",
    areaId: [],
    deviceId: [],
    entityId: [],
    data: "msg.telegram",
    dataType: "jsonata",
    mergeContext: "",
    mustacheAltTags: false,
    outputProperties: [],
    queue: "none",
    x: 560,
    y: 140,
    wires: [["c3da1d823169d296"]],
  },
  {
    id: "31170b8c0d27c48b",
    type: "server-state-changed",
    z: "f234ab59c6dd2886",
    g: "a5ae0f5c3b892476",
    name: "When mailbox is open",
    server: "228d3d53.df8e02",
    version: 5,
    outputs: 2,
    exposeAsEntityConfig: "",
    entityId: "binary_sensor.mailbox_door",
    entityIdType: "exact",
    outputInitially: false,
    stateType: "str",
    ifState: "on",
    ifStateType: "str",
    ifStateOperator: "is",
    outputOnlyOnStateChange: true,
    for: "0",
    forType: "num",
    forUnits: "minutes",
    ignorePrevStateNull: false,
    ignorePrevStateUnknown: false,
    ignorePrevStateUnavailable: false,
    ignoreCurrentStateUnknown: false,
    ignoreCurrentStateUnavailable: false,
    outputProperties: [
      {
        property: "topic",
        propertyType: "msg",
        value: "mail",
        valueType: "str",
      },
    ],
    x: 200,
    y: 1220,
    wires: [["0dacc50a27218536", "151a311eed9d7fc3"], ["a5ab43c95743446e"]],
  },
  {
    id: "0dacc50a27218536",
    type: "api-current-state",
    z: "f234ab59c6dd2886",
    g: "a5ae0f5c3b892476",
    name: "get mail status",
    server: "228d3d53.df8e02",
    version: 3,
    outputs: 1,
    halt_if: "",
    halt_if_type: "str",
    halt_if_compare: "is",
    entity_id: "input_select.mail_status",
    state_type: "str",
    blockInputOverrides: false,
    outputProperties: [
      {
        property: "payload",
        propertyType: "msg",
        value: "",
        valueType: "entityState",
      },
    ],
    for: "0",
    forType: "num",
    forUnits: "minutes",
    override_topic: false,
    state_location: "payload",
    override_payload: "msg",
    entity_location: "data",
    override_data: "msg",
    x: 440,
    y: 1120,
    wires: [["b5da0575dd117135"]],
  },
  {
    id: "13a8dc6b7e1c6f43",
    type: "api-call-service",
    z: "f234ab59c6dd2886",
    g: "a5ae0f5c3b892476",
    name: "set as delivered",
    server: "228d3d53.df8e02",
    version: 5,
    debugenabled: false,
    domain: "input_select",
    service: "select_option",
    areaId: [],
    deviceId: [],
    entityId: ["input_select.mail_status"],
    data: '{"option":"Delivered"}',
    dataType: "jsonata",
    mergeContext: "",
    mustacheAltTags: false,
    outputProperties: [],
    queue: "none",
    x: 1280,
    y: 1040,
    wires: [[]],
  },
  {
    id: "8f183d786b58a3fd",
    type: "subflow:656499388a4aa37d",
    z: "f234ab59c6dd2886",
    g: "a5ae0f5c3b892476",
    name: "Alert Via Ke",
    env: [
      {
        name: "Message key",
        value: "Mailbox is open!",
        type: "str",
      },
      {
        name: "Use message key as prompt",
        type: "bool",
        value: "true",
      },
    ],
    x: 690,
    y: 1220,
    wires: [[]],
  },
  {
    id: "a5ab43c95743446e",
    type: "subflow:656499388a4aa37d",
    z: "f234ab59c6dd2886",
    g: "a5ae0f5c3b892476",
    name: "Alert Via Ke",
    env: [
      {
        name: "Message key",
        value: "Mailbox is closed!",
        type: "str",
      },
      {
        name: "Use message key as prompt",
        type: "bool",
        value: "true",
      },
    ],
    x: 430,
    y: 1300,
    wires: [[]],
  },
  {
    id: "65ea0eb187d13a50",
    type: "api-call-service",
    z: "f234ab59c6dd2886",
    g: "a5ae0f5c3b892476",
    name: "Take Front Yard video",
    server: "228d3d53.df8e02",
    version: 5,
    debugenabled: false,
    domain: "camera",
    service: "record",
    areaId: [],
    deviceId: [],
    entityId: ["camera.front_yard_camera"],
    data: '{"filename":"/config/tmp/frontyard.mp4", "duration": 10}',
    dataType: "jsonata",
    mergeContext: "",
    mustacheAltTags: false,
    outputProperties: [
      {
        property: "data",
        propertyType: "msg",
        value: "",
        valueType: "data",
      },
    ],
    queue: "none",
    x: 720,
    y: 1260,
    wires: [["344522826f25bf6c"]],
  },
  {
    id: "344522826f25bf6c",
    type: "api-call-service",
    z: "f234ab59c6dd2886",
    g: "a5ae0f5c3b892476",
    name: "Send video to telegram",
    server: "228d3d53.df8e02",
    version: 5,
    debugenabled: false,
    domain: "telegram_bot",
    service: "send_video",
    areaId: [],
    deviceId: [],
    entityId: [],
    data: '{"file": "/config/tmp/frontyard.mp4", "caption": "Something\'s happening by your mailbox"}',
    dataType: "jsonata",
    mergeContext: "",
    mustacheAltTags: false,
    outputProperties: [],
    queue: "none",
    x: 1010,
    y: 1260,
    wires: [[]],
  },
  {
    id: "151a311eed9d7fc3",
    type: "debounce-leading-trailing",
    z: "f234ab59c6dd2886",
    g: "a5ae0f5c3b892476",
    time: "15000",
    debouncetype: "leading",
    name: "15 second cool down",
    x: 460,
    y: 1220,
    wires: [["8f183d786b58a3fd", "65ea0eb187d13a50"]],
  },
  {
    id: "7d542cb041245f7f",
    type: "within-time-switch",
    z: "f234ab59c6dd2886",
    g: "a5ae0f5c3b892476",
    name: "",
    nameInt: "",
    positionConfig: "32976cc46e9aea2c",
    startTime: "10:00",
    startTimeType: "entered",
    startOffset: 0,
    startOffsetType: "none",
    startOffsetMultiplier: 60000,
    endTime: "16:00",
    endTimeType: "entered",
    endOffset: 0,
    endOffsetType: "none",
    endOffsetMultiplier: 60000,
    timeRestrictions: 0,
    timeRestrictionsType: "none",
    timeDays: "1,2,3,4,5,6",
    timeOnlyOddDays: false,
    timeOnlyEvenDays: false,
    timeOnlyOddWeeks: false,
    timeOnlyEvenWeeks: false,
    timeMonths: "*",
    timedatestart: "",
    timedateend: "",
    propertyStart: "",
    propertyStartType: "none",
    propertyStartCompare: "true",
    propertyStartThreshold: "",
    propertyStartThresholdType: "num",
    startTimeAlt: "",
    startTimeAltType: "entered",
    startOffsetAlt: 0,
    startOffsetAltType: "none",
    startOffsetAltMultiplier: 60000,
    propertyEnd: "",
    propertyEndType: "none",
    propertyEndCompare: "true",
    propertyEndThreshold: "",
    propertyEndThresholdType: "num",
    endTimeAlt: "",
    endTimeAltType: "entered",
    endOffsetAlt: 0,
    endOffsetAltType: "none",
    endOffsetAltMultiplier: 60000,
    withinTimeValue: "true",
    withinTimeValueType: "msgInput",
    outOfTimeValue: "false",
    outOfTimeValueType: "msgInput",
    tsCompare: "0",
    x: 1050,
    y: 1060,
    wires: [["13a8dc6b7e1c6f43"], []],
  },
  {
    id: "42e9bf8b84e7cdfb",
    type: "switch",
    z: "f234ab59c6dd2886",
    g: "a5ae0f5c3b892476",
    name: "",
    property: "payload",
    propertyType: "msg",
    rules: [
      {
        t: "eq",
        v: "Empty",
        vt: "str",
      },
      {
        t: "eq",
        v: "Delivered",
        vt: "str",
      },
      {
        t: "eq",
        v: "Retrieved",
        vt: "str",
      },
      {
        t: "eq",
        v: "Forgotten",
        vt: "str",
      },
    ],
    checkall: "false",
    repair: false,
    outputs: 4,
    x: 830,
    y: 1120,
    wires: [
      ["7d542cb041245f7f"],
      ["36864305fa0a13a5"],
      [],
      ["a62445c62eeef535"],
    ],
  },
  {
    id: "b78e28f159408f3e",
    type: "api-call-service",
    z: "f234ab59c6dd2886",
    g: "a5ae0f5c3b892476",
    name: "set as Retrieved",
    server: "228d3d53.df8e02",
    version: 5,
    debugenabled: false,
    domain: "input_select",
    service: "select_option",
    areaId: [],
    deviceId: [],
    entityId: ["input_select.mail_status"],
    data: '{"option":"Retrieved"}',
    dataType: "jsonata",
    mergeContext: "",
    mustacheAltTags: false,
    outputProperties: [],
    queue: "none",
    x: 1280,
    y: 1100,
    wires: [["5ae4c8d589ccec59"]],
  },
  {
    id: "f64afe39cfa2d768",
    type: "api-call-service",
    z: "f234ab59c6dd2886",
    g: "a5ae0f5c3b892476",
    name: "set as Empty",
    server: "228d3d53.df8e02",
    version: 5,
    debugenabled: false,
    domain: "input_select",
    service: "select_option",
    areaId: [],
    deviceId: [],
    entityId: ["input_select.mail_status"],
    data: '{"option":"Empty"}',
    dataType: "jsonata",
    mergeContext: "",
    mustacheAltTags: false,
    outputProperties: [],
    queue: "none",
    x: 1290,
    y: 1160,
    wires: [["5ae4c8d589ccec59"]],
  },
  {
    id: "5ae4c8d589ccec59",
    type: "subflow:656499388a4aa37d",
    z: "f234ab59c6dd2886",
    g: "a5ae0f5c3b892476",
    name: "Alert Via Ke",
    env: [
      {
        name: "Message key",
        value: "Mail was picked up",
        type: "str",
      },
      {
        name: "Use message key as prompt",
        type: "bool",
        value: "true",
      },
    ],
    x: 1550,
    y: 1120,
    wires: [[]],
  },
  {
    id: "36864305fa0a13a5",
    type: "switch",
    z: "f234ab59c6dd2886",
    g: "a5ae0f5c3b892476",
    name: "is under 5 mins",
    property: "frontDoor.last_changed",
    propertyType: "msg",
    rules: [
      {
        t: "lt",
        v: "300000",
        vt: "num",
      },
    ],
    checkall: "true",
    repair: false,
    outputs: 1,
    x: 1040,
    y: 1100,
    wires: [["b78e28f159408f3e"]],
  },
  {
    id: "a62445c62eeef535",
    type: "switch",
    z: "f234ab59c6dd2886",
    g: "a5ae0f5c3b892476",
    name: "is under 5 mins",
    property: "frontDoor.last_changed",
    propertyType: "msg",
    rules: [
      {
        t: "lt",
        v: "300000",
        vt: "num",
      },
      {
        t: "else",
      },
    ],
    checkall: "true",
    repair: false,
    outputs: 2,
    x: 1040,
    y: 1140,
    wires: [["f64afe39cfa2d768"], ["13a8dc6b7e1c6f43"]],
  },
  {
    id: "b5da0575dd117135",
    type: "api-current-state",
    z: "f234ab59c6dd2886",
    g: "a5ae0f5c3b892476",
    name: "front door status",
    server: "228d3d53.df8e02",
    version: 3,
    outputs: 1,
    halt_if: "",
    halt_if_type: "str",
    halt_if_compare: "is",
    entity_id: "binary_sensor.front_door",
    state_type: "str",
    blockInputOverrides: false,
    outputProperties: [
      {
        property: "frontDoor",
        propertyType: "msg",
        value: "",
        valueType: "entity",
      },
    ],
    for: "0",
    forType: "num",
    forUnits: "minutes",
    override_topic: false,
    state_location: "payload",
    override_payload: "msg",
    entity_location: "data",
    override_data: "msg",
    x: 650,
    y: 1120,
    wires: [["42e9bf8b84e7cdfb"]],
  },
  {
    id: "228d3d53.df8e02",
    type: "server",
    name: "Home Assistant",
    addon: false,
    rejectUnauthorizedCerts: true,
    ha_boolean: "",
    connectionDelay: false,
    cacheJson: false,
    heartbeat: false,
    heartbeatInterval: "",
    statusSeparator: "",
    enableGlobalContextStore: false,
  },
  {
    id: "32976cc46e9aea2c",
    type: "position-config",
    name: "",
    isValide: "true",
    angleType: "deg",
    timeZoneOffset: 99,
    timeZoneDST: 0,
    stateTimeFormat: "3",
    stateDateFormat: "12",
    contextStore: "",
  },
];

export const mailboxReset = [
  {
    id: "fa11369fcd2cab37",
    type: "group",
    z: "f234ab59c6dd2886",
    name: "Reset Mailbox",
    style: {
      label: true,
    },
    nodes: [
      "651802f9b1d2f3a0",
      "ce915a0bea97f7c5",
      "17e5664002c1e3a9",
      "2c9935c082db5780",
      "bf678455101cb23a",
      "a1f674984b544828",
    ],
    x: 74,
    y: 1359,
    w: 832,
    h: 202,
  },
  {
    id: "651802f9b1d2f3a0",
    type: "comment",
    z: "f234ab59c6dd2886",
    g: "fa11369fcd2cab37",
    name: "Resets the mail state at 7pm",
    info: "",
    x: 240,
    y: 1400,
    wires: [],
  },
  {
    id: "ce915a0bea97f7c5",
    type: "inject",
    z: "f234ab59c6dd2886",
    g: "fa11369fcd2cab37",
    name: "Everyday at 7pm",
    props: [
      {
        p: "payload",
      },
      {
        p: "topic",
        vt: "str",
      },
    ],
    repeat: "",
    crontab: "00 19 * * *",
    once: false,
    onceDelay: 0.1,
    topic: "",
    payload: "",
    payloadType: "date",
    x: 210,
    y: 1460,
    wires: [["17e5664002c1e3a9"]],
  },
  {
    id: "17e5664002c1e3a9",
    type: "api-current-state",
    z: "f234ab59c6dd2886",
    g: "fa11369fcd2cab37",
    name: "get mail status",
    server: "228d3d53.df8e02",
    version: 3,
    outputs: 1,
    halt_if: "",
    halt_if_type: "str",
    halt_if_compare: "is",
    entity_id: "input_select.mail_status",
    state_type: "str",
    blockInputOverrides: false,
    outputProperties: [
      {
        property: "payload",
        propertyType: "msg",
        value: "",
        valueType: "entityState",
      },
      {
        property: "data",
        propertyType: "msg",
        value: "",
        valueType: "entity",
      },
    ],
    for: "0",
    forType: "num",
    forUnits: "minutes",
    override_topic: false,
    state_location: "payload",
    override_payload: "msg",
    entity_location: "data",
    override_data: "msg",
    x: 400,
    y: 1460,
    wires: [["2c9935c082db5780"]],
  },
  {
    id: "2c9935c082db5780",
    type: "switch",
    z: "f234ab59c6dd2886",
    g: "fa11369fcd2cab37",
    name: "based on state",
    property: "payload",
    propertyType: "msg",
    rules: [
      {
        t: "eq",
        v: "Delivered",
        vt: "str",
      },
      {
        t: "eq",
        v: "Forgotten",
        vt: "str",
      },
      {
        t: "eq",
        v: "Retrieved",
        vt: "str",
      },
    ],
    checkall: "false",
    repair: false,
    outputs: 3,
    x: 600,
    y: 1460,
    wires: [["bf678455101cb23a"], ["bf678455101cb23a"], ["a1f674984b544828"]],
  },
  {
    id: "bf678455101cb23a",
    type: "api-call-service",
    z: "f234ab59c6dd2886",
    g: "fa11369fcd2cab37",
    name: "set as Forgotten",
    server: "228d3d53.df8e02",
    version: 5,
    debugenabled: false,
    domain: "input_select",
    service: "select_option",
    areaId: [],
    deviceId: [],
    entityId: ["input_select.mail_status"],
    data: '{"option":"Forgotten"}',
    dataType: "jsonata",
    mergeContext: "",
    mustacheAltTags: false,
    outputProperties: [],
    queue: "none",
    x: 800,
    y: 1460,
    wires: [[]],
  },
  {
    id: "a1f674984b544828",
    type: "api-call-service",
    z: "f234ab59c6dd2886",
    g: "fa11369fcd2cab37",
    name: "set as Empty",
    server: "228d3d53.df8e02",
    version: 5,
    debugenabled: false,
    domain: "input_select",
    service: "select_option",
    areaId: [],
    deviceId: [],
    entityId: ["input_select.mail_status"],
    data: '{"option":"Empty"}',
    dataType: "jsonata",
    mergeContext: "",
    mustacheAltTags: false,
    outputProperties: [],
    queue: "none",
    x: 810,
    y: 1520,
    wires: [[]],
  },
  {
    id: "228d3d53.df8e02",
    type: "server",
    name: "Home Assistant",
    addon: false,
    rejectUnauthorizedCerts: true,
    ha_boolean: "",
    connectionDelay: false,
    cacheJson: false,
    heartbeat: false,
    heartbeatInterval: "",
    statusSeparator: "",
    enableGlobalContextStore: false,
  },
];

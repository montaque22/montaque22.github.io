export const contextSubflow = [
  {
    id: "d2b7014aea25fdce",
    type: "subflow",
    name: "Context",
    info: '## What is this?\nContext will store the given information into\nthe Global Context Store. This means that \ninformation store here is accessible to ANY\nautomation. The Context node is meant to \nallow Home Assistant to "Remember" information\nfor a short period of time to help enrich\nuser experience. A typical example would be\nsaving a state before making a change.\n\n## How does it work\n**Key**\nThis is the property name you want to store you info\nunder.\n\n**Value Property**\nThis is the propery path in the msg object\nwhere the data you want to store is kept.\nConsider the following msg object:\n```\n{\n    payload:{\n        event:{\n            data:["hello", "world"]\n            foo: "bar"\n        }\n    }\n}\n```\nLets say you wanted to store the array at\nthe data property. In the *Value Property* \nyou would put `payload.event.data`\n\n**Treat above as value instead**\nThis will treat the information in the \n*Value Property* as data instead of a path to\ndata. Using the previous example, if\n*Treat above as value instead* was checked\nthis node would instead store the string\n`"payload.event.data"`\n\n**Action**\n- Find: Will return the value stored at *key*.\nThis will ignore all the other properties\n- Save: Store the data in/at *Value Property*\nunder the specified *key*. Remember, data\nstore will last about 2 minutes and\nwill be purged\n- Clear: Removes the information at the \nspecified *key*',
    category: "",
    in: [
      {
        x: 50,
        y: 30,
        wires: [
          {
            id: "ab2a8446077104f6",
          },
        ],
      },
    ],
    out: [
      {
        x: 890,
        y: 200,
        wires: [
          {
            id: "a0c4df469ff886c1",
            port: 0,
          },
          {
            id: "05925a150b917b69",
            port: 0,
          },
          {
            id: "2200500ce117fc7b",
            port: 0,
          },
        ],
      },
      {
        x: 910,
        y: 300,
        wires: [
          {
            id: "b42235ce3c3e7a5e",
            port: 0,
          },
        ],
      },
    ],
    env: [
      {
        name: "key",
        type: "str",
        value: "",
        ui: {
          type: "input",
          opts: {
            types: ["str", "env"],
          },
        },
      },
      {
        name: "value property",
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
        name: "Treat above as value instead",
        type: "bool",
        value: "false",
        ui: {
          type: "checkbox",
        },
      },
      {
        name: "action",
        type: "str",
        value: "Find",
        ui: {
          type: "select",
          opts: {
            opts: [
              {
                l: {
                  "en-US": "Find",
                },
                v: "get",
              },
              {
                l: {
                  "en-US": "Save",
                },
                v: "set",
              },
              {
                l: {
                  "en-US": "Clear",
                },
                v: "clear",
              },
            ],
          },
        },
      },
    ],
    meta: {},
    color: "#FFF0F0",
    outputLabels: ["contextValue", "auto-delete context"],
    icon: "node-red/leveldb.png",
  },
  {
    id: "6127dcb508a96713",
    type: "switch",
    z: "d2b7014aea25fdce",
    name: "depending on the action",
    property: "action",
    propertyType: "env",
    rules: [
      {
        t: "eq",
        v: "get",
        vt: "str",
      },
      {
        t: "eq",
        v: "set",
        vt: "str",
      },
      {
        t: "eq",
        v: "clear",
        vt: "str",
      },
    ],
    checkall: "true",
    repair: false,
    outputs: 3,
    x: 170,
    y: 200,
    wires: [
      ["05925a150b917b69"],
      ["2200500ce117fc7b", "b8ba3280ce516350"],
      ["a0c4df469ff886c1"],
    ],
  },
  {
    id: "b8ba3280ce516350",
    type: "debounce-leading-trailing",
    z: "d2b7014aea25fdce",
    time: "120000",
    debouncetype: "trailing",
    name: "Debounce 2 mins",
    x: 470,
    y: 300,
    wires: [["b42235ce3c3e7a5e"]],
  },
  {
    id: "a0c4df469ff886c1",
    type: "function",
    z: "d2b7014aea25fdce",
    name: "Clear Context",
    func: 'const key = flow.get("key")\nconst _context = global.get("context")\n\ndelete _context[key];\nmsg.contextValue = undefined\nglobal.set("context", _context)\n\n\nreturn msg;',
    outputs: 1,
    noerr: 0,
    initialize: "",
    finalize: "",
    libs: [],
    x: 460,
    y: 240,
    wires: [[]],
  },
  {
    id: "b42235ce3c3e7a5e",
    type: "function",
    z: "d2b7014aea25fdce",
    name: "Delete Context",
    func: 'const key = flow.get("key")\nconst _context = global.get("context")\nconst specificContext = _context[key]\nlet minsAgo = 0;\n\nif (specificContext){\n    minsAgo = sugar.Date.minutesAgo(new Date(specificContext.timestamp))\n}\n\nif(minsAgo >= 2){\n    _context[key] = undefined\n}\n\nglobal.set("context", _context)\n\nreturn msg;',
    outputs: 1,
    noerr: 0,
    initialize: "",
    finalize: "",
    libs: [
      {
        var: "sugar",
        module: "sugar",
      },
    ],
    x: 680,
    y: 300,
    wires: [[]],
  },
  {
    id: "ab2a8446077104f6",
    type: "function",
    z: "d2b7014aea25fdce",
    name: "normalize props",
    func: 'const {key = env.get("key")} = msg\nconst useValuePropertyAsValue = env.get("Treat above as value instead");\n\n// Property key to look at to get the value\nconst valueProp = env.get("value property")\n\n// defaults to the value designated by the value property\nlet primaryValue = sugar.Object.get(msg, valueProp);\n\nif(useValuePropertyAsValue){\n    primaryValue = valueProp\n}\n\nflow.set("key", key)\nflow.set("value", primaryValue)\n\nreturn msg;',
    outputs: 1,
    noerr: 0,
    initialize: "",
    finalize: "",
    libs: [
      {
        var: "sugar",
        module: "sugar",
      },
    ],
    x: 120,
    y: 100,
    wires: [["6127dcb508a96713"]],
  },
  {
    id: "05925a150b917b69",
    type: "function",
    z: "d2b7014aea25fdce",
    name: "Get context value",
    func: 'const key = flow.get("key")\nconst _context = global.get("context")\n\nmsg.contextValue = _context[key]?.value\n\n\nreturn msg;',
    outputs: 1,
    noerr: 0,
    initialize: "",
    finalize: "",
    libs: [],
    x: 450,
    y: 120,
    wires: [[]],
  },
  {
    id: "2200500ce117fc7b",
    type: "function",
    z: "d2b7014aea25fdce",
    name: "Modify Context",
    func: 'const key = flow.get("key")\nconst value = flow.get("value")\nconst _context = global.get("context")\nconst isValidString = (typeof value === "string" && value.length)\nconst isNotUndefined = value !== undefined && value !== null\nconst isValidValue = typeof value === "string" ? !!value.length : isNotUndefined\n\n_context[key] = {\n    timestamp: Date.now(),\n    value\n};\nglobal.set("context", _context)\nmsg.contextValue = value\n\nreturn msg;',
    outputs: 1,
    noerr: 0,
    initialize: "",
    finalize: "",
    libs: [],
    x: 460,
    y: 200,
    wires: [[]],
  },
  {
    id: "8257550dc5fac958",
    type: "subflow:d2b7014aea25fdce",
    z: "b9203c19c137b9ca",
    name: "",
    env: [
      {
        name: "action",
        value: null,
        type: "str",
      },
    ],
    x: 300,
    y: 2700,
    wires: [[], []],
  },
];

export const example = {
  payload: {
    event: {
      data: ["hello", "world"],
      foo: "bar",
    },
  },
};

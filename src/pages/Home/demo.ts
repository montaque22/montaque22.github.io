export const demo = [
  {
    id: "35aa2b8a04924151",
    type: "inject",
    z: "62022061b503e626",
    name: "Manual Trigger",
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
    crontab: "",
    once: false,
    onceDelay: 0.1,
    topic: "hello world!",
    payload: "",
    payloadType: "date",
    x: 160,
    y: 160,
    wires: [["f706114287d992ec"]],
  },
  {
    id: "f706114287d992ec",
    type: "debug",
    z: "62022061b503e626",
    name: "debug 52",
    active: true,
    tosidebar: true,
    console: false,
    tostatus: false,
    complete: "true",
    targetType: "full",
    statusVal: "",
    statusType: "auto",
    x: 420,
    y: 160,
    wires: [],
  },
];

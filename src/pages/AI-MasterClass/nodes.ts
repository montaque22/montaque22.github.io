export const episodeOne = [
    {
        "id": "554a3ca9a8d55a2c",
        "type": "api-call-service",
        "z": "62022061b503e626",
        "name": "",
        "server": "228d3d53.df8e02",
        "version": 5,
        "debugenabled": false,
        "domain": "homeassistant",
        "service": "{{action}}",
        "areaId": [],
        "deviceId": [],
        "entityId": [
            "{{entities}}"
        ],
        "data": "",
        "dataType": "jsonata",
        "mergeContext": "",
        "mustacheAltTags": false,
        "outputProperties": [],
        "queue": "none",
        "x": 610,
        "y": 360,
        "wires": [
            [
                "76c5ddaad67262cf"
            ]
        ]
    },
    {
        "id": "b61dbeed8f51ba67",
        "type": "server-events",
        "z": "62022061b503e626",
        "name": "From Telegram",
        "server": "228d3d53.df8e02",
        "version": 2,
        "eventType": "telegram_text",
        "exposeToHomeAssistant": false,
        "eventData": "",
        "haConfig": [
            {
                "property": "name",
                "value": ""
            },
            {
                "property": "icon",
                "value": ""
            }
        ],
        "waitForRunning": true,
        "outputProperties": [
            {
                "property": "payload",
                "propertyType": "msg",
                "value": "",
                "valueType": "eventData"
            },
            {
                "property": "topic",
                "propertyType": "msg",
                "value": "$outputData(\"eventData\").event_type",
                "valueType": "jsonata"
            }
        ],
        "event_type": "",
        "x": 120,
        "y": 360,
        "wires": [
            [
                "5e4d9d4799961728"
            ]
        ]
    },
    {
        "id": "bc1be606f8697887",
        "type": "debug",
        "z": "62022061b503e626",
        "name": "debug 43",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 1040,
        "y": 360,
        "wires": []
    },
    {
        "id": "5e4d9d4799961728",
        "type": "change",
        "z": "62022061b503e626",
        "name": "set property",
        "rules": [
            {
                "t": "set",
                "p": "telegramMessage",
                "pt": "msg",
                "to": "payload.event.text",
                "tot": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 330,
        "y": 360,
        "wires": [
            [
                "554a3ca9a8d55a2c"
            ]
        ]
    },
    {
        "id": "76c5ddaad67262cf",
        "type": "api-call-service",
        "z": "62022061b503e626",
        "name": "respond",
        "server": "228d3d53.df8e02",
        "version": 5,
        "debugenabled": false,
        "domain": "telegram_bot",
        "service": "send_message",
        "areaId": [],
        "deviceId": [],
        "entityId": [],
        "data": "{\"message\": msg.gptAnswer}",
        "dataType": "jsonata",
        "mergeContext": "",
        "mustacheAltTags": false,
        "outputProperties": [],
        "queue": "none",
        "x": 860,
        "y": 360,
        "wires": [
            [
                "bc1be606f8697887"
            ]
        ]
    },
    {
        "id": "2785df25da60b6fc",
        "type": "inject",
        "z": "62022061b503e626",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "action",
                "v": "toggle",
                "vt": "str"
            },
            {
                "p": "entities",
                "v": "[\"light.office_light_left\", \"light.office_light_right\"]",
                "vt": "jsonata"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 180,
        "y": 160,
        "wires": [
            [
                "554a3ca9a8d55a2c"
            ]
        ]
    },
    {
        "id": "228d3d53.df8e02",
        "type": "server",
        "name": "Home Assistant",
        "addon": true
    }
]
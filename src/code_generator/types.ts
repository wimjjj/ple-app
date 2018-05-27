import * as Immutable from "immutable";

export type BlockUIData = {
  label: string;
  constructData: () => ArduinoCodeblockData;
  metaData: Immutable.List<string>;
};

export type ArduinoCodeblockData =
  { label: string } & (
    |   ButtonCodeblockData
    |   LedCodeblockData
    |   DelayCodeblockData
    |   RepeatCodeBlockData
    |   UltrasoneSensorBlockData
    |   ConditionCodeblockData
    |   ExitCodeBlockData
  )

export type ConditionCodeblockData = {
  kind: "condition"
  secondaryTree: Immutable.List<ArduinoCodeblockData>
}

export type ExitCodeBlockData = {
  kind: 'exit'
}

export type ButtonCodeblockData = {
  kind: "button"
  trigger: "down" | "up" | "pressed"
  port: string
}

export type LedCodeblockData = {
  kind: "led"
  transition: "on" | "off"
  port: string
  label: string
  color: string
}

export type DelayCodeblockData = {
  kind: "delay"
  milliseconds: number
}

export type RepeatCodeBlockData = {
  kind: "repeat",
  steps: "all" | number
}

export type UltrasoneSensorBlockData = {
  kind: "ultrasone-sensor"
  triggerPort: string
  echoPort: string
  distance: number
  trigger: "smaller-then" | "bigger-then"
  secondaryTree: Immutable.List<ArduinoCodeblockData> | 'none'
}

export type ArduinoCodeblockDefenition = (
  id: string, state: string
) => {
    globalsCode: string
    startUpCode: string
    routineCode: string
  }

export type ArduinoCodeblockConstructor = (
  codeblockData: ArduinoCodeblockData
) => ArduinoCodeblockDefenition

export type ArduinoCodeGenerator = (
  arduinoCodeblockDefenition: Immutable.List<ArduinoCodeblockDefenition>
) => string

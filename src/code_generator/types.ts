import * as Immutable from "immutable";

export type BlockUIData = {
  label: string;
  constructData: () => ArduinoCodeblockData;
  metaData: Immutable.List<string>;
};

export type ArduinoCodeblockData =
  { label: string } & (
    | ButtonCodeblockData
    | LedCodeblockData
    | DelayCodeblockData
    | RepeatCodeBlockData
  )

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

export type ArduinoCodeblockDefenition = (
  id: number
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

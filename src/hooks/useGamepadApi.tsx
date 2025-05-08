"use client";

import { useState, useEffect } from "react";

export type GamepadApi = {
  connected: boolean;
  buttonA: boolean;
  buttonB: boolean;
  buttonX: boolean;
  buttonY: boolean;
  joystick: number[];
  joystickRight: number[];
  RB: boolean;
  LB: boolean;
  RT: boolean;
  LT: boolean;
  R3: boolean;
  L3: boolean;
  start: boolean;
  select: boolean;
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
};

export const useGamepadApi = () => {
  const init: GamepadApi = {
    connected: false,
    buttonA: false,
    buttonB: false,
    buttonX: false,
    buttonY: false,
    joystick: [0, 0],
    joystickRight: [0, 0],
    RB: false,
    LB: false,
    RT: false,
    LT: false,
    R3: false,
    L3: false,
    start: false,
    select: false,
    up: false,
    down: false,
    left: false,
    right: false,
  };
  const [gamepadInfo, setGamepadInfo] = useState<GamepadApi>(init);

  const updateGamepadState = () => {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    const gamepad = gamepads[0];
    console.log("gamepad", gamepad);

    if (gamepad) {
      const newGamepadInfo = {
        connected: true,
        buttonA: gamepad.buttons[0].pressed,
        buttonB: gamepad.buttons[1].pressed,
        buttonX: gamepad.buttons[2].pressed,
        buttonY: gamepad.buttons[3].pressed,
        joystickRight: [gamepad.axes[2], gamepad.axes[3]],
        LT: gamepad.buttons[6].pressed,
        RT: gamepad.buttons[7].pressed,
        LB: gamepad.buttons[4].pressed,
        RB: gamepad.buttons[5].pressed,

        start: gamepad.buttons[9].pressed,
        select: gamepad.buttons[8].pressed,
        up: gamepad.buttons[12].pressed,
        down: gamepad.buttons[13].pressed,
        left: gamepad.buttons[14].pressed,
        right: gamepad.buttons[15].pressed,
        joystick: [gamepad.axes[0], gamepad.axes[1]],

        L3: gamepad.buttons[10].pressed,
        R3: gamepad.buttons[11].pressed,
      };

      if (JSON.stringify(newGamepadInfo) !== JSON.stringify(gamepadInfo)) {
        setGamepadInfo(newGamepadInfo);
      }
    } else {
      if (gamepadInfo.connected) {
        setGamepadInfo(init);
      }
    }
  };

  useEffect(() => {
    const gamepadConnected = () => {
      console.log("接続");
      updateGamepadState();
    };

    const gamepadDisconnected = () => {
      console.log("解除");
      setGamepadInfo(init);
    };

    window.addEventListener("gamepadconnected", gamepadConnected);
    window.addEventListener("gamepaddisconnected", gamepadDisconnected);

    const interval = setInterval(updateGamepadState, 50);

    return () => {
      window.removeEventListener("gamepadconnected", gamepadConnected);
      window.removeEventListener("gamepaddisconnected", gamepadDisconnected);
      clearInterval(interval);
    };
  }, [gamepadInfo]);

  return gamepadInfo;
};

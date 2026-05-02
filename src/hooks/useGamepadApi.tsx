"use client";

import { useState, useEffect, useRef } from "react";

export type ViewMode = "show" | "hidden" | "translucent";

/**
 * ゲームパッドのボタン状態を表す型
 */
export type GamepadApiButton = {
  buttonA: boolean;
  buttonB: boolean;
  buttonX: boolean;
  buttonY: boolean;
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

/**
 * ゲームパッドのスティック状態を表す型
 */
export type GamepadApiStick = {
  joystick: number[];
  joystickRight: number[];
};

/**
 * ゲームパッドの全体状態を表す型
 */
export type GamepadApi = {
  connected: boolean;
} & GamepadApiButton &
  GamepadApiStick;

/**
 * ゲームパッドの入力を管理するカスタムフック
 * 接続状態、ボタン押下、スティック位置をリアルタイムで取得
 */
export const useGamepadApi = () => {
  // 初期状態: 接続されていない状態
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

  // 前回のゲームパッド状態を保持（変更検出用）
  const prevGamepadInfo = useRef<GamepadApi>(init);

  /**
   * ゲームパッドの生データをデバッグ用に整形する関数
   * @param gamepad 生のゲームパッドオブジェクト
   * @returns デバッグ表示用のオブジェクト
   */
  const formatGamepadDebug = (gamepad: Gamepad) => {
    return {
      id: gamepad.id,
      index: gamepad.index,
      mapping: gamepad.mapping,
      axes: gamepad.axes.slice(0, 12),
      buttons: gamepad.buttons.map((button, index) => ({
        index,
        pressed: button.pressed,
        value: button.value,
      })),
    };
  };

  /**
   * ゲームパッドの十字キー（D-pad）の状態を取得する関数
   * ボタンとして存在する場合と、axes として存在する場合の両方に対応
   * @param gamepad 生のゲームパッドオブジェクト
   * @returns 十字キーの状態と使用した軸の情報
   */
  const getDpadState = (gamepad: Gamepad) => {
    // 標準的な D-pad ボタンの押下状態を取得
    const buttonUp = gamepad.buttons[12]?.pressed ?? false;
    const buttonDown = gamepad.buttons[13]?.pressed ?? false;
    const buttonLeft = gamepad.buttons[14]?.pressed ?? false;
    const buttonRight = gamepad.buttons[15]?.pressed ?? false;

    // ボタンが押されているかをチェック
    const buttonsPressed = buttonUp || buttonDown || buttonLeft || buttonRight;

    let axisUp = false;
    let axisDown = false;
    let axisLeft = false;
    let axisRight = false;

    if (!buttonsPressed) {
      // 十字キーボタンが押されていない場合、axes[0] と axes[1] を D-pad として扱う
      const axisX = gamepad.axes[0] ?? 0;
      const axisY = gamepad.axes[1] ?? 0;

      axisLeft = axisX < -0.5;
      axisRight = axisX > 0.5;
      axisUp = axisY < -0.5;
      axisDown = axisY > 0.5;
    }

    return {
      up: buttonUp || axisUp,
      down: buttonDown || axisDown,
      left: buttonLeft || axisLeft,
      right: buttonRight || axisRight,
      usedAxis: !buttonsPressed && (axisUp || axisDown || axisLeft || axisRight),
    };
  };

  /**
   * ゲームパッドの生データからアプリケーション用の状態オブジェクトを構築する関数
   * @param gamepad 生のゲームパッドオブジェクト
   * @returns アプリケーションで使用するゲームパッド状態
   */
  const buildButtonState = (gamepad: Gamepad): GamepadApi => {
    const dpad = getDpadState(gamepad);

    return {
      connected: true,
      buttonA: gamepad.buttons[0]?.pressed ?? false,
      buttonB: gamepad.buttons[1]?.pressed ?? false,
      buttonX: gamepad.buttons[2]?.pressed ?? false,
      buttonY: gamepad.buttons[3]?.pressed ?? false,
      joystickRight: [gamepad.axes[2] ?? 0, gamepad.axes[3] ?? 0],
      LT: gamepad.buttons[6]?.pressed ?? false,
      RT: gamepad.buttons[7]?.pressed ?? false,
      LB: gamepad.buttons[4]?.pressed ?? false,
      RB: gamepad.buttons[5]?.pressed ?? false,
      start: gamepad.buttons[9]?.pressed ?? false,
      select: gamepad.buttons[8]?.pressed ?? false,
      up: dpad.up,
      down: dpad.down,
      left: dpad.left,
      right: dpad.right,
      joystick: [gamepad.axes[0] ?? 0, gamepad.axes[1] ?? 0],
      L3: gamepad.buttons[10]?.pressed ?? false,
      R3: gamepad.buttons[11]?.pressed ?? false,
    };
  };

  /**
   * ゲームパッドの状態変化をコンソールにログ出力する関数
   * デバッグ用に生データと加工後の状態を表示
   * @param newState 新しいゲームパッド状態
   * @param gamepad 生のゲームパッドオブジェクト
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const logGamepadUpdate = (newState: GamepadApi, gamepad: Gamepad) => {
    const pressedButtons = Object.entries(newState)
      .filter(([_, value]) => typeof value === "boolean" && value)
      .map(([key]) => key)
      .join(", ");
    console.log('gamepad aaaa', gamepad)
    console.groupCollapsed(
      `Gamepad ${gamepad.index} update${pressedButtons ? ` (${pressedButtons})` : ""}`
    );
    console.log("Raw gamepad:", formatGamepadDebug(gamepad));
    console.table({
      connected: newState.connected,
      joystickLeftX: newState.joystick[0].toFixed(3),
      joystickLeftY: newState.joystick[1].toFixed(3),
      joystickRightX: newState.joystickRight[0].toFixed(3),
      joystickRightY: newState.joystickRight[1].toFixed(3),
      buttonA: newState.buttonA,
      buttonB: newState.buttonB,
      buttonX: newState.buttonX,
      buttonY: newState.buttonY,
      LB: newState.LB,
      RB: newState.RB,
      LT: newState.LT,
      RT: newState.RT,
      L3: newState.L3,
      R3: newState.R3,
      start: newState.start,
      select: newState.select,
      up: newState.up,
      down: newState.down,
      left: newState.left,
      right: newState.right,
    });
    console.groupEnd();
  };

  /**
   * ゲームパッドの状態を定期的に更新する関数
   * 状態変化を検知してログ出力と状態更新を行う
   */
  const updateGamepadState = () => {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

    const gamepad = gamepads[0];

    if (gamepad) {
      const newGamepadInfo = buildButtonState(gamepad);

      if (JSON.stringify(newGamepadInfo) !== JSON.stringify(prevGamepadInfo.current)) {
        // logGamepadUpdate(newGamepadInfo, gamepad);
        prevGamepadInfo.current = newGamepadInfo;
        setGamepadInfo(newGamepadInfo);
      }
    } else if (prevGamepadInfo.current.connected) {
      console.log("Gamepad disconnected");
      prevGamepadInfo.current = init;
      setGamepadInfo(init);
    }
  };

  // ゲームパッドの接続/切断イベントを監視し、定期的な状態更新を行う
  useEffect(() => {
    const gamepadConnected = (event: GamepadEvent) => {
      console.log("Gamepad connected:", event.gamepad.id);
      updateGamepadState();
    };

    const gamepadDisconnected = (event: GamepadEvent) => {
      console.log("Gamepad disconnected:", event.gamepad.id);
      prevGamepadInfo.current = init;
      setGamepadInfo(init);
    };

    window.addEventListener("gamepadconnected", gamepadConnected);
    window.addEventListener("gamepaddisconnected", gamepadDisconnected);

    // 50ms ごとにゲームパッド状態を更新
    const interval = setInterval(updateGamepadState, 50);

    return () => {
      window.removeEventListener("gamepadconnected", gamepadConnected);
      window.removeEventListener("gamepaddisconnected", gamepadDisconnected);
      clearInterval(interval);
    };
  }, []);

  return gamepadInfo;
};

export type Sf6Arts =
  | "left"
  | "down"
  | "right"
  | "up"
  | "low"
  | "middle"
  | "high"
  | "sp"
  | "parry"
  | "impact"
  | "assist"
  | "sa"
  | "throw"
  | "low_p"
  | "low_k"
  | "middle_p"
  | "middle_k"
  | "high_p"
  | "high_k";

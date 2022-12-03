/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the Servo library blocks.
 *     The Arduino Servo library docs: http://arduino.cc/en/reference/servo
 *
 * TODO: If angle selector added to blocks edit code here.
 */
'use strict';

goog.provide('Blockly.Arduino.servo');

goog.require('Blockly.Arduino');


/**
 * Code generator to set an angle (Y) value to a servo pin (X).
 * Arduino code: #include <Servo.h>
 *               Servo myServoX;
 *               setup { myServoX.attach(X); }
 *               loop  { myServoX.write(Y);  }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['servo_write'] = function(block) {
  var pinKey = block.getFieldValue('SERVO_PIN');
  var servoAngle = Blockly.Arduino.valueToCode(
      block, 'SERVO_ANGLE', Blockly.Arduino.ORDER_ATOMIC) || '90';
  var servoName = 'myServo' + pinKey;

  Blockly.Arduino.reservePin(
      block, pinKey, Blockly.Arduino.PinTypes.SERVO, 'Servo Write');

  Blockly.Arduino.addInclude('servo', '#include <Servo.h>');
  Blockly.Arduino.addDeclaration('servo_' + pinKey, 'Servo ' + servoName + ';');

  var setupCode = servoName + '.attach(' + pinKey + ');';
  Blockly.Arduino.addSetup('servo_' + pinKey, setupCode, true);

  var code = servoName + '.write(' + servoAngle + ');\n';
  return code;
};

/**
 * Code generator to read an angle value from a servo pin (X).
 * Arduino code: #include <Servo.h>
 *               Servo myServoX;
 *               setup { myServoX.attach(X); }
 *               loop  { myServoX.read();    }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['servo_read'] = function(block) {
  var pinKey = block.getFieldValue('SERVO_PIN');
  var servoName = 'myServo' + pinKey;

  Blockly.Arduino.reservePin(
      block, pinKey, Blockly.Arduino.PinTypes.SERVO, 'Servo Read');

  Blockly.Arduino.addInclude('servo', '#include <Servo.h>');
  Blockly.Arduino.addDeclaration('servo_' + pinKey, 'Servo ' + servoName + ';');

  var setupCode = servoName + '.attach(' + pinKey + ');';
  Blockly.Arduino.addSetup('servo_' + pinKey, setupCode, true);

  var code = servoName + '.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino['led_w_rbg'] = function(block) {
  var dropdown_color = block.getFieldValue('color');
  Blockly.Arduino.addInclude('idarduino', '#include <Arduino.h>');
  Blockly.Arduino.addInclude('idsuny', '#include <Suny.h>');
  Blockly.Arduino.addDeclaration('idled_Rob', 'Suny Rob;');
  Blockly.Arduino.addSetup('idled_Rob', 'Rob.Itit();\n', true);
  // TODO: Assemble JavaScript into code variable.
  var code = 'Rob.SetAllLed("'+dropdown_color+'");\n';
  return code;
};

Blockly.Arduino['ulstra'] = function(block) {
  var dropdown_port = block.getFieldValue('port');
  Blockly.Arduino.addInclude('idarduino', '#include <Arduino.h>');
  Blockly.Arduino.addInclude('idsuny', '#include <Suny.h>');
  Blockly.Arduino.addDeclaration('idled_Rob', 'Suny Rob;');
  Blockly.Arduino.addSetup('idled_Rob', 'Rob.Itit();\n', true);
  var code = 'Rob.getSonarValue('+dropdown_port+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['touch_sensor'] = function(block) {
  var dropdown_port = block.getFieldValue('PORT');
  Blockly.Arduino.addInclude('idarduino', '#include <Arduino.h>');
  Blockly.Arduino.addInclude('idsuny', '#include <Suny.h>');
  Blockly.Arduino.addDeclaration('idled_Rob', 'Suny Rob;');
  Blockly.Arduino.addSetup('idled_Rob', 'Rob.Itit();\n', true);
  // TODO: Assemble JavaScript into code variable.
  var code = 'Rob.getTouchLedValue('+dropdown_port+')';
  return [code, Blockly.Arduino.ORDER_NONE];
};





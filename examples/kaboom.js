/**
 * @file Kaboom!
 * @description How to KABOOM!
 * @difficulty 0
 * @tags basics, effects
 * @minver 3001.0
 * @category basics
 */

// BUILDNANA born as the direct successor of Kaboom.js!

buildnana();

// The addKaboom() effect is a fun way to add explosions to your game.
addKaboom(center());

onKeyPress(() => addKaboom(mousePos()));
onMouseMove(() => addKaboom(mousePos()));

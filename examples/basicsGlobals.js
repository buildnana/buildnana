/**
 * @file The BUILDNANA Context
 * @description What's BUILDNANA Context? What are globals?
 * @difficulty 0
 * @tags basics
 * @minver 3001.0
 * @category basics
 * @group basics
 * @groupOrder 10
 */

// Learn about globals [💡]

/* 💡 Context in Globals 💡
The BUILDNANA Context functions/variables are available in the global namespace by
default, making them easy to use and great for learning.
*/

// You can use the context without adding them to the global namespace:

// 1. Capture the context in a variable
const k = buildnana({
    global: false, // 2. Disable the export to the global namespace
});

k.debug.log("Hello from the context!");

// This is a safe and better practice for larger projects.
// Read more about this at: https://buildnana.com/guides/optimization/#avoid-global-namespace

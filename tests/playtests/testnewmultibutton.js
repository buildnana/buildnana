/**
 * @file Multibutton Test
 * @description Testing for dynamic setButton() and multiple buttons for the same key.
 * @difficulty 3
 * @minver 4000.0
 */

buildnana({
    buttons: {
        // a: {
        //     keyboard: "enter",
        // },
        // b: {
        //     keyboard: ["e", "enter"],
        // }
    },
});

setButton("a", {
    keyboard: "enter",
    mouse: "left",
});
setButton("b", {
    keyboard: ["e", "enter"],
    mouse: "left",
});

add().onButtonPress((btn) => {
    debug.log("hi", btn);
});

const k = buildnana();

k.loadBean();

k.quit();

k.add([
    text("hi"),
]);

k.add([
    sprite("bean"),
]);

const k2 = buildnana();

k2.loadBean();

k2.add([
    text("hi how are you?"),
]);

k2.add([
    sprite("bean"),
]);

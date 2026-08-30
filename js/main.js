const go = new Go();

const result = await WebAssembly.instantiateStreaming(
  fetch("main.wasm"),
  go.importObject
);

go.run(result.instance);

console.log(result);

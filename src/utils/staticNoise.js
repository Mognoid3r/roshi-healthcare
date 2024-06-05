// staticNoise.js
export function generateStatic(canvas) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  function draw() {
    const imageData = ctx.createImageData(width, height);
    const buffer32 = new Uint32Array(imageData.data.buffer);

    for (let i = 0; i < buffer32.length; i++) {
      const randomValue = Math.random();
      const alpha = Math.floor(randomValue * 255);
      buffer32[i] = (alpha << 24) | 0x777777;
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }

  loop();
}

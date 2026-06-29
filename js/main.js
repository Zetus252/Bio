(function () {
  const canvas = document.getElementById("network-canvas");
  const ctx = canvas.getContext("2d");
  let W, H, nodes, animId;

  const NODE_COUNT = 55;
  const MAX_DIST = 160;
  const SPEED = 0.35;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeNode() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: Math.random() * 2 + 1.5,
    };
  }

  function init() {
    resize();
    nodes = Array.from({ length: NODE_COUNT }, makeNode);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.12;
          ctx.strokeStyle = `rgba(30, 58, 138, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // dots
    nodes.forEach((n) => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(30, 58, 138, 0.22)";
      ctx.fill();
    });
  }

  function update() {
    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
  }

  function loop() {
    update();
    draw();
    animId = requestAnimationFrame(loop);
  }

  window.addEventListener("resize", () => {
    cancelAnimationFrame(animId);
    resize();
    loop();
  });

  init();
  loop();
})();

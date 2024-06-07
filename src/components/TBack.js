import React, { useEffect, useRef } from "react";
import * as tinycolor from "tinycolor2";
import { Delaunay } from "d3-delaunay";
import * as dat from "dat.gui";

const Tback = ({ color }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Canvas initialization
    const settings = {
      tsize: 50,
      className: "tback",
      lineWidth: 1,
      activationRadius: 250,
      color: color,
    };

    let triangles = [];
    let connected = [];
    let appeared = false;
    let ar = 0;

    class TbackT {
      constructor(points, options) {
        this.points = points;
        this.options = { ...options };
        this.center = [
          (points[0][0] + points[1][0] + points[2][0]) / 3,
          (points[0][1] + points[1][1] + points[2][1]) / 3,
        ];
        this.baseColor = this.options.color;
        this.at = false;
        this.mouseOver = false;
        this.malpha = 0;
        this.connections = 0;
      }

      setOptions(options) {
        this.options = { ...this.options, ...options };
      }

      isClose(pos, dist) {
        const xd = pos[0] - this.center[0];
        const yd = pos[1] - this.center[1];
        const d = Math.sqrt(xd * xd + yd * yd);
        return d <= dist ? d : false;
      }

      draw(ctx) {
        if (!this.at) return;

        const time = Date.now();

        if (this.mouseOver) {
          ctx.lineWidth = Math.round(this.malpha * 2);
          ctx.strokeStyle = tinycolor(this.options.color)
            .lighten(25)
            .setAlpha(this.malpha)
            .toString();
          ctx.beginPath();
          ctx.moveTo(this.points[2][0], this.points[2][1]);
          ctx.lineTo(this.points[0][0], this.points[0][1]);
          ctx.lineTo(this.points[1][0], this.points[1][1]);
          ctx.stroke();
        }

        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.fillStyle = tinycolor(this.options.color).lighten(20).toString();
        const size =
          this.connections * 0.8 + 1 + (this.mouseOver ? this.malpha * 1.1 : 0);
        ctx.arc(this.center[0], this.center[1], size, 0, Math.PI * 2);
        ctx.fill();

        if (this.mouseOver) {
          ctx.beginPath();
          ctx.strokeStyle = tinycolor(this.options.color)
            .setAlpha(Math.max(this.malpha - 0.5, 0))
            .toString();
          ctx.arc(
            this.points[0][0],
            this.points[0][1],
            10,
            Math.sin(time / 1000) * Math.PI,
            Math.PI
          );
          ctx.stroke();
        }
      }
    }

    const initialize = () => {
      const vertices = [];
      const cols = Math.round(canvas.width / settings.tsize);
      const rows = Math.round(canvas.height / settings.tsize) * 1.25;
      let skip = 1;
      for (let j = 0; j <= rows; j++) {
        let num = rows;
        if (skip % 2 === 0) {
          num--;
        }
        for (let i = 0; i <= cols; i++) {
          let x = i * settings.tsize;
          let y = j * settings.tsize * (Math.sqrt(3) / 2);
          if (skip % 2 === 0) {
            x -= settings.tsize / 2;
          }
          vertices.push([x, y]);
        }
        skip++;
      }

      const triplets = Delaunay.from(vertices).triangles;
      triangles = [];
      for (let i = 0; i < triplets.length; i += 3) {
        const points = [
          [vertices[triplets[i]][0], vertices[triplets[i]][1]],
          [vertices[triplets[i + 1]][0], vertices[triplets[i + 1]][1]],
          [vertices[triplets[i + 2]][0], vertices[triplets[i + 2]][1]],
        ];
        const t = new TbackT(points, {
          size: settings.tsize,
          color: settings.color,
        });
        triangles.push(t);
      }
      connected = [];
      appeared = false;
    };

    const mouseMoveHandler = (e) => {
      if (!appeared) {
        return;
      }
      triangles.forEach((t) => {
        const d = t.isClose([e.clientX, e.clientY], settings.activationRadius);
        if (d !== false) {
          t.mouseOver = true;
          t.malpha = 1 - d / settings.activationRadius;
        } else {
          t.mouseOver = false;
        }
      });
    };

    const resizeCanvasHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initialize();
    };

    const appear = () => {
      if (appeared) {
        return;
      }
      triangles.forEach((f) => {
        if (f.isClose([canvas.width / 2, canvas.height / 2], ar)) {
          f.at = true;
        }
      });
      ar += 5;
      if (
        ar >=
        Math.sqrt(Math.pow(canvas.width, 2), Math.pow(canvas.height, 2)) / 1.75
      ) {
        appeared = true;
      }
    };

    const drawTriangles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      triangles.forEach((t) => {
        t.draw(ctx);
      });
    };

    const connectCenters = () => {
      if (!appeared) {
        return;
      }
      if (connected.length > 0) {
        const last = connected[connected.length - 1];
        const neighbors = triangles.filter(
          (t) =>
            t.connections <= 3 && t.isClose(last.center, settings.tsize / 1.5)
        );
        if (neighbors.length > 0) {
          const c = neighbors[Math.floor(Math.random() * neighbors.length)];
          connected.push(c);
          c.connections++;
        } else {
          const c = connected.shift();
          c.connections = 0;
        }
      } else {
        const dispos = triangles.filter((t) => t.connections < 3);
        const c = triangles[Math.floor(Math.random() * triangles.length)];
        c.connections++;
        connected.push(c);
      }
      if (connected.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = tinycolor(settings.color).lighten(30).toString();
        ctx.moveTo(connected[0].center[0], connected[0].center[1]);
        connected.forEach((c) => {
          ctx.lineTo(c.center[0], c.center[1]);
        });
        ctx.stroke();
      }
    };

    const animate = () => {
      appear();
      drawTriangles();
      connectCenters();
      requestAnimationFrame(animate);
    };

    // Initialize canvas and event listeners
    initialize();
    window.addEventListener("resize", resizeCanvasHandler);
    window.addEventListener("mousemove", mouseMoveHandler);
    resizeCanvasHandler();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvasHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [color]);

  return <canvas ref={canvasRef} />;
};

export default Tback;

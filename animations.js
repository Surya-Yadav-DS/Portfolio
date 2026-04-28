/* ============================================================
   animations.js  —  Drop-in animation layer
   Already linked in index.html as last script before </body>
   ============================================================ */
(function () {
  'use strict';

  /* ── 1. GLOWING ORB CURSOR ───────────────────────────────── */
  function initCursor() {
    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.id  = 'cursor-dot';
    ring.id = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = -200, my = -200, rx = -200, ry = -200;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    // Ring lags with easing
    (function loop() {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(loop);
    })();

    // Hover state on interactive elements
    const sel = 'a,button,input,textarea,[role=button],.nav-item,.social-link,' +
      '.download-btn,.tag,.project-tag,.project-link,.scholar-btn,' +
      '.submit-btn,.achievement-card,.skill-card,.stat-card,.contact-card';

    function bindHover(root) {
      root.querySelectorAll(sel).forEach(el => {
        if (el.dataset.ch) return;
        el.dataset.ch = '1';
        el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
      });
    }
    bindHover(document);
    new MutationObserver(() => bindHover(document))
      .observe(document.body, { childList: true, subtree: true });

    // Text inputs
    document.querySelectorAll('input,textarea').forEach(el => {
      el.addEventListener('focus',  () => document.body.classList.add('cur-text'));
      el.addEventListener('blur',   () => document.body.classList.remove('cur-text'));
    });

    // Click burst
    document.addEventListener('mousedown', () => {
      document.body.classList.add('cur-click');
      burst(mx, my);
    });
    document.addEventListener('mouseup', () =>
      document.body.classList.remove('cur-click'));

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0'; ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1'; ring.style.opacity = '1';
    });
  }

  /* ── 2. CURSOR TRAIL PARTICLES ──────────────────────────── */
  const COLS = ['#6366f1','#a855f7','#3b82f6','#22c55e','#f97316','#ec4899'];
  let lpx = 0, lpy = 0, pi = 0;

  document.addEventListener('mousemove', e => {
    const d = Math.hypot(e.clientX - lpx, e.clientY - lpy);
    if (d < 20) return;
    lpx = e.clientX; lpy = e.clientY;
    trail(e.clientX, e.clientY);
  });

  function trail(x, y) {
    const p = document.createElement('div');
    p.className = 'cursor-particle';
    const s = Math.random() * 5 + 3;
    p.style.cssText = `width:${s}px;height:${s}px;left:${x}px;top:${y}px;` +
      `background:${COLS[pi++ % COLS.length]};` +
      `animation-duration:${Math.random() * 400 + 500}ms`;
    document.body.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  }

  function burst(x, y) {
    for (let i = 0; i < 10; i++) setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'cursor-particle';
      const s = Math.random() * 7 + 4;
      p.style.cssText =
        `width:${s}px;height:${s}px;` +
        `left:${x + (Math.random() - .5) * 36}px;` +
        `top:${y  + (Math.random() - .5) * 36}px;` +
        `background:${COLS[i % COLS.length]};animation-duration:750ms`;
      document.body.appendChild(p);
      p.addEventListener('animationend', () => p.remove());
    }, i * 28);
  }

  /* ── 3. SCROLL PROGRESS BAR ─────────────────────────────── */
  function initScrollBar() {
    const bar = document.createElement('div');
    bar.id = 'scrollBar';
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
      const pct = window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight) * 100;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ── 4. STAT NUMBER COUNT-UP ────────────────────────────── */
  function initCountUp() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        obs.unobserve(e.target);
        countUp(e.target);
      });
    }, { threshold: 0.6 });

    function watch() {
      document.querySelectorAll('.stat-value').forEach(el => {
        if (!el.dataset.observed) { el.dataset.observed = '1'; obs.observe(el); }
      });
    }
    watch();
    new MutationObserver(watch).observe(document.body, { childList: true, subtree: true });
  }

  function countUp(el) {
    const raw    = el.textContent.trim();
    const suffix = raw.replace(/[\d.]/g, '');
    const target = parseFloat(raw.replace(/[^\d.]/g, '')) || 0;
    const steps  = 55, ms = 1800 / steps;
    let frame = 0;
    const t = setInterval(() => {
      frame++;
      const prog = 1 - Math.pow(1 - frame / steps, 3);
      el.textContent = Math.floor(target * prog) + suffix;
      el.classList.add('num-tick');
      setTimeout(() => el.classList.remove('num-tick'), 120);
      if (frame >= steps) { clearInterval(t); el.textContent = raw; }
    }, ms);
  }

  /* ── 5. SKILL BARS — VIEWPORT TRIGGER ──────────────────── */
  function initSkillBars() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        obs.unobserve(e.target);
        e.target.querySelectorAll('.skill-progress').forEach((bar, i) => {
          if (bar.dataset.done) return;
          bar.dataset.done = '1';
          setTimeout(() => {
            bar.style.width = bar.dataset.width || bar.getAttribute('data-width') || '0%';
            // animate pct text
            const pctEl = bar.closest('.skill-item')
              ?.querySelector('.skill-pct');
            if (pctEl) animatePct(pctEl);
          }, i * 110);
        });
      });
    }, { threshold: 0.18 });

    function watch() {
      const s = document.getElementById('skills');
      if (s && !s.dataset.skObs) { s.dataset.skObs = '1'; obs.observe(s); }
    }
    watch();
    new MutationObserver(watch).observe(document.body, { childList: true, subtree: true });
  }

  function animatePct(el) {
    const target = parseInt(el.textContent) || 0;
    let cur = 0; const steps = 50, ms = 1400 / steps;
    el.classList.add('counting');
    const t = setInterval(() => {
      cur++;
      el.textContent = Math.round(target * (1 - Math.pow(1 - cur / steps, 3))) + '%';
      if (cur >= steps) { clearInterval(t); el.textContent = target + '%'; el.classList.remove('counting'); }
    }, ms);
  }

  /* ── 6. CIRCULAR SKILL METER ON HOVER ──────────────────── */
  function initSkillMeters() {
    function bind() {
      document.querySelectorAll('.skill-item').forEach(item => {
        if (item.dataset.meter) return;
        item.dataset.meter = '1';
        const bar = item.querySelector('.skill-progress');
        if (!bar) return;
        const lvl = parseInt(bar.dataset.width || '0');
        const R = 16, C = 2 * Math.PI * R;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '40'); svg.setAttribute('height', '40');
        svg.setAttribute('viewBox', '0 0 40 40');
        svg.style.cssText =
          'position:absolute;right:-46px;top:50%;transform:translateY(-50%);' +
          'pointer-events:none;opacity:0;transition:opacity .28s;z-index:10';

        const bg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        bg.setAttribute('cx','20');bg.setAttribute('cy','20');bg.setAttribute('r',String(R));
        bg.setAttribute('fill','none');bg.setAttribute('stroke','#e5e7eb');bg.setAttribute('stroke-width','3.5');

        const arc = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        arc.setAttribute('cx','20');arc.setAttribute('cy','20');arc.setAttribute('r',String(R));
        arc.setAttribute('fill','none');arc.setAttribute('stroke','#6366f1');arc.setAttribute('stroke-width','3.5');
        arc.setAttribute('stroke-linecap','round');
        arc.style.strokeDasharray  = String(C);
        arc.style.strokeDashoffset = String(C);
        arc.style.transform = 'rotate(-90deg)'; arc.style.transformOrigin = '50% 50%';
        arc.style.transition = 'stroke-dashoffset 1s cubic-bezier(.22,1,.36,1)';

        const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        txt.setAttribute('x','50%');txt.setAttribute('y','50%');
        txt.setAttribute('text-anchor','middle');txt.setAttribute('dominant-baseline','middle');
        txt.setAttribute('font-size','8');txt.setAttribute('font-weight','700');
        txt.setAttribute('fill','#6366f1');txt.setAttribute('font-family','JetBrains Mono,monospace');
        txt.textContent = lvl + '%';

        svg.appendChild(bg); svg.appendChild(arc); svg.appendChild(txt);
        item.style.position = 'relative';
        item.appendChild(svg);

        let filled = false;
        item.addEventListener('mouseenter', () => {
          svg.style.opacity = '1';
          if (!filled) {
            filled = true;
            requestAnimationFrame(() => {
              arc.style.strokeDashoffset = String(C - lvl / 100 * C);
            });
          }
        });
        item.addEventListener('mouseleave', () => { svg.style.opacity = '0'; });
      });
    }
    setTimeout(bind, 400);
    new MutationObserver(() => setTimeout(bind, 120))
      .observe(document.body, { childList: true, subtree: true });
  }

  /* ── 7. CITATION COUNT-UP ───────────────────────────────── */
  function initCitations() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.cite-num').forEach(el => {
          if (el.dataset.done) return;
          el.dataset.done = '1';
          const v = parseInt(el.textContent) || 0;
          let c = 0; const steps = 40, ms = 900 / steps;
          const t = setInterval(() => {
            c++;
            el.textContent = Math.round(v * (1 - Math.pow(1 - c / steps, 2)));
            if (c >= steps) { clearInterval(t); el.textContent = v; }
          }, ms);
        });
        obs.unobserve(e.target);
      });
    }, { threshold: 0.3 });

    function watch() {
      document.querySelectorAll('.research-item').forEach(el => {
        if (!el.dataset.citObs) { el.dataset.citObs = '1'; obs.observe(el); }
      });
    }
    watch();
    new MutationObserver(watch).observe(document.body, { childList: true, subtree: true });
  }

  /* ── 8. MAGNETIC NAV ────────────────────────────────────── */
  function initMagnetic() {
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r  = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) * 0.32;
        const dy = (e.clientY - (r.top  + r.height / 2)) * 0.32;
        btn.style.transform = `translate(${dx}px,${dy}px) scale(1.12)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ── 9. 3-D CARD TILT ───────────────────────────────────── */
  function initTilt() {
    const configs = [
      { sel: '.stat-card',     deg: 9  },
      { sel: '.project-card',  deg: 7  },
      { sel: '.skill-card',    deg: 6  },
      { sel: '.research-item', deg: 4  },
    ];
    function bind() {
      configs.forEach(({ sel, deg }) => {
        document.querySelectorAll(sel).forEach(card => {
          if (card.dataset.tilt) return;
          card.dataset.tilt = '1';
          card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width  - .5;
            const y = (e.clientY - r.top)  / r.height - .5;
            card.style.transition = 'transform .08s';
            card.style.transform  =
              `perspective(700px) rotateX(${-y*deg}deg) rotateY(${x*deg}deg) translateY(-5px) scale(1.02)`;
          });
          card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform .5s var(--ease)';
            card.style.transform  = '';
          });
        });
      });
    }
    setTimeout(bind, 350);
    new MutationObserver(() => setTimeout(bind, 120))
      .observe(document.body, { childList: true, subtree: true });
  }

  /* ── 10. STAGGER CARD REVEAL ────────────────────────────── */
  function initStagger() {
    const sel = '.skill-card,.stat-card,.project-card,.research-item,' +
                '.achievement-card,.education-item,.experience-item,.contact-card';
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const cards = e.target.querySelectorAll(sel);
        cards.forEach((card, i) => {
          if (card.dataset.revealed) return;
          card.dataset.revealed = '1';
          card.style.opacity   = '0';
          card.style.transform = 'translateY(26px)';
          card.style.transition =
            `opacity .52s ${i * 75}ms var(--ease),transform .52s ${i * 75}ms var(--ease)`;
          requestAnimationFrame(() => requestAnimationFrame(() => {
            card.style.opacity   = '1';
            card.style.transform = 'none';
          }));
        });
      });
    }, { threshold: 0.06 });

    document.querySelectorAll('section').forEach(s => obs.observe(s));
  }

  /* ── 11. TYPEWRITER on profile title ───────────────────── */
  function initTypewriter() {
    const el = document.getElementById('profileTitle');
    if (!el || !el.textContent.trim()) return;
    const text = el.textContent.trim();
    el.textContent = '';
    el.style.borderRight = '2px solid rgba(255,255,255,.65)';
    el.style.animation   = 'twBlink .7s step-end infinite';

    if (!document.getElementById('twStyle')) {
      const st = document.createElement('style');
      st.id = 'twStyle';
      st.textContent =
        '@keyframes twBlink{0%,100%{border-right-color:rgba(255,255,255,.65)}50%{border-right-color:transparent}}';
      document.head.appendChild(st);
    }

    let i = 0;
    function type() {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(type, 44 + Math.random() * 28);
      } else {
        setTimeout(() => {
          el.style.borderRight = 'none';
          el.style.animation   = 'none';
        }, 1600);
      }
    }
    setTimeout(type, 950);
  }

  /* ── 12. HERO FLOATING BACKGROUND DOTS ─────────────────── */
  function initHeroDots() {
    const hero = document.querySelector('.profile-content');
    if (!hero) return;
    const style = document.createElement('style');
    style.id = 'heroDotsStyle';
    let css = '';
    for (let i = 0; i < 14; i++) {
      const tx = (Math.random() * 40 - 20).toFixed(1);
      const ty = (Math.random() * 40 - 20).toFixed(1);
      css += `@keyframes hd${i}{from{transform:translate(0,0) scale(1)}to{transform:translate(${tx}px,${ty}px) scale(1.6)}}`;
    }
    style.textContent = css;
    document.head.appendChild(style);

    for (let i = 0; i < 14; i++) {
      const d = document.createElement('div');
      const s = Math.random() * 4 + 2;
      d.style.cssText =
        `position:absolute;width:${s}px;height:${s}px;border-radius:50%;` +
        `background:rgba(255,255,255,${(Math.random()*.12+.04).toFixed(2)});` +
        `left:${(Math.random()*96).toFixed(1)}%;top:${(Math.random()*96).toFixed(1)}%;` +
        `pointer-events:none;z-index:0;` +
        `animation:hd${i} ${(Math.random()*5+5).toFixed(1)}s ${(Math.random()*4).toFixed(1)}s ease-in-out infinite alternate`;
      hero.appendChild(d);
    }
  }

  /* ── INIT ───────────────────────────────────────────────── */
  function run() {
    initCursor();
    initScrollBar();
    initCountUp();
    initSkillBars();
    initCitations();
    initMagnetic();
    initTilt();
    initStagger();
    initTypewriter();
    initHeroDots();
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', run);
  else run();

})();
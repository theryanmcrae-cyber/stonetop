/* Stonetop Character Builder — app logic */
(function () {
  "use strict";

  // ---- State ----
  var STEPS = [
    "Playbook", "Name & Look", "Stats", "Background",
    "Instinct", "Moves", "Gear", "Details", "Connections", "Your Sheet"
  ];

  var ch = blankCharacter();
  var step = 0;

  function blankCharacter() {
    return {
      playbook: null,        // id
      name: "", pronouns: "",
      origin: "", originName: "",
      appearance: [],        // index per line -> string
      stats: { STR: null, DEX: null, CON: null, INT: null, WIS: null, CHA: null },
      background: null,      // name
      instinct: null,        // name
      groupMoves: {},        // groupIndex -> [names]
      chosenMoves: [],       // free-choice names
      gearGroups: {},        // groupIndex -> [names]
      gearOptions: [],       // names
      featurePicks: {},      // "fi-pi" -> [values]; "fi-line-li" -> value; "fi-notes" -> str
      connectionNotes: "",
      bondsNotes: "",
      notes: ""
    };
  }

  function pb() { return ch.playbook ? PLAYBOOKS[ch.playbook] : null; }
  function statArrayFor(p) { return (p && p.statArray) ? p.statArray : RULES.statArray; }
  function fmtMod(n) { return (n >= 0 ? "+" + n : "" + n); }
  function el(id) { return document.getElementById(id); }
  function esc(s) { return (s == null ? "" : String(s)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  // Background-granted move names (parse "A, B")
  function grantedMoveNames() {
    var p = pb(); if (!p || !ch.background) return [];
    var bg = p.backgrounds.find(function (b) { return b.name === ch.background; });
    if (!bg || !bg.grantsMove) return [];
    return bg.grantsMove.split(",").map(function (s) { return s.trim(); });
  }

  // All moves a character currently has (defaults + group + granted + chosen)
  function takenMoveNames() {
    var p = pb(); if (!p) return [];
    var set = [];
    (p.defaultMoves || []).forEach(function (n) { set.push(n); });
    Object.keys(ch.groupMoves).forEach(function (k) { (ch.groupMoves[k] || []).forEach(function (n) { set.push(n); }); });
    grantedMoveNames().forEach(function (n) { set.push(n); });
    ch.chosenMoves.forEach(function (n) { set.push(n); });
    // dedupe
    return set.filter(function (n, i) { return set.indexOf(n) === i; });
  }

  // Is a move pickable as a free choice at character creation?
  function availableAtCreation(move, taken) {
    if (!move.req) return true;
    var tokens = move.req.split(",").map(function (s) { return s.trim(); });
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i].toLowerCase();
      if (t.indexOf("level") !== -1) return false;       // advanced moves
      if (t.indexOf("marks in") !== -1) return false;
      if (t.indexOf("str ") !== -1 || t.indexOf("strength") !== -1) {
        // stat requirement, e.g. "STR +2 or higher"
        if (ch.stats.STR == null || ch.stats.STR < 2) return false;
        continue;
      }
      // otherwise treat as a move-name dependency (may contain "or")
      var opts = tokens[i].split(/\bor\b/i).map(function (s) { return s.trim(); });
      var ok = opts.some(function (name) { return taken.indexOf(name) !== -1; });
      if (!ok) return false;
    }
    return true;
  }

  // ---- Rendering ----
  function renderStepper() {
    var ul = el("stepper");
    ul.innerHTML = "";
    STEPS.forEach(function (label, i) {
      var li = document.createElement("li");
      li.textContent = (i + 1) + ". " + label;
      if (i === step) li.className = "active";
      else if (i < step) li.className = "done";
      // locked if no playbook chosen yet (can't skip ahead)
      if (i > 0 && !ch.playbook) { li.className += " locked"; }
      li.onclick = function () {
        if (i === 0 || ch.playbook) { step = i; render(); }
      };
      ul.appendChild(li);
    });
  }

  function render() {
    renderStepper();
    var panel = el("panel");
    panel.innerHTML = "";
    switch (STEPS[step]) {
      case "Playbook": renderPlaybook(panel); break;
      case "Name & Look": renderNameLook(panel); break;
      case "Stats": renderStats(panel); break;
      case "Background": renderBackground(panel); break;
      case "Instinct": renderInstinct(panel); break;
      case "Moves": renderMoves(panel); break;
      case "Gear": renderGear(panel); break;
      case "Details": renderDetails(panel); break;
      case "Connections": renderConnections(panel); break;
      case "Your Sheet": renderSheet(panel); break;
    }
    renderNav();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderNav() {
    var nav = el("nav");
    nav.innerHTML = "";
    var back = document.createElement("button");
    back.className = "btn ghost";
    back.textContent = "← Back";
    back.disabled = step === 0;
    back.onclick = function () { if (step > 0) { step--; render(); } };
    nav.appendChild(back);

    if (step < STEPS.length - 1) {
      var next = document.createElement("button");
      next.className = "btn";
      next.textContent = "Next →";
      next.disabled = !canAdvance();
      next.onclick = function () { if (canAdvance()) { step++; render(); } };
      nav.appendChild(next);
    } else {
      var done = document.createElement("button");
      done.className = "btn";
      done.textContent = "Print / Save PDF";
      done.onclick = function () { window.print(); };
      nav.appendChild(done);
    }
  }

  function canAdvance() {
    switch (STEPS[step]) {
      case "Playbook": return !!ch.playbook;
      case "Stats": return statsValid();
      case "Background": return !!ch.background;
      case "Instinct": return !!ch.instinct;
      default: return true;
    }
  }

  // ---- Step: Playbook ----
  function renderPlaybook(panel) {
    panel.innerHTML =
      '<h2 class="step-title">Choose your Playbook</h2>' +
      '<p class="step-intro">' + esc(RULES.intro) + "</p>" +
      '<div class="pb-grid" id="pbgrid"></div>';
    var grid = el("pbgrid");
    Object.keys(PLAYBOOKS).forEach(function (id) {
      var p = PLAYBOOKS[id];
      var card = document.createElement("div");
      card.className = "pb-card" + (ch.playbook === id ? " selected" : "");
      card.innerHTML =
        "<h3>" + esc(p.name) + "</h3>" +
        '<div class="blurb">' + esc(p.blurb) + "</div>" +
        '<div class="stat-line">Damage ' + esc(p.damage) + " &middot; Max HP " + p.maxHP + "</div>";
      card.onclick = function () {
        if (ch.playbook !== id) {
          // changing playbook resets dependent choices
          var keepName = ch.name, keepPron = ch.pronouns;
          ch = blankCharacter();
          ch.name = keepName; ch.pronouns = keepPron;
          ch.playbook = id;
        }
        render();
      };
      grid.appendChild(card);
    });
  }

  // ---- Step: Name & Look ----
  function renderNameLook(panel) {
    var p = pb();
    var h = '<h2 class="step-title">Name &amp; Look</h2>';
    h += '<div class="tagline-box">' + esc(p.tagline) + "</div>";
    h += '<div class="row2">';
    h += '<div class="field"><label class="lbl">Character name</label>' +
         '<input type="text" id="f-name" value="' + esc(ch.name) + '" placeholder="What are you called?"></div>';
    h += '<div class="field"><label class="lbl">Pronouns</label>' +
         '<input type="text" id="f-pron" value="' + esc(ch.pronouns) + '" placeholder="she/her, he/him, they/them…"></div>';
    h += "</div>";

    // Origin
    h += '<div class="field"><label class="lbl">Place of origin</label>';
    h += '<p class="hint">' + esc(p.names.intro) + "</p>";
    h += '<div class="choices" id="origins"></div></div>';
    h += '<div class="field"><label class="lbl">Suggested names</label>' +
         '<div class="badge-list" id="namesugs"><span class="muted">Pick an origin to see suggested names.</span></div>' +
         '<div style="margin-top:8px"><input type="text" id="f-oname" value="' + esc(ch.originName) + '" placeholder="(your chosen name detail / family origin)"></div></div>';

    // Appearance
    h += '<div class="field"><label class="lbl">Appearance</label>' +
         '<p class="hint">Choose one on each line, or make something up.</p>' +
         '<div id="appearance"></div></div>';

    panel.innerHTML = h;

    el("f-name").oninput = function () { ch.name = this.value; };
    el("f-pron").oninput = function () { ch.pronouns = this.value; };
    el("f-oname").oninput = function () { ch.originName = this.value; };

    var ob = el("origins");
    p.names.places.forEach(function (place) {
      var c = document.createElement("label");
      c.className = "choice" + (ch.origin === place.name ? " checked" : "");
      c.innerHTML = '<input type="radio" name="origin" ' + (ch.origin === place.name ? "checked" : "") + ">" +
        '<div class="c-body"><div class="c-name">' + esc(place.name) + "</div></div>";
      c.querySelector("input").onchange = function () { ch.origin = place.name; render(); };
      ob.appendChild(c);
    });
    if (ch.origin) {
      var place = p.names.places.find(function (x) { return x.name === ch.origin; });
      if (place) {
        el("namesugs").innerHTML = place.names.map(function (n) {
          return '<span class="badge">' + esc(n) + "</span>";
        }).join("");
      }
    }

    var ap = el("appearance");
    p.appearance.forEach(function (line, li) {
      var box = document.createElement("div");
      box.className = "choices";
      box.style.gridAutoFlow = "column";
      box.style.gridTemplateColumns = "repeat(auto-fit, minmax(120px, 1fr))";
      box.style.marginBottom = "8px";
      line.forEach(function (opt) {
        var c = document.createElement("label");
        var sel = ch.appearance[li] === opt;
        c.className = "choice" + (sel ? " checked" : "");
        c.style.padding = "7px 10px";
        c.innerHTML = '<input type="radio" name="ap' + li + '" ' + (sel ? "checked" : "") + ">" +
          '<div class="c-body"><div class="c-name" style="font-weight:normal">' + esc(opt) + "</div></div>";
        c.querySelector("input").onchange = function () { ch.appearance[li] = opt; render(); };
        box.appendChild(c);
      });
      ap.appendChild(box);
    });
  }

  // ---- Step: Stats ----
  function statsValid() {
    var p = pb(); if (!p) return false;
    var arr = statArrayFor(p).slice().sort();
    var vals = ["STR", "DEX", "CON", "INT", "WIS", "CHA"].map(function (k) { return ch.stats[k]; });
    if (vals.some(function (v) { return v == null; })) return false;
    var sorted = vals.slice().sort();
    return JSON.stringify(arr) === JSON.stringify(sorted);
  }

  function renderStats(panel) {
    var p = pb();
    var arr = statArrayFor(p);
    var note = p.statArrayNote ||
      ("Assign these scores, one to each stat: " + arr.map(fmtMod).join(", ") + ".");
    var h = '<h2 class="step-title">Assign your Stats</h2>';
    h += '<p class="step-intro">' + esc(note) +
         ' When a debility is marked, you roll with disadvantage in that stat.</p>';

    // pool display
    var used = {};
    ["STR", "DEX", "CON", "INT", "WIS", "CHA"].forEach(function (k) {
      if (ch.stats[k] != null) used[k] = ch.stats[k];
    });
    h += '<div class="pool" id="pool"></div>';
    h += '<div class="stat-grid" id="statgrid"></div>';
    panel.innerHTML = h;

    drawPool();
    var grid = el("statgrid");
    RULES.stats.forEach(function (s) {
      var cell = document.createElement("div");
      cell.className = "stat-cell";
      var optHtml = '<option value="">—</option>';
      // unique values available
      uniqueVals(arr).forEach(function (v) {
        optHtml += '<option value="' + v + '" ' + (ch.stats[s.key] === v ? "selected" : "") + ">" + fmtMod(v) + "</option>";
      });
      cell.innerHTML =
        '<div class="s-name">' + esc(s.name) + "</div>" +
        '<div class="s-key">(' + s.key + ")</div>" +
        "<select data-k='" + s.key + "'>" + optHtml + "</select>" +
        '<div class="deb">debility: ' + esc(s.debility) + "</div>";
      cell.querySelector("select").onchange = function () {
        var v = this.value === "" ? null : parseInt(this.value, 10);
        ch.stats[s.key] = v;
        render();
      };
      grid.appendChild(cell);
    });
  }

  function uniqueVals(arr) {
    var seen = []; arr.forEach(function (v) { if (seen.indexOf(v) === -1) seen.push(v); });
    return seen.sort(function (a, b) { return b - a; });
  }

  function drawPool() {
    var p = pb(); var arr = statArrayFor(p).slice().sort(function (a, b) { return b - a; });
    var assigned = ["STR", "DEX", "CON", "INT", "WIS", "CHA"].map(function (k) { return ch.stats[k]; })
      .filter(function (v) { return v != null; });
    // build a pool subtracting assigned (multiset)
    var remaining = arr.slice();
    var assignedCopy = assigned.slice();
    var html = '<span class="muted">Score pool:</span> ';
    arr.forEach(function (v) {
      var idx = assignedCopy.indexOf(v);
      var usedFlag = idx !== -1;
      if (usedFlag) assignedCopy.splice(idx, 1);
      html += '<span class="chip ' + (usedFlag ? "used" : "") + '">' + fmtMod(v) + "</span>";
    });
    if (statsValid()) html += '  <span class="counter ok">✓ all assigned</span>';
    else html += '  <span class="counter">assign each score exactly once</span>';
    el("pool").innerHTML = html;
  }

  // ---- Step: Background ----
  function renderBackground(panel) {
    var p = pb();
    var h = '<h2 class="step-title">Choose a Background</h2>' +
            '<p class="step-intro">Your background says where you came from and grants special abilities (sometimes a free move).</p>' +
            '<div class="choices" id="bgs"></div>';
    panel.innerHTML = h;
    var box = el("bgs");
    p.backgrounds.forEach(function (b) {
      var sel = ch.background === b.name;
      var c = document.createElement("label");
      c.className = "choice" + (sel ? " checked" : "");
      var grant = b.grantsMove ? '<span class="pill">grants: ' + esc(b.grantsMove) + "</span>" : "";
      c.innerHTML = '<input type="radio" name="bg" ' + (sel ? "checked" : "") + ">" +
        '<div class="c-body"><div class="c-name">' + esc(b.name) + grant + "</div>" +
        '<div class="c-text">' + esc(b.text) + "</div></div>";
      c.querySelector("input").onchange = function () {
        ch.background = b.name;
        // reset chosen moves that may no longer be valid / clear granted duplicates
        ch.chosenMoves = [];
        render();
      };
      box.appendChild(c);
    });
  }

  // ---- Step: Instinct ----
  function renderInstinct(panel) {
    var p = pb();
    var h = '<h2 class="step-title">Choose an Instinct</h2>' +
            '<p class="step-intro">Your instinct is the drive that defines you — and earns you XP when it complicates your life.</p>' +
            '<div class="choices" id="ins"></div>';
    panel.innerHTML = h;
    var box = el("ins");
    p.instincts.forEach(function (it) {
      var sel = ch.instinct === it.name;
      var c = document.createElement("label");
      c.className = "choice" + (sel ? " checked" : "");
      c.innerHTML = '<input type="radio" name="ins" ' + (sel ? "checked" : "") + ">" +
        '<div class="c-body"><div class="c-name">' + esc(it.name) + "</div>" +
        '<div class="c-text">' + esc(it.text) + "</div></div>";
      c.querySelector("input").onchange = function () { ch.instinct = it.name; render(); };
      box.appendChild(c);
    });
  }

  // ---- Step: Moves ----
  function renderMoves(panel) {
    var p = pb();
    var h = '<h2 class="step-title">Starting Moves</h2>';
    h += '<p class="step-intro">' + esc(p.startingMovesRule) + "</p>";

    // Defaults
    if (p.defaultMoves && p.defaultMoves.length) {
      h += '<div class="field"><label class="lbl">You always start with</label><div class="choices" id="mv-default"></div></div>';
    }
    // Granted by background
    var granted = grantedMoveNames();
    if (granted.length) {
      h += '<div class="field"><label class="lbl">From your background (' + esc(ch.background) + ')</label><div class="choices" id="mv-granted"></div></div>';
    }
    // OR-groups
    if (p.moveChoiceGroups && p.moveChoiceGroups.length) {
      h += '<div id="mv-groups"></div>';
    }
    // Free choices
    if (p.chooseMoves && p.chooseMoves > 0) {
      h += '<div class="field"><label class="lbl">Choose ' + p.chooseMoves + ' more move' + (p.chooseMoves > 1 ? "s" : "") +
           ' <span id="mv-count"></span></label><div class="choices" id="mv-free"></div></div>';
    }
    panel.innerHTML = h;

    function moveByName(n) { return p.moves.find(function (m) { return m.name === n; }); }
    function moveRow(m, opts) {
      opts = opts || {};
      var c = document.createElement("label");
      c.className = "choice" + (opts.checked ? " checked" : "") + (opts.disabled ? " disabled" : "");
      var type = opts.type || "checkbox";
      var input = opts.locked
        ? '<input type="checkbox" checked disabled>'
        : '<input type="' + type + '" name="' + (opts.name || "") + '" ' + (opts.checked ? "checked" : "") + (opts.disabled ? " disabled" : "") + ">";
      var reqPill = m.req ? '<span class="pill req">' + esc(m.req) + "</span>" : "";
      var lockPill = opts.locked ? '<span class="pill locked">included</span>' : "";
      c.innerHTML = input +
        '<div class="c-body"><div class="c-name">' + esc(m.name) + lockPill + reqPill + "</div>" +
        '<div class="c-text">' + esc(m.text) + "</div></div>";
      return c;
    }

    if (p.defaultMoves && p.defaultMoves.length) {
      var db = el("mv-default");
      p.defaultMoves.forEach(function (n) {
        var m = moveByName(n); if (m) db.appendChild(moveRow(m, { locked: true }));
      });
    }
    if (granted.length) {
      var gb = el("mv-granted");
      granted.forEach(function (n) {
        var m = moveByName(n);
        if (m) gb.appendChild(moveRow(m, { locked: true }));
        else { // granted move not in this playbook's list (rare) — show name only
          var c = document.createElement("label"); c.className = "choice";
          c.innerHTML = '<input type="checkbox" checked disabled><div class="c-body"><div class="c-name">' + esc(n) + ' <span class="pill locked">included</span></div></div>';
          gb.appendChild(c);
        }
      });
    }

    if (p.moveChoiceGroups && p.moveChoiceGroups.length) {
      var groupsBox = el("mv-groups");
      p.moveChoiceGroups.forEach(function (grp, gi) {
        if (!ch.groupMoves[gi]) ch.groupMoves[gi] = [];
        var wrap = document.createElement("div");
        wrap.className = "group-box";
        wrap.innerHTML = '<div class="g-label">Choose ' + grp.count + ': ' +
          grp.options.map(esc).join(" <em>or</em> ") + "</div>";
        var inner = document.createElement("div"); inner.className = "choices";
        grp.options.forEach(function (n) {
          var m = moveByName(n); if (!m) return;
          var checked = ch.groupMoves[gi].indexOf(n) !== -1;
          var single = grp.count === 1;
          var row = moveRow(m, { checked: checked, type: single ? "radio" : "checkbox", name: "grp" + gi });
          row.querySelector("input").onchange = function () {
            if (single) { ch.groupMoves[gi] = [n]; }
            else {
              var a = ch.groupMoves[gi];
              if (a.indexOf(n) !== -1) a.splice(a.indexOf(n), 1);
              else if (a.length < grp.count) a.push(n);
            }
            render();
          };
          inner.appendChild(row);
        });
        wrap.appendChild(inner);
        groupsBox.appendChild(wrap);
      });
    }

    if (p.chooseMoves && p.chooseMoves > 0) {
      var taken = takenMoveNames();
      var fb = el("mv-free");
      var cntEl = el("mv-count");
      var n = ch.chosenMoves.length;
      cntEl.innerHTML = '<span class="counter ' + (n === p.chooseMoves ? "ok" : "") + '">(' + n + "/" + p.chooseMoves + ")</span>";
      p.moves.forEach(function (m) {
        if (m.default) return;
        if (taken.indexOf(m.name) !== -1 && ch.chosenMoves.indexOf(m.name) === -1) return; // already gained elsewhere
        var avail = availableAtCreation(m, taken);
        if (!avail && ch.chosenMoves.indexOf(m.name) === -1) return; // hide non-creation moves
        var checked = ch.chosenMoves.indexOf(m.name) !== -1;
        var atMax = ch.chosenMoves.length >= p.chooseMoves;
        var row = moveRow(m, { checked: checked, disabled: (!checked && atMax) });
        row.querySelector("input").onchange = function () {
          var a = ch.chosenMoves;
          if (a.indexOf(m.name) !== -1) a.splice(a.indexOf(m.name), 1);
          else if (a.length < p.chooseMoves) a.push(m.name);
          render();
        };
        fb.appendChild(row);
      });
    }
  }

  // ---- Step: Gear ----
  function renderGear(panel) {
    var p = pb(); var g = p.gear;
    var h = '<h2 class="step-title">Special Possessions</h2>';
    h += '<p class="step-intro">' + esc(g.note) + "</p>";
    if (g.fixed && g.fixed.length) {
      h += '<div class="field"><label class="lbl">You always have</label><div class="choices" id="g-fixed"></div></div>';
    }
    if (g.groups && g.groups.length) { h += '<div id="g-groups"></div>'; }
    h += '<div class="field"><label class="lbl">Choose ' + g.pickCount +
         ' <span id="g-count"></span></label><div class="choices" id="g-options"></div></div>';
    panel.innerHTML = h;

    function gearRow(item, opts) {
      opts = opts || {};
      var c = document.createElement("label");
      c.className = "choice" + (opts.checked ? " checked" : "") + (opts.disabled ? " disabled" : "");
      var input = opts.locked ? '<input type="checkbox" checked disabled>'
        : '<input type="' + (opts.type || "checkbox") + '" name="' + (opts.name || "") + '" ' + (opts.checked ? "checked" : "") + (opts.disabled ? " disabled" : "") + ">";
      c.innerHTML = input + '<div class="c-body"><div class="c-name">' + esc(item.name) +
        (opts.locked ? ' <span class="pill locked">included</span>' : "") + "</div>" +
        (item.text ? '<div class="c-text">' + esc(item.text) + "</div>" : "") + "</div>";
      return c;
    }

    if (g.fixed && g.fixed.length) {
      var fb = el("g-fixed");
      g.fixed.forEach(function (it) { fb.appendChild(gearRow(it, { locked: true })); });
    }
    if (g.groups && g.groups.length) {
      var gb = el("g-groups");
      g.groups.forEach(function (grp, gi) {
        if (!ch.gearGroups[gi]) ch.gearGroups[gi] = [];
        var wrap = document.createElement("div"); wrap.className = "group-box";
        wrap.innerHTML = '<div class="g-label">' + esc(grp.prompt) + "</div>";
        var inner = document.createElement("div"); inner.className = "choices";
        grp.options.forEach(function (it) {
          var checked = ch.gearGroups[gi].indexOf(it.name) !== -1;
          var single = grp.count === 1;
          var row = gearRow(it, { checked: checked, type: single ? "radio" : "checkbox", name: "ggrp" + gi });
          row.querySelector("input").onchange = function () {
            if (single) ch.gearGroups[gi] = [it.name];
            else {
              var a = ch.gearGroups[gi];
              if (a.indexOf(it.name) !== -1) a.splice(a.indexOf(it.name), 1);
              else if (a.length < grp.count) a.push(it.name);
            }
            render();
          };
          inner.appendChild(row);
        });
        wrap.appendChild(inner); gb.appendChild(wrap);
      });
    }

    var ob = el("g-options");
    var n = ch.gearOptions.length;
    el("g-count").innerHTML = '<span class="counter ' + (n === g.pickCount ? "ok" : "") + '">(' + n + "/" + g.pickCount + ")</span>";
    g.options.forEach(function (it) {
      var checked = ch.gearOptions.indexOf(it.name) !== -1;
      var atMax = ch.gearOptions.length >= g.pickCount;
      var row = gearRow(it, { checked: checked, disabled: (!checked && atMax) });
      row.querySelector("input").onchange = function () {
        var a = ch.gearOptions;
        if (a.indexOf(it.name) !== -1) a.splice(a.indexOf(it.name), 1);
        else if (a.length < g.pickCount) a.push(it.name);
        render();
      };
      ob.appendChild(row);
    });
  }

  // ---- Step: Details (playbook features / questions) ----
  function renderDetails(panel) {
    var p = pb();
    var h = '<h2 class="step-title">Playbook Details</h2>';
    h += '<p class="step-intro">Flesh out the unique questions and features of ' + esc(p.name) + ".</p>";
    h += '<div id="features"></div>';
    panel.innerHTML = h;
    var box = el("features");

    (p.features || []).forEach(function (feat, fi) {
      var fdiv = document.createElement("div");
      fdiv.className = "field";
      var inner = '<label class="lbl">' + esc(feat.name) + "</label>";
      if (feat.text) inner += '<p class="hint">' + esc(feat.text) + "</p>";
      fdiv.innerHTML = inner;

      // lines (choose 1 each)
      (feat.lines || []).forEach(function (line, li) {
        var key = fi + "-line-" + li;
        var lab = document.createElement("div");
        lab.style.fontWeight = "bold";
        lab.style.margin = "10px 0 4px";
        lab.style.color = "var(--ink-soft)";
        lab.textContent = line.prompt;
        fdiv.appendChild(lab);
        var cb = document.createElement("div"); cb.className = "choices";
        cb.style.gridTemplateColumns = "repeat(auto-fit, minmax(140px,1fr))";
        line.options.forEach(function (opt) {
          var sel = ch.featurePicks[key] === opt;
          var c = document.createElement("label");
          c.className = "choice" + (sel ? " checked" : "");
          c.style.padding = "7px 10px";
          c.innerHTML = '<input type="radio" name="' + key + '" ' + (sel ? "checked" : "") + '>' +
            '<div class="c-body"><div class="c-name" style="font-weight:normal">' + esc(opt) + "</div></div>";
          c.querySelector("input").onchange = function () { ch.featurePicks[key] = opt; render(); };
          cb.appendChild(c);
        });
        fdiv.appendChild(cb);
      });

      // picks (choose N)
      (feat.picks || []).forEach(function (pick, pi) {
        var key = fi + "-pick-" + pi;
        if (!ch.featurePicks[key]) ch.featurePicks[key] = [];
        var arr = ch.featurePicks[key];
        var lab = document.createElement("div");
        lab.style.fontWeight = "bold";
        lab.style.margin = "10px 0 4px";
        lab.style.color = "var(--ink-soft)";
        lab.innerHTML = esc(pick.prompt) +
          ' <span class="counter' + (arr.length <= pick.count ? " ok" : "") + '">(' + arr.length + " of up to " + pick.count + ")</span>";
        fdiv.appendChild(lab);
        var cb = document.createElement("div"); cb.className = "choices";
        pick.options.forEach(function (opt) {
          var sel = arr.indexOf(opt) !== -1;
          var atMax = arr.length >= pick.count;
          var c = document.createElement("label");
          c.className = "choice" + (sel ? " checked" : "") + ((!sel && atMax) ? " disabled" : "");
          c.style.padding = "8px 10px";
          c.innerHTML = '<input type="checkbox" ' + (sel ? "checked" : "") + ((!sel && atMax) ? " disabled" : "") + ">" +
            '<div class="c-body"><div class="c-name" style="font-weight:normal">' + esc(opt) + "</div></div>";
          c.querySelector("input").onchange = function () {
            if (arr.indexOf(opt) !== -1) arr.splice(arr.indexOf(opt), 1);
            else if (arr.length < pick.count) arr.push(opt);
            render();
          };
          cb.appendChild(c);
        });
        fdiv.appendChild(cb);
      });

      box.appendChild(fdiv);
    });

    if (!(p.features && p.features.length)) {
      box.innerHTML = '<p class="muted">This playbook has no extra questions at this step.</p>';
    }
  }

  // ---- Step: Connections ----
  function renderConnections(panel) {
    var p = pb();
    var h = '<h2 class="step-title">Connections &amp; Introductions</h2>';
    h += '<p class="step-intro">During your first session you introduce your character and weave them into the village and the other heroes. Use these prompts as a guide, and jot down anything you want on your sheet.</p>';
    h += '<ul class="tight">';
    p.connections.forEach(function (c) { h += "<li>" + esc(c) + "</li>"; });
    h += "</ul>";
    h += '<div class="field"><label class="lbl">Bonds &amp; relationships (NPCs and other heroes)</label>' +
         '<textarea id="f-bonds" placeholder="Who is your kin? Who do you owe? Which hero do you trust?">' + esc(ch.bondsNotes) + "</textarea></div>";
    h += '<div class="field"><label class="lbl">Other notes</label>' +
         '<textarea id="f-notes" placeholder="Backstory beats, goals, anything else you want on the sheet.">' + esc(ch.notes) + "</textarea></div>";
    panel.innerHTML = h;
    el("f-bonds").oninput = function () { ch.bondsNotes = this.value; };
    el("f-notes").oninput = function () { ch.notes = this.value; };
  }

  // ---- Step: Sheet ----
  function moveTextByName(p, name) {
    var m = p.moves.find(function (x) { return x.name === name; });
    return m ? m.text : "";
  }

  function renderSheet(panel) {
    var p = pb();
    var h = "";
    h += '<div id="builder-only"><div class="toolbar">' +
      '<button class="btn small" onclick="window.print()">Print / Save as PDF</button>' +
      '<button class="btn small ghost" id="dl-json">Download character (JSON)</button>' +
      '<button class="btn small ghost" id="restart">Start over</button>' +
      "</div></div>";

    h += '<div class="sheet">';
    h += '<div class="sheet-head"><div><h2>' + esc(ch.name || "Unnamed Hero") + "</h2>" +
      (ch.pronouns ? '<span class="muted">' + esc(ch.pronouns) + "</span>" : "") +
      '</div><div class="pbname">' + esc(p.name) + "</div></div>";

    // identity
    h += "<section>";
    h += '<div class="vitals">';
    h += '<div class="vital"><b>Origin:</b> ' + esc(ch.origin || "—") + (ch.originName ? " (" + esc(ch.originName) + ")" : "") + "</div>";
    h += '<div class="vital"><b>Instinct:</b> ' + esc(ch.instinct || "—") + "</div>";
    h += '<div class="vital"><b>Background:</b> ' + esc(ch.background || "—") + "</div>";
    h += "</div>";
    if (ch.appearance.filter(Boolean).length) {
      h += '<div class="badge-list" style="margin-top:8px">' +
        ch.appearance.filter(Boolean).map(function (a) { return '<span class="badge">' + esc(a) + "</span>"; }).join("") + "</div>";
    }
    h += "</section>";

    // stats + vitals
    h += "<section><h3>Stats</h3><div class='sheet-stats'>";
    RULES.stats.forEach(function (s) {
      var v = ch.stats[s.key];
      h += '<div class="sheet-stat"><div class="v">' + (v == null ? "—" : fmtMod(v)) + '</div><div class="n">' + s.key + "</div></div>";
    });
    h += "</div>";
    h += '<div class="vitals" style="margin-top:10px">';
    h += '<div class="vital"><b>Damage:</b> ' + esc(p.damage) + "</div>";
    h += '<div class="vital"><b>Max HP:</b> ' + p.maxHP + "</div>";
    h += '<div class="vital"><b>Armor:</b> 0</div>';
    h += '<div class="vital"><b>Level:</b> 1</div>';
    h += '<div class="vital"><b>XP:</b> 0</div>';
    h += "</div></section>";

    // background detail
    var bg = p.backgrounds.find(function (b) { return b.name === ch.background; });
    if (bg) {
      h += "<section><h3>Background — " + esc(bg.name) + "</h3>";
      h += '<div class="move-item"><div class="m-text">' + esc(bg.text) + "</div></div></section>";
    }

    // moves
    var allMoves = takenMoveNames();
    h += "<section><h3>Moves</h3>";
    allMoves.forEach(function (n) {
      var txt = moveTextByName(p, n);
      h += '<div class="move-item"><div class="m-name">' + esc(n) + '</div>' +
        (txt ? '<div class="m-text">' + esc(txt) + "</div>" : '<div class="m-text muted">(from another playbook — see that playbook)</div>') + "</div>";
    });
    h += "</section>";

    // gear
    h += "<section><h3>Special Possessions</h3><ul class='tight'>";
    var gearList = [];
    (p.gear.fixed || []).forEach(function (it) { gearList.push(it.name); });
    Object.keys(ch.gearGroups).forEach(function (k) { (ch.gearGroups[k] || []).forEach(function (n) { gearList.push(n); }); });
    ch.gearOptions.forEach(function (n) { gearList.push(n); });
    if (!gearList.length) h += '<li class="muted">None chosen yet.</li>';
    gearList.forEach(function (n) {
      var item = findGear(p, n);
      h += "<li><b>" + esc(n) + "</b>" + (item && item.text ? " — " + esc(item.text) : "") + "</li>";
    });
    h += "</ul></section>";

    // details / features
    var detailHtml = renderFeatureSummary(p);
    if (detailHtml) h += "<section><h3>Details</h3>" + detailHtml + "</section>";

    // bonds / notes
    if (ch.bondsNotes) h += "<section><h3>Bonds &amp; Relationships</h3><div class='m-text'>" + esc(ch.bondsNotes).replace(/\n/g, "<br>") + "</div></section>";
    if (ch.notes) h += "<section><h3>Notes</h3><div class='m-text'>" + esc(ch.notes).replace(/\n/g, "<br>") + "</div></section>";

    h += "</div>"; // .sheet
    panel.innerHTML = h;

    el("restart").onclick = function () {
      if (confirm("Start a brand new character? Your current choices will be cleared.")) {
        ch = blankCharacter(); step = 0; render();
      }
    };
    el("dl-json").onclick = downloadJSON;
  }

  function findGear(p, name) {
    var g = p.gear;
    var all = (g.fixed || []).concat(g.options || []);
    (g.groups || []).forEach(function (grp) { all = all.concat(grp.options); });
    return all.find(function (it) { return it.name === name; });
  }

  function renderFeatureSummary(p) {
    var out = "";
    (p.features || []).forEach(function (feat, fi) {
      var bits = "";
      (feat.lines || []).forEach(function (line, li) {
        var val = ch.featurePicks[fi + "-line-" + li];
        if (val) bits += "<li>" + esc(line.prompt) + " <b>" + esc(val) + "</b></li>";
      });
      (feat.picks || []).forEach(function (pick, pi) {
        var arr = ch.featurePicks[fi + "-pick-" + pi] || [];
        if (arr.length) bits += "<li>" + esc(pick.prompt) + ": <b>" + arr.map(esc).join("; ") + "</b></li>";
      });
      if (bits) out += '<div class="move-item"><div class="m-name">' + esc(feat.name) + "</div><ul class='tight'>" + bits + "</ul></div>";
    });
    return out;
  }

  function downloadJSON() {
    var data = JSON.stringify({ playbook: ch.playbook, character: ch }, null, 2);
    var blob = new Blob([data], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = (ch.name || "stonetop-character").replace(/[^\w\-]+/g, "_") + ".json";
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 100);
  }

  // ---- Boot ----
  render();
})();

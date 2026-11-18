// Night Under the Stars — shared behaviour: the nights list, the starfield, reveal on scroll.
(function () {
  var data = window.NUTS || { NIGHTS: [], PLANNED: [] };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function arrowLink(cls, label, href) {
    var a = el('a', cls, label + ' ');
    a.href = href;
    var s = el('span', 'arrow', '→');
    s.setAttribute('aria-hidden', 'true');
    a.appendChild(s);
    return a;
  }
  function fmt(d, opts) { return d.toLocaleDateString('en-US', opts); }

  function upcomingOf(nights) {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    return (nights || [])
      .filter(function (n) { return new Date(n.date + 'T23:59:59') >= today; })
      .sort(function (a, b) { return a.date.localeCompare(b.date); });
  }

  // Fill every [data-nights] block, soonest first. data-limit="3" shows only the next three.
  // A section marked data-nights-section stays hidden while there is nothing to list.
  function renderNights(nights) {
    var upcoming = upcomingOf(nights);

    document.querySelectorAll('[data-nights]').forEach(function (block) {
      var list = block.querySelector('.nights-list');
      var section = block.closest('[data-nights-section]');
      var limit = parseInt(block.getAttribute('data-limit') || '0', 10);
      var shown = limit ? upcoming.slice(0, limit) : upcoming;
      list.textContent = '';
      if (section) section.hidden = !shown.length;

      shown.forEach(function (n) {
        var d = new Date(n.date + 'T12:00:00');
        var row = el('div', 'night');

        var main = el('div', 'night-main');
        main.appendChild(el('div', 'night-when', fmt(d, { weekday: 'long' }) + ' · ' + fmt(d, { month: 'long', day: 'numeric', year: 'numeric' })));
        var city = el('div', 'night-city', n.city);
        if (n.region) { city.appendChild(document.createTextNode(' ')); city.appendChild(el('span', 'night-region', n.region)); }
        main.appendChild(city);
        if (n.detail) main.appendChild(el('div', 'night-detail', n.detail));
        row.appendChild(main);

        var act = el('div', 'night-action');
        var a;
        if (n.soldOut) {
          act.appendChild(el('div', 'night-price', 'Full'));
          a = arrowLink('btn btn-ghost', 'Reach Out', '/contact/');
        } else if (n.link) {
          if (n.price) act.appendChild(el('div', 'night-price', n.price));
          a = arrowLink('btn btn-gold', 'Reserve', n.link + (n.link.indexOf('?') > -1 ? '&' : '?') + 'client_reference_id=' + encodeURIComponent(n.id || ''));
          a.rel = 'noopener';
          a.setAttribute('aria-label', 'Reserve a seat for ' + n.city + ', ' + fmt(d, { month: 'long', day: 'numeric' }));
        } else {
          act.appendChild(el('div', 'night-price', 'Opening soon'));
          a = arrowLink('btn btn-ghost', 'Hear First', '/contact/');
        }
        act.appendChild(a);
        row.appendChild(act);
        list.appendChild(row);
      });
    });
    renderPlanned(data.PLANNED, upcoming);
  }

  // Cities with no date yet. A city drops off this list once it has an upcoming night.
  function renderPlanned(cities, upcoming) {
    var box = document.getElementById('planned-cities');
    if (!box) return;
    var section = document.getElementById('planned');
    var dated = (upcoming || []).map(function (n) { return String(n.city).toLowerCase(); });
    var left = (cities || []).filter(function (c) {
      var name = c.toLowerCase();
      return !dated.some(function (d) { return name.indexOf(d) === 0 || d.indexOf(name) === 0; });
    });
    box.textContent = '';
    left.forEach(function (c) { box.appendChild(el('span', 'city', c)); });
    if (section) section.hidden = !left.length;
  }

  window.renderNights = renderNights;
  renderNights(data.NIGHTS);

  // starfield
  var sf = document.getElementById('starfield');
  if (sf) {
    for (var i = 0; i < 50; i++) {
      var s = el('div', 'star-tiny');
      s.style.left = Math.random() * 100 + 'vw';
      s.style.top = Math.random() * 100 + 'vh';
      s.style.animationDelay = (Math.random() * 5) + 's';
      s.style.animationDuration = (Math.random() * 3 + 4) + 's';
      sf.appendChild(s);
    }
  }

  // reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (n) { io.observe(n); });
  } else {
    items.forEach(function (n) { n.classList.add('in'); });
  }
})();

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

  // Fill every [data-nights] block. data-limit="3" shows only the next three.
  function renderNights(nights) {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var upcoming = (nights || [])
      .filter(function (n) { return new Date(n.date + 'T23:59:59') >= today; })
      .sort(function (a, b) { return a.date.localeCompare(b.date); });

    document.querySelectorAll('[data-nights]').forEach(function (block) {
      var list = block.querySelector('.nights-list');
      var empty = block.querySelector('.nights-empty');
      var limit = parseInt(block.getAttribute('data-limit') || '0', 10);
      var shown = limit ? upcoming.slice(0, limit) : upcoming;
      list.textContent = '';
      list.hidden = !shown.length;
      empty.hidden = !!shown.length;

      shown.forEach(function (n) {
        var d = new Date(n.date + 'T12:00:00');
        var row = el('div', 'night');

        var when = el('div', 'night-date');
        when.appendChild(el('span', 'night-weekday', fmt(d, { weekday: 'long' })));
        when.appendChild(el('span', 'night-day', fmt(d, { month: 'long', day: 'numeric' })));
        when.appendChild(el('span', 'night-year', String(d.getFullYear())));
        row.appendChild(when);

        var where = el('div', 'night-where');
        where.appendChild(el('div', 'night-city', n.region ? n.city + ', ' + n.region : n.city));
        if (n.detail) where.appendChild(el('div', 'night-detail', n.detail));
        row.appendChild(where);

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
  }

  function renderPlanned(cities) {
    var box = document.getElementById('planned-cities');
    if (!box) return;
    var section = document.getElementById('planned');
    box.textContent = '';
    (cities || []).forEach(function (c) { box.appendChild(el('span', 'city', c)); });
    if (section) section.hidden = !(cities && cities.length);
  }

  window.renderNights = renderNights;
  renderNights(data.NIGHTS);
  renderPlanned(data.PLANNED);

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

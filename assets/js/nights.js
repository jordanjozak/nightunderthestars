// Night Under the Stars — the schedule. This is the one file to edit when a night is added.
//
// NIGHTS: one entry per night. Pages list upcoming nights in date order and drop each one
// by itself the day after it happens. Add a night only once its city, date and price are confirmed.
//
//   {
//     id:      'phoenix-2026-12-05',          // letters, numbers, dashes; travels to Stripe as client_reference_id
//     city:    'City',
//     region:  'State',
//     date:    '2026-12-05',                  // YYYY-MM-DD, the evening it begins
//     detail:  'Arrive at dusk · location sent when you reserve',
//     price:   '$000',
//     link:    'https://buy.stripe.com/...',  // that night's Stripe Payment Link; '' shows "Opening soon"
//     soldOut: false                          // true shows "Full" and points to Contact
//   }
//
// PLANNED: cities on the map that have no date yet. Shown on the Events page as plain names.
window.NUTS = {
  NIGHTS: [],
  PLANNED: ['Phoenix', 'Tucson', 'Sedona', 'San Diego', 'Los Angeles', 'San Francisco', 'St. George · Zion', 'Austin']
};

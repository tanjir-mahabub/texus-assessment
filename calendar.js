document.addEventListener('DOMContentLoaded', function () {
  const isLeapYear = (year) => {
      return (
          (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
          (year % 100 === 0 && year % 400 === 0)
      );
  };

  const getFebDays = (year) => {
      return isLeapYear(year) ? 29 : 28;
  };

  const calendar = document.querySelector('.calendar');

  const month_names = [
      'Sausis',
      'Vasaris',
      'Kovas',
      'Balandis',
      'Gegužė',
      'Birželis',
      'Liepa',
      'Rugpjūtis',
      'Rugsėjis',
      'Spalis',
      'Lapkritis',
      'Gruodis',
  ];

  const day_names = [
      'Sekmadienis',
      'Pirmadienis',
      'Antradienis',
      'Trečiadienis',
      'Ketvirtadienis',
      'Penktadienis',
      'Šeštadienis',
  ];

  let month_picker = document.querySelector('#month-picker');
  let day_picker = document.querySelector('#day-picker');
  let prev_month = document.querySelector('#prev-month');
  let next_month = document.querySelector('#next-month');

  const generateCalendar = (month, year) => {
      let calendar_days = document.querySelector('.calendar-days');
      calendar_days.innerHTML = '';
      let days_of_month = [
          31,
          getFebDays(year),
          31,
          30,
          31,
          30,
          31,
          31,
          30,
          31,
          30,
          31,
      ];

      let currentDate = new Date();

      month_picker.innerHTML = month_names[month];
      day_picker.innerHTML = `${day_names[currentDate.getDay()]}, ${String(month + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

      let first_day = new Date(year, month);

      for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
          let day = document.createElement('div');

          if (i >= first_day.getDay()) {
              let dayNumber = i - first_day.getDay() + 1;
              day.innerHTML = dayNumber;

              if (
                  dayNumber === currentDate.getDate() &&
                  year === currentDate.getFullYear() &&
                  month === currentDate.getMonth()
              ) {
                  day.classList.add('current-date');
              } else if (
                  new Date(year, month, dayNumber) < currentDate
              ) {
                  day.classList.add('disabled');
              }
          } else {
              day.classList.add('disabled');
          }
          calendar_days.appendChild(day);
      }
  };

  let currentDate = new Date();
  let currentMonth = { value: currentDate.getMonth() };
  let currentYear = { value: currentDate.getFullYear() };
  generateCalendar(currentMonth.value, currentYear.value);

  prev_month.addEventListener('click', () => {
      if (currentMonth.value > 0) {
          --currentMonth.value;
      } else {
          currentMonth.value = 11;
          --currentYear.value;
      }
      generateCalendar(currentMonth.value, currentYear.value);
  });

  next_month.addEventListener('click', () => {
      if (currentMonth.value < 11) {
          ++currentMonth.value;
      } else {
          currentMonth.value = 0;
          ++currentYear.value;
      }
      generateCalendar(currentMonth.value, currentYear.value);
  });

  const todayShowTime = document.querySelector('.time-formate');
  const todayShowDate = document.querySelector('.date-formate');

  const currshowDate = new Date();
  const showCurrentDateOption = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
  };

  if (todayShowDate) {
      const currentDateFormate = new Intl.DateTimeFormat(
          'en-US',
          showCurrentDateOption
      ).format(currshowDate);
      todayShowDate.textContent = currentDateFormate;
  }

  if (todayShowTime) {
      setInterval(() => {
          const timer = new Date();
          const option = {
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
          };
          const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
          todayShowTime.textContent = formateTimer;
      }, 1000);
  }
});

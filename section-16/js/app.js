class CalorieTracker {
  #calorieLimit = 0;
  #totalCalories = 0;
  #meals = [];
  #workouts = [];

  constructor() {
    this.#calorieLimit = 2000;
    this.#displayCaloriesLimit();
    this.#displayCaloriesTotal();
    this.#displayCaloriesConsumed();
    this.#displayCaloriesBurned();
    this.#displayCaloriesRemainig();
    this.#displayCaloriesProgress();
  }

  //Setters
  set calorieLimit(value) {
    this.#calorieLimit = value;
  }

  set totalCalories(value) {
    this.#totalCalories = value;
  }

  //Getters
  get calorieLimit() {
    return this.#calorieLimit;
  }

  get totalCalories() {
    return this.#totalCalories;
  }

  get meals() {
    return this.#meals;
  }

  get workouts() {
    return this.#workouts;
  }

  //Methods
  //Public
  addMeal(meal) {
    this.#meals.push(meal);
    this.#totalCalories += meal.calories;
    this.#render();
    this.#displayNewMeal(meal);
  }

  addWorkout(workout) {
    this.#workouts.push(workout);
    this.#totalCalories -= workout.calories;
    this.#render();
    this.#displayNewWorkout(workout);
  }

  removeMeal(mealId) {
    const index = this.#meals.findIndex((meal) => meal.id === mealId);

    if (index !== -1) {
      const mealToRemove = this.#meals[index];
      this.#totalCalories -= mealToRemove.calories;
      this.#meals.splice(index, 1);
      this.#render();
    }
  }

  removeWorkout(workoutId) {
    const index = this.#workouts.findIndex(
      (workout) => workout.id === workoutId
    );

    if (index !== -1) {
      const workoutToRemove = this.#workouts[index];
      this.#totalCalories += workoutToRemove.calories;
      this.#workouts.splice(index, 1);
      this.#render();
    }
  }

  reset() {
    this.totalCalories = 0;
    this.#meals = [];
    this.#workouts = [];
    this.#render();
  }

  setCalorieLimit(newCalorieLimit) {
    this.calorieLimit = newCalorieLimit;
    this.#displayCaloriesLimit();
    this.#render();
  }

  //Private
  #render() {
    this.#displayCaloriesTotal();
    this.#displayCaloriesConsumed();
    this.#displayCaloriesBurned();
    this.#displayCaloriesRemainig();
    this.#displayCaloriesProgress();
  }

  #displayCaloriesTotal() {
    const totalCaloriesEl = document.querySelector('#calories-total');
    totalCaloriesEl.innerHTML = this.#totalCalories;
  }

  #displayCaloriesConsumed() {
    const caloriesConsumedEl = document.querySelector('#calories-consumed');

    const calories = this.#meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );

    caloriesConsumedEl.innerHTML = calories;
  }

  #displayCaloriesBurned() {
    const caloriesBuernedEl = document.querySelector('#calories-burned');

    const calories = this.#workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );

    caloriesBuernedEl.innerHTML = calories;
  }

  #displayCaloriesRemainig() {
    const caloriesRemainigEl = document.querySelector('#calories-remaining');
    const progressEl = document.querySelector('#calorie-progress');

    const remaining = this.#calorieLimit - this.#totalCalories;
    caloriesRemainigEl.innerHTML = remaining;

    if (remaining <= 0) {
      caloriesRemainigEl.parentElement.parentElement.classList.remove(
        'bg-light'
      );
      caloriesRemainigEl.parentElement.parentElement.classList.add('bg-danger');
      progressEl.classList.remove('bg-success');
      progressEl.classList.add('bg-danger');
    } else {
      caloriesRemainigEl.parentElement.parentElement.classList.remove(
        'bg-danger'
      );
      caloriesRemainigEl.parentElement.parentElement.classList.add('bg-light');
      progressEl.classList.remove('bg-danger');
      progressEl.classList.add('bg-success');
    }
  }

  #displayCaloriesLimit() {
    const calorieLimitEl = document.querySelector('#calories-limit');
    calorieLimitEl.innerHTML = this.#calorieLimit;
  }

  #displayCaloriesProgress() {
    const progressEl = document.querySelector('#calorie-progress');
    const percentage = (this.totalCalories / this.calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
  }

  #displayNewMeal(meal) {
    const mealsEl = document.querySelector('#meal-items');
    mealsEl.appendChild(this.#createNewCard(meal));
  }

  #displayNewWorkout(workout) {
    const workoutsEl = document.querySelector('#workout-items');
    workoutsEl.appendChild(this.#createNewCard(workout));
  }

  #createNewCard(dataEl) {
    const card = document.createElement('div');
    const cardTemplate = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${dataEl.name}</h4>
          <div
            class="fs-1  text-white text-center rounded-2 px-2 px-sm-5 ${
              dataEl instanceof Meal ? 'bg-primary' : 'bg-secondary'
            }"
          >
            ${dataEl.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `;

    card.classList.add('card', 'my-2');
    card.setAttribute('data-id', dataEl.id);
    card.innerHTML = cardTemplate;
    return card;
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class App {
  #tracker = null;

  constructor() {
    this.#tracker = new CalorieTracker();
    document
      .querySelector('#meal-form')
      .addEventListener('submit', this.#newItem.bind(this, 'meal'));
    document
      .querySelector('#workout-form')
      .addEventListener('submit', this.#newItem.bind(this, 'workout'));
    document
      .querySelector('#meal-items')
      .addEventListener('click', this.#clickHandler.bind(this, 'meal'));
    document
      .querySelector('#workout-items')
      .addEventListener('click', this.#clickHandler.bind(this, 'workout'));
    document
      .querySelector('#filter-meals')
      .addEventListener('keyup', this.#filterItems.bind(this, 'meal'));
    document
      .querySelector('#filter-workouts')
      .addEventListener('keyup', this.#filterItems.bind(this, 'workout'));
    document
      .querySelector('#reset')
      .addEventListener('click', this.#reset.bind(this));
    document
      .querySelector('#limit-form')
      .addEventListener('submit', this.#setLimit.bind(this));
  }

  //.bind() argument comes first than evt.
  #newItem(type, e) {
    e.preventDefault();

    const name = document.querySelector(`#${type}-name`);
    const calories = document.querySelector(`#${type}-calories`);

    if (name.value === '' || calories.value === '') {
      alert('Please fill all fields');
      //use return to get out of the fcn if fields are empty
      return;
    }

    if (type === 'meal') {
      this.#tracker.addMeal(new Meal(name.value, +calories.value));
      this.#toggleEnabledFilter(type);
    } else {
      this.#tracker.addWorkout(new Workout(name.value, +calories.value));
      this.#toggleEnabledFilter(type);
    }

    name.value = '';
    calories.value = '';

    new bootstrap.Collapse(document.querySelector(`#collapse-${type}`), {
      toggle: true,
    });
  }

  #clickHandler(type, e) {
    if (
      e.target.classList.contains('delete') ||
      e.target.classList.contains('fa-xmark')
    ) {
      const cardToRemove = e.target.closest('.card');
      const id = cardToRemove.dataset.id;

      type === 'meal'
        ? this.#tracker.removeMeal(id)
        : this.#tracker.removeWorkout(id);

      cardToRemove.remove();

      //Filter validation
      if (document.querySelectorAll(`#${type}-items .card`).length === 0) {
        this.#toggleEnabledFilter(type);
      }
    }
  }

  #toggleEnabledFilter(type) {
    const filter = document.querySelector(`#filter-${type}s`);
    filter.toggleAttribute('disabled');
  }

  #disableAllFilters() {
    //using Substring matching attribute selectors
    const filters = document.querySelectorAll(`input[id^=filter]`);
    filters.forEach((filter) => {
      filter.value = '';
      filter.disabled = true;
    });
  }

  #filterItems(type, e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-items .card`).forEach((card) => {
      const name =
        card.firstElementChild.firstElementChild.textContent.toLowerCase();
      if (name.indexOf(text) !== -1) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  #reset() {
    this.#tracker.reset();
    document.querySelector('#meal-items').innerHTML = '';
    document.querySelector('#workout-items').innerHTML = '';
    this.#disableAllFilters();
  }

  #setLimit(e) {
    e.preventDefault();
    const limit = document.querySelector('#limit');
    if (limit === '') {
      alert('Please add a correct value.');
      return;
    }
    this.#tracker.setCalorieLimit(+limit.value);
    limit.value = '';

    //close modal
    bootstrap.Modal.getInstance(document.querySelector('#limit-modal')).hide();
  }
}

const app = new App();

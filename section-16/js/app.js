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
  }

  addWorkout(workout) {
    this.#workouts.push(workout);
    this.#totalCalories -= workout.calories;
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

const tracker = new CalorieTracker();
tracker.addMeal(new Meal('breakfast', 400));
tracker.addMeal(new Meal('breakfast', 3750));
tracker.addWorkout(new Workout('run', 320));

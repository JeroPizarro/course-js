import Storage from './Storage';
import { Meal, Workout } from './Item.js';

class CalorieTracker {
  #calorieLimit = 0;
  #totalCalories = 0;
  #meals = [];
  #workouts = [];

  constructor() {
    this.#calorieLimit = Storage.getCalorieLimit();
    this.#totalCalories = Storage.getTotalCalories();
    this.#meals = Storage.getMeals();
    this.#workouts = Storage.getWorkouts();
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

  loadItems() {
    this.#meals.forEach((meal) => this.#displayNewMeal(meal));

    this.#workouts.forEach((workout) => this.#displayNewWorkout(workout));
  }

  addMeal(meal) {
    this.#meals.push(meal);
    this.#totalCalories += meal.calories;
    Storage.saveMeal(meal);
    Storage.setTotalCalories(this.#totalCalories);
    this.#render();
    this.#displayNewMeal(meal);
  }

  addWorkout(workout) {
    this.#workouts.push(workout);
    this.#totalCalories -= workout.calories;
    Storage.saveWorkout(workout);
    Storage.setTotalCalories(this.#totalCalories);
    this.#render();
    this.#displayNewWorkout(workout);
  }

  removeMeal(mealId) {
    const index = this.#meals.findIndex((meal) => meal.id === mealId);

    if (index !== -1) {
      const mealToRemove = this.#meals[index];
      this.#totalCalories -= mealToRemove.calories;
      Storage.setTotalCalories(this.#totalCalories);
      Storage.removeMeal(mealId);
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
      Storage.setTotalCalories(this.#totalCalories);
      Storage.removeWorkout(workoutId);
      this.#workouts.splice(index, 1);
      this.#render();
    }
  }

  reset() {
    this.totalCalories = 0;
    this.#meals = [];
    this.#workouts = [];
    Storage.clearAll();
    this.#render();
  }

  setCalorieLimit(newCalorieLimit) {
    this.calorieLimit = newCalorieLimit;
    Storage.setCalorieLimit(newCalorieLimit);
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
              //TODO Refactor
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

export default CalorieTracker;

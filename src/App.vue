<template>
<div id="app" @keydown.esc="closeForm">
  <div class="header">
    <div id="nav">
      <router-link to="/">All Recipes</router-link>
      <router-link to="/breakfast">Breakfast</router-link>
      <router-link to="/dinner">Dinner</router-link>
      <router-link to="/dessert">Dessert</router-link>
      <router-link v-if="user" to="/create">New Recipe</router-link>
      <router-link v-if="user" to="/edit">Edit Recipes</router-link>
    </div>
    <div id="login">
      <p v-if="user">Welcome {{user.username}}<br><a href="/" @click="logout">Logout</a></p>
    <p v-else><a href="#" @click="toggleForm">Register or Login</a></p>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <transition v-if="showForm" name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <h1 class="modal-title">Register or Login</h1>
            </div>
            <div class="modal-body">
              <p v-if="error" class="error">{{error}}</p>
              <label>Username</label>
              <br>
              <input v-model="username">
              <br>
              <label>Password</label>
              <br>
              <input type="password" v-model="password">
            </div>
            <div class="modal-footer">
              <button @click="register" type="button">Register</button>
              <button @click="login" type="button" class="other">Login</button>
              <button @click="toggleForm" type="button" class="close">Close</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <footer>
      <a href="https://github.com/kristineparish/recipesApp">GitHub Repo</a>
    </footer>
</div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'login',
    data() {
      return {
        showForm: false,
        user: null,
        username: '',
        password: '',
        error: '',
      }
    },
    created() {
      this.getUser();
    },
    methods: {
      toggleForm() {
        this.error = "";
        this.username = "";
        this.password = "";
        this.showForm = !this.showForm;
      },
      async register() {
        this.error = "";
        try {
          let response = await axios.post("/api/users", {
            username: this.username,
            password: this.password
          });
          this.user = response.data;
          // close the dialog
          this.toggleForm();
        }
        catch (error) {
          this.error = error.response.data.message;
        }
      },
      async login() {
        this.error = "";
        try {
          let response = await axios.post("/api/users/login", {
            username: this.username,
            password: this.password
          });
          this.user = response.data;
          // close the dialog
          this.toggleForm();
        }
        catch (error) {
          this.error = error.response.data.message;
        }
      },
      async logout() {
        try {
          let response = await axios.delete("/api/users");
          this.user = null;
        }
        catch (error) {
          // don't worry about it
        }
      },
      async getUser() {
        try {
          let response = await axios.get("/api/users");
          this.user = response.data;
        }
        catch (error) {
          // Not logged in. That's OK!
        }
      },
      closeForm() {
        this.showForm = false;
      },
    }
  }
</script>

<style>
  body {
    margin: 0px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .header {
    display: flex;
    justify-content: space-between;
    background: #6b0144;
    color: white;
  }

  #nav {
    display: flex;
    flex-grow: 7;
    flex-basis: 0;
  }

  #nav a {
    flex-basis: 0;
    flex-grow: 1;
    font-weight: bold;
    text-decoration: none;
    color: #fff;
    padding: 20px;
  }
  
  #nav a:hover {
    background-color: #880257;
  }

  router-link {
    padding: 20px;
  }

  #nav a.router-link-exact-active {
    color: white;
    background-color: #ab056e;
  }
  
  #login {
    flex-basis: 0;
    flex-grow: 1;
  }

  .content {
    padding: 10px 100px;
  }

  .recipe {
    border: solid 1px #ccc;
    border-radius: 10px;
    padding: 3%;
    margin-bottom: 3%;
  }

  p {
    margin-bottom: 8px;
  }

  h6 {
    color: #aaa;
  }

  /* Login Form */

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 500px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h1 {
    margin-bottom: 30px;
    font-size: 1.5em;
  }

  .modal-body {
    margin: 0;
  }

  .modal-body input {
    margin-bottom: 20px;
    height: 30px;
  }

  .modal-footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .modal-default-button {
    float: right;
  }

  /*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  /* Ticket Form */

  textarea {
    width: 100%;
    max-width: 500px;
    height: 100px;
  }

  /* Ticket */

  .ticket {
    display: flex;
  }

  .problem {
    flex: 5;
  }

  .delete {
    flex: 1;
  }

  /* General */

  .error {
    color: #B2261C;
  }

  input,
  textarea,
  select,
  button {
    font-family: 'Arimo', sans-serif;
    font-size: 1em;
  }

  button {
    border: none;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    padding: 15px 32px;
  }

  button {
    background-color: #EE9828;
    color: white;
  }

  button:hover {
    cursor: pointer;
    background-color: #C47D21;
    color: white;
  }

  button.other {
    background-color: #5271B2;
    color: white;
  }

  button.other:hover {
    background-color: #4261A2;
    color: white;
  }

  button.close {
    background-color: #aaa;
    color: white;
  }

  button.close:hover {
    background-color: #888;
    color: white;
  }
</style>

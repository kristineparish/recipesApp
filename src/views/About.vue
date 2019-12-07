<template>
  <div class="about">
    <h1>This is an about page</h1>
    <transition>
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
  </div>
</template>

<div class="container">
    <div class="header">
      <div class="header-description">
        <h2>Welcome to</h2>
        <div class="container0">
          <h1 id="titulo1">My first</h1>
          <img id="libreta" src="../images/agenda.png" alt="imagen libreta" />
        </div>
        <div class="container1">
          <h1>ToDo Tasks</h1>
          <h4>Will help you to Keep your tasks under control!</h4>
        </div>
      </div>
    </div>
  </div>
  <div class="container2">
    <h2 class="header-title">Log In to ToDo App</h2>
    <h3 class="header-subtitle">Start organizing your tasks!</h3>
    <form @submit.prevent="signIn" class="form-sign-in">
      <div class="form">
        <div class="form-input">
          <label class="input-field-label">E-mail</label>
          <input
            type="email"
            class="input-field"
            placeholder="example@gmail.com"
            id="email"
            v-model="email"
            required
          />
        </div>
        <div class="form-input">
          <label class="input-field-label">Password</label>
          <input
            type="password"
            class="input-field"
            placeholder="**********"
            id="password"
            v-model="password"
            required
          />
        </div>
      </div>
      <button @click="signIn" class="button" type="submit">Sign In</button>
    </form>
    <p>
      Dont have an account?
      <PersonalRouter
        :route="route"
        :buttonText="buttonText"
        class="sign-up-link"
      />
    </p>
  </div>
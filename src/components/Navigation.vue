<template>
  <nav>
    <div class="brand">
      <h1>Micromap</h1>
      <p>A simple micro mapping tool for healthcare workers</p>
    </div>
    <div>
      <button class="secondary">Sign In</button>
      <button class="primary">Sign Up</button>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 5px;
  padding-right: 5px;
}
.brand{
  text-align: left;
}
h1{
  font-size: 26px;
}
button {
  height: 36px;
  width: 100px;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
  margin: 2.5px;
}
.primary {
  background-color: black;
  color: white;
}
.secondary {
  border-color: black;
}
</style>
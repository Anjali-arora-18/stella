<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you are looking for doesn't exist or has been moved.</p>
    <router-link to="/" class="home-link">Back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 120px;
  margin: 0;
  color: #e74c3c;
}

h2 {
  font-size: 32px;
  margin: 10px 0;
}

p {
  color: #666;
  margin-bottom: 20px;
}

.home-link {
  text-decoration: none;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.home-link:hover {
  background-color: #2980b9;
}
</style>

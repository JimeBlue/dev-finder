<template>
  <section>
    <h1>GitHub Users</h1>
    <pre> {{ users }} </pre>
  </section>
</template>
<script setup>
const { users, pending, error } = useGithubUsers()
</script>

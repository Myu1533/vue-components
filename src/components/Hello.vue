<template>
  <div class="hello">
    <ul>
      <li><router-link to="dragUpload">dragUpload</router-link></li>
      <li><router-link to="audioplay">audioplay</router-link></li>
      <li><router-link to="imgClip">dImgClip</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

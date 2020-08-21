<template>
  <div class="about">
    <h1>This is an about page</h1>
    <b-button variant="danger">Button</b-button>
  </div>
</template>
<script>
// @ is an alias to /src
import { BButton } from 'bootstrap-vue'
export default {
  name: 'About',
  components: {
    'b-button': BButton
  }
}
</script>

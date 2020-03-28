<template>
  <div class="home">
    <Navigation/>
    <div class="maps">
      <main-map></main-map>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from '@/components/Navigation.vue'
import MainMap from '@/components/MainMap.vue'

export default {
  name: 'Home',
  components: {
    Navigation,
    MainMap
    
  }
}
</script>

<template>
  <section>
    <div id="mapContainer" class="map-container">
        <div v-if="latitude =='' & longitude == ''">
            <button @click="getLocation" class="primary">Reload Map</button>
        </div>
    </div>
    <div id="toolsContainer"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      latitude: '',
      longitude: ''
    };
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    initializeMap() {
      var platform = new window.H.service.Platform({
        apikey: "v2cq2txgLz35lSTPicOEJbKO6o-cK1fO4e7HcKp5MHo"
      });
      var defaultLayers = platform.createDefaultLayers();
      new window.H.Map(
        document.getElementById("mapContainer"),

        defaultLayers.vector.normal.map,
        {
          zoom: 10,
          center: { lat: this.latitude, lng: this.longitude }
        }
      );
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      }
    },
    showPosition(position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.initializeMap();
    }
  }
};
</script>

<style scoped>
section {
  border: 1px solid teal;
  height: 100vh;
  margin: 1px;
}
.map-container {
  height: 100%;
  width: 100%;
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
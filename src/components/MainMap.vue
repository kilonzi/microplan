<template>
  <section>
    <div v-if="latitude =='' & longitude == ''">
      <button @click="getLocation" class="primary">Reload Map</button>
    </div>
    <div class="section-content">
      <div id="mapContainer" class="map-container"></div>
      <div id="toolsContainer" class="tools-container">
        <div class="toggle"></div>
        <div class="tools">
          <h5>Tools & Markers</h5>
          <div class="areas">
            <p>
              <b>Area</b>
            </p>
            <div class="shapes">
              <i class="circular large hand point up teal icon"></i>
              <div class="circle"></div>
              <div class="rectangle"></div>
            </div>
          </div>
          <div class="points">
            <p>
              <b>Markers</b>
            </p>
            <div v-for="(point,index) in pointers" :key="index">
              <div :data-wenk="point.key">
                <i :class="point.location"></i>
                <i>{{point.location}}</i>
              </div>
            </div>
          </div>
          <div class="actions">
            <button class="primary">Save</button>
            <button>Reset</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
var geolocation = require("geolocation");
export default {
  data() {
    return {
      latitude: 0,
      longitude: 0,
      language: "en-US",
      pointers: {
        "location": "plus icon",
        "hospital":"H square icon"
      }
    };
  },
  mounted() {
    this.getLocation();
    // this.initMap()
  },
  methods: {
      initMap(){
          new window.google.maps.Map(document.getElementById('mapContainer'), {
          center: {lat: this.latitude, lng: this.longitude},
          zoom: 14
        });
      },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        geolocation.getCurrentPosition(function(err, position) {
          if (err) throw err;
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.initializeMap();
        });
      }
    },
    showPosition(position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.initMap();
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
  height: 100vh;
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
.section-content {
  display: flex;
}
.tools-container {
  width: 20%;
  max-width: 250px;
  height: 100vh;
  border-left: 1px solid teal;
}
.areas {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 80px;
}
.shapes {
  display: flex;
  justify-content: space-between;
  height: 80px;
  padding: 5px;
}

.circle {
  height: 50px;
  width: 50px;
  border: 1px solid teal;
  border-radius: 50%;
}
.rectangle {
  height: 50px;
  width: 70px;
  border: 1px solid teal;
}
.tools {
  width: 100%;
}
.actions {
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: space-between;
  padding: 5px;
}
</style>
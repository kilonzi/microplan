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
          <div class="markers">
            <p>
              <b>Markers</b>
            </p>
            <div class="pointers">
              <div
                v-for="(point,index) in pointers"
                :key="index"
                :data-wenk="index"
                @click="setPointerIcon(index)"
              >
                <i :class="point"></i>
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
      currentPointer: "ResetPointer",
      pointers: {
        ResetPointer: "large square icon",
        ServicePoint: "large plus icon",
        Hospital: "large hospital icon",
        HealthFacility: "large plus square icon",
        HealthCentre: "large user md icon",
        AmbulanceStation: "large ambulance icon",
        Clinic: "large medkit icon"
      }
    };
  },
  mounted() {
    this.getLocation();
    // this.initMap()
  },
  methods: {
    setPointerIcon(pointer) {
      this.currentPointer = pointer;
    },
    initMap() {
      let map = new window.google.maps.Map(
        document.getElementById("mapContainer"),
        {
          center: { lat: this.latitude, lng: this.longitude },
          zoom: 14,
          mapTypeControl: false,
          zoomControl: true,
          scaleControl: false,
          fullscreenControl: false,
          streetViewControl: false
        }
      );
      this.addMarker(this.latitude, this.longitude, map, "HERE");
      this.addListener(map);
    },
    addListener(map) {
      let $vm = this;
      map.addListener("click", function(e) {
        let latLng = e.latLng
          .toString()
          .replace("(", "")
          .replace(")", "")
          .replace(" ", "")
          .trim()
          .split(",");
        console.log(latLng);
        $vm.setPointer(map, latLng);
      });
    },
    setPointer(map, latLng) {
      if (this.currentPointer == "ResetPointer") {
        this.currentPointer = "ResetPointer";
      } else {
        this.addMarker(
          parseFloat(latLng[0]),
          parseFloat(latLng[1]),
          map,
          this.currentPointer
        );
      }
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        geolocation.getCurrentPosition(function(err, position) {
          if (err) throw err;
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.initMap();
        });
      }
    },
    showPosition(position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.initMap();
    },
    addMarker(lat, lng, map, msg) {
      new window.google.maps.Marker({
        position: { lat, lng },
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: msg,
        draggable: true,
        label: msg
      });
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
.pointers {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 5px;
}
.pointers > * {
  margin: 2px;
}
</style>
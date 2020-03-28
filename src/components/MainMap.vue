<template>
  <section>
    <div class="section-content">
      <div id="mapContainer" class="map-container"></div>
      <div id="toolsContainer" class="tools-container">
        <div class="toggle"></div>
        <div class="tools">
          <div class="reload">
            <button @click="getLocation" class="secondary">Refresh Map</button>
          </div>
          <h5>Tools & Markers</h5>

          <div class="areas">
            <p>
              <b>Area</b>
            </p>
            <div class="shapes">
              <i
                class="circular large hand point up teal icon"
                @click="resetMarkers()"
                data-wenk="Reset"
              ></i>
              <div class="circle" @click="setAreaType('circle')" data-wenk="Circle Area"></div>
              <div class="rectangle" @click="setAreaType('rectangle')" data-wenk="Rectangle Area"></div>
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
                @click="setPointerType(index)"
                class="pointer"
              >
                <img :src="'../images/'+index+'.png'" alt class="point-image" />
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
// import Swal from 'sweetalert2'
import Vue from "vue";
import VModal from "vue-js-modal";
Vue.use(VModal);

var geolocation = require("geolocation");

export default {
  components: {},
  data() {
    return {
      latitude: 0,
      longitude: 0,
      language: "en-US",
      category: "",
      currentArea: "",
      currentPointer: "ResetPointer",
      markers: {},
      contentString: "<div><div><button>Here</button></div><div></div></div>",
      pointers: {
        ResetPointer: "large square icon",
        AmbulanceStation: "large ambulance icon",
        HealthCentre: "large user md icon",
        HealthClinic: "large medkit icon",
        HealthFacility: "large plus square icon",
        Hospital: "large hospital icon",
        LearningInstitution: "",
        MarketPlace: "",
        ServicePoint: "large plus icon",
        CrossingPoint: ""
      }
    };
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    resetMarkers() {
      this.category = "";
    },
    setAreaType(area) {
      this.currentArea = area;
      this.category = "area";
    },
    setPointerType(pointer) {
      this.currentPointer = pointer;
      this.category = "pointer";
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
        if ($vm.category == "pointer") {
          $vm.setPointer(map, latLng);
        } else if ($vm.category == "area") {
          if ($vm.currentArea == "circle") {
            $vm.addCircle(map, parseFloat(latLng[0]), parseFloat(latLng[1]));
          } else {
            $vm.addRectangle(map, parseFloat(latLng[0]), parseFloat(latLng[1]));
          }
        } else {
          $vm.resetMarkers();
        }
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
      let $vm = this
      let id = Math.floor(Math.random() * Math.floor(100000));

      var icon = {
        url: "../images/" + msg + ".png",
        scaledSize: new window.google.maps.Size(30, 30) // size
      };

      let marker = new window.google.maps.Marker({
        id: id,
        position: { lat, lng },
        map: map,
        draggable: true,
        icon: icon,
        zIndex: 10
      });

      this.markers[id] = marker;
      this.addMarkerListener(marker);

      window.google.maps.event.addListener(marker, "mouseover", function() {
        let infowindow = $vm.markerContent(marker.id)
        infowindow.open(map, this);
      });
      window.google.maps.event.addListener(marker, "mouseout", function() {
        let infowindow = $vm.markerContent(marker.id)
        infowindow.close();
      });
    },
    removeMarker(id) {
      let marker = this.markers[id];
      marker.setMap(null);
    },
    addCircle(map, lat, lng) {
      new window.google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: map,
        center: { lat, lng },
        radius: 200,
        editable: true
      });
    },
    addRectangle(map, lat, lng) {
      new window.google.maps.Rectangle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: map,
        editable: true,
        bounds: {
          north: lat + 0.002,
          south: lat - 0.002,
          east: lng + 0.002,
          west: lng - 0.002
        }
      });
    },
    addMarkerListener(marker) {
      let $vm = this;
      window.google.maps.event.addListener(marker, "click", function() {
        $vm.$modal.show("hello-world", { marker: marker.id });
      });
    },
    markerContent(marker){
      var infowindow = new window.google.maps.InfoWindow({
        content: this.contentString[marker]
      });
      return infowindow
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
  position: relative;
  height: 95vh;
}
.actions {
  display: flex;
  justify-content: space-between;
  padding: 5px;
}
.pointers {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
  height: 60vh;
}
.pointers > * {
  margin: 2px;
}
.point-image {
  height: 50px;
  width: 50px;
}
.pointer {
  width: 100px;
}
.reload {
  margin: 20px 0;
}
</style>
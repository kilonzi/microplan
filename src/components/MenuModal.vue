<template>
  <modal name="hello-world" @before-open="beforeOpen" :height="260" :width="300">
      <div>
          <p>Create a marker note</p> 
      </div>
    <div class="marker-info">
      <input type="text" placeholder="Title" />
      <textarea name="notes" id="notes" cols="30" rows="5" placeholder="Notes"></textarea>
    </div>
    <div class="actions">
      <button class="secondary">Clear</button>
      <button class="primary">Save</button>
    </div>
    <div class="cancel-action">
      <button @click="hide" class="tertiary">Cancel</button>
    </div>
  </modal>
</template>

<script>
export default {
  data() {
    return {
      marker: ""
    };
  },
  methods: {
    show() {
      this.$modal.show("hello-world");
    },
    hide() {
      this.$modal.hide("hello-world");
    },
    beforeOpen(event) {
      this.marker = event.params.marker;
    }
  }
};
</script>

<style scoped>
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
.tertiary {
  border-color: black;
  background-color: white;
  width: 100%;
}
input {
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
  margin: 5px;
  border: 1px solid black;
  height: 36px;
  padding-left: 5px;
}
textarea {
  border-radius: 5px;
  font-size: 0.8rem;
  margin: 5px;
  border: 1px solid black;
  padding-left: 5px;
}
.marker-info {
  display: flex;
  flex-direction: column;
}
.actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.cancel-action {
  display: flex;
  justify-content: center;
  align-items: center;
}
p{
    margin: 5px;
    font-weight: bold;
}
</style>
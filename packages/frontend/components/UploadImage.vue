<template>
  <section>
    <b-field>
      <b-upload v-model="dropFiles"
                multiple
                drag-drop>
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon
                icon="upload"
                size="is-large">
              </b-icon>
            </p>
            <p>Drop your files here or click to upload</p>
          </div>
        </section>
      </b-upload>
    </b-field>

    <div class="tags">
            <span v-for="(file, index) in dropFiles"
                  :key="index"
                  class="tag is-primary" >
                {{file.name}}
                <button class="delete is-small"
                        type="button"
                        @click="deleteDropFile(index)">
                </button>
            </span>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dropFiles: []
    }
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
    }
  }
}
</script>


<style lang='scss' scoped>
div.tags {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  * {
    margin-left: 1rem;
  }
}

div.field {
  display: flex;
  margin-bottom: 0 !important;
  flex: 1;
}

label.upload {
  display: flex;
  flex: 1;
}
</style>

<style>
div.upload-draggable {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
</style>

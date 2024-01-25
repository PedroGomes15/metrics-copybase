<template>
  <v-container fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col align-self="center">
        <v-row align="center" justify="center" class="mt-6" no-gutters>
          <v-btn :color="file ? 'success' : 'primary'" @click="chooseFile">
            <v-icon left v-if="!file">mdi-upload</v-icon>
            {{ file ? "Arquivo selecionado" : "Escolher arquivo" }}
            <input
              type="file"
              ref="fileInput"
              @change="handleFileChange"
              style="display: none"
              accept=".xlsx, .csv"
            />
          </v-btn>
        </v-row>
        <v-row align="center" justify="center" class="mt-6" no-gutters>
          <v-btn :disabled="!file" color="primary" @click="uploadFile">Upload</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

const backendUrl = process.env.VUE_APP_BACKEND_URL || "http://localhost:3000";

export default {
  props: {
    onUploadSuccess: Function,
    onStartUpload: Function,
  },
  methods: {
    chooseFile() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    uploadFile() {
      this.onStartUpload();
      const formData = new FormData();
      formData.append("file", this.file);

      axios
        .post(`${backendUrl}/file/upload`, formData)
        .then((response) => {
          console.log("Upload bem-sucedido:", response.data);
          if (this.onUploadSuccess) {
            this.onUploadSuccess(response.data);
          }
        })
        .catch((error) => {
          console.error("Erro durante o upload:", error);
        });
    },
  },
  data() {
    return {
      file: null,
    };
  },
};
</script>

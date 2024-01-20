<template>
  <div class="file-upload">
    <label :class="{ 'custom-file-input': true, 'file-selected': file }" for="file-input">
      <span>{{ file ? file.name : "Escolher arquivo" }}</span>
      <input id="file-input" type="file" @change="handleFileChange" />
    </label>
    <button :class="{ 'upload-button': true, 'file-selected': file }" @click="uploadFile">
      Upload
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    uploadFile() {
      const formData = new FormData();
      formData.append("file", this.file);

      axios
        .post("http://localhost:3000/file/upload", formData)
        .then((response) => {
          console.log("Upload bem-sucedido:", response.data);
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

<style scoped>
.file-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.custom-file-input {
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.custom-file-input span {
  background-color: var(--primary-color);
  color: var(--text-color);
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
}

.custom-file-input.file-selected span {
  background-color: var(--secondary-color);
}

.custom-file-input:hover span {
  background-color: var(--primary-hover-color);
}

.custom-file-input.file-selected:hover span {
  background-color: var(--secondary-hover-color);
}

.custom-file-input input {
  display: none;
}

.upload-button {
  margin-top: 10px;
  padding: 10px;
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.upload-button:hover {
  background-color: var(--primary-hover-color);
}
</style>

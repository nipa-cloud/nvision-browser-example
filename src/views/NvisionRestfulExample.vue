<template>
  <div>
    <v-container>
      <h1>Nvision SDK: Object Detection Example</h1>
      <v-file-input
        v-model="file"
        color="deep-purple accent-4"
        counter
        label="File input"
        placeholder="Select your files"
        prepend-icon="mdi-paperclip"
        outlined
        :show-size="1000"
      >
        <template v-slot:selection="{ index, text }">
          <v-chip
            v-if="index < 2"
            color="deep-purple accent-4"
            dark
            label
            small
            >{{ text }}</v-chip
          >
        </template>
      </v-file-input>
      <v-btn v-if="file.length || file" v-on:click="() => request()"
        >Call</v-btn
      >
      <v-card v-if="result !== ''">
        <v-container>
          <pre v-highlightjs="result"><code class="json"></code></pre>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import Component from "vue-class-component";
import Vue from "vue";
import nvision from "@nipacloud/nvision";

@Component({
  components: {
    HelloWorld
  }
})
export class NvisionRestfulExample extends Vue {
  public objectDetectionResult: any = {};
  public file?: File[] | File = [];
  public result = "";

  private objectDetectionService = nvision.objectDetection(
    "your API key goes here"
  );

  constructor() {
    super();
  }

  public async request() {
    this.result = "";
    const reader = new FileReader();
    reader.onload = event => {
      this.objectDetectionService
        .predict(
          (reader.result as string).replace(/data:image\/png;base64,/, ""),
          false
        )
        .then(data => (this.result = JSON.stringify(data, null, 4)));
    };
    reader.readAsDataURL(this.file as File);
  }
}

export default NvisionRestfulExample;
</script>

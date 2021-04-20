<template>
  <div>
    <v-container flex>
      <h1>Nvision SDK: Object Detection Example</h1>
      <div>
        <v-btn v-on:click="startCamera" color="primary">Start camera</v-btn>
        <v-card>
          <v-card-title>Camera</v-card-title>
          <v-container>
            <div class="camera">
              <video id="video" :height="height" :width="width">
                Video stream not available.
              </video>
            </div>
            <canvas id="canvas" :height="height" :width="width"></canvas>
          </v-container>
        </v-card>
      </div>
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
export class NvisionWebSocketExample extends Vue {
  public file?: File[] | File = [];
  public result = "";

  public streaming = false;
  public height = 0;
  public width = 640;

  private objectDetectionService = nvision
    .objectDetection({
      streamingKey:    "your streaming key goes here"
    })
    .stream();

  constructor() {
    super();
  }

  public async startCamera() {
    const video: HTMLVideoElement = document.getElementById(
      "video"
    ) as HTMLVideoElement;
    const canvas: HTMLCanvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;

    await navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log("An error occurred: " + err);
      });

    video.addEventListener(
      "canplay",
      async (ev: any) => {
        if (!this.streaming) {
          this.height = video.videoHeight / (video.videoWidth / this.width);

          if (isNaN(this.height)) {
            this.height = this.width / (4 / 3);
          }
          this.streaming = true;

          await this.objectDetectionService.connect();

          setInterval(() => {
            const context = canvas.getContext("2d");
            context!.drawImage(video, 0, 0, this.width, this.height);
            canvas.toBlob((blob: any) => {
              blob.arrayBuffer().then((buffer: any) => {
                const reader = new FileReader();
                reader.onload = () => {
                  this.objectDetectionService.predict({
                    rawData: new Uint8Array(buffer)
                  });
                };
                reader.readAsDataURL(blob);
              });
            }, "image/jpeg");
          }, 20000);
        }
      },
      false
    );
  }
}

export default NvisionWebSocketExample;
</script>

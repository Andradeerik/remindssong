<template>
  <q-page>
    <q-card class="window-height window-width" v-if="user">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="home">
          <div class="text-h4">Grupos</div>
          <q-page class="q-mb-lg" padding>
            <template v-if="!groups">
              <div class="row justify-center q-gutter-sm">
                <div class="text-h7">intreduce el nombre de un grupo</div>
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="inNameGroup"
                  label="Nombre del grupo"
                  @keyup.enter="regisGroup()"
                />
                <div>
                  <q-btn
                    :disable="inNameGroup"
                    push
                    color="primary"
                    label="Add Grupo"
                    @click="regisGroup()"
                  />
                </div>
              </div>
            </template>
            <div :key="i" v-for="(item, i) in groups" class="q-pt-md">
              <q-card class="my-card" @click="openGroup(i)">
                <q-img
                  class="my-card"
                  src="https://image.freepik.com/vector-gratis/tema-ilustracion-gente-escuchando-musica_52683-26333.jpg"
                >
                  <div class="absolute-bottom">
                    <div class="text-h6">{{ i }}</div>
                  </div>
                </q-img>
              </q-card>
            </div>
            <q-page-sticky position="bottom-right" :offset="[18, 18]">
              <q-fab icon="add" direction="up" color="accent">
                <q-fab-action
                  external-label
                  label-position="left"
                  color="primary"
                  @click="prompt = true"
                  icon="group_add"
                  label="Nuevo Grupo"
                />
                <q-fab-action
                  external-label
                  label-position="left"
                  color="secondary"
                  @click="groupExisten = true"
                  icon="group"
                  label="Grupo axistente"
                />
              </q-fab>
            </q-page-sticky>
            <q-dialog v-model="prompt" persistent>
              <q-card style="min-width: 350px">
                <q-card-section>
                  <div class="text-h6">Nombre del Grupo</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-input
                    dense
                    v-model="groupName"
                    autofocus
                    @keyup.enter="addGrup()"
                  />
                </q-card-section>
                <q-card-actions align="right" class="text-primary">
                  <q-btn flat label="Cancel" v-close-popup />
                  <q-btn flat label="Add Grupo" @click="addGrup()" />
                </q-card-actions>
              </q-card>
            </q-dialog>
            <q-dialog v-model="groupExisten" persistent>
              <q-card style="min-width: 350px">
                <q-card-section>
                  <div class="text-h6">Nombre del Grupo existente</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-input
                    dense
                    v-model="inNameGroup"
                    autofocus
                    @keyup.enter="regisGroup()"
                  />
                </q-card-section>
                <q-card-actions align="right" class="text-primary">
                  <q-btn flat label="Cancel" v-close-popup />
                  <q-btn flat label="Add Grupo" @click="regisGroup()" />
                </q-card-actions>
              </q-card>
            </q-dialog>
            <q-dialog
              v-model="dialog"
              persistent
              :maximized="maximizedToggle"
              transition-show="slide-up"
              transition-hide="slide-down"
            >
              <q-card class="bg-primary">
                <header>
                  <q-toolbar class="text-white">
                    <q-space />
                    <q-btn
                      dense
                      flat
                      icon="minimize"
                      @click="maximizedToggle = false"
                      :disable="!maximizedToggle"
                    >
                      <q-tooltip
                        v-if="maximizedToggle"
                        class="bg-white text-primary"
                        >Minimize</q-tooltip
                      >
                    </q-btn>
                    <q-btn
                      dense
                      flat
                      icon="crop_square"
                      @click="maximizedToggle = true"
                      :disable="maximizedToggle"
                    >
                      <q-tooltip
                        v-if="!maximizedToggle"
                        class="bg-white text-primary"
                        >Maximize</q-tooltip
                      >
                    </q-btn>
                    <q-btn dense flat icon="close" v-close-popup>
                      <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                  </q-toolbar>
                </header>
                <q-card-section>
                  <div class="text-h4 text-white">{{ groupSelect }}</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <div class="row justify-center q-gutter-sm">
                    <q-intersection
                      v-for="(i, item) in usersOfGroup"
                      :key="i"
                      transition="scale"
                      class="example-item"
                      clickable
                      @click="openUser(i, item)"
                    >
                      <q-card class="q-ma-sm">
                        <img
                          class="myclasimg"
                          :src="i.photoURL + '?height=300'"
                        />
                        <q-card-section class="myclasname">
                          <q-item-label caption>
                            {{ i.displayName }}
                          </q-item-label>
                        </q-card-section>
                      </q-card>
                    </q-intersection>
                    <q-dialog
                      v-model="userInGroup"
                      persistent
                      :maximized="maximizedToggle"
                      transition-show="slide-up"
                      transition-hide="slide-down"
                    >
                      <q-layout view="Lhh lpR fff" container class="bg-white">
                        <q-header class="bg-primary">
                          <q-toolbar>
                            <q-space />
                            <q-btn
                              flat
                              v-close-popup
                              round
                              dense
                              icon="close"
                            />
                          </q-toolbar>
                        </q-header>
                        <q-page-container>
                          <q-card>
                            <q-img
                              style="height: 300px"
                              :src="userSelec.photoURL + '?height=350'"
                            />
                            <q-card-section>
                              <q-btn
                                fab
                                color="primary"
                                icon="add"
                                class="absolute"
                                style="
                                  top: 0;
                                  right: 12px;
                                  transform: translateY(-50%);
                                "
                                @click="addvideo()"
                              />
                              <div class="row no-wrap items-center">
                                <div class="col text-h6 ellipsis">
                                  {{ userSelec.displayName }}
                                </div>
                              </div>
                            </q-card-section>
                            <q-card-section class="q-pt-none">
                              <q-card
                                v-for="(item, index) in songs"
                                :key="index"
                                style="border-radius: 15px"
                                class="bg-cyan-2 q-mb-md"
                              >
                                <q-item>
                                  <q-item-section avatar>
                                    <q-avatar>
                                      <img :src="item.photoURL" />
                                    </q-avatar>
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label>
                                      {{ item.displayName }}
                                    </q-item-label>
                                    <q-item-label caption
                                      ><q-avatar
                                        size="23px"
                                        icon="music_note"
                                        color="deep-purple-12"
                                        text-color="white"
                                      />
                                    </q-item-label>
                                  </q-item-section>
                                </q-item>
                                <!-- <q-item-section avatar>
                                  <q-avatar>
                                    <img
                                      src="https://cdn.quasar.dev/img/avatar2.jpg"
                                    />
                                  </q-avatar>
                                </q-item-section> -->
                                <!-- <div class="col text-h6 ellipsis">
                                  {{ userSelec.displayName }}
                                </div> -->
                                <!-- <div class="text-subtitle1">
                                  <q-avatar
                                    size="25px"
                                    icon="music_note"
                                    color="deep-purple-12"
                                    text-color="white"
                                  />
                                  Italian, Cafe
                                </div> -->
                                <!-- <template v-slot:action> -->
                                <q-btn
                                  style="
                                    top: 45px;
                                    right: -6px;
                                    transform: translateY(-50%);
                                  "
                                  push
                                  round
                                  color="dark"
                                  class="absolute"
                                  icon="play_arrow"
                                  @click="
                                    (dialogRepro = true), (song = item.song)
                                  "
                                />

                                <!-- </template> -->
                              </q-card>
                              <q-dialog v-model="dialogRepro" position="bottom">
                                <q-card style="width: 350px">
                                  <iframe
                                    width="100%"
                                    height="315"
                                    :src="
                                      'https://www.youtube.com/embed/' + song
                                    "
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                  ></iframe>
                                  <!-- <q-linear-progress
                                    :value="0.6"
                                    color="pink"
                                  /> -->

                                  <!-- <q-card-section
                                    class="row items-center no-wrap"
                                  >
                                    <div>
                                      <div class="text-weight-bold">
                                        The Walker
                                      </div>
                                      <div class="text-grey">
                                        Fitz & The Tantrums
                                      </div>
                                    </div>

                                    <q-space />

                                    <q-btn flat round icon="fast_rewind" />
                                    <q-btn flat round icon="pause" />
                                    <q-btn flat round icon="fast_forward" />
                                  </q-card-section> -->
                                </q-card>
                              </q-dialog>

                              <!-- <div class="text-subtitle1">$・Italian, Cafe</div>
                              <div class="text-caption text-grey">
                                Small plates, salads & sandwiches in an intimate
                                setting.
                              </div> -->
                            </q-card-section>

                            <q-separator />

                            <!-- <q-card-actions>
                              <q-btn flat round icon="event" />
                              <q-btn flat color="primary"> Reserve </q-btn>
                            </q-card-actions> -->
                          </q-card>
                          <!-- <q-page padding>
                            <p>
                              {{ userSelec }}
                            </p>
                          </q-page> -->
                        </q-page-container>
                      </q-layout>
                    </q-dialog>
                  </div>
                </q-card-section>
              </q-card>
            </q-dialog>
          </q-page>
        </q-tab-panel>

        <q-tab-panel name="user">
          <div>
            <div class="text-h6">User</div>
            <div class="text-center">
              <q-avatar size="100px">
                <img :src="userinfo.photoURL" />
              </q-avatar>
            </div>
            <div class="text-center">
              {{ userinfo.displayName }}
            </div>

            <div class="text-center">
              <q-btn
                class="q-mt-md"
                push
                color="primary"
                :label="!user ? 'acceder con facebook' : 'logout'"
                @click="!user ? loginWithFacebook() : logout()"
              />
            </div>
            <!-- {{ userinfo }} -->
          </div>
        </q-tab-panel>
      </q-tab-panels>

      <!-- <q-separator /> -->

      <!-- <q-tabs
        v-model="tab"
        dense
        class="bg-grey-3"
        align="justify"
        narrow-indicator
      >
        <q-tab name="mails" label="Mails" />
        <q-tab name="alarms" label="Alarms" />
        <q-tab name="movies" label="Movies" />
      </q-tabs> -->
    </q-card>

    <div v-else class="column items-center fullscreen slog">
      <span class="q-pt-xl slogan">Remindssong</span>
      <img src="~assets/content.svg" class="q-pt-xl" />
      <q-btn
        class="q-mt-md"
        push
        color="white"
        :label="!user ? 'acceder con facebook' : 'logout'"
        @click="!user ? loginWithFacebook() : logout()"
        text-color="primary"
      >
        <q-avatar size="22px" class="q-ml-sm">
          <img
            style="max-width: 350px"
            src="https://static.xx.fbcdn.net/rsrc.php/yD/r/d4ZIVX-5C-b.ico"
          />
        </q-avatar>
      </q-btn>
    </div>

    <q-footer v-if="user" bordered class="bg-white text-primary">
      <q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="text-grey"
        v-model="tab"
      >
        <q-tab name="home" icon="home" />
        <q-tab name="user" icon="face" />
      </q-tabs>
    </q-footer>
  </q-page>
</template>

<script>
import { Auth, providerFace, Db, fireTime } from "boot/firebase";

export default {
  name: "PageIndex",
  data() {
    return {
      user: false,
      tab: "home",
      userinfo: null,
      fabPos: [18, 18],
      draggingFab: false,
      alert: false,
      confirm: false,
      prompt: false,
      groupName: "",
      groups: null,
      dialog: false,
      dialogRepro: false,
      maximizedToggle: true,
      groupSelect: null,
      usersOfGroup: [],
      inNameGroup: "",
      groupExisten: false,
      groupexisteName: "",
      userInGroup: false,
      userSelec: null,
      songs: null,
      song: null,
    };
  },
  created() {
    Auth.onAuthStateChanged((user) => {
      if (user) {
        this.$router.push("/home");

        console.log("user :>> ", user);
        this.user = true;
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.userinfo = user;
        Db.ref("users/" + this.userinfo.uid).once("value", (snap) => {
          console.log(snap.val());
          if (!snap.val()) {
            Db.ref("users/" + this.userinfo.uid).update(
              {
                info: {
                  displayName: this.userinfo.displayName,
                  email: this.userinfo.email,
                  photoURL: this.userinfo.photoURL,
                },
              },
              (error) => {
                if (error) {
                  // The write failed...
                } else {
                  // Data saved successfully!
                }
              }
            );
          } else {
            Db.ref(`users/${this.userinfo.uid}/groups`).on("value", (snap) => {
              console.log("snap groups nnnn", snap.val());
              this.groups = snap.val();
            });
          }
        });
      } else {
        // User is signed out
        // ...
      }
    });
  },
  methods: {
    refreshApp() {
      this.workbox.addEventListener("controlling", () => {
        window.location.reload();
      });
      this.workbox.messageSkipWaiting();
    },
    addvideo() {
      this.$q
        .dialog({
          title: "Prompt",
          message: "pegar vinculo",
          prompt: {
            model: "",
            type: "text", // optional
          },
          cancel: true,
          persistent: true,
        })
        .onOk((data) => {
          console.log(">>>> OK, received", data.includes(2));
          // https://youtu.be/ZHN5mAY35zg
          if (data.includes("youtu.be")) {
            console.log(data.slice(17));
            console.log("this.userinfo :>> ", this.userinfo.uid);
            console.log("this.userinfo name :>> ", this.userinfo.displayName);
            console.log("this.userSelec :>> ", this.userSelec.uid);
            // songs
            Db.ref(
              `users/${this.userSelec.uid}/songs/${this.groupSelect}/${
                this.userinfo.uid
              }${data.slice(17)}`
            ).set(
              {
                displayName: this.userinfo.displayName,
                photoURL: this.userinfo.photoURL,
                uid: this.userinfo.uid,
                song: data.slice(17),
              },
              (error) => {
                if (!error) {
                  this.$q.notify({
                    type: "positive",
                    message: "agragado",
                    position: "center",
                  });
                }
              }
            );
          } else {
            this.addvideo();
            this.$q.notify({
              type: "negative",
              message: "este enlace no esta soportado",
              position: "center",
            });
          }
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    openUser(user, item) {
      console.log("user open :>> ", user);
      this.userInGroup = true;
      this.userSelec = user;
      Db.ref(`users/${user.uid}/songs/${this.groupSelect}`).on(
        "value",
        (snap) => {
          console.log("snap.val() song :>> ", snap.val());
          console.log("this.selecgrouuuup :>> ", this.groupSelect);
          this.songs = snap.val();
        }
      );
    },
    regisGroup() {
      if (this.inNameGroup) {
        this.groupExisten = false;
        this.$q.loading.show();
        Db.ref(`groups/${this.inNameGroup}`).once("value", (snap) => {
          console.log("snap.val() group exist :>> ", snap.exists());
          if (snap.exists()) {
            Db.ref(`users/${this.userinfo.uid}/groups/${this.inNameGroup}`).set(
              true,
              (error) => {
                if (error) {
                  // The write failed...
                } else {
                  Db.ref(
                    `groups/${this.inNameGroup}/users/${this.userinfo.uid}`
                  ).set(true, (error) => {
                    if (!error) {
                      // this.prompt = false;
                      this.openGroup(this.inNameGroup);
                      this.inNameGroup = "";
                      this.$q.notify({
                        type: "positive",
                        message: "Bienvenido al grupo ",
                        position: "center",
                      });
                      this.groupExisten = false;
                      this.$q.loading.hide();
                      // Data saved successfully!
                    }
                  });
                }
              }
            );
          } else {
            this.$q.notify({
              type: "negative",
              message: "Este grupo no existe",
              position: "center",
            });
            this.groupExisten = true;
            this.$q.loading.hide();
          }
        });
      }
    },
    openGroup(group) {
      this.groupSelect = group;
      Db.ref(`groups/${this.groupSelect}`).on("value", (snap) => {
        console.log("snap.val() :>> ", snap.val());
        console.log(Object.values(snap.val())[1]);
        console.log(Object.keys(snap.val())[1]);
        console.log(Object.keys(Object.values(snap.val())[1]));
        let usersOfGroup = [];
        Object.keys(Object.values(snap.val())[1]).forEach(
          (element, index, array) => {
            console.log("element :>> ", element);
            console.log("index foreach :>> ", index);
            console.log("array for :>> ", array);
            Db.ref(`users/${element}/info`).on("value", (snap) => {
              let user = {
                displayName: snap.val().displayName,
                uid: element,
                photoURL: snap.val().photoURL,
                email: snap.val().email,
              };
              console.log("user jaflk :>> ", user);

              // usersOfGroup.push(snap.val());
              usersOfGroup.push(user);

              console.log("snap.val() element :>> ", snap.val());
              console.log("snap.val() tipeof  :>> ", typeof snap.val());
              console.log("snap.val() ejemplo :>> ", snap.val().displayName);
            });
          }
        );
        this.usersOfGroup = usersOfGroup;
      });

      this.dialog = true;
    },
    addGrup() {
      if (this.groupName) {
        this.prompt = false;
        this.$q.loading.show();
        Db.ref(`groups/${this.groupName}`).once("value", (snap) => {
          if (snap.exists()) {
            this.$q.notify({
              type: "negative",
              message: "Este nombre de grupo no está disponible",
              position: "center",
            });
            this.prompt = true;
            this.$q.loading.hide();
          } else {
            Db.ref("groups/" + this.groupName).set(
              {
                info: {
                  admin: this.userinfo.uid,
                  time: fireTime,
                },
              },
              (error) => {
                if (error) {
                  // The write failed...
                } else {
                  // Data saved successfully!
                  Db.ref(
                    `users/${this.userinfo.uid}/groups/${this.groupName}`
                  ).set(true, (error) => {
                    if (error) {
                      // The write failed...
                    } else {
                      Db.ref(
                        `groups/${this.groupName}/users/${this.userinfo.uid}`
                      ).set(true);
                      this.$q.notify({
                        type: "positive",
                        message: "Grupo creado con éxito",
                        position: "center",
                      });
                      // this.prompt = true;
                      this.$q.loading.hide();
                      this.prompt = false;
                      // Data saved successfully!
                    }
                  });
                }
              }
            );
          }
        });
      }
    },
    onClick() {
      // console.log('Clicked on a fab action')
    },

    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true;

      this.fabPos = [this.fabPos[0] - ev.delta.x, this.fabPos[1] - ev.delta.y];
    },
    logout() {
      Auth.signOut()
        .then(() => {
          // Sign-out successful.
          this.user = false;
          console.log("this.user :>> ", this.user);
        })
        .catch((error) => {
          // An error happened.
        });
    },
    loginWithFacebook() {
      Auth.signInWithPopup(providerFace)
        .then((result) => {
          this.$router.push("/home");
          console.log("result :>> ", result);
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // The signed-in user info.
          var user = result.user;

          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var accessToken = credential.accessToken;

          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;

          // ...
        });
      // alert("hola2 ");
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=MonteCarlo&display=swap");
.firebase-emulator-warning {
  display: none;
}
.position {
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
}
.example-item {
  height: 160px;
  width: 150px;
}
.myclasimg {
  height: 100px;
  width: 100px;
  object-fit: cover;
}
.myclasname {
  height: 60px;
  /* width: 100px; */
  object-fit: cover;
}
.slog {
  background-image: linear-gradient(134deg, #0c0091 0%, #00a87e 100%);
}
.slogan {
  color: #00ffd4;
  font-size: 3.2rem;
  font-family: "MonteCarlo", cursive;
  font-weight: 700;
  text-shadow: 0px 5px 8px rgb(0 0 0 / 10%);
  line-height: 1.3;
  letter-spacing: 0.05rem;
}
.my-card {
  width: 100%;
  height: 175px;
}
</style>

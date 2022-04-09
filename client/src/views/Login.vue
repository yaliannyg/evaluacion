<template>
  <v-container class="d-flex justify-center fill-height primary" fluid>
    <v-row justify="center">
      <ValidationObserver>
        <BaseForm
          title="Welcome"
          class="form-login elevation-5 rounded-lg background px-5"
        >
          <template v-slot:fields>
            <v-col cols="12" class="py-0">
              <span
                class="text-subtitle-1 font-weight-bold pa-1 text-capitalize"
                :style="{ letterSpacing: '1.5rem' }"
                >Username</span
              >
              <ValidationProvider
                rules="required"
                name="Username"
                v-slot="{ errors }"
              >
                <v-text-field
                  prepend-inner-icon="mdi-account"
                  type="text"
                  v-model="username"
                  :error-messages="errors[0]"
                  outlined
                  dense
                  single-line
                  background-color="primary"
                  color="background"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" class="py-0">
              <span
                class="text-subtitle-1 font-weight-bold pa-1 text-capitalize"
                :style="{ letterSpacing: '1.5rem' }"
                >Password</span
              >
              <ValidationProvider
                rules="required"
                name="Password"
                v-slot="{ errors }"
              >
                <v-text-field
                  id="password"
                  v-model="password"
                  prepend-inner-icon="mdi-lock"
                  type="password"
                  :error-messages="errors[0]"
                  outlined
                  dense
                  single-line
                  background-color="primary"
                  color="background"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </template>
          <template v-slot:buttons>
            <v-col class="py-0 text-center">
              <v-btn
                @click="login"
                width="50%"
                color="primary"
                class="elevation-5 px-2 py-0"
                outlined
              >
                Login
              </v-btn>
            </v-col>
          </template>
        </BaseForm>
      </ValidationObserver>
    </v-row>
  </v-container>
</template>

<script>
import BaseForm from "@/components/UI/BaseForm.vue";
import { mapActions, mapMutations } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  components: {
    BaseForm,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations(["setSnackbar"]),
    ...mapActions(["getAuth"]),
    async login() {
      let res = await this.getAuth({
        username: this.username,
        password: this.password,
      });

      if (res) {
        localStorage.setItem("token", res.data.token);
        this.$router.push("/home");
      } else {
        this.setSnackbar({
          showSnackBarFlag: true,
          text: `Invalid Credentials`,
          status: "danger",
        });
      }
    },
  },
};
</script>

<style scoped>
.form-login {
  width: 600px;
  height: 800px;
}
</style>

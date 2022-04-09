<template>
  <v-container
    class="d-flex justify-center fill-height aling-start secondary pa-5"
    fluid
  >
    <v-row justify="center">
      <v-col class="d-flex justify-center" cols="4">
        <v-row>
          <ValidationObserver
            v-slot="{ invalid, reset, touched }"
            ref="homeForm"
            style="width: 100%"
          >
            <BaseForm class="form elevation-5 rounded-lg background">
              <template v-slot:fields>
                <v-col cols="12" class="py-0">
                  <span
                    class="text-subtitle-1 font-weight-bold pa-1 text-capitalize"
                    :style="{ letterSpacing: '1.5rem' }"
                    >Username</span
                  >
                  <ValidationProvider
                    rules="required|min:2"
                    name="First Name"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      type="text"
                      v-model.trim="firstName"
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
                    >Last Name</span
                  >
                  <ValidationProvider
                    rules="required|min:2"
                    name="Last Name"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      type="text"
                      v-model.trim="lastName"
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
                    >Address</span
                  >
                  <ValidationProvider
                    rules="required|min:2"
                    name="Address"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      type="text"
                      v-model.trim="address"
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
                    >SSN</span
                  >
                  <ValidationProvider
                    rules="required|SSN"
                    name="SSN"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      type="text"
                      v-model.trim="ssn"
                      hint="format: ###-##-####"
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
                <v-row>
                  <v-col cols="6">
                    <v-btn
                      block
                      color="primary"
                      class="elevation-5 px-2 py-0"
                      outlined
                      @click="resetValues(reset)"
                    >
                      Reset
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn
                      block
                      color="primary"
                      class="elevation-5 px-2 py-0"
                      @click="save"
                      :disabled="(!touched && invalid) || invalid"
                    >
                      Save
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
            </BaseForm>
          </ValidationObserver>
        </v-row>
      </v-col>
      <v-col class="pa-0" cols="6">
        <v-container fluid class="py-0">
          <members-table />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BaseForm from "@/components/UI/BaseForm.vue";
import MembersTable from "@/components/Home/MembersTable.vue";
import { mapActions } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  components: {
    BaseForm,
    ValidationProvider,
    ValidationObserver,
    MembersTable,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      address: "",
      ssn: "",
    };
  },
  methods: {
    ...mapActions(["getAuth", "saveMember"]),
    resetValues() {
      this.firstName = "";
      this.lastName = "";
      this.address = "";
      this.ssn = "";

      this.$refs.homeForm.reset();
    },
    async save() {
      let res = await this.saveMember({
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
        ssn: this.ssn,
      });

      if (res) this.resetValues();
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  width: 100%;
  height: 800px;
}
</style>

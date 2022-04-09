<template>
  <v-data-table
    class="elevation-5 ma-0 rounded-0 main-table overflow-x-auto overflow-y-auto secondary"
    :headers="header"
    :items="members"
    hide-default-footer
    disable-pagination
    :header-props="{ sortIcon: 'mdi-chevron-up' }"
    fixed-header
    dense
    height="800px"
  ></v-data-table>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  created() {
    this.header = this.generateHeaderData(this.header);
    this.getMembers();
  },
  computed: {
    ...mapState(["members"]),
  },
  data() {
    return {
      header: [
        {
          text: "First Name",
          value: "firstName",
        },
        {
          text: "Last Name",
          value: "lastName",
        },
        {
          text: "Address",
          value: "address",
        },
        {
          text: "SSN",
          value: "ssn",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["getMembers"]),
    generateHeaderData(header) {
      let headerData = [];

      for (let value of header) {
        headerData.push({
          sortable: true,
          ...value,
          class: "table-header ",

          align: "center",
        });
      }
      return headerData;
    },
  },
};
</script>

<style lang="scss">
.main-table {
  width: 100%;
  height: 100%;

  .v-data-table__wrapper {
    table tbody td {
      color: #192a51;
    }
  }
}

.table-header {
  color: #aaa1c8 !important;
  background-color: #192a51 !important;
  padding: 0 !important;
  text-transform: capitalize !important;
  border-bottom: none !important;
  text-align: center !important;
  min-width: 100px;
}
</style>

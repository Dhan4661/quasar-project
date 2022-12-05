<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-table
      :rows="tableData"
      row-key="sku"
      v-model:pagination="pagination"
      hide-pagination
      :loading="loading"
      @request="onRequest"
      flat
      class="sf-table pur-report"
      binary-state-sort
    >
    </q-table>
  </div>
</template>

<script  lang="ts" setup>
import { useServerTable } from 'src/composables/use-serverTable';

const { loading, pagination, tableData, onRequest } = useServerTable(
  'myAccount',
  'rows',
  'purchaseTableData',
  '/account/purchasereports',
  'SET_DUMMY_DATA',
  true,
  true
);
</script>

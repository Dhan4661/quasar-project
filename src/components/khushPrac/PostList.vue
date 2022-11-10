<template>
  <div class="q-pa-md" style="max-width: 500px">
    <center><h5 class="bold">Post Lists</h5></center>
    {{ postsList }}

    <!-- <simple-table :rows="tableData" :columns="stockTakeReportColums">
      <template #lastPricePaid="{ row }">
        {{ formatNumber(row.lastPricePaid.toString(), 2) }}
      </template>
    </simple-table> -->

    <q-table
      :rows="tableData"
      :columns="columns.columns"
      row-key="sku"
      v-model:pagination="pagination"
      hide-pagination
      :loading="loading"
      @request="onRequest"
      flat
      class="sf-table pur-report"
      binary-state-sort
    >
      <template v-slot:top>
        <div class="date-purhcaseReport">
          <label-value
            v-if="reportFilter.from"
            label-text="Beginning Date"
            :data-testid="`StRepLbl-${reportFilter.from}`"
          >
            <template #value-text>
              {{
                formatDate(
                  reportFilter.from,
                  DATE_TIME_CONSTANTS.DASHED_DATE_MONTH_YEAR
                )
              }}
            </template>
          </label-value>
          <label-value
            v-if="reportFilter.to"
            label-text="Ending Date"
            :data-testid="`StRepLbl-${reportFilter.from}`"
          >
            <template #value-text>
              {{
                formatDate(
                  reportFilter.to,
                  DATE_TIME_CONSTANTS.DASHED_DATE_MONTH_YEAR
                )
              }}
            </template>
          </label-value>
        </div>
      </template>
      <template v-slot:body="props">
        <Lazy :key="props.rowIndex" :unrender="true" :min-height="100">
          <q-tr :props="props">
            <template v-for="col in props.cols" :key="col.name">
              <q-td
                class="sf-tab-description"
                v-if="col.name == 'sku'"
                :data-testid="`purRep-td-sku-${props.row['sku']}`"
              >
                <div class="text-left">
                  <q-icon
                    style="padding-bottom: 3px"
                    v-if="
                      tabletColumns.length == desktopColumns.length
                        ? screen.width <= 490
                        : screen.width <= 768
                    "
                    size="xs"
                    class=""
                    @click="props.expand = !props.expand"
                    :name="
                      props.expand
                        ? 'remove_circle_outline'
                        : 'add_circle_outline'
                    "
                    aria-label="Expand"
                    :data-testid="`purRep-icon-expand-${props.row['sku']}`"
                  ></q-icon>
                  {{ col.value }}
                  <div
                    :data-testid="`purRep-dispalayName-${
                      props.row ? props.row.displayName : props.row['sku']
                    }`"
                  >
                    {{ props.row ? props.row.displayName : '' }}
                  </div>
                </div>
              </q-td>
              <FormatCell
                :data-testid="`purRep-td-${props.row['sku']}-${col.value}`"
                :number="col.value"
                v-else-if="col.name == 'avgPricePaid'"
              ></FormatCell>
              <FormatCell
                :data-testid="`purRep-td-${props.row['sku']}-${col.value}`"
                :number="col.value"
                v-else-if="col.name == 'lastPricePaid'"
              ></FormatCell>
              <FormatCell
                :data-testid="`purRep-td-${props.row['sku']}-${col.value}`"
                :number="col.value"
                v-else-if="col.name == 'totalExGST'"
              ></FormatCell>
              <FormatCell
                :text="col.value"
                v-else
                :data-testid="`purRep-td-${props.row['sku']}-${col.value}`"
              ></FormatCell>
            </template>
          </q-tr>
          <q-tr v-show="props.expand && screen.width <= 768" :props="props">
            <q-td colspan="100%" :data-testid="`purRep-td-${props.row['sku']}`">
              <div class="row">
                <template
                  v-for="(col, index) in desktopColumns"
                  :key="`child_row_${col}`"
                >
                  <template v-if="!columns.names.includes(col)">
                    <div
                      :class="`text-left col-${12 / columns.names.length}`"
                      v-if="tableColumns"
                    >
                      <span
                        class="sf-child-title q-pb-md"
                        :data-testid="`purRep-lbl-${tableColumns[index].label}`"
                        >{{ tableColumns[index].label }}</span
                      >
                      <br />
                      <span
                        class="q-pb-md"
                        v-if="
                          col == 'avgPricePaid' ||
                          col == 'lastPricePaid' ||
                          col == 'totalExGST'
                        "
                        :data-testid="`purRep-lbl-${col}`"
                      >
                        {{ formatNumber(props.row[col].toString(), 2) }}
                      </span>
                      <span
                        v-else
                        class="q-pb-md"
                        :data-testid="`purRep-lbl-${
                          props.row[col] ? props.row[col] : ''
                        }`"
                        >{{ props.row[col] ? props.row[col] : '' }}</span
                      >
                    </div>
                  </template>
                </template>
              </div>
            </q-td>
          </q-tr>
        </Lazy>
      </template>
      <template v-slot:bottom-row>
        <q-tr v-if="tableData?.length > 0">
          <q-td
            data-testid="purRes-td-total"
            :colspan="screen.width <= 490 ? 1 : 7"
          >
            <b>Total</b>
          </q-td>
          <q-td data-testid="purRes-td-total-value">
            <b>{{ formatNumber(total!.toString(), 2) }}</b>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:no-data="{ icon }">
        <NoDataSlot
          :icon="icon"
          :message="COMMON_CONSTANTS.LOADING_MESSAGE"
          v-if="loading"
          :data-testid="`purRes-loading-msg-${COMMON_CONSTANTS.LOADING_MESSAGE}`"
        ></NoDataSlot>
        <NoDataSlot
          :icon="icon"
          :message="COMMON_CONSTANTS.NO_DATA_PURCHASE_REPORT"
          data-testid="purRes-noDataMsg"
          v-else
        ></NoDataSlot>
      </template>
    </q-table>

    <q-list bordered separator>
      <q-item v-for="post in postLinks" :key="post.name" v-bind="post">
        <q-item-section>
          {{ post.name }}
        </q-item-section>
        <q-item-section>
          <!-- <div class="q-pa-md"> -->
          <ViewPost :post="post" />
        </q-item-section>
        <q-item-section>
          <EditPost
            v-if="true"
            :post="post"
            @on-update="(e) => updatePost(e)"
          />
          <!-- </div> -->
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
  
<script>
import { onMounted, onUnmounted, onUpdated } from 'vue';
import { useServerTable } from 'src/composables/use-server-table';
import ViewPost from './ViewPost.vue';
import EditPost from './EditPost.vue';

const postsList = [
  {
    name: 'Post1 - This is Post1',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Post2 - This is Post2',
    desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: 'Post3 - This is Post3',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Post4 - This is Post4',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Post5 - This is Post5',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Post6 - This is Post6',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.,Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Post7 - This is Post7',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    name: 'Post8 - This is Post8',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
];

export default {
  props: ['posts'],
  components: {
    ViewPost,
    EditPost,
  },
  setup(props) {
    console.log(props);
    onMounted(() => console.log('component mounted'));
    onUnmounted(() => console.log('component unmounted'));
    onUpdated(() => console.log('component updated'));

    return {
      postLinks: postsList,
      updatePost(value) {
        postsList.forEach((element) => {
          if (element.name == value.name) {
            element.desc = value.desc;
          }
        });
      },
    };
  },
};
</script>
  
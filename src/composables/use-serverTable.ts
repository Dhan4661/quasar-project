import { useStore } from 'src/store';
import { ref, onMounted, computed } from 'vue';
import { QTableProps } from 'quasar';
import { IRootState } from './../store';
import {  IObject, ResponseResult } from 'src/common';
import { AnyObject } from 'yup/lib/object';



export const useServerTable = (
  storeName: string,
  responseKey: string,
  stateVariable = 'tableData',
  apiUrl: string,
  mutationName = '',
  isInitialCall = true,
  isDefaultAll = false,
  actionName = 'GET_ALL',
  promiseOnly = false
) => {
  const store = useStore();
  const loading = ref(false);
  const searchModel = ref('');
  const pagination = ref<QTableProps['pagination']>({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: isDefaultAll ? 0 : 10,
    rowsNumber: 10,
  });

  const setData = (response: ResponseResult<unknown>): void => {
    debugger;
    store.commit(
      `${storeName}/${mutationName}`,
      // (response?.data as IObject)?.[responseKey]
      //response.data as IObject
      response
    );
    if (pagination.value) {
      pagination.value.rowsNumber = getRowsNumberCount.value;
    }
  };

  const fetchFromServer = (): Promise<unknown> => {
    return new Promise((resolve, reject) => {
      loading.value = true;
      store
        .dispatch(`${storeName}/${actionName}`, {
          pagination: pagination.value,
          apiUrl: apiUrl,
        })
        .then(
          (response) => {
            loading.value = false;
            if (promiseOnly) {
              resolve(response);
            } else {
              setData(response);
            }
          },
          (error) => {
            loading.value = false;
            setData({ [responseKey]: [] });
            reject(error);
          }
        );
    });
  };

  const moduleState = computed<AnyObject>(
    () => <AnyObject>store.state[storeName as keyof IRootState]
  );

  const tableData = computed<IObject[]>(
    () =>
      moduleState.value?.[stateVariable]?.[responseKey] as unknown as IObject[]
  );

  const getRowsNumberCount = computed<number>(
    () => moduleState.value?.[stateVariable]?.totalRows as unknown as number
  );


  const onRequest: QTableProps['onRequest'] = (requestProp) => {
    const { page, rowsPerPage, sortBy, descending } = requestProp.pagination;
    if (pagination.value) {
      pagination.value.rowsNumber = getRowsNumberCount.value;
      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
      pagination.value.sortBy = sortBy;
      pagination.value.descending = descending;
    }

    void fetchFromServer();
  };

  onMounted(() => {
    // get initial data from server (1st page)
    if (isInitialCall) {
      void fetchFromServer();
    }
  });

  return {
    onRequest,
    loading,
    moduleState,
    pagination,
    tableData,
    getRowsNumberCount,
    searchModel,
    fetchFromServer,
  };
};

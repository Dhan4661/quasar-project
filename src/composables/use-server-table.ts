import { IRootState } from './../store';
import { AnyObject } from 'yup/lib/object';
import { IFilterModel, IObject, ResponseResult } from 'src/common';
import { useStore } from 'src/store';
import { ref, onMounted, computed, reactive } from 'vue';
import { QTableProps } from 'quasar';
import { useErrors } from 'src/composables/use-errors';

export const useServerTable = (
  storeName: string,
  responseKey: string,
  stateVariable = 'tableData',
  apiUrl: string,
  mutationName = '',
  isInitialCall = true,
  isDefaultAll = false,
  defaultFilter: IFilterModel & AnyObject = {
    search: '',
    from: '',
    to: '',
  },
  actionName = 'GET_ALL',
  promiseOnly = false
) => {
  const store = useStore();
  const { getServerErrors, showDialog } = useErrors();
  const loading = ref(false);
  const searchModel = ref('');
  const filterModel: IFilterModel & AnyObject = reactive(defaultFilter);
  const pagination = ref<QTableProps['pagination']>({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: isDefaultAll ? 0 : 10,
    rowsNumber: 10,
  });

  const setData = (response: ResponseResult<unknown>): void => {
    store.commit(
      `${storeName}/${mutationName}`,
      // (response?.data as IObject)?.[responseKey]
      response.data as IObject
    );
    if (pagination.value) {
      pagination.value.rowsNumber = getRowsNumberCount.value;
    }
  };

  const fetchFromServer = (): Promise<unknown> => {
    debugger;
    return new Promise((resolve, reject) => {
      loading.value = true;
      store
        .dispatch(`${storeName}/${actionName}`, {
          pagination: pagination.value,
          filterModel: filterModel,
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
            showDialog(getServerErrors(error));
          }
        );
    });
  };
  // function fetchFromServer(startRow: number, count: any, filter: any, sortBy: string, descending: any) {
  //   const data = filter
  //     ? originalRows.filter((row: { name: string | any[]; }) => row.name.includes(filter))
  //     : originalRows.slice();

  //   // handle sortBy
  //   if (sortBy) {
  //     const sortFn =
  //       sortBy === 'desc'
  //         ? descending
  //           ? (a: { name: number; }, b: { name: number; }) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
  //           : (a: { name: number; }, b: { name: number; }) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
  //         : descending
  //         ? (a: { [x: string]: string; }, b: { [x: string]: string; }) => parseFloat(b[sortBy]) - parseFloat(a[sortBy])
  //         : (a: { [x: string]: string; }, b: { [x: string]: string; }) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
  //     data.sort(sortFn);
  //   }

  // return data.slice(startRow, startRow + count);
  // }

  // emulate 'SELECT count(*) FROM ...WHERE...'

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

  // const onRequest = (requestProp: unknown): void => {
  //   const { page, rowsPerPage, sortBy, descending } = (requestProp as AnyObject)
  //     .pagination as IPagination;
  //   debugger;
  //   pagination.value.rowsNumber = getRowsNumberCount.value;
  //   pagination.value.page = page;
  //   pagination.value.rowsPerPage = rowsPerPage;
  //   pagination.value.sortBy = sortBy;
  //   pagination.value.descending = descending;
  //   pagination.value.search = requestProp.filter as ;

  //   void fetchFromServer();
  // };

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
    filterModel,
    fetchFromServer,
  };
};

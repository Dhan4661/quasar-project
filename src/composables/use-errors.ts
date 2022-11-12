import { AxiosResponse } from 'axios';
import { IErrorDetails } from 'src/common';
// import { COMMON_CONSTANTS } from './src/constants';
import { useStore } from 'src/store';
import { useRouter } from 'vue-router';
export const useErrors = () => {
  const router = useRouter();
  const { commit } = useStore();

  /**
   * Used for get errors from response
   * @param response - response of error
   * @returns error
   */
  // const getErrosFromResponse = (response: AnyObject): string => {
  //   let err = '';
  //   Object.keys(response).forEach((key) => {
  //     response[key].forEach((item) => {
  //       err = `${err + item}<br/>`;
  //     });
  //   });
  //   return err;
  // };

  /**
   * It takes an AxiosResponse object and returns an object with an errorCode and errors property
   * @param {AxiosResponse} response - AxiosResponse
   * @returns An object with two properties: errorCode and errors.
   */
  const getServerErrors = (
    response: AxiosResponse,
    isAllErrors = false
  ): { errorCode: number; errors: string } => {
    let error = 'Something went wrong. Please try again later.';
    if (!response) return { errorCode: 0, errors: error };
    if (response.status == 422 || response.status == 409) {
      if (response.data.error) {
        let errorMessage = '';
        let errorDetails = '';
        if (response.data.error.message) {
          errorMessage = response.data.error.message as string;
        } else if (response.data.error.detail) {
          (response.data.error.detail as IErrorDetails[]).forEach((element) => {
            errorDetails += `<p>${element.message}.</p>`;
          });
          errorDetails = '<div>' + error + '</div>';
        }
        if (!isAllErrors && errorMessage) {
          error = errorMessage;
        } else if (isAllErrors && errorMessage) {
          error = errorMessage + errorDetails;
        }
      }
    } else if (response.status == 404) {
      error = response.data.message as string;
    } else if (response.status == 403) {
      error = response.data.message as string;
    } else if (response.status == 427) {
      error = response.data.message as string;
    } else if (response.status == 401) {
      //   error = COMMON_CONSTANTS.SESSION_EXPIRED;
      void router.push('/logout');
    }
    return { errorCode: response.status, errors: error };
  };

  /**
   * It takes an object with two properties, errorCode and errors, and sets the errorCode and errors
   * properties of the error module to the values of the errorCode and errors properties of the object
   * passed in
   * @param errInfo - { errorCode: number; errors: string }
   */
  const showDialog = (errInfo: { errorCode: number; errors: string }): void => {
    commit('error/SET_ERROR_DATA', {
      statusCode: errInfo.errorCode,
      dialogText: errInfo.errors,
    });
    commit('error/SET_ERROR_DISPLAY', true);
  };

  /**
   * It takes an object with two properties, statusCode and dialogText, and sets the error state to
   * display a success dialog with the given status code and dialog text
   * @param dialogInfo - {
   */
  const showSuccessDialog = (dialogInfo: {
    statusCode: number;
    dialogText: string;
  }): void => {
    commit('error/SET_ERROR_DATA', dialogInfo);
    commit('error/SET_ERROR_DISPLAY', {
      showDialog: true,
      isSuccessDialog: true,
    });
  };

  return {
    getServerErrors,
    showDialog,
    showSuccessDialog,
    // getErrosFromResponse,
  };
};

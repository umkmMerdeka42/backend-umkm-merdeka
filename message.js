// eslint-disable-next-line import/prefer-default-export
export const requestResponse = {
  success: (data) => ({
    success: true,
    message: data,
  }),
  failed: (data) => ({
    success: false,
    message: data,
  }),
  successWithData: (data) => ({
    success: true,
    message: 'Berhasil memuat data',
    data,
  }),
  successLogin: (data) => ({
    success: true,
    message: 'Berhasil Login',
    data,
  }),
  serverError: (data) => ({
    success: false,
    message: data,
  }),
};

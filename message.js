export const requestResponse = {
  success: (data) => {
    return {
      success: true,
      message: data
    }
  },
  failed: (data) => {
    return {
      success: false,
      message: data
    }
  },
  successWithData: (data) => {
    return {
      success: true,
      message: 'Berhasil memuat data',
      data
    }
  },
  successLogin: (data) => {
    return {
      success: true,
      message: 'Berhasil Login',
      data
    }
  },
  serverError: (data) => {
    return{
      success: false,
      message: data
    }
  }
};

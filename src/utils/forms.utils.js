import * as yup from 'yup';

export const formPendanaan = {
  branchCode: {
    label: 'Kode Cabang',
    name: 'branch-code',
    value: '0000 - PUSAT'
  },
  bankCode: {
    label: 'Kode Bank',
    name: 'bankId',
    rules: yup
      .mixed()
      .test((value) => {
        return (
          typeof value === 'string' ||
          (typeof value === 'object' && value !== null && 'code' in value && 'text' in value)
        );
      })
      .required('Kode Bank is a required!')
  },
  groupBank: {
    label: 'Group Bank',
    name: 'group-bank',
    placeholder: 'Pilih Group Bank',
    rules: yup.string().required('Group Bank is a required!')
  },
  typeBank: {
    label: 'Tipe Bank',
    name: 'type-bank',
    placeholder: 'Pilih Group Bank',
    rules: yup.string().required('Tipe Bank is a required!')
  },
  schemaPendanaan: {
    label: 'Skema Pendanaan',
    name: 'schema-pendanaan',
    placeholder: 'Pilih Skema Pendanaan',
    rules: yup.string().required('Skema Pendanaan is a required!')
  },
  facilityPendanaan: {
    label: 'Fasilitas Pendanaan',
    name: 'facility-pendanaan',
    placeholder: 'Pilih Fasilitas Pendanaan',
    rules: yup.string().required('Fasilitas Pendanaan is a required!')
  },
  jenisPendanaan: {
    label: 'Jenis JF Pendanaan',
    name: 'jenis-pendanaan',
    placeholder: 'Pilih Jenis JF Pendanaan',
    rules: yup.string().required('Jenis Pendanaan is a required!')
  },
  typePembiayaan: {
    label: 'Tipe Pembiayaan',
    name: 'type-pembiayaan',
    placeholder: 'Pilih Tipe Pembiayaan',
    rules: yup.string().required('Tipe Pembiayaan is a required!')
  },
  jenisPembiayaan: {
    label: 'Jenis Pembiayaan',
    name: 'jenis-pembiayaan',
    placeholder: 'Pilih Jenis Pembiayaan',
    rules: yup.string().required('Jenis Pembiayaan is a required!')
  },
  statePendanaan: {
    label: 'State Pendanaan',
    name: 'state-pendanaan',
    placeholder: 'Pilih State Pendanaan',
    rules: yup.string().required('State Pendanaan is a required!')
  },
  nameBank: {
    label: 'Nama Bank',
    name: 'name-bank',
    placeholder: 'Masukkan Nama Bank',
    rules: yup.string().required('Nama Bank is a required!').min(3)
  },
  nameAccount: {
    label: 'Nama Account',
    name: 'name-account',
    placeholder: 'Masukkan Nama Account',
    rules: yup.string().required('Nama Account is a required!').min(3)
  },
  address1: {
    label: 'Alamat 1',
    name: 'address1',
    placeholder: 'Masukkan Alamat 1',
    rules: yup.string().required('Alamat is a required!').min(3)
  },
  address2: {
    label: 'Alamat 2',
    name: 'address2',
    placeholder: 'Masukkan Alamat 2',
    rules: yup.string().required('Alamat is a required!').min(3)
  },
  city: {
    label: 'Kota',
    name: 'city',
    placeholder: 'Masukkan Kota',
    rules: yup.string().required('Kota is a required!').min(3)
  },
  zipCode: {
    label: 'Kode Pos',
    name: 'zip-code',
    placeholder: 'Masukkan Kode Pos',
    rules: yup.string().required('Kode Pos is a required!').min(4)
  },
  pic: {
    label: 'PIC',
    name: 'pic',
    placeholder: 'Masukkan PIC',
    rules: yup.string().required('PIC is a required!').min(3)
  },
  phone1: {
    label: 'No Telpon 1',
    name: 'phone1',
    placeholder: 'Masukkan No Telepon',
    rules: yup.string().required('No Telepon is a required!').min(4)
  },
  phone2: {
    label: 'No Telpon 2',
    name: 'phone2',
    placeholder: 'Masukkan No Telepon',
    rules: yup.string().required('No Telepon is a required!').min(4)
  },
  faxPhone: {
    label: 'No FAX',
    name: 'fax',
    placeholder: 'Masukkan No FAX',
    rules: yup.string().min(4)
  },
  noAccount: {
    label: 'No Account',
    name: 'no-account',
    placeholder: 'Masukkan No Account',
    rules: yup.string().required('No Account is a required!')
  },
  typeAccount: {
    label: 'Tipe Account',
    name: 'type-account',
    placeholder: 'Masukkan Tipe Account',
    rules: yup.string().required('Tipe Account is a required!')
  },
  pv: {
    label: 'PV Contra Account',
    name: 'pv-account',
    placeholder: 'Masukkan PV Contra Account',
    rules: yup.string().required('PV Contra Account is a required!')
  },
  closeClock: {
    label: 'Jam Tutup',
    name: 'close-clock',
    placeholder: 'Pilih Zona Waktu',
    rules: yup.string().required('Zona Waktu is a required!')
  },
  time: {
    name: 'time',
    value: '00:00',
    rules: yup.string().required('Time is a required!')
  },
  portionDenda: {
    label: 'Porsi Denda',
    name: 'portion-denda',
    placeholder: 'Pilih Zona Waktu',
    rules: yup.string().required('Porsi Denda is a required!')
  },
  portionPendanaan: {
    label: 'Porsi Pendanaan',
    name: 'portion-pendanaan',
    placeholder: 'Pilih Porsi Pendanaan',
    rules: yup
      .mixed()
      .test((value) => {
        return typeof value === 'object' || (typeof value === 'object' && value !== null);
      })
      .required('Porsi Pendanaan is a required!')
  }
};

export const formPorsiDenda = {
  porsiDenda: {
    label: 'Porsi Denda',
    name: 'porsi-bank',
    placeholder: 'Masukkan Porsi Denda',
    rule: null
  },
  porsiAdmf: {
    label: 'Porsi ADMF',
    name: 'porsi-admf',
    placeholder: 'Porsi ADMF',
    rule: null
  },
  porsiDesc: {
    label: 'Deskripsi',
    name: 'porsi-desc',
    placeholder: 'Deskripsi',
    rule: null
  }
};

export const formGroupBank = {
  bankGroup: {
    label: 'Bank Group ID',
    name: 'group-id',
    placeholder: 'Masukkan / Pilih Bank Group',
    rule: yup
      .mixed()
      .test((value) => {
        return (
          typeof value === 'string' ||
          (typeof value === 'object' && value !== null && 'code' in value && 'text' in value)
        );
      })
      .nullable()
  },
  bankGroupName: {
    label: 'Bank Group Name',
    name: 'group-name',
    placeholder: 'Masukkan Bank Group Name',
    rule: yup.string().required().min(3)
  }
};

export const formBankCriteria = {
  advArr: {
    label: 'Advance/Arrear',
    name: 'adv-arr',
    placeholder: 'Pilih Advance / Arrear',
    rule: yup.string().required()
  },
  bankId: {
    label: 'Bank ID',
    name: 'bank-id',
    placeholder: 'Masukkan / Pilih Bank',
    rule: yup.object().required()
  },
  bankPortion: {
    label: 'Porsi Bank',
    name: 'bank-portion',
    placeholder: 'Pilih Porsi Bank',
    rule: yup.string().required()
  },
  bankSchema: {
    label: 'Schema',
    name: 'bank-schema',
    placeholder: 'Masukkan Schema',
    rule: yup.string().required()
  },
  effDate: {
    label: 'Tanggal Efektif',
    name: 'eff-date',
    placeholder: 'Pilih Tanggal Efektif',
    rule: yup.string().required().min(3)
  },
  instlType: {
    label: 'Tipe Installment',
    name: 'inst-type',
    placeholder: 'Pilih Tipe Installment',
    rule: yup.string().required()
  },
  landingRate: {
    label: 'Landing Rate',
    name: 'landing-rate',
    placeholder: 'Pilih Landing Rate',
    rule: yup.string().required()
  },
  maxAge: {
    label: 'Umur Max Customer',
    name: 'max-age',
    placeholder: 'Masukkan Umur Max Customer',
    rule: yup.string().required()
  },
  maxAmount: {
    label: 'Pembiayaan Max',
    name: 'max-amount',
    placeholder: 'Masukkan Pembiayaan Max',
    rule: yup.string().required()
  },
  maxTop: {
    label: 'Top Max',
    name: 'top-max',
    placeholder: 'Masukkan Top Max',
    rule: yup.string().required().min(3)
  },
  minAge: {
    label: 'Umur Min Customer',
    name: 'min-age',
    placeholder: 'Masukkan Umur Min Customer',
    rule: yup.string().required().min(3)
  },
  minDp: {
    label: "Down Payment (Minimum in %)",
    name: "down-payment",
    placeholder: "Masukkan Down Payment",
    rule: yup.string().required().min(3)
  },
  minTop: {
    label: 'Top Min',
    name: 'top-min',
    placeholder: 'Masukkan Top Min',
    rule: yup.string().required().min(3)
  },
  objtClass: {
    label: 'Objek Class',
    name: 'class-object',
    placeholder: 'Pilih Objek Class',
    rule: yup.string().required()
  },
  objtGroup: {
    label: 'Objek Group',
    name: 'group-object',
    placeholder: 'Pilih Objek Group',
    rule: yup.string().required()
  },
  objtMaxAge: {
    label: 'Usia Max Kendaraan',
    name: 'object-age',
    placeholder: 'Masukkan Usia Max Kendaraan',
    rule: yup.string().required().min(3)
  },
  subBank: {
    label: 'Sub Bank',
    name: 'sub-bank',
    placeholder: 'Pilih Sub Bank',
    rule: yup.string().required().min(3)
  }
};

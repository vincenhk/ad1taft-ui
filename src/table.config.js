/*
 * Setup Table Columns
 * */

export const tblOption = {
  info: false,
  select: true,
  scrollX: true
};

export const columnsConfig = {
  tblPorsiBank: [
    {
      width: '5%',
      data: null,
      render: (data, type, row, meta) => {
        return meta.row + 1; // Incrementing index based on row number
      },
      title: 'No.'
    },
    {
      width: '10%',
      data: 'portionId',
      title: 'ID'
    },
    {
      width: '20%',
      data: 'portionBank',
      title: 'Porsi Bank'
    },
    {
      width: '20%',
      data: 'admfPortion',
      title: 'Porsi ADMF'
    },
    {
      width: '30%',
      data: 'portionDesc',
      title: 'Deskripsi'
    },
    {
      width: '10%',
      data: null,
      render: '#action',
      title: 'Action'
    }
  ],
  tblPorsiDenda: [
    {
      width: '5%',
      data: null,
      render: (data, type, row, meta) => {
        return meta.row + 1; // Incrementing index based on row number
      },
      title: 'No.'
    },
    {
      width: '10%',
      data: 'portionId',
      title: 'ID'
    },
    {
      width: '20%',
      data: 'bankPortion',
      title: 'Porsi Bank'
    },
    {
      width: '20%',
      data: 'admfPortion',
      title: 'Porsi ADMF'
    },
    {
      width: '30%',
      data: 'portionDesc',
      title: 'Deskripsi'
    },
    {
      width: '10%',
      data: null,
      render: '#action',
      title: 'Action'
    }
  ],
  tblBankGroup: [
    {
      width: '5%',
      data: null,
      render: (data, type, row, meta) => {
        return meta.row + 1; // Incrementing index based on row number
      },
      title: 'No.'
    },
    {
      width: '10%',
      data: 'bankGroupId',
      title: 'ID'
    },
    {
      width: '20%',
      data: 'bankGroupName',
      title: 'Group Bank Name'
    },
    {
      width: '20%',
      data: 'bankDeleted',
      title: 'Status'
    },
  ],
  tblDetailCOF: [
    {
      width: '20px',
      data: null,
      render: (data, type, row, meta) => {
        return meta.row + 1; // Incrementing index based on row number
      },
      title: 'No.'
    },
    {
      width: '60px',
      data: 'fundType',
      title: 'Tipe Object'
    },
    {
      width: '100px',
      data: 'fundBrandIncld',
      title: 'Merk Objek'
    },
    {
      width: '60px',
      data: 'fundMkppId',
      title: 'MKPP ID'
    },
    {
      width: '60px',
      data: 'fundProductMatrix',
      title: 'Produk Matrix'
    },
    {
      width: '70px',
      data: 'fundBankRateTop12',
      title: 'Bank Rate TOP 1-12'
    },
    {
      width: '70px',
      data: 'fundBankRateTop24',
      title: 'Bank Rate TOP 13-24'
    },
    {
      width: '70px',
      data: 'fundBankRateTop36',
      title: 'Bank Rate TOP 25-36'
    },
    {
      width: '70px',
      data: 'fundBankRateTop48',
      title: 'Bank Rate TOP 37-48'
    },
    {
      width: '70px',
      data: 'fundBankRateTop60',
      title: 'Bank Rate TOP 49-60'
    },
    {
      width: '70px',
      data: 'fundBankRateTop61',
      title: 'Bank Rate TOP >60'
    },
  ]
};

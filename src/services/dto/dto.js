const dto = {
  bankDto: {
    bankBrId: { required: true },
    dataBankId: { required: true },
    dataBankName: { required: true },
    bankBrAddr1: { required: true },
    bankBrAddr2: { required: true },
    bankCity: { required: true },
    bankZip: { required: true },
    bankPic: { required: true },
    bbrhTel1: { required: true },
    bbrhTel2: { required: true },
    bbrhFax: { required: true },
    bankAccno: { required: true },
    bankAccType: { required: true },
    bankPvContraAcct: { required: true },
    bankCloseTime: { required: true },
    bankGroup: { required: true },
    bankFinType: { required: true },
    bankSchema: { required: true },
    bankJenPembiayaan: { required: true },
    bankSubBank: { required: false },
    bankStatePendanaan: { required: true },
    bankFasilityPendanaan: { required: true },
    bankJenisJf: { required: true },
    bankDendaPortion: { required: true },
    bankAcctName: { required: true },
    nik: { required: true },
    bankType: { required: true },
    listporsibank: [
      {
        dataBankId: { required: true },
        portionId: { required: true }
      }
    ]
  },
  bankDetailDto: {
    bankBrId: { required: true },
    dataBankId: { required: true }
  },
  porsiBankDto: {
    dataBankId: { required: true }
  },
  savePorsiDendaDto: {
    bankPortion: { required: true },
    admfPortion: { required: true },
    portionDesc: { required: true },
    nik: { required: true }
  },
  deletePorsiDendaDto: {
    bankPortion: { required: true },
    admfPortion: { required: true },
    portionDesc: { required: true },
    portionId: { required: true },
    nik: { required: true }
  },
  activityGroupBankDto: {
    bankGroupId: { required: true },
    bankGroupName: { required: true },
    nik: { required: true }
  },
  getSubBankByBank: {
    dataBankId: { required: true }
  },
  getDetailCofDto: {
    bankId: { required: true },
    subBank: { required: true },
    objectGroup: { required: true },
    objectClass: { required: true }
  },
  getClassObjectDto: {
    groupObjectCode: { type: String, required: true }
  },
  getCofHeaderDetailDto: {
    bankSchema: { required: true },
    bankId: { required: true },
    subBank: { required: true },
    objectGroup: { required: true },
    objectClass: { required: true }
  },
  getPortionBankByBankDto: {
    dataBankId: { required: true },
    bankSchema: { required: true },
  }
};

export default dto;

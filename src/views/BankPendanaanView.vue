<script setup>
import TitleMenu from '@/components/TitleMenu.vue';
import { onMounted, ref, getCurrentInstance } from 'vue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import { Form, Field } from 'vee-validate';
import { existAttr, existGroup, useLocalStorage } from '@/utils/local-storage.utils.js';
import {
  deleteParaBank,
  getDetailBank,
  getJenisJF,
  getJenisPembiayaan,
  getPorsiBankbyId,
  getSchemaPendanaan,
  getStatePendanaan,
  getTimeZone,
  getTypeBank,
  getTypePembiayaan,
  saveParaBank,
  updateParaBank
} from '@/services/bank-pendanaan.service.js';
import { formPendanaan } from '../utils/forms.utils.js';
import { getNikLog } from '@/services/common/common.service.js';
import {
  confirmDialog,
  confirmDialogNotif,
  iconNotif,
  showNotification,
  titleNotif
} from '@/general.alert.js';

/**
 * Get User and get proxy from Parent value
 * */
const { proxy } = getCurrentInstance();

/* List variable compound data*/
const listGroup = ref([]);
const listBank = ref([]);
const listTypeBank = ref([]);
const listSchemaPend = ref([]);
const listFacility = ref([]);
const listJenisJF = ref([]);
const listTipePembiayaan = ref([]);
const listJenisPembiayaan = ref([]);
const listStatePendanaan = ref([]);
const listPorsiDenda = ref([]);
const listTimeZone = ref([]);
const listBankPortion = ref([]);

/**
 * Button variant active
 * @type {Ref<UnwrapRef<boolean>>}
 */
const isActiveSave = ref(true);
const isActiveUpdate = ref(false);
const isActiveDelete = ref(false);

/**
 * Initialize form and set the initial value for branchCode
 * */
const initialValue = ref({
  [formPendanaan.branchCode.name]: formPendanaan.branchCode.value
});

/**
 * Filter Numeric for use few input there just need number but hold type text.
 * */
function filterNumeric(event) {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
}

/**
 * Controller Input, if inserted bank was not found in existing data
 */
const isVisibleInput = ref(false);

/**
 * Controller method for turning BankId from select-option to input with bank is not register min length 3
 * @param event , use $event from html to catch eventHandler from activity HTML
 */
function bankChangeStyle(event) {
  const bank = event.target ? event.target.value : event.code;
  const hasDigit = /[0-9]/;
  if (bank.length === 3 && hasDigit.test(bank)) {
    const found = listBank.value.some((x) => {
      return x.code === bank;
    });
    if (!found) {
      isVisibleInput.value = true;
      initialValue.value = {
        // ...initialValue.value,
        [formPendanaan.branchCode.name]: [formPendanaan.branchCode.value],
        [formPendanaan.bankCode.name]: bank
      };
      isActiveSave.value = true;
      isActiveUpdate.value = false;
      isActiveDelete.value = false;
    }
  }
}

/**
 * Get All Bank Selected it will call all attribute there saved before
 * @param bankCode
 * @returns {Promise<void>}
 */
async function getAllBankSelect(bankCode) {
  if (bankCode.code) {
    const res = await getDetailBank({ bankBrId: '0000', dataBankId: bankCode.code });
    const bankPortion = await getPorsiBankbyId({ dataBankId: bankCode.code });
    if (res) {
      const timeClose = res.bankCloseTime.split(' ');
      initialValue.value = {
        ...initialValue.value,
        [formPendanaan.bankCode.name]: bankCode,
        [formPendanaan.groupBank.name]: res.bankGroup.trim(),
        [formPendanaan.typeBank.name]: res.bankFinType.trim(),
        [formPendanaan.schemaPendanaan.name]: res.bankSchema.trim(),
        [formPendanaan.facilityPendanaan.name]: res.bankFasilityPendanaan.trim(),
        [formPendanaan.jenisPendanaan.name]: res.bankJenisJf.trim(),
        [formPendanaan.typePembiayaan.name]: res.bankFinType.trim(),
        [formPendanaan.jenisPembiayaan.name]: res.bankJenPembiayaan.trim(),
        [formPendanaan.statePendanaan.name]: res.bankStatePendanaan.trim(),
        [formPendanaan.nameBank.name]: res.dataBankName.trim(),
        [formPendanaan.nameAccount.name]: res.bankAcctName.trim(),
        [formPendanaan.address1.name]: res.bankBrAddr1.trim(),
        [formPendanaan.address2.name]: res.bankBrAddr2.trim(),
        [formPendanaan.city.name]: res.bankCity.trim(),
        [formPendanaan.zipCode.name]: res.bankZip.trim(),
        [formPendanaan.pic.name]: res.bankPic.trim(),
        [formPendanaan.phone1.name]: res.bbrhTel1.trim(),
        [formPendanaan.phone2.name]: res.bbrhTel2.trim(),
        [formPendanaan.faxPhone.name]: res.bbrhFax.trim(),
        [formPendanaan.noAccount.name]: res.bankAccno.trim(),
        [formPendanaan.typeAccount.name]: res.bankAccType.trim(),
        [formPendanaan.pv.name]: res.bankPvContraAcct.trim(),
        [formPendanaan.time.name]: timeClose[0].trim()
          ? timeClose[0].length < 2
            ? `0${timeClose[0].toString()}:00`
            : timeClose[0].length === 2
              ? `${timeClose[0].toString()}:00`
              : timeClose[0].includes(':')
                ? timeClose[0]
                : '00:00'
          : '00:00'.trim(),
        [formPendanaan.closeClock.name]: timeClose[1]
          ? listTimeZone.value.find((x) => x.desc === timeClose[1]).id
          : ''.trim(),
        [formPendanaan.portionDenda.name]: res.bankDendaPortion.substring(0, 2).trim(),
        [formPendanaan.portionPendanaan.name]: bankPortion.map((x) => ({
          code: x.portionId,
          text: x.portionDesc
        }))
      };
      isActiveSave.value = false;
      isActiveUpdate.value = true;
      isActiveDelete.value = true;
    }
  }
}

function buildPayload(valueField) {
  /** This code for rebuild clock */
  const clock = `${valueField[formPendanaan.time.name]} ${
    listTimeZone.value.find((x) => {
      return x.id === valueField[formPendanaan.closeClock.name];
    }).desc
  }`;

  /** accommodate bank to check the type is object or string */
  const bank = valueField[formPendanaan.bankCode.name].code;

  /** create new object mapping for listPorsi to suitable with json API */
  const listPorsiBank = valueField[formPendanaan.portionPendanaan.name].map((x) => ({
    dataBankId: bank ? bank : valueField[formPendanaan.bankCode.name],
    portionId: x.code
  }));
  console.log('listPorsiBank', listPorsiBank);

  /** Creating payload */
  const payload = {
    bankBrId: valueField[formPendanaan.branchCode.name].slice(0, 4),
    dataBankId:
      typeof valueField[formPendanaan.bankCode.name] === 'object'
        ? valueField[formPendanaan.bankCode.name].code
        : valueField[formPendanaan.bankCode.name],
    dataBankName: valueField[formPendanaan.nameBank.name],
    bankBrAddr1: valueField[formPendanaan.address1.name],
    bankBrAddr2: valueField[formPendanaan.address2.name],
    bankCity: valueField[formPendanaan.city.name],
    bankZip: valueField[formPendanaan.zipCode.name],
    bankPic: valueField[formPendanaan.pic.name],
    bbrhTel1: valueField[formPendanaan.phone1.name],
    bbrhTel2: valueField[formPendanaan.phone2.name],
    bbrhFax: valueField[formPendanaan.faxPhone.name],
    bankAccno: valueField[formPendanaan.noAccount.name],
    bankAccType: valueField[formPendanaan.typeBank.name],
    bankPvContraAcct: valueField[formPendanaan.pv.name],
    bankCloseTime: clock,
    bankGroup: valueField[formPendanaan.groupBank.name],
    bankFinType: valueField[formPendanaan.typePembiayaan.name],
    bankSchema: valueField[formPendanaan.schemaPendanaan.name],
    bankJenPembiayaan: valueField[formPendanaan.jenisPembiayaan.name],
    bankSubBank: '',
    bankStatePendanaan: valueField[formPendanaan.statePendanaan.name],
    bankFasilityPendanaan: valueField[formPendanaan.facilityPendanaan.name],
    bankJenisJf: valueField[formPendanaan.jenisPendanaan.name],
    bankDendaPortion: valueField[formPendanaan.portionDenda.name],
    bankAcctName: valueField[formPendanaan.nameAccount.name],
    nik: getNikLog(proxy),
    bankType: valueField[formPendanaan.typeBank.name],
    listporsibank: listPorsiBank
  };
  return payload;
}

/**
 * Handler save with validate there need parameter of values there was saved in vee Validate.
 * @param values , value from field vee validate
 * @param validate , validate condition form
 * @returns {Promise<void>}
 */
const handleSaveValidate = async (values, validate) => {
  const isValid = await validate();
  if (isValid.valid) {
    const payload = buildPayload(values);
    confirmDialog
      .showDialog({
        type: confirmDialogNotif.SAVE
      })
      .then(async (res) => {
        if (res === 'onOk') {
          const response = await saveParaBank(payload);
          if (response.includes('SUKSES')) {
            showNotification({
              title: titleNotif.SUCCESS,
              message: response,
              type: iconNotif.SUCCESS
            });
          } else {
            showNotification({
              title: titleNotif.ERROR,
              message: response,
              type: iconNotif.ERROR
            });
          }
        }
      });
  } else {
    console.log('Form validation failed.');
  }
};

/**
 * Handler update with validate there need parameter of values there was saved in vee Validate.
 * @param values
 * @param validate
 * @returns {Promise<void>}
 */
const handleUpdateValidate = async (values, validate) => {
  const isValid = await validate();
  if (isValid) {
    const payload = buildPayload(values);
    confirmDialog
      .showDialog({
        type: confirmDialogNotif.UPDATE
      })
      .then(async (res) => {
        if (res === 'onOk') {
          const response = await updateParaBank(payload);
          if (response === 'SUKSES') {
            showNotification({
              title: titleNotif.SUCCESS,
              message: response,
              type: iconNotif.SUCCESS
            });
          } else {
            showNotification({
              title: titleNotif.ERROR,
              message: response,
              type: iconNotif.ERROR
            });
          }
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }
};

/**
 * Handler delete with validate there need parameter of values there was saved in vee Validate.
 * @param values
 * @param validate
 * @returns {Promise<void>}
 */
const handleDeleteValidate = async (values, validate) => {
  const isValid = await validate();
  if (isValid) {
    const payload = buildPayload(values);
    confirmDialog
      .showDialog({
        type: confirmDialogNotif.DELETE
      })
      .then(async (res) => {
        if (res === 'onOk') {
          const response = await deleteParaBank(payload);
          if (response === 'SUKSES') {
            showNotification({
              title: titleNotif.SUCCESS,
              message: response,
              type: iconNotif.SUCCESS
            });
          } else {
            showNotification({
              title: titleNotif.ERROR,
              message: response,
              type: iconNotif.ERROR
            });
          }
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }
};

/**
 * Setup Start form
 */
function handlerResetForm() {
  isVisibleInput.value = false;
  initialValue.value = {
    [formPendanaan.branchCode.name]: formPendanaan.branchCode.value
  };
  isActiveSave.value = true;
  isActiveUpdate.value = false;
  isActiveDelete.value = false;
}

/**
 * Set the default value for branchCode when the component is mounted
 * */
onMounted(async () => {
  // const res = await getDetailBank({dataBankId: '124', bankBrId: "0000"})
  /* Mount Setelah Login */
  listGroup.value = useLocalStorage.getItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_GROUP_BANK);
  listBank.value = useLocalStorage
    .getItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_BANK)
    .map((x) => ({
      code: x.dataBankId,
      text: `${x.dataBankId} - ${x.dataBankName}`
    }));
  listFacility.value = useLocalStorage.getItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_FACILITY);
  listPorsiDenda.value = useLocalStorage.getItem(
    existGroup.PARAM_GLOBAL,
    existAttr.PARAM_PORSI_DENDA
  );
  listBankPortion.value = useLocalStorage
    .getItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_PORSI_BANK)
    .map((x) => ({
      code: x.portionId,
      text: `${x.portionId} - ${x.portionDesc}`
    }));

  listTypeBank.value = getTypeBank();
  listSchemaPend.value = getSchemaPendanaan();
  listJenisJF.value = getJenisJF();
  listTipePembiayaan.value = getTypePembiayaan();
  listJenisPembiayaan.value = getJenisPembiayaan();
  listStatePendanaan.value = getStatePendanaan();
  listTimeZone.value = getTimeZone();
});
</script>

<template>
  <div class="p-4 sm:ml-64">
    <div class="p-5 border-2 border-gray-200 border-dashed rounded-lg mt-14">
      <!-- Title Menu -->
      <TitleMenu :icon="['fas', 'sliders']" :title="'Bank Pendanaan'" />
      <div class="mt-5">
        <div class="rounded-xl text-xs p-5 pt-7 bg-white">
          <Form
            id="formPara"
            :key="initialValue"
            v-slot="{ validate, values }"
            :initial-values="initialValue"
          >
            <div class="grid grid-cols-2 gap-6">
              <div class="col-span-1 space-y-3">
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.branchCode.name">
                      {{ formPendanaan.branchCode.label }}
                    </label>
                  </div>
                  <Field :name="formPendanaan.branchCode.name" v-slot="{ field }">
                    <input
                      type="text"
                      v-bind="field"
                      class="form-style bg-gray-50 border col-span-3"
                      readonly
                    />
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.bankCode.name" class="">
                      {{ formPendanaan.bankCode.label }}</label
                    >
                  </div>
                  <Field
                    v-if="!isVisibleInput"
                    class="col-span-3"
                    :name="formPendanaan.bankCode.name"
                    :rules="formPendanaan.bankCode.rules"
                    v-slot="{ field, handleChange, errors }"
                  >
                    <multiselect
                      v-model="field.value"
                      @update:modelValue="handleChange"
                      :options="listBank"
                      placeholder="Pilih Bank"
                      label="text"
                      track-by="code"
                      :show-labels="false"
                      @keydown.enter="bankChangeStyle($event)"
                      @select="[bankChangeStyle($event), getAllBankSelect($event)]"
                      class="form-style text-xs col-span-3"
                    />
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                  <Field v-else :name="formPendanaan.bankCode.name" v-slot="{ field }">
                    <input
                      v-bind="field"
                      type="text"
                      :id="formPendanaan.bankCode.name"
                      class="form-style bg-gray-50 border col-span-3"
                      readonly
                    />
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.groupBank.label" class=""> Group Bank</label>
                  </div>
                  <Field
                    :name="formPendanaan.groupBank.name"
                    :rules="formPendanaan.groupBank.rules"
                    v-slot="{ field, handleBlur, errors }"
                  >
                    <select
                      class="border-gray-300 w-full rounded bg-gray-50 border col-span-3 text-xs p-1.5"
                      v-bind="field"
                      :value="field.value"
                      @blur="handleBlur"
                    >
                      <option value="" disabled>{{ formPendanaan.groupBank.placeholder }}</option>
                      <option
                        v-for="group in listGroup"
                        :value="group.bankGroupId"
                        :key="group.bankGroupId"
                      >
                        {{ `${group.bankGroupId} - ${group.bankGroupName}` }}
                      </option>
                    </select>
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.typeBank.name" class="">{{
                      formPendanaan.typeBank.label
                    }}</label>
                  </div>
                  <Field
                    :name="formPendanaan.typeBank.name"
                    :rules="formPendanaan.typeBank.rules"
                    v-slot="{ field, errors }"
                  >
                    <select
                      class="border-gray-300 w-full rounded bg-gray-50 border col-span-3 text-xs p-1.5"
                      v-bind="field"
                    >
                      <option value="" disabled selected>
                        {{ formPendanaan.typeBank.placeholder }}
                      </option>
                      <option v-for="type in listTypeBank" :value="type.id" :key="type.id">
                        {{ `${type.id} - ${type.desc}` }}
                      </option>
                    </select>
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.schemaPendanaan.name" class="">
                      {{ formPendanaan.schemaPendanaan.label }}</label
                    >
                  </div>
                  <Field
                    :name="formPendanaan.schemaPendanaan.name"
                    :rules="formPendanaan.schemaPendanaan.rules"
                    v-slot="{ field, errors }"
                  >
                    <select
                      class="border-gray-300 w-full rounded bg-gray-50 border col-span-3 text-xs p-1.5"
                      v-bind="field"
                    >
                      <option value="" disabled selected>
                        {{ formPendanaan.schemaPendanaan.placeholder }}
                      </option>
                      <option v-for="schema in listSchemaPend" :value="schema.id" :key="schema.id">
                        {{ `${schema.id} - ${schema.desc}` }}
                      </option>
                    </select>
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.facilityPendanaan.name" class="">
                      {{ formPendanaan.facilityPendanaan.label }}</label
                    >
                  </div>
                  <Field
                    :name="formPendanaan.facilityPendanaan.name"
                    :rules="formPendanaan.facilityPendanaan.rules"
                    v-slot="{ field, errors }"
                  >
                    <select
                      class="border-gray-300 w-full rounded bg-gray-50 border col-span-3 text-xs p-1.5"
                      v-bind="field"
                    >
                      <option value="" disabled selected>
                        {{ formPendanaan.facilityPendanaan.placeholder }}
                      </option>
                      <option
                        v-for="facility in listFacility"
                        :value="facility.idFacility"
                        :key="facility.idFacility"
                      >
                        {{ `${facility.idFacility} - ${facility.descFacility}` }}
                      </option>
                    </select>
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.jenisPendanaan.name">
                      {{ formPendanaan.jenisPendanaan.label }}</label
                    >
                  </div>
                  <Field
                    :name="formPendanaan.jenisPendanaan.name"
                    :rules="formPendanaan.jenisPendanaan.rules"
                    v-slot="{ field, errors }"
                  >
                    <select
                      class="border-gray-300 w-full rounded bg-gray-50 border col-span-3 text-xs p-1.5"
                      v-bind="field"
                    >
                      <option value="" disabled selected>
                        {{ formPendanaan.jenisPendanaan.placeholder }}
                      </option>
                      <option v-for="jenis in listJenisJF" :value="jenis.id" :key="jenis.id">
                        {{ `${jenis.id} - ${jenis.desc}` }}
                      </option>
                    </select>
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.typePembiayaan.name" class="">
                      {{ formPendanaan.typePembiayaan.label }}</label
                    >
                  </div>
                  <Field
                    :name="formPendanaan.typePembiayaan.name"
                    :rules="formPendanaan.typePembiayaan.rules"
                    v-slot="{ field, errors }"
                  >
                    <select
                      class="border-gray-300 w-full rounded bg-gray-50 border col-span-3 text-xs p-1.5"
                      v-bind="field"
                    >
                      <option value="" disabled selected>
                        {{ formPendanaan.typePembiayaan.placeholder }}
                      </option>
                      <option v-for="x in listTipePembiayaan" :value="x.id" :key="x.id">
                        {{ `${x.id} - ${x.desc}` }}
                      </option>
                    </select>
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.jenisPembiayaan.name">
                      {{ formPendanaan.jenisPembiayaan.label }}</label
                    >
                  </div>
                  <Field
                    :name="formPendanaan.jenisPembiayaan.name"
                    :rules="formPendanaan.jenisPembiayaan.rules"
                    v-slot="{ field, errors }"
                  >
                    <select
                      class="border-gray-300 w-full rounded bg-gray-50 border col-span-3 text-xs p-1.5"
                      v-bind="field"
                    >
                      <option value="" disabled selected>
                        {{ formPendanaan.jenisPembiayaan.placeholder }}
                      </option>
                      <option v-for="x in listJenisPembiayaan" :value="x.id" :key="x.id">
                        {{ `${x.id} - ${x.desc}` }}
                      </option>
                    </select>
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.statePendanaan.name" class="">
                      {{ formPendanaan.statePendanaan.label }}</label
                    >
                  </div>
                  <Field
                    :name="formPendanaan.statePendanaan.name"
                    :rules="formPendanaan.statePendanaan.rules"
                    v-slot="{ field, errors }"
                  >
                    <select
                      :id="formPendanaan.statePendanaan.name"
                      class="border-gray-300 w-full rounded bg-gray-50 border col-span-3 text-xs p-1.5"
                      v-bind="field"
                    >
                      <option value="" disabled selected>
                        {{ formPendanaan.statePendanaan.placeholder }}
                      </option>
                      <option v-for="x in listStatePendanaan" :value="x.id" :key="x.id">
                        {{ `${x.id} - ${x.desc}` }}
                      </option>
                    </select>
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.nameBank.name">
                      {{ formPendanaan.nameBank.label }}</label
                    >
                  </div>
                  <Field
                    :name="formPendanaan.nameBank.name"
                    :rules="formPendanaan.nameBank.rules"
                    v-slot="{ field, handleChange, errors }"
                  >
                    <input
                      :id="formPendanaan.nameBank.name"
                      type="text"
                      v-bind="field"
                      class="form-style border col-span-3"
                      :placeholder="formPendanaan.nameBank.placeholder"
                      @input="handleChange"
                    />
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.nameAccount.name" class="">
                      {{ formPendanaan.nameAccount.label }}
                    </label>
                  </div>
                  <Field
                    :name="formPendanaan.nameAccount.name"
                    :rules="formPendanaan.nameAccount.rules"
                    v-slot="{ field, handleChange, errors }"
                  >
                    <input
                      :id="formPendanaan.nameAccount.name"
                      type="text"
                      v-bind="field"
                      class="form-style border col-span-3"
                      :placeholder="formPendanaan.nameAccount.placeholder"
                      @input="handleChange"
                    />
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <label :for="formPendanaan.address1.name" class="">
                    {{ formPendanaan.address1.label }}</label
                  >
                  <Field
                    :name="formPendanaan.address1.name"
                    :rules="formPendanaan.address1.rules"
                    v-slot="{ field, handleChange, errors }"
                  >
                    <textarea
                      :id="formPendanaan.address1.name"
                      class="text-xs p-1.5 border resize rounded col-span-3"
                      @input="handleChange"
                      v-bind="field"
                      :placeholder="formPendanaan.address1.placeholder"
                    ></textarea>
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <label :for="formPendanaan.address2.name">
                    {{ formPendanaan.address2.label }}</label
                  >
                  <Field
                    :name="formPendanaan.address2.name"
                    :rules="formPendanaan.address2.rules"
                    v-slot="{ field, handleChange, errors }"
                  >
                    <textarea
                      :id="formPendanaan.address2.name"
                      class="text-xs p-1.5 border resize rounded col-span-3"
                      v-bind="field"
                      @input="handleChange"
                      :placeholder="formPendanaan.address2.placeholder"
                    ></textarea>
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.city.name"> {{ formPendanaan.city.label }}</label>
                  </div>
                  <Field
                    :name="formPendanaan.city.name"
                    :rules="formPendanaan.city.rules"
                    v-slot="{ field, handleChange, errors }"
                  >
                    <input
                      type="text"
                      v-bind="field"
                      class="form-style border col-span-3"
                      :placeholder="formPendanaan.city.placeholder"
                      @input="handleChange"
                    />
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
              </div>
              <div class="col-span-1 space-y-3">
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.zipCode.name" class="">
                      {{ formPendanaan.zipCode.label }}</label
                    >
                  </div>
                  <Field
                    :name="formPendanaan.zipCode.name"
                    :rules="formPendanaan.zipCode.rules"
                    v-slot="{ field, handleChange, errors }"
                  >
                    <input
                      :id="formPendanaan.zipCode.name"
                      type="text"
                      inputmode="numeric"
                      class="numeric-input form-style border col-span-3"
                      :placeholder="formPendanaan.zipCode.placeholder"
                      @input="
                        filterNumeric($event);
                        handleChange($event);
                      "
                      v-bind="field"
                    />
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.pic.name" class="">
                      {{ formPendanaan.pic.label }}</label
                    >
                  </div>
                  <Field
                    :name="formPendanaan.pic.name"
                    :rules="formPendanaan.pic.rules"
                    v-slot="{ field, handleChange, errors }"
                  >
                    <input
                      :id="formPendanaan.pic.name"
                      type="text"
                      v-bind="field"
                      class="form-style border col-span-3"
                      :placeholder="formPendanaan.pic.placeholder"
                      @input="handleChange"
                    />
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.phone1.name">
                      {{ formPendanaan.phone1.label }}</label
                    >
                  </div>
                  <Field
                    :name="formPendanaan.phone1.name"
                    :rules="formPendanaan.phone1.rules"
                    v-slot="{ field, handleChange, errors }"
                  >
                    <input
                      :id="formPendanaan.phone1.name"
                      type="tel"
                      v-bind="field"
                      inputmode="numeric"
                      class="numeric-input form-style border col-span-3"
                      :placeholder="formPendanaan.phone1.placeholder"
                      @input="
                        filterNumeric($event);
                        handleChange($event);
                      "
                    />
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.phone2.name">
                      {{ formPendanaan.phone2.label }}</label
                    >
                  </div>
                  <Field
                    :name="formPendanaan.phone2.name"
                    :rules="formPendanaan.phone2.rules"
                    v-slot="{ field, handleChange, errors }"
                  >
                    <input
                      :id="formPendanaan.phone2.name"
                      type="text"
                      v-bind="field"
                      inputmode="numeric"
                      class="numeric-input form-style border col-span-3"
                      :placeholder="formPendanaan.phone2.placeholder"
                      @input="
                        filterNumeric($event);
                        handleChange($event);
                      "
                    />
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.faxPhone.name" class="">
                      {{ formPendanaan.faxPhone.label }}</label
                    >
                  </div>
                  <Field
                    :name="formPendanaan.faxPhone.name"
                    :rules="formPendanaan.faxPhone.rules"
                    v-slot="{ field, handleChange, errors }"
                  >
                    <input
                      :id="formPendanaan.faxPhone.name"
                      v-bind="field"
                      type="text"
                      inputmode="numeric"
                      class="numeric-input form-style border col-span-3"
                      :placeholder="formPendanaan.faxPhone.placeholder"
                      @input="
                        filterNumeric($event);
                        handleChange($event);
                      "
                    />
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.noAccount.name">
                      {{ formPendanaan.noAccount.label }}</label
                    >
                  </div>
                  <Field
                    :name="formPendanaan.noAccount.name"
                    :rules="formPendanaan.noAccount.rules"
                    v-slot="{ field, handleChange, errors }"
                  >
                    <input
                      :id="formPendanaan.noAccount.name"
                      type="text"
                      inputmode="numeric"
                      v-bind="field"
                      class="numeric-input form-style border col-span-3"
                      :placeholder="formPendanaan.noAccount.placeholder"
                      @input="
                        filterNumeric($event);
                        handleChange($event);
                      "
                    />
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.typeAccount.name" class="">
                      {{ formPendanaan.typeAccount.label }}</label
                    >
                  </div>
                  <Field
                    :name="formPendanaan.typeAccount.name"
                    :rules="formPendanaan.typeAccount.rules"
                    v-slot="{ field, handleChange, errors }"
                  >
                    <input
                      :id="formPendanaan.typeAccount.name"
                      v-bind="field"
                      type="text"
                      class="form-style border col-span-3"
                      :placeholder="formPendanaan.typeAccount.placeholder"
                      @input="handleChange"
                    />
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.pv.name" class="">
                      {{ formPendanaan.pv.label }}</label
                    >
                  </div>
                  <Field
                    :name="formPendanaan.pv.name"
                    :rules="formPendanaan.pv.rules"
                    v-slot="{ field, handleChange, errors }"
                  >
                    <input
                      :id="formPendanaan.pv.name"
                      type="text"
                      v-bind="field"
                      class="form-style border col-span-3"
                      :placeholder="formPendanaan.pv.placeholder"
                      @input="handleChange"
                    />
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.closeClock.name" class="">
                      {{ formPendanaan.closeClock.label }}</label
                    >
                  </div>
                  <div class="col-span-3">
                    <Field
                      :name="formPendanaan.closeClock.name"
                      :rules="formPendanaan.closeClock.rules"
                      v-slot="{ field, errors }"
                    >
                      <div class="grid grid-cols-2 gap-2">
                        <div class="relative">
                          <div
                            class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"
                          >
                            <svg
                              class="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>

                          <input
                            type="time"
                            :id="formPendanaan.time.name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded w-full p-1.5"
                            value="00:00"
                          />
                        </div>
                        <select
                          class="border-gray-300 w-full rounded bg-gray-50 border text-xs p-1.5"
                          v-bind="field"
                        >
                          <option value="" disabled selected>
                            {{ formPendanaan.closeClock.placeholder }}
                          </option>
                          <option v-for="x in listTimeZone" :value="x.id" :key="x.id">
                            {{ `${x.id} - ${x.desc}` }}
                          </option>
                        </select>
                      </div>
                      <span class="col-span-1"></span>
                      <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                        errors[0]
                      }}</span>
                    </Field>
                  </div>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label for="porsi-denda" class=""> Porsi Denda</label>
                  </div>
                  <Field
                    :name="formPendanaan.portionDenda.name"
                    :rules="formPendanaan.portionDenda.rules"
                    v-slot="{ field, errors }"
                  >
                    <select
                      class="border-gray-300 w-full rounded bg-gray-50 border col-span-3 text-xs p-1.5"
                      v-bind="field"
                    >
                      <option value="" disabled selected>Pilih Porsi Denda</option>
                      <option v-for="x in listPorsiDenda" :value="x.portionId" :key="x.portionId">
                        {{ `${x.portionId} - ${x.portionDesc}` }}
                      </option>
                    </select>
                    <span class="col-span-1"></span>
                    <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                      errors[0]
                    }}</span>
                  </Field>
                </div>
                <div class="grid grid-cols-4 w-full">
                  <div class="flex items-center">
                    <label :for="formPendanaan.portionPendanaan.name">
                      {{ formPendanaan.portionPendanaan.label }}</label
                    >
                  </div>
                  <div class="col-span-3">
                    <Field
                      class="col-span-3"
                      :name="formPendanaan.portionPendanaan.name"
                      :rules="formPendanaan.portionPendanaan.rules"
                      v-slot="{ field, handleChange, errors }"
                    >
                      <Multiselect
                        v-model="field.value"
                        @update:modelValue="handleChange"
                        :placeholder="formPendanaan.portionPendanaan.placeholder"
                        label="text"
                        track-by="code"
                        :options="listBankPortion"
                        :multiple="true"
                        open-direction="bottom"
                        :show-labels="false"
                      ></Multiselect>
                      <span class="col-span-1"></span>
                      <span v-if="errors.length" class="italic text-red-500 text-xs col-span-3">{{
                        errors[0]
                      }}</span>
                    </Field>
                  </div>
                </div>
              </div>
            </div>
            <hr class="h-px mt-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <div class="flex justify-end space-x-2 mt-4">
              <button
                :class="[isActiveSave ? 'button-primary' : 'disabled-button']"
                type="button"
                @click="handleSaveValidate(values, validate)"
                :disabled="!isActiveSave"
              >
                Simpan
              </button>
              <button
                :class="[isActiveUpdate ? 'button-ex-primary' : 'disabled-button']"
                type="button"
                @click="handleUpdateValidate(values, validate)"
                :disabled="!isActiveUpdate"
              >
                Update
              </button>
              <button
                :class="[isActiveDelete ? 'button-red' : 'disabled-button']"
                type="button"
                @click="handleDeleteValidate(values, validate)"
                :disabled="!isActiveDelete"
              >
                Hapus
              </button>
              <button class="button-white" type="button" @click="handlerResetForm">Batal</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

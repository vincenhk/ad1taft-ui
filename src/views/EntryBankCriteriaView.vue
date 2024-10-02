<script setup>
import TitleMenu from '@/components/TitleMenu.vue';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { formBankCriteria } from '@/utils/forms.utils.js';
import { onMounted, ref, watch, getCurrentInstance, computed } from 'vue';
import Multiselect from 'vue-multiselect';
import { existAttr, existGroup, useLocalStorage } from '@/utils/local-storage.utils.js';
import { getSubBankByBank } from '@/services/common.service.js';
import existCookieKey, { useCookie } from '@/utils/cookie-var.utils.js';
import { DataTable } from 'datatables.net-vue3';
import { columnsConfig, tblOption } from '@/table.config.js';
import { getCofDetail, getCofHeaderDetail, getPortionBankByBank } from '@/services/bank-criteria.js'
import { iconNotif, showNotification, titleNotif } from '@/general.alert.js';
import { getObjectClass, getSchemaList } from '@/services/common/common.service.js';

const { proxy } = getCurrentInstance();
const user = useCookie.getItem(existCookieKey.USER_AUTH, proxy);

const initialValue = ref({
  [formBankCriteria.bankSchema.name]: user.schemaId
});

const optionBank = ref([]);

const listSubBank = ref([]);
const listObjectClass = ref([]);
const listObjectGroup = ref([]);
const listSchema = ref([]);
const listInstlType = ref([]);
const listLendingRate = ref([]);
const listPorsiBank = ref([]);
const listAdvArr = ref([]);

const bankSchema = ref([]);
const bankIdSelected = ref({});
const data = ref([]);

const isActiveAdd = ref(false)

const getObjectClassByGroup = async (values) => {
  const objectGroup = values.controlledValues[formBankCriteria.objtGroup.name];
  if (objectGroup) {
    const resObjectClass = await getObjectClass({ groupObjectCode: objectGroup });
    listObjectClass.value = resObjectClass.map((x) => ({
      code: x.objtClassCode,
      text: x.objtClassDesc
    }));
  }
};

const optionCustom = {
  ...tblOption,
  paging: true,
  lengthChange: false,
  columnDefs: [
    {
      targets: [1, 2, 3, 4, 5, 6, 7, 8],
      className: 'dt-center'
    }
  ],
  language: {
    search: 'Cari : ',
    searchPlaceholder: `Masukkan Data`
  }
};

const columns = computed(() => {
  return columnsConfig.tblDetailCOF;
});

watch(bankIdSelected, async (dataNew) => {
  const bankId = dataNew;
  if (dataNew.length === 3) {
    listPorsiBank.value = await getPortionBankByBank({bankSchema: initialValue.value[formBankCriteria.bankSchema.name], dataBankId: bankId})
    console.log('listPorsiBank.value', listPorsiBank.value)
    const res = await getSubBankByBank({ dataBankId: bankId });
    listSubBank.value = res.map((x) => ({
      code: x.dataSubBankId,
      text: `${x.dataSubBankId} - ${x.dataSubBankName}`
    }));
    if (res.length <= 0) {
      showNotification({
        message: 'Belum terdapat subbank terdaftar.',
        type: iconNotif.INFORMATION,
        title: titleNotif.INFORMATION
      });
    }
    console.log('listSubBank.value', listSubBank.value);
  }
});

function getSubBank(values) {
  const value = values.values;
  bankSchema.value = value[formBankCriteria.bankSchema.name];
  bankIdSelected.value = value[formBankCriteria.bankId.name].code;
}

async function checkData(values) {
  const value = values.values;
  const schemaId = value[formBankCriteria.bankSchema.name]
    ? value[formBankCriteria.bankSchema.name]
    : null;
  const bankId = value[formBankCriteria.bankId.name].code
    ? value[formBankCriteria.bankId.name].code
    : null;
  const subBank = value[formBankCriteria.subBank.name]
    ? value[formBankCriteria.subBank.name]
    : null;
  const objtGroup = value[formBankCriteria.objtGroup.name]
    ? value[formBankCriteria.objtGroup.name]
    : null;
  const objtClass = value[formBankCriteria.objtClass.name]
    ? value[formBankCriteria.objtClass.name]
    : null;
  if (schemaId && bankId && subBank && objtGroup && objtClass) {
    const detailHeader = await getCofHeaderDetail({
      bankId: bankId,
      bankSchema: schemaId,
      subBank: subBank,
      objectClass: objtClass,
      objectGroup: objtGroup
    });
    initialValue.value = {
      ...initialValue.value,
      [formBankCriteria.bankSchema.name]: value[formBankCriteria.bankSchema.name],
      [formBankCriteria.bankId.name]: value[formBankCriteria.bankId.name],
      [formBankCriteria.subBank.name]: value[formBankCriteria.subBank.name],
      [formBankCriteria.objtGroup.name]: value[formBankCriteria.objtGroup.name],
      [formBankCriteria.objtClass.name]: value[formBankCriteria.objtClass.name],
      [formBankCriteria.instlType.name]: detailHeader.instlType,
      [formBankCriteria.landingRate.name]: detailHeader.lendingRate,
      [formBankCriteria.bankPortion.name]: detailHeader.bankPortion,
      [formBankCriteria.advArr.name]: detailHeader.advArr,
      [formBankCriteria.minTop.name]: detailHeader.minTop,
      [formBankCriteria.maxTop.name]: detailHeader.maxTop,
      [formBankCriteria.maxAmount.name]: detailHeader.maxAmount,
      [formBankCriteria.minDp.name]: detailHeader.minDP,
      [formBankCriteria.minAge.name]: detailHeader.minAge,
      [formBankCriteria.maxAge.name]: detailHeader.maxAge,
      [formBankCriteria.objtMaxAge.name]: detailHeader.maxObjectAge,
      [formBankCriteria.effDate.name]: detailHeader.effDate
    };
    console.log('initialValue', initialValue.value);
  }
}

onMounted(async () => {
  optionBank.value = useLocalStorage
    .getItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_BANK)
    .map((x) => ({
      code: x.dataBankId,
      text: `${x.dataBankId} - ${x.dataBankName}`
    }));

  listObjectGroup.value = useLocalStorage
    .getItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_GROUP_OBJECT)
    .map((x) => ({
      code: x.objtGroupCode,
      text: x.objtGroupDesc
    }));

  listInstlType.value = useLocalStorage.getItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_INSTALLMENT_TYPE)
  listLendingRate.value = useLocalStorage.getItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_LENDING_RATE)
  listAdvArr.value = useLocalStorage.getItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_ADV_ARR)

  listSchema.value = getSchemaList();

  data.value = await getCofDetail({
    bankId: '124',
    subBank: '0000',
    objectClass: '001',
    objectGroup: '001'
  });
});
</script>

<template>
  <div class="p-4 sm:ml-64">
    <div class="p-5 border-2 border-gray-200 border-dashed rounded-lg mt-14">
      <TitleMenu :icon="['fas', 'sliders']" :title="'Entry Bank Criteria'" />
      <div class="mx-2 mt-5 bg-gray-50 rounded-lg p-4">
        <Form
          class="p-4 text-xs"
          :key="initialValue"
          :initial-values="initialValue"
          v-slot="values"
        >
          <div class="grid sm:grid-cols-2 gap-6">
            <div class="col-span-1 space-y-3">
              <div class="grid grid-cols-4">
                <div class="flex items-center">
                  <label :for="formBankCriteria.bankSchema.name">
                    {{ formBankCriteria.bankSchema.label }}
                  </label>
                </div>
                <Field
                  :name="formBankCriteria.bankSchema.name"
                  :rules="formBankCriteria.bankSchema.rule"
                  v-slot="{ field, handleChange }"
                >
                  <select
                    class="border-gray-300 w-full rounded bg-gray-50 border col-span-3 text-xs p-1.5"
                    v-bind="field"
                    :value="field.value"
                    @change="handleChange"
                    disabled
                  >
                    <option value="" disabled>{{ formBankCriteria.bankSchema.placeholder }}</option>
                    <option v-for="schema in listSchema" :value="schema.id" :key="schema.id">
                      {{ `${schema.id} - ${schema.desc}` }}
                    </option>
                  </select>
                </Field>
                <span />
                <ErrorMessage
                  :name="formBankCriteria.bankSchema.name"
                  class="col-span-3 err-style"
                />
              </div>
              <div class="grid grid-cols-4">
                <div class="flex items-center">
                  <label :for="formBankCriteria.bankId.name">
                    {{ formBankCriteria.bankId.label }}
                  </label>
                </div>
                <Field
                  class="form-style bg-gray-50"
                  :rules="formBankCriteria.bankId.rule"
                  :name="formBankCriteria.bankId.name"
                  v-slot="{ field, handleChange }"
                >
                  <multiselect
                    v-model="field.value"
                    @update:modelValue="handleChange"
                    :options="optionBank"
                    :placeholder="formBankCriteria.bankId.placeholder"
                    label="text"
                    track-by="code"
                    :show-labels="false"
                    class="form-style text-xs col-span-3"
                    @select="getSubBank(values)"
                  />
                </Field>
                <span />
                <ErrorMessage :name="formBankCriteria.bankId.name" class="col-span-3 err-style" />
              </div>
              <div class="grid grid-cols-4">
                <div class="flex items-center">
                  <label :for="formBankCriteria.subBank.name">
                    {{ formBankCriteria.subBank.label }}
                  </label>
                </div>
                <Field
                  :name="formBankCriteria.subBank.name"
                  :rules="formBankCriteria.subBank.rule"
                  v-slot="{ field, handleChange }"
                >
                  <select
                    class="border-gray-300 w-full rounded bg-gray-50 border col-span-3 text-xs p-1.5"
                    v-bind="field"
                    :value="field.value"
                    @change="handleChange"
                  >
                    <option value="" disabled>{{ formBankCriteria.subBank.placeholder }}</option>
                    <option
                      v-for="subBank in listSubBank"
                      :value="subBank.code"
                      :key="subBank.code"
                    >
                      {{ `${subBank.text}` }}
                    </option>
                  </select>
                </Field>
                <span />
                <ErrorMessage :name="formBankCriteria.subBank.name" class="col-span-3 err-style" />
              </div>

              <div class="grid grid-cols-4">
                <div class="flex items-center">
                  <label :for="formBankCriteria.objtGroup.name">
                    {{ formBankCriteria.objtGroup.label }}
                  </label>
                </div>
                <Field
                  :name="formBankCriteria.objtGroup.name"
                  :rules="formBankCriteria.objtGroup.rule"
                  v-slot="{ field, handleChange }"
                >
                  <select
                    class="border-gray-300 w-full rounded bg-gray-50 border col-span-3 text-xs p-1.5"
                    v-bind="field"
                    :value="field.value"
                    @change="[handleChange, getObjectClassByGroup(values)]"
                  >
                    <option value="" disabled>{{ formBankCriteria.objtGroup.placeholder }}</option>
                    <option
                      v-for="objectGroup in listObjectGroup"
                      :value="objectGroup.code"
                      :key="objectGroup.code"
                    >
                      {{ `${objectGroup.text}` }}
                    </option>
                  </select>
                </Field>
                <span />
                <ErrorMessage
                  :name="formBankCriteria.objtGroup.name"
                  class="col-span-3 err-style"
                />
              </div>
              <div class="grid grid-cols-4">
                <div class="flex items-center">
                  <label :for="formBankCriteria.objtClass.name">
                    {{ formBankCriteria.objtClass.label }}
                  </label>
                </div>
                <div class="col-span-3">
                  <div class="grid grid-cols-3 gap-2">
                    <Field
                      :name="formBankCriteria.objtClass.name"
                      :rules="formBankCriteria.objtClass.rule"
                      v-slot="{ field, handleChange }"
                    >
                      <select
                        class="border-gray-300 w-full rounded bg-gray-50 border col-span-2 text-xs p-1.5"
                        v-bind="field"
                        :value="field.value"
                        @change="handleChange"
                      >
                        <option value="" disabled>
                          {{ formBankCriteria.objtClass.placeholder }}
                        </option>
                        <option
                          v-for="objectClass in listObjectClass"
                          :value="objectClass.code"
                          :key="objectClass.code"
                        >
                          {{ `${objectClass.code} - ${objectClass.text}` }}
                        </option>
                      </select>
                    </Field>
                    <button class="button-ex-primary" type="button" @click="checkData(values)">
                      Cek Data
                    </button>
                  </div>
                </div>
                <span />
                <ErrorMessage
                  :name="formBankCriteria.objtGroup.name"
                  class="col-span-3 err-style"
                />
              </div>
              <div class="grid grid-cols-4">
                <div class="flex items-center">
                  <label :for="formBankCriteria.instlType.name">
                    {{ formBankCriteria.instlType.label }}
                  </label>
                </div>
                <Field
                  :name="formBankCriteria.instlType.name"
                  :rules="formBankCriteria.instlType.rule"
                  v-slot="{ field, handleChange }"
                >
                  <select
                    class="border-gray-300 w-full rounded bg-gray-50 border col-span-3 text-xs p-1.5"
                    v-bind="field"
                    :value="field.value"
                    @change="handleChange"
                  >
                    <option value="" disabled>{{ formBankCriteria.instlType.placeholder }}</option>
                    <option
                      v-for="instlType in listInstlType"
                      :value="instlType.code"
                      :key="instlType.code"
                    >
                      {{ `${instlType.code} - ${instlType.text}` }}
                    </option>
                  </select>
                </Field>
                <span />
                <ErrorMessage
                  :name="formBankCriteria.instlType.name"
                  class="col-span-3 err-style"
                />
              </div>
              <div class="grid grid-cols-4">
                <div class="flex items-center">
                  <label :for="formBankCriteria.landingRate.name">
                    {{ formBankCriteria.landingRate.label }}
                  </label>
                </div>
                <Field
                  :name="formBankCriteria.landingRate.name"
                  :rules="formBankCriteria.landingRate.rule"
                  v-slot="{ field, handleChange }"
                >
                  <select
                    class="border-gray-300 w-full rounded bg-gray-50 border col-span-3 text-xs p-1.5"
                    v-bind="field"
                    :value="field.value"
                    @change="handleChange"
                  >
                    <option value="" disabled>
                      {{ formBankCriteria.landingRate.placeholder }}
                    </option>
                    <option
                      v-for="lendingRate in listLendingRate"
                      :value="lendingRate.code"
                      :key="lendingRate.code"
                    >
                      {{ `${lendingRate.code} - ${lendingRate.text}` }}
                    </option>
                  </select>
                </Field>
                <span />
                <ErrorMessage
                  :name="formBankCriteria.landingRate.name"
                  class="col-span-3 err-style"
                />
              </div>
              <div class="grid grid-cols-4">
                <div class="flex items-center">
                  <label :for="formBankCriteria.bankPortion.name">
                    {{ formBankCriteria.bankPortion.label }}
                  </label>
                </div>
                <Field
                  :name="formBankCriteria.bankPortion.name"
                  :rules="formBankCriteria.bankPortion.rule"
                  v-slot="{ field, handleChange }"
                >
                  <select
                    class="border-gray-300 w-full rounded bg-gray-50 border col-span-3 text-xs p-1.5"
                    v-bind="field"
                    :value="field.value"
                    @change="handleChange"
                  >
                    <option value="" disabled>
                      {{ formBankCriteria.bankPortion.placeholder }}
                    </option>
                    <option
                      v-for="porsiBank in listPorsiBank"
                      :value="porsiBank.code"
                      :key="porsiBank.code"
                    >
                      {{ `${porsiBank.text}` }}
                    </option>
                  </select>
                </Field>
                <span />
                <ErrorMessage
                  :name="formBankCriteria.bankPortion.name"
                  class="col-span-3 err-style"
                />
              </div>
              <div class="grid grid-cols-4">
                <div class="flex items-center">
                  <label :for="formBankCriteria.advArr.name">
                    {{ formBankCriteria.advArr.label }}
                  </label>
                </div>
                <Field
                  :name="formBankCriteria.advArr.name"
                  :rules="formBankCriteria.advArr.rule"
                  v-slot="{ field, handleChange }"
                >
                  <select
                    class="border-gray-300 w-full rounded bg-gray-50 border col-span-3 text-xs p-1.5"
                    v-bind="field"
                    :value="field.value"
                    @change="handleChange"
                  >
                    <option value="" disabled>{{ formBankCriteria.advArr.placeholder }}</option>
                    <option
                      v-for="advArr in listAdvArr"
                      :value="advArr.code"
                      :key="advArr.code"
                    >
                      {{ `${advArr.code} - ${advArr.text}` }}
                    </option>
                  </select>
                </Field>
                <span />
                <ErrorMessage :name="formBankCriteria.advArr.name" class="col-span-3 err-style" />
              </div>
            </div>
            <div class="col-span-1 space-y-3">
              <div class="grid grid-cols-4">
                <div class="flex items-center">
                  <label :for="formBankCriteria.minTop.name">
                    {{ formBankCriteria.minTop.label }}
                  </label>
                </div>
                <Field
                  class="form-style bg-gray-50 col-span-3"
                  type="text"
                  :name="formBankCriteria.minTop.name"
                  :placeholder="formBankCriteria.minTop.placeholder"
                  :rules="formBankCriteria.minTop.rule"
                />
                <span />
                <ErrorMessage :name="formBankCriteria.minTop.name" class="col-span-3 err-style" />
              </div>
              <div class="grid grid-cols-4">
                <div class="flex items-center">
                  <label :for="formBankCriteria.maxTop.name">
                    {{ formBankCriteria.maxTop.label }}
                  </label>
                </div>
                <Field
                  class="form-style bg-gray-50 col-span-3"
                  type="text"
                  :name="formBankCriteria.maxTop.name"
                  :placeholder="formBankCriteria.maxTop.placeholder"
                  :rules="formBankCriteria.maxTop.rule"
                />
                <span />
                <ErrorMessage :name="formBankCriteria.maxTop.name" class="col-span-3 err-style" />
              </div>
              <div class="grid grid-cols-4">
                <div class="flex items-center">
                  <label :for="formBankCriteria.maxAmount.name">
                    {{ formBankCriteria.maxAmount.label }}
                  </label>
                </div>
                <Field
                  class="form-style bg-gray-50 col-span-3"
                  type="text"
                  :name="formBankCriteria.maxAmount.name"
                  :placeholder="formBankCriteria.maxAmount.placeholder"
                  :rules="formBankCriteria.maxAmount.rule"
                />
                <span />
                <ErrorMessage
                  :name="formBankCriteria.maxAmount.name"
                  class="col-span-3 err-style"
                />
              </div>
              <div class="grid grid-cols-4">
                <div class="flex items-center">
                  <label :for="formBankCriteria.minDp.name">
                    {{ formBankCriteria.minDp.label }}
                  </label>
                </div>
                <Field
                  class="form-style bg-gray-50 col-span-3"
                  type="text"
                  :name="formBankCriteria.minDp.name"
                  :placeholder="formBankCriteria.minDp.placeholder"
                  :rules="formBankCriteria.minDp.rule"
                />
                <span />
                <ErrorMessage :name="formBankCriteria.minDp.name" class="col-span-3 err-style" />
              </div>
              <div class="grid grid-cols-4">
                <div class="flex items-center">
                  <label :for="formBankCriteria.minAge.name">
                    {{ formBankCriteria.minAge.label }}
                  </label>
                </div>
                <Field
                  class="form-style bg-gray-50 col-span-3"
                  type="text"
                  :name="formBankCriteria.minAge.name"
                  :placeholder="formBankCriteria.minAge.placeholder"
                  :rules="formBankCriteria.minAge.rule"
                />
                <span />
                <ErrorMessage :name="formBankCriteria.minAge.name" class="col-span-3 err-style" />
              </div>
              <div class="grid grid-cols-4">
                <div class="flex items-center">
                  <label :for="formBankCriteria.maxAge.name">
                    {{ formBankCriteria.maxAge.label }}
                  </label>
                </div>
                <Field
                  class="form-style bg-gray-50 col-span-3"
                  type="text"
                  :name="formBankCriteria.maxAge.name"
                  :placeholder="formBankCriteria.maxAge.placeholder"
                  :rules="formBankCriteria.maxAge.rule"
                />
                <span />
                <ErrorMessage :name="formBankCriteria.maxAge.name" class="col-span-3 err-style" />
              </div>
              <div class="grid grid-cols-4">
                <div class="flex items-center">
                  <label :for="formBankCriteria.objtMaxAge.name">
                    {{ formBankCriteria.objtMaxAge.label }}
                  </label>
                </div>
                <Field
                  class="form-style bg-gray-50 col-span-3"
                  type="text"
                  :name="formBankCriteria.objtMaxAge.name"
                  :placeholder="formBankCriteria.objtMaxAge.placeholder"
                  :rules="formBankCriteria.objtMaxAge.rule"
                />
                <span />
                <ErrorMessage
                  :name="formBankCriteria.objtMaxAge.name"
                  class="col-span-3 err-style"
                />
              </div>
              <div class="grid grid-cols-4">
                <div class="flex items-center">
                  <label :for="formBankCriteria.effDate.name">
                    {{ formBankCriteria.effDate.label }}
                  </label>
                </div>
                <Field
                  class="form-style bg-gray-50 col-span-3"
                  type="text"
                  :name="formBankCriteria.effDate.name"
                  :placeholder="formBankCriteria.effDate.placeholder"
                  :rules="formBankCriteria.effDate.rule"
                />
                <span />
                <ErrorMessage :name="formBankCriteria.effDate.name" class="col-span-3 err-style" />
              </div>
            </div>
          </div>
          <hr class="h-px mt-5 bg-gray-200 border-0 dark:bg-gray-700" />
          <div class="flex justify-end space-x-2 mt-4">
            <button class="button-primary" type="button">Button1</button>
            <button class="button-red" type="button">Button1</button>
          </div>
        </Form>
      </div>
      <div class="mx-2 mt-5 bg-gray-50 rounded-lg p-8">
        <div class="flex justify-between">
          <h1 class="text-lg font-bold">Data Detail COF</h1>
          <button class="button-white" type="button">Upload COF</button>
        </div>
        <div class="mt-4">
          <data-table
            id="example"
            :data="data"
            class="display hover compact cell-border text-xs"
            :options="optionCustom"
            :columns="columns"
          >
          </data-table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import TitleMenu from '@/components/TitleMenu.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { DataTable } from 'datatables.net-vue3';
import { columnsConfig, tblOption } from '@/table.config.js';
import { computed, onMounted, ref, getCurrentInstance } from 'vue';
import {
  activeGroupBank,
  deleteGroupBank,
  getAllParaBankGroup,
  saveGroupBank,
  updateGroupBank
} from '@/services/bank-group.service.js';
import Multiselect from 'vue-multiselect';
import { formGroupBank } from '@/utils/forms.utils.js';
import {
  confirmDialog,
  confirmDialogNotif,
  iconNotif,
  showNotification,
  titleNotif
} from '@/general.alert.js';
import { getNikLog } from '@/services/common/common.service.js';

const { proxy } = getCurrentInstance();

const options = ref([]);
const isVisibleInput = ref(false);
const initialValue = ref({});
const data = ref();
const optionCustom = {
  ...tblOption,
  paging: true,
  lengthChange: false,
  columnDefs: [
    {
      targets: [1, 2, 3],
      className: 'dt-center'
    }
  ],
  language: {
    search: 'Cari : ',
    searchPlaceholder: `Masukkan Data`
  }
};

const columns = computed(() => {
  return columnsConfig.tblBankGroup;
});

const isActiveSave = ref(true);
const isActiveActive = ref(false);
const isActiveUpdate = ref(false);
const isActiveDelete = ref(false);

const buttonStartPosition = () => {
  isActiveSave.value = true;
  isActiveActive.value = false;
  isActiveUpdate.value = false;
  isActiveDelete.value = false;
};

const buttonAlreadyDataPosition = () => {
  isActiveSave.value = false;
  isActiveActive.value = true;
  isActiveUpdate.value = true;
  isActiveDelete.value = true;
};

function groupBankDrowDownController(event) {
  const groupBank = event.target ? event.target.value : event.code;
  const hasDigit = /[0-9]/;
  if (groupBank.length === 3 && hasDigit.test(groupBank)) {
    const found = options.value.some((x) => {
      return x.code === groupBank;
    });
    if (!found) {
      isVisibleInput.value = true;
      initialValue.value = {
        [formGroupBank.bankGroup.name]: groupBank
      };
      buttonStartPosition();
    }
  }
}

function getDetailBankGroup(value) {
  initialValue.value = {
    [formGroupBank.bankGroup.name]: value,
    [formGroupBank.bankGroupName.name]: value.text
  };
  if (typeof value === 'object') {
    buttonAlreadyDataPosition();
  }
}

function resetForm() {
  isVisibleInput.value = false;
  initialValue.value = {};
  buttonStartPosition();
}

const buttonTarget = (button, value) => {
  switch (button.target.value) {
    case 'delete':
      return {
        typeConfirm: confirmDialogNotif.DELETE,
        functionCall: deleteGroupBank({
          bankGroupId: value[formGroupBank.bankGroup.name].code,
          bankGroupName: value[formGroupBank.bankGroupName.name],
          nik: getNikLog(proxy)
        })
      };
    case 'save':
      return {
        typeConfirm: confirmDialogNotif.SAVE,
        functionCall: saveGroupBank({
          bankGroupId: value[formGroupBank.bankGroup.name],
          bankGroupName: value[formGroupBank.bankGroupName.name],
          nik: getNikLog(proxy)
        })
      };
    case 'update':
      return {
        typeConfirm: confirmDialogNotif.UPDATE,
        functionCall: updateGroupBank({
          bankGroupId: value[formGroupBank.bankGroup.name].code,
          bankGroupName: value[formGroupBank.bankGroupName.name],
          nik: getNikLog(proxy)
        })
      };
    case 'active':
      return {
        typeConfirm: confirmDialogNotif.QUESTION,
        messageConfirm: 'Kondisi Bank Group Aktif akan dirubah?',
        functionCall: activeGroupBank({
          bankGroupId: value[formGroupBank.bankGroup.name].code,
          bankGroupName: value[formGroupBank.bankGroupName.name],
          nik: getNikLog(proxy)
        })
      };
    default:
      return null;
  }
};

async function onClickAction(button, value, validate) {
  const isValid = await validate();
  const targetButton = buttonTarget(button, value);
  if (isValid.valid) {
    confirmDialog
      .showDialog({
        type: targetButton.typeConfirm,
        message: targetButton.typeConfirm === 'question' ? targetButton.messageConfirm : null
      })
      .then(async (res) => {
        if (res === 'onOk') {
          const response = await targetButton.functionCall;
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
  }
}

// async function reloadAfterProses() {
//   //For this menu itself
//   data.value = await getAllParaBankGroup();
//   options.value = data.value.map((x) => ({
//     code: x.bankGroupId,
//     text: `${x.bankGroupName}`
//   }));
//   //Collect it to consume to Global
//   useLocalStorage.setItem(existGroup.PARAM_GLOBAL, existAttr.PARAM_GROUP_BANK, data.value);
// }

onMounted(async () => {
  data.value = await getAllParaBankGroup();
  options.value = data.value.map((x) => ({
    code: x.bankGroupId,
    text: `${x.bankGroupName}`
  }));
});
</script>

<template>
  <div class="p-4 sm:ml-64">
    <div class="p-5 border-2 border-gray-200 border-dashed rounded-lg mt-14">
      <TitleMenu :icon="['fas', 'sliders']" :title="'Bank Group'" />
      <div class="mx-2 mt-5 bg-gray-50 rounded-lg">
        <div class="max-w-lg min-w-fit">
          <Form
            class="p-4 text-xs"
            :key="initialValue"
            :initial-values="initialValue"
            v-slot="{ validate, values }"
          >
            <div class="grid grid-cols-3 gap-4 items-center">
              <label :for="formGroupBank.bankGroup.name">{{ formGroupBank.bankGroup.label }}</label>
              <div class="col-span-2">
                <Field
                  :rules="formGroupBank.bankGroup.rule"
                  :name="formGroupBank.bankGroup.name"
                  v-slot="{ field, handleChange }"
                >
                  <multiselect
                    v-if="!isVisibleInput"
                    v-model="field.value"
                    @update:modelValue="handleChange"
                    :options="options"
                    :placeholder="formGroupBank.bankGroup.placeholder"
                    label="code"
                    track-by="code"
                    :show-labels="false"
                    class="form-style text-xs"
                    @keydown.enter="groupBankDrowDownController($event)"
                    @select="getDetailBankGroup($event)"
                  />
                  <input
                    v-else
                    v-bind="field"
                    type="text"
                    class="form-style bg-gray-50 border w-full"
                    readonly
                  />
                </Field>
                <ErrorMessage :name="formGroupBank.bankGroup.name" class="italic text-red-500" />
              </div>
              <label :for="formGroupBank.bankGroupName.name">{{
                formGroupBank.bankGroupName.label
              }}</label>
              <div class="col-span-2">
                <Field
                  :rules="formGroupBank.bankGroupName.rule"
                  :name="formGroupBank.bankGroupName.name"
                  class="form-style bg-gray-50 border w-full"
                  :placeholder="formGroupBank.bankGroupName.placeholder"
                />
                <ErrorMessage
                  :name="formGroupBank.bankGroupName.name"
                  class="italic text-red-500"
                />
              </div>

              <div class="col-span-3">
                <div class="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  <button
                    :class="[isActiveSave ? 'button-primary' : 'disabled-button']"
                    type="button"
                    value="save"
                    @click="onClickAction($event, values, validate)"
                    :disabled="!isActiveSave"
                  >
                    Tambah
                  </button>
                  <button
                    :class="[isActiveActive ? 'button-primary' : 'disabled-button']"
                    type="button"
                    value="active"
                    @click="onClickAction($event, values, validate)"
                    :disabled="!isActiveActive"
                  >
                    Aktif
                  </button>
                  <button
                    :class="[isActiveUpdate ? 'button-ex-primary' : 'disabled-button']"
                    type="button"
                    value="update"
                    @click="onClickAction($event, values, validate)"
                    :disabled="!isActiveUpdate"
                  >
                    Update
                  </button>
                  <button
                    :class="[isActiveDelete ? 'button-red' : 'disabled-button']"
                    type="button"
                    value="delete"
                    @click="onClickAction($event, values, validate)"
                    :disabled="!isActiveDelete"
                  >
                    Hapus
                  </button>
                  <button class="button-white" type="button" @click="resetForm">Atur Ulang</button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <div class="mx-2 mt-5 bg-gray-50 rounded-lg">
        <div class="p-4">
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

<script setup>
import TitleMenu from '@/components/TitleMenu.vue';
import { DataTable } from 'datatables.net-vue3';
import HeaderButton from '@/components/HeaderButton.vue';
import { columnsConfig, tblOption } from '@/table.config.js';
import { computed, onMounted, ref, getCurrentInstance } from 'vue';
import {
  addPorsiDenda,
  getAllPorsiDenda,
  removePorsiDenda
} from '@/services/porsi-denda.service.js';
import { formPorsiDenda } from '@/utils/forms.utils.js';
import {
  confirmDialog,
  confirmDialogNotif,
  iconNotif,
  showNotification,
  titleNotif
} from '@/general.alert.js';
import { getNikLog } from '@/services/common/common.service.js';

const data = ref([]);
const { proxy } = getCurrentInstance();

const porsiDenda = ref('');
const porsiAdmf = computed(() => {
  if (porsiDenda.value > 100) {
    console.log('tidak bisa lebih dari 100');
    return null;
  } else if (porsiDenda.value === '') {
    return null;
  } else {
    return 100 - porsiDenda.value;
  }
});
const descPorsi = computed(() => {
  if (porsiDenda.value === '' || porsiDenda.value === undefined) {
    return null;
  } else {
    return `${porsiDenda.value} : ${porsiAdmf.value}`;
  }
});

const optionCustom = {
  ...tblOption,
  paging: false,
  columnDefs: [
    {
      targets: [1, 4],
      className: 'dt-center'
    }
  ],
  language: {
    search: 'Cari : ',
    searchPlaceholder: `Masukkan Data`
  }
};

const columns = computed(() => {
  return columnsConfig.tblPorsiDenda;
});

const resetModal = () => {
  porsiDenda.value = '';
};

function savePorsiDenda() {
  confirmDialog
    .showDialog({
      type: confirmDialogNotif.SAVE
    })
    .then(async (res) => {
      if (res === 'onOk') {
        const response = await addPorsiDenda({
          admfPortion: porsiAdmf.value,
          bankPortion: porsiDenda.value,
          nik: getNikLog(proxy),
          portionDesc: descPorsi.value
        });
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
    })
    .catch((res) => {
      console.log(res.message);
    });
}

function deletePorsiDenda(cell) {
  confirmDialog.showDialog({ type: confirmDialogNotif.DELETE }).then(async (res) => {
    if (res === 'onOk') {
      const response = await removePorsiDenda({
        admfPortion: cell.admfPortion,
        bankPortion: cell.bankPortion,
        nik: getNikLog(proxy),
        portionDesc: cell.portionDesc,
        portionId: cell.portionId
      });
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

onMounted(async () => {
  data.value = await getAllPorsiDenda();
});
</script>

<template>
  <div class="p-4 sm:ml-64">
    <div class="p-5 border-2 border-gray-200 border-dashed rounded-lg mt-14">
      <TitleMenu :icon="['fas', 'sliders']" :title="'Porsi Bank'" />

      <div class="relative mt-8">
        <header-button class="absolute z-40 max-w-44">
          <button
            class="button-primary"
            data-modal-target="add-portion"
            data-modal-toggle="add-portion"
          >
            Tambah Porsi Denda
          </button>
        </header-button>

        <data-table
          id="example"
          :data="data"
          class="display hover compact cell-border text-xs"
          :options="optionCustom"
          :columns="columns"
        >
          <template #action="props">
            <div class="flex justify-center items-center">
              <button
                class="flex bg-red-600 rounded text-white hover:bg-red-900 p-1.5"
                @click.prevent="deletePorsiDenda(props.cellData)"
              >
                <font-awesome-icon :icon="['fas', 'trash-can']" size="lg" />
              </button>
            </div>
          </template>
        </data-table>
      </div>
    </div>
  </div>

  <div
    id="add-portion"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-4 border-b rounded-t">
          <h3 class="font-medium">Tambah Porsi Denda</h3>
          <button
            type="button"
            class="px-2 hover:bg-gray-300 rounded"
            data-modal-hide="add-portion"
            @click="resetModal"
          >
            <font-awesome-icon :icon="['fas', 'x']" size="sm" />
          </button>
        </div>

        <!-- Modal body -->
        <div class="p-5">
          <form @submit.prevent="savePorsiDenda" class="text-xs">
            <div class="md:flex justify-center md:items-center mb-2">
              <div class="md:w-1/4">
                <label class="md:text-left mb-1 md:mb-0 pr-4" :for="formPorsiDenda.porsiDenda.name">
                  {{ formPorsiDenda.porsiDenda.label }}
                </label>
              </div>
              <div class="md:w-3/4">
                <div class="flex items-center">
                  <input
                    class="input-gen-style"
                    :id="formPorsiDenda.porsiDenda.name"
                    type="number"
                    min="0"
                    max="100"
                    :placeholder="formPorsiDenda.porsiDenda.placeholder"
                    v-model="porsiDenda"
                    required
                  />
                  <span class="px-2">%</span>
                </div>
              </div>
            </div>
            <div class="md:flex justify-center md:items-center mb-2">
              <div class="md:w-1/4">
                <label class="md:text-left mb-1 md:mb-0 pr-4" :for="formPorsiDenda.porsiAdmf.name">
                  {{ formPorsiDenda.porsiAdmf.label }}
                </label>
              </div>
              <div class="md:w-3/4">
                <div class="flex items-center">
                  <input
                    class="input-gen-style disabled"
                    :id="formPorsiDenda.porsiAdmf.name"
                    type="number"
                    :placeholder="formPorsiDenda.porsiAdmf.placeholder"
                    disabled="true"
                    :value="porsiAdmf"
                  />
                  <span class="px-2">%</span>
                </div>
              </div>
            </div>
            <div class="md:flex justify-center md:items-center mb-2">
              <div class="md:w-1/4">
                <label class="md:text-left mb-1 md:mb-0 pr-4" :for="formPorsiDenda.porsiDesc.name">
                  {{ formPorsiDenda.porsiDesc.label }}
                </label>
              </div>
              <div class="md:w-3/4">
                <div class="flex items-center">
                  <input
                    class="input-gen-style disabled"
                    :id="formPorsiDenda.porsiDesc.name"
                    type="text"
                    :placeholder="formPorsiDenda.porsiDesc.placeholder"
                    disabled="true"
                    :value="descPorsi"
                  />
                  <span class="px-2 invisible">%</span>
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <button type="submit" class="button-primary mt-2">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

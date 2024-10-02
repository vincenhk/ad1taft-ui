<script setup>
import TitleMenu from '@/components/TitleMenu.vue';
import { computed, onMounted, ref } from 'vue';
import { addPorsiBank, deletePorsiBank, getPorsiList } from '@/services/porsi-bank.service.js';
import { DataTable } from 'datatables.net-vue3';
import HeaderButton from '@/components/HeaderButton.vue';
import { useStore } from 'vuex';
import { columnsConfig, tblOption } from '@/table.config.js';
import {
  showNotification,
  confirmDialog,
  confirmDialogNotif,
  titleNotif,
  iconNotif
} from '@/general.alert.js';

const store = useStore();

const data = ref([]);

const porsiBank = ref('');
const porsiAdmf = computed(() => {
  if (porsiBank.value > 100) {
    console.log('tidak bisa lebih dari 100');
    return null;
  } else if (porsiBank.value === '') {
    return null;
  } else {
    return 100 - porsiBank.value;
  }
});
const descPorsi = computed(() => {
  if (porsiBank.value === '' || porsiBank.value === undefined) {
    return null;
  } else {
    return `${porsiBank.value} : ${porsiAdmf.value}`;
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
  return columnsConfig.tblPorsiBank;
});

const savePorsiBank = async () => {
  const user = store.state.modelAuth.user;
  const staf = user.login + ' - ' + user.objectName;
  const payload = {
    bankPortion: porsiBank.value,
    admfPortion: porsiAdmf.value,
    portionDesc: descPorsi.value,
    bankPortionID: 'd',
    nik: staf.slice(0, 50),
    idAppr: ''
  };

  confirmDialog
    .showDialog({
      type: confirmDialogNotif.SAVE
    })
    .then(async (res) => {
      if (res === 'onOk') {
        const response = await addPorsiBank(payload);
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
};

onMounted(async () => {
  data.value = await getPorsiList();
});

const resetModal = () => {
  porsiBank.value = '';
};

const onClickDeletePorsiBank = async (data) => {
  const user = store.state.modelAuth.user;
  const staf = user.login + ' - ' + user.objectName;
  const payload = {
    bankPortion: data.portionBank,
    admfPortion: data.admfPortion,
    portionDesc: data.portionDesc,
    bankPortionID: data.portionId,
    nik: staf.slice(0, 50)
  };

  console.log(payload);

  confirmDialog
    .showDialog({
      type: confirmDialogNotif.SAVE
    })
    .then(async (res) => {
      if (res === 'onOk') {
        try {
          const response = await deletePorsiBank(payload);
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
        } catch (err) {
          showNotification({
            title: titleNotif.ERROR,
            message: err.message,
            type: iconNotif.ERROR
          });
        }
      }
    });
};
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
            Tambah Porsi Bank
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
                @click.prevent="onClickDeletePorsiBank(props.cellData)"
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
          <h3 class="font-medium">Tambah Porsi Bank</h3>
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
          <form @submit.prevent="savePorsiBank" class="text-xs">
            <div class="md:flex justify-center md:items-center mb-2">
              <div class="md:w-1/4">
                <label class="md:text-left mb-1 md:mb-0 pr-4" for="porsi-bank"> Porsi Bank </label>
              </div>
              <div class="md:w-3/4">
                <div class="flex items-center">
                  <input
                    class="input-gen-style"
                    id="porsi-bank"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Masukkan Porsi Bank"
                    v-model="porsiBank"
                    required
                  />
                  <span class="px-2">%</span>
                </div>
              </div>
            </div>
            <div class="md:flex justify-center md:items-center mb-2">
              <div class="md:w-1/4">
                <label class="md:text-left mb-1 md:mb-0 pr-4" for="porsi-admf"> Porsi ADMF </label>
              </div>
              <div class="md:w-3/4">
                <div class="flex items-center">
                  <input
                    class="input-gen-style disabled"
                    id="porsi-admf"
                    type="number"
                    placeholder="Porsi ADMF"
                    disabled="true"
                    :value="porsiAdmf"
                  />
                  <span class="px-2">%</span>
                </div>
              </div>
            </div>
            <div class="md:flex justify-center md:items-center mb-2">
              <div class="md:w-1/4">
                <label class="md:text-left mb-1 md:mb-0 pr-4" for="username"> Deskripsi </label>
              </div>
              <div class="md:w-3/4">
                <div class="flex items-center">
                  <input
                    class="input-gen-style disabled"
                    id="username"
                    type="text"
                    placeholder="Deskripsi"
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

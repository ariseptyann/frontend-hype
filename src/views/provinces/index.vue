<script setup>
    import { ref, onMounted } from 'vue';
    import api from '../../api';

    const provinces = ref([]);

    //method fetchDataProvinces
    const fetchDataProvinces = async () => {

        //fetch data 
        await api.get('/provinces')

        .then(response => {
            //set response data to state "provinces"
            provinces.value = response.data

        });
    }

    //run hook "onMounted"
    onMounted(() => {

        //call method "fetchDataProvinces"
        fetchDataProvinces();
    });

    //method deleteProvince
    const deleteProvince = async (id) => {

        //delete province with API
        await api.delete(`/provinces/${id}`)
        .then(() => {

            //call method "fetchDataProvinces"
            fetchDataProvinces();
        })

    };
</script>

<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <router-link :to="{ name: 'provinces.create' }" class="btn btn-md btn-success rounded shadow border-0 mb-3">ADD NEW PROVINCE</router-link>
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead class="bg-dark text-white">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col" style="width:15%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="provinces.length == 0">
                                    <td colspan="2" class="text-center">
                                        <div class="alert alert-danger mb-0">
                                            Data Belum Tersedia!
                                        </div>
                                    </td>
                                </tr>
                                <tr v-else v-for="(province, index) in provinces" :key="index">
                                    <td>{{ province.name }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'provinces.edit', params:{id: province.id} }" class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</router-link>
                                        <button @click.prevent="deleteProvince(province.id)" class="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
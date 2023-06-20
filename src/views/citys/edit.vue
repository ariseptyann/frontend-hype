<script setup>
    //import ref
    import { ref, onMounted } from "vue";

    //import router
    import { useRouter, useRoute } from 'vue-router';

    //import api
    import api from "../../api";

    //init router
    const router = useRouter();

    //init route
    const route = useRoute();
    
    //define state
    const provinces = ref([]);
    const province = ref("");
    const name = ref("");
    const errors = ref([]);

    //onMounted
    onMounted( async () => {
        //fetch get provinces
        await api.get(`/provinces`)
        .then(response => {
            //set response data to state
            provinces.value = response.data
        });
        
        //fetch detail data city by ID
        await api.get(`/citys/single/${route.params.id}`)
        .then(response => {
            
            //set response data to state
            name.value = response.data.name
            province.value = response.data.province ? response.data.province.id : ''  
        });
    })

    //method "updateCity"
    const updateCity = async () => {
        const data = {
            "name": name.value,
            "province": province.value
        }

        //store data with API
        await api.put(`/citys/update/${route.params.id}`, data)
        .then(() => {
            //redirect
            router.push({ path: "/citys" });
        })
        .catch((error) => {
            //assign response error data to state "errors"
            errors = error;
        });
    };
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <form @submit.prevent="updateCity()">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Province</label>
                                <select class="form-control" v-model="province">
                                    <option v-for="(province, index) in provinces" :value="province.id" :key="index" :selected="province == province.id ? true : false">
                                        {{ province.name }}
                                    </option>
                                </select>
                                <div v-if="errors.message" class="alert alert-danger mt-2">
                                    <span>{{ errors.message }}</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">City Name</label>
                                <input type="text" class="form-control" v-model="name" placeholder="City name">
                                <div v-if="errors.message" class="alert alert-danger mt-2">
                                    <span>{{ errors.message }}</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>